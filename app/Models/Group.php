<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Group extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
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
        'twitter',
        'fb_chat',
        'fb_group',
        'discord',
        'is_approved',
    ];
}
