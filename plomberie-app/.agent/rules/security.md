# RULE FILE: Security
# PlomberieDevAgent — Rules Layer

---

## 1. AUTHENTICATION SECURITY

- Always use Laravel Breeze — never build auth from scratch
- Passwords: minimum 8 characters, enforced via validation rule
- Session: use Redis driver, set `SESSION_LIFETIME=120` (2 hours)
- Remember-me tokens: enabled only for admin and technician roles
- Rate limiting on login: 5 attempts per minute (Laravel default)

```php
// routes/auth.php — add rate limiting
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('throttle:5,1'); // 5 attempts per 1 minute
```

---

## 2. AUTHORIZATION — SPATIE ROLES & PERMISSIONS

### Middleware protection (MANDATORY on every protected route)

```php
// web.php — always use BOTH auth and role middleware
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    // Admin routes
});

Route::middleware(['auth', 'role:technician'])->group(function () {
    // Technician routes
});

Route::middleware(['auth', 'role:client'])->group(function () {
    // Client routes
});
```

### Policy rules (use for resource-level authorization)

```php
// BookingPolicy.php
public function view(User $user, Booking $booking): bool
{
    // Admin peut tout voir
    if ($user->hasRole('admin')) return true;

    // Le technicien peut voir les réservations assignées
    if ($user->hasRole('technician')) {
        return $booking->technician?->user_id === $user->id;
    }

    // Le client peut voir ses propres réservations
    return $booking->client_email === $user->email;
}

public function cancel(User $user, Booking $booking): bool
{
    // Annulation seulement si statut = pending
    if ($booking->status !== 'pending') return false;

    if ($user->hasRole('admin')) return true;
    return $booking->client_email === $user->email;
}
```

---

## 3. FORM VALIDATION SECURITY

- ALWAYS use Form Request classes — never validate in controllers
- Always use `$request->validated()` — never `$request->all()`
- Sanitize text inputs: trim whitespace, strip dangerous characters

```php
// StoreBookingRequest.php
class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Réservation publique — pas d'auth requise
    }

    public function rules(): array
    {
        return [
            'service_type_id' => ['required', 'integer', 'exists:service_types,id',
                                  Rule::exists('service_types', 'id')
                                      ->where('is_active', true)],
            'booking_date'    => ['required', 'date', 'after:today',
                                  new NotSunday()],
            'booking_time'    => ['required', Rule::in([
                                  '08:00','09:00','10:00','11:00',
                                  '14:00','15:00','16:00','17:00'])],
            'client_name'     => ['required', 'string', 'min:3', 'max:100'],
            'client_phone'    => ['required', 'string',
                                  'regex:/^(05|06|07)[0-9]{8}$/'],
            'client_email'    => ['required', 'email:rfc,dns', 'max:255'],
            'client_address'  => ['required', 'string', 'min:10', 'max:500'],
            'city'            => ['required', 'string',
                                  Rule::in([
                                      'Tanger', 'Tétouan', 'Al Hoceïma',
                                      'Larache', 'Chefchaouen', 'Mdiq',
                                      'Fnideq', 'Martil', 'Asilah',
                                  ])],
            'notes'           => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'service_type_id.required' => 'Veuillez sélectionner un service.',
            'booking_date.after'       => 'La date doit être après aujourd\'hui.',
            'client_phone.regex'       => 'Numéro de téléphone marocain invalide (06/07/05XXXXXXXX).',
            'client_email.email'       => 'Adresse email invalide.',
            'city.in'                  => 'Ville non couverte par nos services.',
        ];
    }

    protected function prepareForValidation(): void
    {
        // Nettoyer les données avant validation
        $this->merge([
            'client_name'    => trim($this->client_name ?? ''),
            'client_phone'   => preg_replace('/\s+/', '', $this->client_phone ?? ''),
            'client_email'   => strtolower(trim($this->client_email ?? '')),
            'client_address' => trim($this->client_address ?? ''),
        ]);
    }
}
```

---

## 4. CSRF PROTECTION

- Laravel's CSRF protection is enabled by default — never disable it
- Inertia automatically includes CSRF token in all requests
- Never add `except` entries to `VerifyCsrfToken` middleware

---

## 5. XSS PREVENTION

- In PHP blade/Inertia: never use `{!! !!}` for user-generated content
- In React: never use `dangerouslySetInnerHTML` for user content
- All user text is auto-escaped by React's JSX

```jsx
// ✅ Safe — React escapes automatically
<p>{booking.client_name}</p>
<p>{booking.notes}</p>

// ❌ NEVER for user content
<p dangerouslySetInnerHTML={{ __html: booking.notes }} />
```

---

## 6. SQL INJECTION PREVENTION

- Always use Eloquent ORM — never raw queries with user input
- If raw queries are needed, use parameter binding

```php
// ✅ Safe Eloquent
Booking::where('status', $status)->get();
Booking::where('city', $request->city)->get();

// ✅ Safe raw (if absolutely necessary)
DB::select('SELECT * FROM bookings WHERE city = ?', [$city]);

// ❌ NEVER
DB::select("SELECT * FROM bookings WHERE city = '$city'"); // SQL injection risk
```

---

## 7. MASS ASSIGNMENT PROTECTION

- Every model must define `$fillable` — never use `$guarded = []`
- Never pass `$request->all()` to create/update — use `$request->validated()`

```php
// ✅ Correct
$booking = Booking::create($request->validated());

// ❌ Dangerous
$booking = Booking::create($request->all());
```

---

## 8. SENSITIVE DATA

- Never log: passwords, phone numbers, full addresses, email addresses
- Confirmation codes: display only on the confirmation page
- Admin notes: visible only to admin and assigned technician
- Never expose user IDs in URLs for public-facing pages (use confirmation_code instead)

```php
// ✅ Public URL uses code, not ID
route('booking.confirm', ['code' => $booking->confirmation_code])
// → /booking/confirm/PLB-A3F2C1

// ❌ Never expose database ID publicly
route('booking.show', $booking->id)
// → /booking/123 (sequential ID exposes count)
```

---

## 9. RATE LIMITING ON BOOKING

- Public booking form: max 3 submissions per IP per hour
- Contact form: max 5 submissions per IP per hour

```php
// routes/web.php
Route::post('/booking', [BookingController::class, 'store'])
    ->middleware('throttle:3,60'); // 3 réservations par heure par IP

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,60');
```

---

## 10. HEADERS & HTTPS

In production `AppServiceProvider`:

```php
public function boot(): void
{
    if (app()->environment('production')) {
        URL::forceScheme('https');
    }
}
```

`config/session.php` for production:
```php
'secure'    => env('SESSION_SECURE_COOKIE', true),
'same_site' => 'lax',
```
