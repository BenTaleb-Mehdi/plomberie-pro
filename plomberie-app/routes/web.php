<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\BookingController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\ServicesController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Admin\AdminBookingController;
use App\Http\Controllers\Admin\AdminDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ─── ROUTES PUBLIQUES ──────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/services', [ServicesController::class, 'index'])->name('services.index');
Route::get('/services/{service_type}', [ServicesController::class, 'show'])->name('services.show');
Route::get('/projects', [\App\Http\Controllers\Public\ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project}', [\App\Http\Controllers\Public\ProjectController::class, 'show'])->name('projects.show');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/reservation', [BookingController::class, 'create'])->name('booking.create');
Route::post('/reservation', [BookingController::class, 'store'])->name('booking.store');
Route::get('/reservation/confirmation/{code}', [BookingController::class, 'confirm'])->name('booking.confirm');

// ─── ROUTES AUTHENTIFIÉES ──────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard redirection based on role
    Route::get('/dashboard', function () {
        if (auth()->user()->hasRole('admin')) {
            return redirect()->route('admin.dashboard');
        }
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Profil Utilisateur
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ─── ADMINISTRATION (Admin seulement) ───────────────────────
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        
        // Entités Principales
        Route::resource('bookings', AdminBookingController::class);
        Route::resource('technicians', \App\Http\Controllers\Admin\AdminTechnicianController::class);
        Route::resource('clients', \App\Http\Controllers\Admin\AdminClientController::class);
        Route::resource('services', \App\Http\Controllers\Admin\AdminServiceController::class);
        Route::post('/services/{service}/toggle', [\App\Http\Controllers\Admin\AdminServiceController::class, 'toggle'])->name('services.toggle');
        
        // Utilitaires & Support
        Route::get('/reports', [\App\Http\Controllers\Admin\AdminReportController::class, 'index'])->name('reports.index');
        Route::resource('contacts', \App\Http\Controllers\Admin\AdminContactController::class);

        // Portfolio & Réalisations
        Route::resource('projects', \App\Http\Controllers\Admin\AdminProjectController::class);
        Route::post('/projects/{project}/toggle-featured', [\App\Http\Controllers\Admin\AdminProjectController::class, 'toggleFeatured'])->name('projects.toggle-featured');
    });
});

require __DIR__.'/auth.php';
