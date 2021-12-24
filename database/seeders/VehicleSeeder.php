<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('vehicles')->insert([
        [
          'vehicle_type' => 'car',
          'vehicle_information' => '2019 Honda Civic Type R',
          'series' => 'Symphogear',
          'character' => 'Maria Cadenzavna Eve & Tsubasa Kazanari',
          'city' => 'Rockville',
          'state' => 'Maryland',
          'country' => 'USA',
          'designer' => '',
          'instagram' => 'mochiwrapz',
          'is_approved' => true,
        ],
        [
          'vehicle_type' => 'car',
          'vehicle_information' => 'Subaru WRX',
          'series' => 'Fairy Tail',
          'character' => 'Erza Scarlet',
          'city' => 'Fairfax',
          'state' => 'Virginia',
          'country' => 'USA',
          'designer' => 'Unknown',
          'instagram' => 'deliciouswrx',
          'is_approved' => true,
        ],
        [
          'vehicle_type' => 'car',
          'vehicle_information' => 'Ford Fiesta ST',
          'series' => 'Bang Dream!',
          'character' => 'Raise A Suilen',
          'city' => 'Buffalo',
          'state' => 'New York',
          'country' => 'USA',
          'designer' => 'Xpresss Skins',
          'instagram' => 'gilgastorm',
          'is_approved' => true,
        ],
        [
          'vehicle_type' => 'car',
          'vehicle_information' => 'Hyundai Palisade',
          'series' => 'Ah My Goddess',
          'character' => 'Belldandy',
          'city' => '',
          'state' => 'Maryland',
          'country' => 'USA',
          'designer' => '',
          'instagram' => 'emmanuielpariel',
          'is_approved' => true,
        ],
        [
          'vehicle_type' => 'bicycle',
          'vehicle_information' => 'Trek',
          'series' => 'Love Live!',
          'character' => '',
          'city' => 'Los Angeles',
          'state' => 'California',
          'country' => 'USA',
          'designer' => '',
          'instagram' => '',
          'is_approved' => true,
        ],
        [
          'vehicle_type' => 'motorcycle',
          'vehicle_information' => 'CBR500',
          'series' => 'Akame Ga Kill',
          'character' => '',
          'city' => '',
          'state' => 'Alabama',
          'country' => 'USA',
          'designer' => '',
          'instagram' => '',
          'is_approved' => true,
        ],
        [
          'vehicle_type' => 'other',
          'vehicle_information' => 'Plane',
          'series' => 'Nier',
          'character' => '2B',
          'city' => '',
          'state' => 'North Carolina',
          'country' => 'USA',
          'designer' => '',
          'instagram' => '',
          'is_approved' => true,
        ],
      ]);
    }
}