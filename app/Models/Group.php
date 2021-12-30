<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'state',
        'country',
        'lng',
        'lat',
        'exclusivity',
        'notes',
        'instagram',
        'is_approved',
    ];
}
