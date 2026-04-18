<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Intervention extends Model
{
    use HasFactory;
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
