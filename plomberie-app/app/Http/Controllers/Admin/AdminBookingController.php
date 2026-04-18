<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BookingStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use App\Models\Technician;
use App\Models\ServiceType;
use App\Services\BookingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminBookingController extends Controller
{
    public function index(): Response
    {
        $bookings = Booking::with(['serviceType', 'technician.user'])
            ->when(request('status'),  fn($q, $s) => $q->where('status', $s))
            ->when(request('city'),    fn($q, $c) => $q->where('city', $c))
            ->when(request('date'),    fn($q, $d) => $q->whereDate('booking_date', $d))
            ->when(request('search'),  fn($q, $s) => $q->where(function($q) use ($s) {
                $q->where('client_name', 'like', "%$s%")
                  ->orWhere('client_phone', 'like', "%$s%")
                  ->orWhere('confirmation_code', 'like', "%$s%");
            }))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Bookings/Index', [
            'bookings'    => $bookings,
            'statuses'    => BookingStatus::cases(),
            'serviceTypes' => ServiceType::active()->get(),
            'technicians' => Technician::with('user')->get(),
            'filters'     => request()->only(['status', 'city', 'date', 'search']),
            'stats'       => [
                'total'     => Booking::count(),
                'pending'   => Booking::pending()->count(),
                'today'     => Booking::today()->count(),
                'completed' => Booking::where('status', 'completed')->count(),
            ],
        ]);
    }

    public function store(Request $request, BookingService $service): RedirectResponse
    {
        $validated = $request->validate([
            'client_name'   => 'required|string|max:255',
            'client_phone'  => 'required|string|max:20',
            'client_email'  => 'nullable|email|max:255',
            'city'          => 'required|string|max:100',
            'booking_date'  => 'required|date',
            'booking_time'  => 'required|string',
            'service_type_id' => 'required|exists:service_types,id',
            'technician_id' => 'nullable|exists:technicians,id',
            'notes'         => 'nullable|string',
        ]);

        $booking = $service->create($validated);

        if ($request->filled('technician_id')) {
            $service->assignTechnician($booking, $request->input('technician_id'));
        }

        return back()->with('success', 'Réservation créée avec succès.');
    }

    public function show(Booking $booking): Response
    {
        $booking->load(['serviceType', 'technician.user', 'statusLogs.changedBy', 'intervention']);

        return Inertia::render('Admin/Bookings/Show', [
            'booking'     => $booking,
            'technicians' => Technician::with('user')->available()->get(),
        ]);
    }

    public function update(UpdateBookingRequest $request, Booking $booking, BookingService $service): RedirectResponse
    {
        $booking->update($request->validated());

        if ($request->filled('status')) {
            $service->updateStatus(
                $booking,
                BookingStatus::from($request->validated('status')),
                auth()->id(),
                $request->validated('admin_notes')
            );
        }

        if ($request->filled('technician_id')) {
            $service->assignTechnician($booking, $request->validated('technician_id'));
        }

        return back()->with('success', 'Réservation mise à jour avec succès.');
    }

    public function destroy(Booking $booking): RedirectResponse
    {
        $booking->delete();
        return back()->with('success', 'Réservation supprimée.');
    }
}
