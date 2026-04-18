<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'main_image',
        'gallery',
        'category',
        'city',
        'intervention_date',
        'is_featured',
    ];

    protected $casts = [
        'gallery' => 'array',
        'is_featured' => 'boolean',
        'intervention_date' => 'date',
    ];

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
