# RULE FILE: Coding Standards
# PlomberieDevAgent — Rules Layer

---

## 1. GENERAL PRINCIPLES

- Write clean, readable, self-documenting code
- Every function does ONE thing only
- No dead code, no commented-out blocks
- No TODO or placeholder logic — all code must be complete and functional
- DRY principle: extract repeated logic into helpers, traits, or components
- KISS principle: simplest solution that works correctly

---

## 2. LARAVEL CONVENTIONS

### Naming
- Controllers: PascalCase + "Controller" suffix → `BookingController`
- Models: PascalCase singular → `Booking`, `ServiceType`, `Technician`
- Migrations: snake_case with timestamp prefix → `2025_01_01_000000_create_bookings_table`
- Form Requests: PascalCase + "Request" suffix → `StoreBookingRequest`
- Mailables: PascalCase + "Mail" suffix → `BookingConfirmedMail`
- Jobs: PascalCase + "Job" suffix → `SendBookingConfirmationJob`
- Policies: PascalCase + "Policy" suffix → `BookingPolicy`
- Seeders: PascalCase + "Seeder" suffix → `BookingSeeder`

### File structure
```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Public/        ← no auth required
│   │   ├── Admin/         ← role:admin
│   │   ├── Client/        ← role:client
│   │   └── Technician/    ← role:technician
│   ├── Requests/          ← Form Request validation classes
│   └── Middleware/        ← custom middleware
├── Models/                ← Eloquent models
├── Mail/                  ← Mailable classes
├── Policies/              ← Authorization policies
├── Services/              ← Business logic classes
└── Enums/                 ← PHP 8.1+ Enums
```

### Controller rules
- Controllers must be thin — no business logic inside
- Delegate to Service classes for complex operations
- Always return Inertia::render() — never return JSON directly
- Use Form Request classes — never validate inside controllers
- Always use route model binding where possible

```php
// ✅ CORRECT
public function store(StoreBookingRequest $request, BookingService $service)
{
    $booking = $service->create($request->validated());
    return redirect()->route('booking.confirm', $booking->confirmation_code);
}

// ❌ WRONG
public function store(Request $request)
{
    $request->validate([...]); // validation belongs in Form Request
    // complex logic belongs in Service
    $booking = Booking::create($request->all());
    return response()->json($booking); // never return JSON
}
```

### Model rules
- Always define `$fillable` — never use `$guarded = []`
- Define all relationships explicitly
- Use accessors and mutators for computed/transformed values
- Define casts for dates, booleans, JSON fields
- Define scopes for common query filters

```php
// ✅ Correct model structure
class Booking extends Model
{
    protected $fillable = [
        'client_name', 'client_phone', 'client_email',
        'client_address', 'city', 'service_type_id',
        'technician_id', 'booking_date', 'booking_time',
        'status', 'notes', 'admin_notes', 'confirmation_code',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'created_at'   => 'datetime',
        'updated_at'   => 'datetime',
    ];

    // Scopes
    public function scopePending($query)   { return $query->where('status', 'pending'); }
    public function scopeConfirmed($query) { return $query->where('status', 'confirmed'); }
    public function scopeToday($query)     { return $query->whereDate('booking_date', today()); }

    // Relationships
    public function serviceType()         { return $this->belongsTo(ServiceType::class); }
    public function technician()          { return $this->belongsTo(Technician::class); }
    public function statusLogs()          { return $this->hasMany(BookingStatusLog::class); }
    public function intervention()        { return $this->hasOne(Intervention::class); }
}
```

### Service class rules
- One service per domain entity: `BookingService`, `TechnicianService`
- Constructor injection for dependencies
- Each method returns a typed value or throws a domain exception

```php
class BookingService
{
    public function __construct(
        private readonly Booking $bookingModel,
    ) {}

    public function create(array $data): Booking
    {
        $booking = $this->bookingModel->create([
            ...$data,
            'status'            => BookingStatus::Pending->value,
            'confirmation_code' => $this->generateCode(),
        ]);

        $this->logStatus($booking, BookingStatus::Pending);
        SendBookingConfirmationJob::dispatch($booking);

        return $booking;
    }

    private function generateCode(): string
    {
        return 'PLB-' . strtoupper(substr(uniqid(), -6));
    }

    private function logStatus(Booking $booking, BookingStatus $status): void
    {
        $booking->statusLogs()->create(['status' => $status->value]);
    }
}
```

### Enum usage (PHP 8.1+)
```php
// app/Enums/BookingStatus.php
enum BookingStatus: string
{
    case Pending    = 'pending';
    case Confirmed  = 'confirmed';
    case InProgress = 'in_progress';
    case Completed  = 'completed';
    case Cancelled  = 'cancelled';

    public function label(): string
    {
        return match($this) {
            self::Pending    => 'En attente',
            self::Confirmed  => 'Confirmé',
            self::InProgress => 'En cours',
            self::Completed  => 'Terminé',
            self::Cancelled  => 'Annulé',
        };
    }

    public function color(): string
    {
        return match($this) {
            self::Pending    => 'amber',
            self::Confirmed  => 'blue',
            self::InProgress => 'orange',
            self::Completed  => 'green',
            self::Cancelled  => 'red',
        };
    }
}
```

---

## 3. REACT CONVENTIONS

### Component rules
- Functional components ONLY — no class components
- One component per file
- PascalCase file and component names
- Default export for page components, named export for shared components

```jsx
// ✅ Correct component structure
import { useState } from 'react'
import { Link, useForm } from '@inertiajs/react'
import { Wrench } from 'lucide-react'

export default function BookingCreate({ serviceTypes }) {
    const [currentStep, setCurrentStep] = useState(1)
    const { data, setData, post, processing, errors } = useForm({
        service_type_id: '',
        booking_date: '',
        booking_time: '',
        client_name: '',
        client_phone: '',
        client_email: '',
        client_address: '',
        city: '',
        notes: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('booking.store'))
    }

    return (
        <form onSubmit={submit}>
            {/* component JSX */}
        </form>
    )
}
```

### Hook rules
- Custom hooks must start with `use` prefix
- Extract complex state logic into custom hooks
- Keep components as presentational as possible

```jsx
// ✅ Custom hook for booking wizard
function useBookingWizard(totalSteps = 3) {
    const [currentStep, setCurrentStep] = useState(1)

    const nextStep = () => setCurrentStep(s => Math.min(s + 1, totalSteps))
    const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1))
    const isFirst  = currentStep === 1
    const isLast   = currentStep === totalSteps

    return { currentStep, nextStep, prevStep, isFirst, isLast }
}
```

### Props rules
- Always destructure props in function signature
- No prop drilling beyond 2 levels — use Inertia shared data
- Boolean props: if the prop name is self-explanatory, pass without value
  ```jsx
  <Button disabled loading />  // ✅
  <Button disabled={true} loading={true} /> // ❌ verbose
  ```

### Inertia-specific rules
- Use `<Link>` from `@inertiajs/react` for ALL internal navigation
- Use `useForm()` for ALL forms that submit to Laravel
- Use `usePage()` to access shared data (auth user, flash messages)
- Never use `fetch()` or `axios` directly — use Inertia methods

```jsx
// ✅ Correct Inertia form
import { useForm } from '@inertiajs/react'

const { data, setData, post, processing, errors, reset } = useForm({
    field: '',
})

// ✅ Correct Inertia navigation
import { Link, router } from '@inertiajs/react'
<Link href={route('home')}>Accueil</Link>
router.visit(route('admin.bookings'))
```

---

## 4. TAILWIND CONVENTIONS

- Mobile-first: base styles for mobile, `sm:`, `md:`, `lg:` for larger screens
- No inline styles — use Tailwind classes only
- No custom CSS files — extend via `tailwind.config.js` if needed
- Minimum button/tap target height: `h-11` (44px) on mobile
- Use Tailwind's semantic color names consistently:
  - Primary actions: `bg-blue-600 hover:bg-blue-700`
  - Danger: `bg-red-600 hover:bg-red-700`
  - Success: `bg-green-600 hover:bg-green-700`
  - Warning: `bg-amber-500 hover:bg-amber-600`

```jsx
// ✅ Correct Tailwind button
<button className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
    Réserver
</button>

// ❌ Never hardcode colors or use inline styles
<button style={{ backgroundColor: '#2563EB', height: '44px' }}>
    Réserver
</button>
```

---

## 5. LUCIDE ICONS

- Import individually — never import entire library
- Size: `size={18}` for inline/text, `size={24}` for standalone
- Always pass explicit size prop — never rely on inherited font-size
- Add `aria-hidden="true"` when icon is decorative

```jsx
// ✅ Correct icon usage
import { Wrench, Phone, MapPin } from 'lucide-react'

<Wrench size={18} className="text-blue-600" aria-hidden="true" />
<Phone size={24} className="text-slate-700" />

// ❌ Never import all
import * as Icons from 'lucide-react' // too heavy
```

---

## 6. COMMENTS IN CODE

All code comments must be written in French:

```php
// ✅ Commentaire en français
// Générer le code de confirmation unique
$code = 'PLB-' . strtoupper(uniqid());

// ✅ PHPDoc in French
/**
 * Créer une nouvelle réservation et envoyer l'email de confirmation.
 *
 * @param  array  $data  Données validées de la réservation
 * @return Booking
 */
public function create(array $data): Booking
```

```jsx
// ✅ Commentaire React en français
// Afficher l'étape sélectionnée du formulaire de réservation
const renderStep = () => {
    switch (currentStep) {
        case 1: return <StepService />
        case 2: return <StepSchedule />
        case 3: return <StepConfirm />
    }
}
```

---

## 7. FILE SIZE LIMITS

- Controller method: max 20 lines (extract to Service if longer)
- React component: max 150 lines (split into sub-components if longer)
- Migration file: one table per file
- Service method: max 30 lines

---

## 8. FORBIDDEN PATTERNS

```php
// ❌ NEVER use in this project
DB::statement('...')        // raw SQL — use Eloquent
$model->update($request->all()) // mass assignment without validation
Auth::loginUsingId(1)       // hardcoded IDs
config(['key' => 'value'])  // runtime config changes
```

```jsx
// ❌ NEVER use in this project
fetch('/api/...')            // use Inertia instead
axios.get('/api/...')        // use Inertia instead
document.getElementById()   // use React refs instead
localStorage                 // use Inertia shared data instead
window.location.href         // use router.visit() instead
```
