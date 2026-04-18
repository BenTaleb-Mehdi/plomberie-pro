<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Reports/Index', [
            'total_bookings' => Booking::count(),
            'revenue_estimate' => 0, // Placeholder
        ]);
    }
}
