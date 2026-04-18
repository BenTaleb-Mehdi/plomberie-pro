<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceType extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'slug', 'description', 'duration_minutes', 'icon', 'is_active', 'sort_order', 'image_path'];

    protected $casts = ['is_active' => 'boolean'];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }

    public function scopeActive($q) { return $q->where('is_active', true)->orderBy('sort_order'); }

    public function bookings(): HasMany { return $this->hasMany(Booking::class); }
}
