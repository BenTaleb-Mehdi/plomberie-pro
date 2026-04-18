<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Technician extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'specialty', 'zone', 'bio', 'avatar', 'is_available'];

    protected $casts = ['is_available' => 'boolean'];

    public function user(): BelongsTo      { return $this->belongsTo(User::class); }
    public function bookings(): HasMany    { return $this->hasMany(Booking::class); }
    public function interventions(): HasMany { return $this->hasMany(Intervention::class); }

    public function scopeAvailable($q) { return $q->where('is_available', true); }
    public function scopeByZone($q, $z) { return $q->where('zone', $z); }
}
