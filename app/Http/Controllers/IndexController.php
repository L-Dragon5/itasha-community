<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\Group;
use App\Models\Designer;
use Inertia\Inertia;

class IndexController extends Controller
{
    /**
     * Display main page with Google Maps and markers of all.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $locations = [];
        $coordinatesList = [];

        $vehicles = Vehicle::where('is_approved', true)
            ->whereNotNull('lat')
            ->whereNotNull('lng')
            ->get();

        $groups = Group::where('is_approved', true)
            ->whereNotNull('lat')
            ->whereNotNull('lng')
            ->get();

        $designers = Designer::where('is_approved', true)
            ->whereNotNull('lat')
            ->whereNotNull('lng')
            ->get();

        foreach ($vehicles as $vehicle) {
            $this->checkIfDuplicateCoords($coordinatesList, $vehicle);
            $locations[] = array_merge(['type' => 'vehicle'], $vehicle->toArray());
        }

        foreach ($groups as $group) {
            $this->checkIfDuplicateCoords($coordinatesList, $group);
            $locations[] = array_merge(['type' => 'group'], $group->toArray());
        }

        foreach ($designers as $designer) {
            $this->checkIfDuplicateCoords($coordinatesList, $designer);
            $locations[] = array_merge(['type' => 'designer'], $designer->toArray());
        }

        return Inertia::render('Public/Index', [
            'locations' => $locations,
        ]);
    }

    private function checkIfDuplicateCoords(&$coords, &$model) {
        $valid = false;

        while (!$valid) {
            $check = "$model->lat,$model->lng";

            if (in_array($check, $coords)) {
                $model->lat += rand(-10, 10) / 1000;
                $model->lng += rand(-10, 10) / 1000;
                $model->save();
            } else {
                $coords[] = $check;
                $valid = true;
            }
        }
        
        return $valid;
    }
}
