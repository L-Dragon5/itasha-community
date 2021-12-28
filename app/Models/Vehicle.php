<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_type',
        'series',
        'character',
        'vehicle_information',
        'designer',
        'city',
        'state',
        'country',
        'instagram',
        'is_approved',
        'cover_image',
    ];

    protected static function booted() {
        static::deleting(function ($vehicle) {
            if ($vehicle->cover_image !== 'placeholder.webp') {
                Storage::disk('public')->delete($vehicle->cover_image);
            }
        });
  }
}
