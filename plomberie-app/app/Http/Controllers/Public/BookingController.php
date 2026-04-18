<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\ServiceType;
use App\Services\BookingService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    private array $moroccanCities = [
        'Tanger', 'Tétouan', 'Al Hoceïma', 'Larache',
        'Chefchaouen', 'Mdiq', 'Fnideq', 'Martil', 'Asilah',
    ];

    public function create(): Response
    {
        return Inertia::render('Public/Booking/Create', [
            'serviceTypes' => ServiceType::active()->get(['id', 'name', 'description', 'duration_minutes', 'icon']),
            'cities'       => $this->moroccanCities,
        ]);
    }

    public function store(StoreBookingRequest $request, BookingService $service): RedirectResponse
    {
        $booking = $service->create($request->validated());

        return redirect()
            ->route('booking.confirm', $booking->confirmation_code)
            ->with('success', 'Votre réservation a été enregistrée avec succès.');
    }

    public function confirm(string $code): Response
    {
        $booking = Booking::with('serviceType')
            ->where('confirmation_code', $code)
            ->firstOrFail();

        return Inertia::render('Public/Booking/Confirm', [
            'booking' => $booking->only([
                'confirmation_code', 'client_name', 'client_email',
                'client_phone', 'booking_date', 'booking_time',
                'city', 'status',
            ]) + ['service_name' => $booking->serviceType->name],
        ]);
    }
}
