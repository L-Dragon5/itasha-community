<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use Inertia\Inertia;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehicles = Vehicle::where('is_approved', true)
            ->orderBy('vehicle_type')
            ->orderBy('series')
            ->orderBy('character')
            ->get();

        return Inertia::render('Public/Vehicles', [
            'vehicles' => $vehicles,
        ]);
    }

    /**
     * Display a listing of the resource on admin page.
     * 
     * @return \Illuminate\Http\Response
     */
    public function adminIndex()
    {
        $vehicles = Vehicle::where('is_approved', false)
            ->orderBy('created_at')
            ->get();

        return Inertia::render('Admin/Vehicles', [
            'vehicles' => $vehicles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreVehicleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVehicleRequest $request)
    {
        $vehicle = Vehicle::create($request->validated());

        return redirect()->back()->with('success', 'Successfully submitted vehicle');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function show(Vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateVehicleRequest  $request
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        $vehicle->update(array_merge($request->validated(), ['is_approved' => 1]));

        return redirect()->back()->with('success', 'Successfully approved vehicle');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return redirect()->back()->with('success', 'Successfully deleted vehicle');
    }
}
