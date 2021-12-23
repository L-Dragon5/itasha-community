<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];
}
