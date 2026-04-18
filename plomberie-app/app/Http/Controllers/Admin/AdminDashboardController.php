<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Contact;
use App\Models\Technician;
use App\Models\ServiceType;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'bookings_today'   => Booking::today()->count(),
                'bookings_pending' => Booking::pending()->count(),
                'bookings_month'   => Booking::whereMonth('created_at', now()->month)->count(),
                'technicians'      => Technician::available()->count(),
                'unread_contacts'  => Contact::unread()->count(),
            ],
            'recentBookings' => Booking::with(['serviceType', 'technician.user'])
                ->latest()->limit(10)->get(),
            'todayBookings' => Booking::with(['serviceType', 'technician.user'])
                ->today()->orderBy('booking_time')->get(),
            'categories' => ServiceType::active()->pluck('name')->toArray() ?: ['Plomberie Générale', 'Installation Sanitaire', 'Chauffage']
        ]);
    }
}
