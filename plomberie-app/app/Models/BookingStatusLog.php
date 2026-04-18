<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingStatusLog extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = ['booking_id', 'status', 'changed_by', 'note'];

    protected $casts = ['created_at' => 'datetime'];

    public function booking(): BelongsTo  { return $this->belongsTo(Booking::class); }
    public function changedBy(): BelongsTo { return $this->belongsTo(User::class, 'changed_by'); }
}
