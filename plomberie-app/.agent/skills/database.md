# SKILL FILE: Database Schema
# PlomberieDevAgent — Skills Layer

---

## COMPLETE DATABASE SCHEMA

Run migrations in this exact order:

### Table 1 — users (extended from Breeze)
```php
// Migration: add_fields_to_users_table
Schema::table('users', function (Blueprint $table) {
    $table->string('phone', 20)->nullable()->after('email');
    $table->string('city', 100)->nullable()->after('phone');
    $table->string('address')->nullable()->after('city');
});
```

### Table 2 — service_types
```php
Schema::create('service_types', function (Blueprint $table) {
    $table->id();
    $table->string('name', 100);
    $table->text('description');
    $table->unsignedSmallInteger('duration_minutes')->default(60);
    $table->string('icon', 50)->default('wrench');
    $table->boolean('is_active')->default(true);
    $table->unsignedTinyInteger('sort_order')->default(0);
    $table->timestamps();

    $table->index('is_active');
});
```

### Table 3 — technicians
```php
Schema::create('technicians', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('specialty', 100)->nullable();
    $table->string('zone', 100)->nullable();
    $table->text('bio')->nullable();
    $table->string('avatar')->nullable();
    $table->boolean('is_available')->default(true);
    $table->timestamps();

    $table->index('is_available');
    $table->index('zone');
});
```

### Table 4 — bookings
```php
Schema::create('bookings', function (Blueprint $table) {
    $table->id();
    $table->string('confirmation_code', 20)->unique();
    $table->string('client_name', 100);
    $table->string('client_phone', 20);
    $table->string('client_email', 255);
    $table->text('client_address');
    $table->string('city', 100);
    $table->foreignId('service_type_id')->constrained()->restrictOnDelete();
    $table->foreignId('technician_id')->nullable()->constrained()->nullOnDelete();
    $table->date('booking_date');
    $table->time('booking_time');
    $table->enum('status', [
        'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'
    ])->default('pending');
    $table->text('notes')->nullable();
    $table->text('admin_notes')->nullable();
    $table->softDeletes();
    $table->timestamps();

    $table->index('status');
    $table->index('booking_date');
    $table->index('city');
    $table->index(['status', 'booking_date']);
});
```

### Table 5 — booking_status_logs
```php
Schema::create('booking_status_logs', function (Blueprint $table) {
    $table->id();
    $table->foreignId('booking_id')->constrained()->cascadeOnDelete();
    $table->string('status', 30);
    $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
    $table->text('note')->nullable();
    $table->timestamp('created_at')->useCurrent();

    $table->index('booking_id');
});
```

### Table 6 — interventions
```php
Schema::create('interventions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('booking_id')->unique()->constrained()->cascadeOnDelete();
    $table->foreignId('technician_id')->constrained()->restrictOnDelete();
    $table->timestamp('started_at')->nullable();
    $table->timestamp('completed_at')->nullable();
    $table->text('work_description')->nullable();
    $table->json('materials_used')->nullable();
    $table->json('photos')->nullable();
    $table->boolean('client_signature')->default(false);
    $table->timestamps();
});
```

### Table 7 — contacts
```php
Schema::create('contacts', function (Blueprint $table) {
    $table->id();
    $table->string('name', 100);
    $table->string('email', 255);
    $table->string('phone', 20)->nullable();
    $table->string('subject', 200);
    $table->text('message');
    $table->boolean('is_read')->default(false);
    $table->timestamp('read_at')->nullable();
    $table->timestamps();

    $table->index('is_read');
});
```

---

## ENTITY-RELATIONSHIP SUMMARY

```
users (1) ──────── (1) technicians
users (1) ──────── (∞) booking_status_logs [changed_by]

service_types (1) ─── (∞) bookings
technicians   (1) ─── (∞) bookings
technicians   (1) ─── (∞) interventions

bookings (1) ─── (∞) booking_status_logs
bookings (1) ─── (1) interventions
```

---

## QUERY PATTERNS (use in controllers/services)

```php
// Réservations du jour avec relations chargées
Booking::with(['serviceType', 'technician.user'])
    ->today()
    ->orderBy('booking_time')
    ->get();

// Réservations en attente paginées pour admin
Booking::with(['serviceType', 'technician.user'])
    ->pending()
    ->latest()
    ->paginate(20);

// Dashboard stats admin
$stats = [
    'today'       => Booking::today()->count(),
    'pending'     => Booking::pending()->count(),
    'confirmed'   => Booking::confirmed()->count(),
    'this_month'  => Booking::whereMonth('created_at', now()->month)->count(),
];

// Techniciens disponibles dans une zone
Technician::with('user')
    ->where('is_available', true)
    ->where('zone', $city)
    ->get();

// Réservations d'un client par email
Booking::with(['serviceType', 'technician.user', 'statusLogs'])
    ->where('client_email', $user->email)
    ->latest()
    ->paginate(10);
```

---

## FACTORY PATTERNS

```php
// database/factories/BookingFactory.php
class BookingFactory extends Factory
{
    public function definition(): array
    {
        $statuses = ['pending','confirmed','in_progress','completed','cancelled'];
        $times    = ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00'];
        $cities   = ['Tanger','Tétouan','Al Hoceïma','Larache','Chefchaouen'];

        return [
            'confirmation_code' => 'PLB-' . strtoupper($this->faker->unique()->lexify('??????')),
            'client_name'       => $this->faker->name(),
            'client_phone'      => '06' . $this->faker->numerify('########'),
            'client_email'      => $this->faker->unique()->safeEmail(),
            'client_address'    => $this->faker->streetAddress(),
            'city'              => $this->faker->randomElement($cities),
            'service_type_id'   => ServiceType::inRandomOrder()->first()?->id ?? 1,
            'booking_date'      => $this->faker->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'booking_time'      => $this->faker->randomElement($times),
            'status'            => $this->faker->randomElement($statuses),
            'notes'             => $this->faker->optional()->sentence(),
        ];
    }
}
```
