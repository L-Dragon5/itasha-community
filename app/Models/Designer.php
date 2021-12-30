<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Designer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'city',
        'state',
        'country',
        'lng',
        'lat',
        'website',
        'instagram',
        'is_approved',
    ];
}
