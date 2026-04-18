# SKILL FILE: Laravel 12
# PlomberieDevAgent — Skills Layer

---

## SKILL: Generate a Migration

When asked to create a migration, follow this pattern exactly:

```php
<?php
// database/migrations/YYYY_MM_DD_HHMMSS_create_{table}_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('{table}', function (Blueprint $table) {
            $table->id();
            // ... colonnes ici
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('{table}');
    }
};
```

---

## SKILL: Generate an Eloquent Model

```php
<?php
// app/Models/Booking.php

namespace App\Models;

use App\Enums\BookingStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'client_name', 'client_phone', 'client_email',
        'client_address', 'city', 'service_type_id',
        'technician_id', 'booking_date', 'booking_time',
        'status', 'notes', 'admin_notes', 'confirmation_code',
    ];

    protected $casts = [
        'booking_date' => 'date:Y-m-d',
        'created_at'   => 'datetime',
        'status'       => BookingStatus::class,
    ];

    // ─── Scopes ───────────────────────────────────────────────
    public function scopePending($q)    { return $q->where('status', 'pending'); }
    public function scopeConfirmed($q)  { return $q->where('status', 'confirmed'); }
    public function scopeToday($q)      { return $q->whereDate('booking_date', today()); }
    public function scopeByCity($q, $c) { return $q->where('city', $c); }

    // ─── Relationships ────────────────────────────────────────
    public function serviceType(): BelongsTo
    {
        return $this->belongsTo(ServiceType::class);
    }

    public function technician(): BelongsTo
    {
        return $this->belongsTo(Technician::class);
    }

    public function statusLogs(): HasMany
    {
        return $this->hasMany(BookingStatusLog::class)->latest();
    }

    public function intervention(): HasOne
    {
        return $this->hasOne(Intervention::class);
    }
}
```

---

## SKILL: Generate a Form Request

```php
<?php
// app/Http/Requests/StoreBookingRequest.php

namespace App\Http\Requests;

use App\Rules\NotSunday;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Route publique
    }

    public function rules(): array
    {
        return [
            'service_type_id' => ['required', 'integer',
                Rule::exists('service_types', 'id')->where('is_active', true)],
            'booking_date'    => ['required', 'date', 'after:today', new NotSunday()],
            'booking_time'    => ['required', Rule::in([
                '08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00'
            ])],
            'client_name'     => ['required', 'string', 'min:3', 'max:100'],
            'client_phone'    => ['required', 'regex:/^(05|06|07)[0-9]{8}$/'],
            'client_email'    => ['required', 'email:rfc', 'max:255'],
            'client_address'  => ['required', 'string', 'min:10', 'max:500'],
            'city'            => ['required', Rule::in([
                'Tanger','Tétouan','Al Hoceïma','Larache',
                'Chefchaouen','Mdiq','Fnideq','Martil','Asilah',
            ])],
            'notes'           => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'service_type_id.required' => 'Veuillez choisir un type de service.',
            'booking_date.after'       => 'La date doit être après aujourd\'hui.',
            'booking_date.required'    => 'La date de réservation est requise.',
            'booking_time.required'    => 'Veuillez choisir un créneau horaire.',
            'booking_time.in'          => 'Créneau horaire invalide.',
            'client_name.required'     => 'Votre nom complet est requis.',
            'client_phone.required'    => 'Votre numéro de téléphone est requis.',
            'client_phone.regex'       => 'Format invalide. Exemple: 0612345678',
            'client_email.required'    => 'Votre adresse email est requise.',
            'client_email.email'       => 'Adresse email invalide.',
            'client_address.required'  => 'Votre adresse est requise.',
            'city.required'            => 'Veuillez choisir votre ville.',
            'city.in'                  => 'Désolé, votre ville n\'est pas encore couverte.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'client_name'    => trim($this->client_name ?? ''),
            'client_phone'   => preg_replace('/[\s\-\.]/', '', $this->client_phone ?? ''),
            'client_email'   => strtolower(trim($this->client_email ?? '')),
            'client_address' => trim($this->client_address ?? ''),
        ]);
    }
}
```

---

## SKILL: Generate a Mailable

```php
<?php
// app/Mail/BookingConfirmedMail.php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingConfirmedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly Booking $booking) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Confirmation de réservation #{$this->booking->confirmation_code}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.booking.confirmed',
            with: [
                'booking'          => $this->booking,
                'confirmationCode' => $this->booking->confirmation_code,
                'serviceType'      => $this->booking->serviceType->name,
                'bookingDate'      => $this->booking->booking_date->format('d/m/Y'),
                'bookingTime'      => $this->booking->booking_time,
            ],
        );
    }
}
```

```markdown
{{-- resources/views/emails/booking/confirmed.blade.php --}}
@component('mail::message')
# Réservation confirmée

Bonjour **{{ $booking->client_name }}**,

Votre demande d'intervention a bien été reçue.

## Détails de votre réservation

| | |
|---|---|
| **Code** | {{ $confirmationCode }} |
| **Service** | {{ $serviceType }} |
| **Date** | {{ $bookingDate }} à {{ $bookingTime }} |
| **Adresse** | {{ $booking->client_address }}, {{ $booking->city }} |

@component('mail::panel')
Notre équipe vous contactera dans les **24 heures** pour confirmer
votre rendez-vous et vous donner plus de détails.
@endcomponent

@component('mail::button', ['url' => route('booking.confirm', $confirmationCode), 'color' => 'primary'])
Voir ma réservation
@endcomponent

Merci de votre confiance,
**Plomberie Pro Maroc**

*Tél: +212 6XX XXX XXX | Email: contact@plomberiepro.ma*
@endcomponent
```

---

## SKILL: Generate a Service Class

```php
<?php
// app/Services/BookingService.php

namespace App\Services;

use App\Enums\BookingStatus;
use App\Jobs\SendBookingConfirmationJob;
use App\Jobs\SendStatusUpdateJob;
use App\Models\Booking;

class BookingService
{
    /**
     * Créer une nouvelle réservation.
     */
    public function create(array $data): Booking
    {
        $booking = Booking::create([
            ...$data,
            'status'            => BookingStatus::Pending->value,
            'confirmation_code' => $this->generateCode(),
        ]);

        // Enregistrer le changement de statut initial
        $this->logStatus($booking, BookingStatus::Pending, null, 'Réservation créée');

        // Envoyer l'email de confirmation (async via queue)
        SendBookingConfirmationJob::dispatch($booking);

        return $booking;
    }

    /**
     * Mettre à jour le statut d'une réservation.
     */
    public function updateStatus(
        Booking $booking,
        BookingStatus $newStatus,
        int $changedById,
        ?string $notes = null
    ): Booking {
        $oldStatus = $booking->status;

        $booking->update(['status' => $newStatus->value]);
        $this->logStatus($booking, $newStatus, $changedById, $notes);

        // Notifier le client si statut important
        if (in_array($newStatus, [BookingStatus::Confirmed, BookingStatus::Cancelled])) {
            SendStatusUpdateJob::dispatch($booking, $oldStatus, $newStatus);
        }

        return $booking->fresh();
    }

    /**
     * Assigner un technicien à une réservation.
     */
    public function assignTechnician(Booking $booking, int $technicianId): Booking
    {
        $booking->update(['technician_id' => $technicianId]);
        return $booking->fresh(['technician']);
    }

    /**
     * Générer un code de confirmation unique.
     */
    private function generateCode(): string
    {
        do {
            $code = 'PLB-' . strtoupper(substr(uniqid('', true), -6));
        } while (Booking::where('confirmation_code', $code)->exists());

        return $code;
    }

    /**
     * Enregistrer un changement de statut dans l'historique.
     */
    private function logStatus(
        Booking $booking,
        BookingStatus $status,
        ?int $changedBy = null,
        ?string $note = null
    ): void {
        $booking->statusLogs()->create([
            'status'     => $status->value,
            'changed_by' => $changedBy,
            'note'       => $note,
        ]);
    }
}
```

---

## SKILL: Generate a Policy

```php
<?php
// app/Policies/BookingPolicy.php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BookingPolicy
{
    /**
     * Voir une réservation.
     */
    public function view(User $user, Booking $booking): bool
    {
        if ($user->hasRole('admin')) return true;

        if ($user->hasRole('technician')) {
            return $booking->technician?->user_id === $user->id;
        }

        return $booking->client_email === $user->email;
    }

    /**
     * Modifier le statut d'une réservation.
     */
    public function updateStatus(User $user, Booking $booking): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Annuler une réservation (client ou admin).
     */
    public function cancel(User $user, Booking $booking): bool
    {
        if ($booking->status->value !== 'pending') return false;
        if ($user->hasRole('admin')) return true;
        return $booking->client_email === $user->email;
    }

    /**
     * Supprimer une réservation (admin seulement).
     */
    public function delete(User $user, Booking $booking): bool
    {
        return $user->hasRole('admin');
    }
}
```

---

## SKILL: Generate a Custom Validation Rule

```php
<?php
// app/Rules/NotSunday.php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NotSunday implements ValidationRule
{
    /**
     * Vérifier que la date n'est pas un dimanche.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (date('N', strtotime($value)) == 7) {
            $fail('Nous n\'intervenons pas le dimanche. Veuillez choisir un autre jour.');
        }
    }
}
```

---

## SKILL: Generate a Seeder

```php
<?php
// database/seeders/ServiceTypeSeeder.php

namespace Database\Seeders;

use App\Models\ServiceType;
use Illuminate\Database\Seeder;

class ServiceTypeSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name'             => 'Fuite d\'eau',
                'description'      => 'Détection et réparation de fuites sur canalisations, joints et robinetterie.',
                'duration_minutes' => 60,
                'icon'             => 'droplets',
                'is_active'        => true,
            ],
            [
                'name'             => 'Débouchage',
                'description'      => 'Débouchage de canalisations, évier, douche, WC et colonnes.',
                'duration_minutes' => 90,
                'icon'             => 'wrench',
                'is_active'        => true,
            ],
            [
                'name'             => 'Installation sanitaire',
                'description'      => 'Installation et remplacement de lavabo, douche, baignoire, WC.',
                'duration_minutes' => 120,
                'icon'             => 'zap',
                'is_active'        => true,
            ],
            [
                'name'             => 'Chauffe-eau',
                'description'      => 'Installation, réparation et entretien de chauffe-eau électrique ou solaire.',
                'duration_minutes' => 90,
                'icon'             => 'thermometer',
                'is_active'        => true,
            ],
            [
                'name'             => 'Robinetterie',
                'description'      => 'Réparation et remplacement de robinets, mitigeurs et accessoires.',
                'duration_minutes' => 45,
                'icon'             => 'wrench',
                'is_active'        => true,
            ],
            [
                'name'             => 'Détection de fuite',
                'description'      => 'Inspection professionnelle pour localiser les fuites cachées.',
                'duration_minutes' => 60,
                'icon'             => 'search',
                'is_active'        => true,
            ],
        ];

        foreach ($services as $service) {
            ServiceType::updateOrCreate(
                ['name' => $service['name']],
                $service
            );
        }
    }
}
```
