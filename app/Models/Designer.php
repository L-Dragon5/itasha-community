<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Designer extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
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
        'twitter',
        'is_approved',
    ];
    protected $attributes = [
        'is_approved' => false,
    ];
}
