# WORKFLOW: Phase 3 — Backend Controllers, Services & Mail
# PlomberieDevAgent — Workflows Layer

---

## OBJECTIVE
Build all Laravel controllers, service classes, form requests,
mailables, and jobs. After this phase, all server-side logic is complete.

---

## STEP 3.1 — Create Service Classes

```bash
php artisan make:class Services/BookingService
```

See `skills/laravel.md → Generate a Service Class` for complete BookingService.

---

## STEP 3.2 — Create Form Request Classes

```bash
php artisan make:request StoreBookingRequest
php artisan make:request UpdateBookingRequest
php artisan make:request StoreContactRequest
```

See `skills/laravel.md → Generate a Form Request` for StoreBookingRequest.

### UpdateBookingRequest (admin only)
```php
<?php
namespace App\Http\Requests;

use App\Enums\BookingStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->hasRole('admin');
    }

    public function rules(): array
    {
        return [
            'status'        => ['required', Rule::enum(BookingStatus::class)],
            'technician_id' => ['nullable', 'integer', 'exists:technicians,id'],
            'admin_notes'   => ['nullable', 'string', 'max:1000'],
        ];
    }
}
```

### StoreContactRequest
```php
<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'    => ['required', 'string', 'min:3', 'max:100'],
            'email'   => ['required', 'email:rfc', 'max:255'],
            'phone'   => ['nullable', 'regex:/^(05|06|07)[0-9]{8}$/'],
            'subject' => ['required', 'string', 'min:5', 'max:200'],
            'message' => ['required', 'string', 'min:20', 'max:2000'],
        ];
    }
}
```

---

## STEP 3.3 — Create Mailables & Email Templates

```bash
php artisan make:mail BookingConfirmedMail --markdown=emails.booking.confirmed
php artisan make:mail BookingStatusUpdatedMail --markdown=emails.booking.status-updated
```

See `skills/laravel.md → Generate a Mailable` for BookingConfirmedMail.

---

## STEP 3.4 — Create Jobs

```bash
php artisan make:job SendBookingConfirmationJob
php artisan make:job SendStatusUpdateJob
```

```php
// app/Jobs/SendBookingConfirmationJob.php
<?php
namespace App\Jobs;

use App\Mail\BookingConfirmedMail;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendBookingConfirmationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 60;

    public function __construct(public readonly Booking $booking) {}

    public function handle(): void
    {
        Mail::to($this->booking->client_email)
            ->send(new BookingConfirmedMail($this->booking));
    }
}
```

---

## STEP 3.5 — Create Policies

```bash
php artisan make:policy BookingPolicy --model=Booking
```

See `skills/laravel.md → Generate a Policy` for complete BookingPolicy.

Register in `app/Providers/AppServiceProvider.php`:
```php
use App\Models\Booking;
use App\Policies\BookingPolicy;

// Dans boot() ou via $policies array dans AuthServiceProvider
Gate::policy(Booking::class, BookingPolicy::class);
```

---

## STEP 3.6 — Create Controllers

### Public/BookingController
```php
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
```

### Admin/AdminBookingController
```php
<?php
namespace App\Http\Controllers\Admin;

use App\Enums\BookingStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use App\Models\Technician;
use App\Services\BookingService;
use Illuminate\Http\RedirectResponse;
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
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Bookings/Index', [
            'bookings'    => $bookings,
            'statuses'    => BookingStatus::cases(),
            'filters'     => request()->only(['status', 'city', 'date', 'search']),
            'stats'       => [
                'total'     => Booking::count(),
                'pending'   => Booking::pending()->count(),
                'today'     => Booking::today()->count(),
                'completed' => Booking::where('status', 'completed')->count(),
            ],
        ]);
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
        $service->updateStatus(
            $booking,
            BookingStatus::from($request->validated('status')),
            auth()->id(),
            $request->validated('admin_notes')
        );

        if ($request->filled('technician_id')) {
            $service->assignTechnician($booking, $request->validated('technician_id'));
        }

        return back()->with('success', 'Réservation mise à jour avec succès.');
    }

    public function destroy(Booking $booking): RedirectResponse
    {
        $booking->delete();
        return redirect()
            ->route('admin.bookings.index')
            ->with('success', 'Réservation supprimée.');
    }
}
```

### Admin/AdminDashboardController
```php
<?php
namespace App\Http\Controllers\Admin;

use App\Models\Booking;
use App\Models\Contact;
use App\Models\Technician;
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
        ]);
    }
}
```

### Public/HomeController
```php
<?php
namespace App\Http\Controllers\Public;

use App\Models\ServiceType;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Home', [
            'services' => ServiceType::active()->limit(6)->get(),
        ]);
    }
}
```

---

## STEP 3.7 — Register Service Provider Bindings

```php
// app/Providers/AppServiceProvider.php

public function register(): void
{
    $this->app->bind(\App\Services\BookingService::class);
}
```

---

## PHASE 3 CHECKLIST

- [ ] BookingService created with create(), updateStatus(), assignTechnician()
- [ ] StoreBookingRequest with full Moroccan validation rules
- [ ] UpdateBookingRequest for admin only
- [ ] BookingConfirmedMail mailable + markdown template
- [ ] SendBookingConfirmationJob with retry logic
- [ ] BookingPolicy with view, cancel, updateStatus, delete methods
- [ ] BookingController (public: create, store, confirm)
- [ ] AdminBookingController (index, show, update, destroy)
- [ ] AdminDashboardController with stats
- [ ] HomeController, ServicesController, ContactController
- [ ] All routes defined in `routes/web.php`
- [ ] HandleInertiaRequests middleware sharing auth, flash, ziggy

**✅ Phase 3 complete — proceed to Phase 4 (Frontend)**
