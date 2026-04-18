<?php
// app/Models/Booking.php

namespace App\Models;

use App\Enums\BookingStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    use SoftDeletes, HasFactory;

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
