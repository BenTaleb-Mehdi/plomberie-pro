# SKILL FILE: Authentication & Authorization
# PlomberieDevAgent — Skills Layer

---

## ROLES & PERMISSIONS SETUP

### RolesAndPermissionsSeeder
```php
<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Vider le cache des permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ── Créer toutes les permissions ─────────────────────────
        $permissions = [
            // Réservations
            'view bookings',
            'create bookings',
            'edit bookings',
            'delete bookings',
            'cancel bookings',
            'assign technician',

            // Clients
            'view clients',
            'manage clients',

            // Techniciens
            'view technicians',
            'manage technicians',

            // Services
            'manage services',

            // Rapports
            'view reports',

            // Paramètres
            'manage settings',

            // Messages
            'view contacts',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ── Créer les rôles et assigner les permissions ──────────

        // Rôle Admin — accès total
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        // Rôle Technicien — accès limité à ses propres interventions
        $technician = Role::firstOrCreate(['name' => 'technician']);
        $technician->givePermissionTo([
            'view bookings',
            'edit bookings',
        ]);

        // Rôle Client — accès à ses propres réservations seulement
        $client = Role::firstOrCreate(['name' => 'client']);
        $client->givePermissionTo([
            'create bookings',
            'view bookings',
            'cancel bookings',
        ]);
    }
}
```

---

## REGISTRATION — ASSIGN ROLE TO NEW USERS

Modify Breeze's `RegisteredUserController` to assign the `client` role:

```php
// app/Http/Controllers/Auth/RegisteredUserController.php

public function store(Request $request): RedirectResponse
{
    $request->validate([
        'name'     => ['required', 'string', 'max:255'],
        'email'    => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = User::create([
        'name'     => $request->name,
        'email'    => $request->email,
        'password' => Hash::make($request->password),
    ]);

    // Assigner le rôle client par défaut
    $user->assignRole('client');

    event(new Registered($user));
    Auth::login($user);

    // Rediriger vers le dashboard client
    return redirect(route('client.dashboard', absolute: false));
}
```

---

## REDIRECT AFTER LOGIN — BY ROLE

```php
// app/Http/Controllers/Auth/AuthenticatedSessionController.php

public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();
    $request->session()->regenerate();

    $user = Auth::user();

    // Rediriger selon le rôle
    if ($user->hasRole('admin')) {
        return redirect()->intended(route('admin.dashboard'));
    }

    if ($user->hasRole('technician')) {
        return redirect()->intended(route('technician.dashboard'));
    }

    return redirect()->intended(route('client.dashboard'));
}
```

---

## ROUTE PROTECTION PATTERNS

```php
// routes/web.php — organisation complète

use Illuminate\Support\Facades\Route;

// ── Routes publiques (sans authentification) ──────────────────────
Route::get('/',               [HomeController::class, 'index'])->name('home');
Route::get('/services',       [ServicesController::class, 'index'])->name('services');
Route::get('/about',          [PageController::class, 'about'])->name('about');
Route::get('/contact',        [ContactController::class, 'index'])->name('contact');
Route::post('/contact',       [ContactController::class, 'store'])->name('contact.store')
    ->middleware('throttle:5,60');

// Réservation publique (sans connexion requise)
Route::get('/booking',             [BookingController::class, 'create'])->name('booking.create');
Route::post('/booking',            [BookingController::class, 'store'])->name('booking.store')
    ->middleware('throttle:3,60');
Route::get('/booking/confirm/{code}', [BookingController::class, 'confirm'])->name('booking.confirm');

// ── Routes Admin ──────────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard',             [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/bookings',              [AdminBookingController::class, 'index'])->name('bookings.index');
        Route::get('/bookings/{booking}',    [AdminBookingController::class, 'show'])->name('bookings.show');
        Route::get('/bookings/{booking}/edit',[AdminBookingController::class, 'edit'])->name('bookings.edit');
        Route::put('/bookings/{booking}',    [AdminBookingController::class, 'update'])->name('bookings.update');
        Route::delete('/bookings/{booking}', [AdminBookingController::class, 'destroy'])->name('bookings.destroy');
        Route::get('/technicians',           [TechnicianController::class, 'index'])->name('technicians.index');
        Route::post('/technicians',          [TechnicianController::class, 'store'])->name('technicians.store');
        Route::put('/technicians/{technician}', [TechnicianController::class, 'update'])->name('technicians.update');
        Route::get('/services',              [ServiceTypeController::class, 'index'])->name('services.index');
        Route::post('/services',             [ServiceTypeController::class, 'store'])->name('services.store');
        Route::put('/services/{service}',    [ServiceTypeController::class, 'update'])->name('services.update');
        Route::get('/clients',               [ClientController::class, 'index'])->name('clients.index');
        Route::get('/reports',               [ReportController::class, 'index'])->name('reports.index');
        Route::get('/contacts',              [ContactController::class, 'adminIndex'])->name('contacts.index');
    });

// ── Routes Technicien ─────────────────────────────────────────────
Route::middleware(['auth', 'role:technician'])
    ->prefix('technician')
    ->name('technician.')
    ->group(function () {
        Route::get('/dashboard',                  [TechnicianDashboardController::class, 'index'])->name('dashboard');
        Route::get('/jobs',                       [TechnicianJobController::class, 'index'])->name('jobs.index');
        Route::put('/jobs/{booking}/status',      [TechnicianJobController::class, 'updateStatus'])->name('jobs.status');
        Route::put('/jobs/{booking}/intervention',[TechnicianJobController::class, 'updateIntervention'])->name('jobs.intervention');
    });

// ── Routes Client ─────────────────────────────────────────────────
Route::middleware(['auth', 'role:client'])
    ->prefix('client')
    ->name('client.')
    ->group(function () {
        Route::get('/dashboard',         [ClientDashboardController::class, 'index'])->name('dashboard');
        Route::get('/bookings',          [ClientBookingController::class, 'index'])->name('bookings.index');
        Route::delete('/bookings/{booking}', [ClientBookingController::class, 'cancel'])->name('bookings.cancel');
    });

// Routes d'authentification Breeze
require __DIR__.'/auth.php';
```

---

## HANDLE INERTIA REQUESTS MIDDLEWARE

```php
// app/Http/Middleware/HandleInertiaRequests.php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id'    => $request->user()->id,
                    'name'  => $request->user()->name,
                    'email' => $request->user()->email,
                    'roles' => $request->user()->getRoleNames(),
                ] : null,
            ],
            'flash' => [
                'success' => session('success'),
                'error'   => session('error'),
                'warning' => session('warning'),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ]);
    }
}
```
