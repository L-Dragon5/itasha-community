<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;
use Jenssegers\Mongodb\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Vehicle extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
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
        'lng',
        'lat',
        'instagram',
        'twitter',
        'is_approved',
        'cover_image',
    ];
    protected $attributes = [
        'is_approved' => false,
    ];

    protected static function booted()
    {
        static::deleting(function ($vehicle) {
            if (!empty($vehicle->cover_image) && $vehicle->cover_image !== 'placeholder.webp') {
                Storage::delete($vehicle->cover_image);
            }
        });
    }
}
