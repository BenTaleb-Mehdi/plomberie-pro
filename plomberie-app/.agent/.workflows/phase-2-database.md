# WORKFLOW: Phase 2 — Database Layer
# PlomberieDevAgent — Workflows Layer

---

## OBJECTIVE
Create all migrations, models, enums, factories, and seeders.
After this phase, the database is fully structured and populated with demo data.

---

## STEP 2.1 — Create Enum

```bash
php artisan make:enum Enums/BookingStatus
```

See `skills/laravel.md → Enum usage` for complete content.

---

## STEP 2.2 — Create Migrations (in order)

```bash
php artisan make:migration add_fields_to_users_table --table=users
php artisan make:migration create_service_types_table
php artisan make:migration create_technicians_table
php artisan make:migration create_bookings_table
php artisan make:migration create_booking_status_logs_table
php artisan make:migration create_interventions_table
php artisan make:migration create_contacts_table
```

See `skills/database.md` for complete migration content for each table.

---

## STEP 2.3 — Create Models

```bash
php artisan make:model ServiceType
php artisan make:model Technician
php artisan make:model Booking
php artisan make:model BookingStatusLog
php artisan make:model Intervention
php artisan make:model Contact
```

### ServiceType model
```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceType extends Model
{
    protected $fillable = ['name', 'description', 'duration_minutes', 'icon', 'is_active', 'sort_order'];

    protected $casts = ['is_active' => 'boolean'];

    public function scopeActive($q) { return $q->where('is_active', true)->orderBy('sort_order'); }

    public function bookings(): HasMany { return $this->hasMany(Booking::class); }
}
```

### Technician model
```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Technician extends Model
{
    protected $fillable = ['user_id', 'specialty', 'zone', 'bio', 'avatar', 'is_available'];

    protected $casts = ['is_available' => 'boolean'];

    public function user(): BelongsTo      { return $this->belongsTo(User::class); }
    public function bookings(): HasMany    { return $this->hasMany(Booking::class); }
    public function interventions(): HasMany { return $this->hasMany(Intervention::class); }

    public function scopeAvailable($q) { return $q->where('is_available', true); }
    public function scopeByZone($q, $z) { return $q->where('zone', $z); }
}
```

### Booking model — see `skills/laravel.md → Generate an Eloquent Model`

### BookingStatusLog model
```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingStatusLog extends Model
{
    public $timestamps = false;

    protected $fillable = ['booking_id', 'status', 'changed_by', 'note'];

    protected $casts = ['created_at' => 'datetime'];

    public function booking(): BelongsTo  { return $this->belongsTo(Booking::class); }
    public function changedBy(): BelongsTo { return $this->belongsTo(User::class, 'changed_by'); }
}
```

### Intervention model
```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Intervention extends Model
{
    protected $fillable = [
        'booking_id', 'technician_id', 'started_at', 'completed_at',
        'work_description', 'materials_used', 'photos', 'client_signature',
    ];

    protected $casts = [
        'started_at'       => 'datetime',
        'completed_at'     => 'datetime',
        'materials_used'   => 'array',
        'photos'           => 'array',
        'client_signature' => 'boolean',
    ];

    public function booking(): BelongsTo    { return $this->belongsTo(Booking::class); }
    public function technician(): BelongsTo { return $this->belongsTo(Technician::class); }
}
```

### Contact model
```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'subject', 'message', 'is_read', 'read_at'];

    protected $casts = [
        'is_read'  => 'boolean',
        'read_at'  => 'datetime',
    ];

    public function scopeUnread($q) { return $q->where('is_read', false); }
}
```

---

## STEP 2.4 — Create Custom Validation Rule

```bash
php artisan make:rule NotSunday
```

See `skills/laravel.md → Generate a Custom Validation Rule`.

---

## STEP 2.5 — Create Seeders

```bash
php artisan make:seeder RolesAndPermissionsSeeder
php artisan make:seeder ServiceTypeSeeder
php artisan make:seeder AdminUserSeeder
php artisan make:seeder TechnicianSeeder
php artisan make:seeder DemoBookingSeeder
```

### AdminUserSeeder
```php
<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@plomberiepro.ma'],
            [
                'name'              => 'Administrateur',
                'password'          => Hash::make('Admin@2025!'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('admin');
    }
}
```

### TechnicianSeeder
```php
<?php
namespace Database\Seeders;

use App\Models\Technician;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TechnicianSeeder extends Seeder
{
    public function run(): void
    {
        $technicians = [
            ['name' => 'Khalid Amrani', 'email' => 'khalid@plomberiepro.ma', 'specialty' => 'Fuite d\'eau', 'zone' => 'Tanger'],
            ['name' => 'Youssef Benali', 'email' => 'youssef@plomberiepro.ma', 'specialty' => 'Installation', 'zone' => 'Tétouan'],
            ['name' => 'Hassan Idrissi', 'email' => 'hassan@plomberiepro.ma', 'specialty' => 'Débouchage', 'zone' => 'Al Hoceïma'],
        ];

        foreach ($technicians as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name'              => $data['name'],
                    'password'          => Hash::make('Tech@2025!'),
                    'email_verified_at' => now(),
                ]
            );
            $user->assignRole('technician');

            Technician::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'specialty'    => $data['specialty'],
                    'zone'         => $data['zone'],
                    'is_available' => true,
                ]
            );
        }
    }
}
```

### DatabaseSeeder — call all seeders in order
```php
<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
            ServiceTypeSeeder::class,
            AdminUserSeeder::class,
            TechnicianSeeder::class,
            DemoBookingSeeder::class,
        ]);
    }
}
```

---

## STEP 2.6 — Run Migrations and Seed

```bash
# Lancer les migrations
php artisan migrate

# Lancer les seeders
php artisan db:seed

# Vérifier le résultat
php artisan tinker --execute="
    echo 'Users: ' . App\Models\User::count() . PHP_EOL;
    echo 'Services: ' . App\Models\ServiceType::count() . PHP_EOL;
    echo 'Bookings: ' . App\Models\Booking::count() . PHP_EOL;
"
```

---

## PHASE 2 CHECKLIST

- [ ] All 7 migrations created and ran without errors
- [ ] All 6 models created with correct fillable, casts, relationships, and scopes
- [ ] BookingStatus enum created with label() and color() methods
- [ ] NotSunday validation rule created and tested
- [ ] All 5 seeders created
- [ ] `php artisan db:seed` ran without errors
- [ ] Database has: 1 admin + 3 technicians + 6 service types + 15 demo bookings
- [ ] Admin login works: admin@plomberiepro.ma / Admin@2025!

**✅ Phase 2 complete — proceed to Phase 3 (Backend Controllers)**
