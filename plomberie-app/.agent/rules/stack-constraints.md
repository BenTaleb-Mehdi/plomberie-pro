# RULE FILE: Stack Constraints
# PlomberieDevAgent — Rules Layer

---

## EXACT VERSIONS TO USE

| Package                     | Version  | Notes                              |
|-----------------------------|----------|------------------------------------|
| PHP                         | >= 8.2   | Required for Laravel 12 + Enums    |
| Laravel                     | 12.x     | Latest stable                      |
| laravel/breeze              | latest   | Inertia + React stack              |
| inertiajs/inertia-laravel   | ^2.0     | Server-side adapter                |
| @inertiajs/react            | ^2.0     | Client-side adapter                |
| spatie/laravel-permission   | ^6.0     | Roles and permissions              |
| tightenco/ziggy             | ^2.0     | Named routes in JS                 |
| React                       | ^18.3    | Hooks, concurrent features         |
| Vite                        | ^6.0     | Bundler                            |
| Tailwind CSS                | ^4.0     | Utility-first CSS                  |
| lucide-react                | latest   | Icons                              |
| MySQL                       | >= 8.0   | Main database                      |
| Redis                       | >= 7.0   | Queue driver, cache, sessions      |

---

## INSTALLATION COMMANDS (exact order)

```bash
# 1. Create Laravel project
composer create-project laravel/laravel plomberie-app "12.*"
cd plomberie-app

# 2. Install backend packages
composer require laravel/breeze --dev
composer require spatie/laravel-permission
composer require tightenco/ziggy

# 3. Scaffold Breeze with Inertia + React + TypeScript
php artisan breeze:install react --typescript --no-interaction

# 4. Install frontend packages
npm install lucide-react
npm install @vitejs/plugin-react

# 5. Install optional ReactBit (if using CDN components, skip)
# npm install @bit/bit.envs.compilers.react

# 6. Publish Spatie config
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"

# 7. Run initial migrations
php artisan migrate

# 8. Build assets
npm run build
```

---

## INERTIA.JS CONSTRAINTS

### Server side (Laravel)
- Always return `Inertia::render('PageName', $props)` from controllers
- Share global data via `HandleInertiaRequests` middleware only
- Use `Inertia::location()` for external redirects only
- Use standard Laravel `redirect()` for internal redirects

```php
// ✅ Correct Inertia response
return Inertia::render('Public/Booking/Create', [
    'serviceTypes' => ServiceType::active()->get(),
    'cities'       => $this->moroccanCities(),
]);

// ✅ Correct redirect after form submit
return redirect()->route('booking.confirm', $booking->confirmation_code)
    ->with('success', 'Réservation créée avec succès');

// ❌ Never return JSON
return response()->json($booking);
```

### Client side (React)
- Always use `useForm()` for forms — provides errors, processing state
- Always use `<Link>` for navigation — not `<a>` tags
- Use `usePage()` to access auth, flash, shared props
- Use `router.visit()` for programmatic navigation

### Shared data (must be in HandleInertiaRequests)
```php
public function share(Request $request): array
{
    return [
        ...parent::share($request),
        'auth' => [
            'user' => $request->user()?->only('id', 'name', 'email', 'roles'),
        ],
        'flash' => [
            'success' => session('success'),
            'error'   => session('error'),
        ],
        'ziggy' => fn () => [
            ...app(Ziggy::class)->toArray(),
            'location' => $request->url(),
        ],
    ];
}
```

---

## AUTHENTICATION CONSTRAINTS (Breeze)

- Breeze generates: login, register, forgot password, reset password, email verify
- Do NOT modify Breeze auth views directly — extend them
- Add role assignment in `RegisteredUserController` after user creation
- Use middleware groups for role-based route protection

```php
// routes/web.php
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index']);
    // ...
});

Route::middleware(['auth', 'role:technician'])->prefix('technician')->group(function () {
    Route::get('/dashboard', [TechnicianDashboardController::class, 'index']);
    // ...
});

Route::middleware(['auth', 'role:client'])->prefix('client')->group(function () {
    Route::get('/dashboard', [ClientDashboardController::class, 'index']);
    // ...
});
```

---

## DATABASE CONSTRAINTS

- Driver: MySQL 8.0+ (use `utf8mb4` charset, `utf8mb4_unicode_ci` collation)
- Every table must have: `id` (bigIncrements), `created_at`, `updated_at`
- Foreign keys: always define with `constrained()` and appropriate `onDelete()`
- Soft deletes: use on `bookings`, `clients`, `technicians` tables only
- Indexes: add on all foreign keys and frequently queried columns

```php
// ✅ Correct migration pattern
Schema::create('bookings', function (Blueprint $table) {
    $table->id();
    $table->string('client_name');
    $table->string('client_phone', 20);
    $table->string('client_email');
    $table->text('client_address');
    $table->string('city', 100);
    $table->foreignId('service_type_id')->constrained()->restrictOnDelete();
    $table->foreignId('technician_id')->nullable()->constrained()->nullOnDelete();
    $table->date('booking_date');
    $table->time('booking_time');
    $table->enum('status', ['pending','confirmed','in_progress','completed','cancelled'])
          ->default('pending');
    $table->text('notes')->nullable();
    $table->text('admin_notes')->nullable();
    $table->string('confirmation_code', 20)->unique();
    $table->softDeletes();
    $table->timestamps();

    // Indexes for frequent queries
    $table->index('status');
    $table->index('booking_date');
    $table->index('city');
});
```

---

## QUEUE CONSTRAINTS

- Driver: Redis (set `QUEUE_CONNECTION=redis` in .env)
- All emails must be dispatched via jobs — never send synchronously in controllers
- Queue name: `default` for bookings, `notifications` for status updates

```php
// ✅ Always dispatch jobs for emails
SendBookingConfirmationJob::dispatch($booking)->onQueue('default');

// ❌ Never send mail synchronously in a controller
Mail::to($booking->client_email)->send(new BookingConfirmedMail($booking));
```

---

## TAILWIND CSS v4 CONSTRAINTS

Tailwind CSS v4 has changes from v3 — follow these rules:

```js
// vite.config.js — correct v4 setup
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        laravel({ input: ['resources/css/app.css', 'resources/js/app.jsx'] }),
        react(),
        tailwindcss(),
    ],
})
```

```css
/* resources/css/app.css — v4 import syntax */
@import "tailwindcss";

/* Custom brand tokens */
@theme {
    --color-primary: #2563EB;
    --color-primary-dark: #1D4ED8;
    --color-accent: #0EA5E9;
    --font-sans: 'Inter', sans-serif;
}
```

---

## VITE CONSTRAINTS

```js
// vite.config.js — full correct config
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
})
```

---

## NO-GO TECHNOLOGIES

The following are explicitly FORBIDDEN in this project:

| Forbidden                | Use instead              |
|--------------------------|--------------------------|
| jQuery                   | React / vanilla JS       |
| Bootstrap                | Tailwind CSS             |
| fetch() / axios directly | Inertia form helpers     |
| Vue.js                   | React.js                 |
| Laravel API resources    | Inertia::render()        |
| Livewire                 | Inertia + React          |
| Alpine.js                | React hooks              |
| Stripe / PayPal          | NO payment at all        |
| class components (React) | Functional components    |
| Redux                    | React useState / context |

---

## ENVIRONMENT VARIABLES (.env)

Required variables for this project:

```env
APP_NAME="Plomberie Pro"
APP_ENV=local
APP_KEY=                    # generated by artisan key:generate
APP_DEBUG=true
APP_URL=http://localhost

APP_LOCALE=fr
APP_FALLBACK_LOCALE=ar
APP_FAKER_LOCALE=fr_MA

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=plomberie_db
DB_USERNAME=root
DB_PASSWORD=

QUEUE_CONNECTION=redis
CACHE_STORE=redis
SESSION_DRIVER=redis

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_FROM_ADDRESS="noreply@plomberiepro.ma"
MAIL_FROM_NAME="Plomberie Pro"

# Production only
# MAIL_MAILER=mailgun
# MAILGUN_DOMAIN=plomberiepro.ma
# MAILGUN_SECRET=
```
