<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use Illuminate\Support\Facades\Storage;
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
        $vehicles = Vehicle::orderBy('created_at')
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
        $validated = $request->validated();
        $vehicle = Vehicle::create($validated);

        // Check if a cover image has been uploaded.
        if (!empty($validated['cover_image'])) {
            // Create image and resize image down if necessary.
            $img = \Image::make($validated['cover_image'])
                ->resize(1000, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->encode('webp');
            $name = md5($img->__toString()) . '.webp';
            $path = "cover_images/$name";
            if (Storage::disk('public')->put($path, $img->__toString())) {
                $vehicle->cover_image = $path;
            }
        }

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
        $validated = $request->validated();
        $vehicle->update(array_merge($validated, ['is_approved' => 1]));

        // Check if a cover image has been uploaded.
        if (!empty($validated['coverImage'])) {
            // Retrieve old image and prepare for deletion.
            $old_image = $album->cover_image;

            // Create image and resize image down if necessary.
            $img = \Image::make($validated['cover_image'])
                ->resize(1000, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->encode('webp');
            $name = md5($img->__toString()) . '.webp';
            $path = "cover_images/$name";
            if (Storage::disk('public')->put($path, $img->__toString())) {
                $vehicle->cover_image = $path;
            }

            // Delete old cover image.
            Storage::disk('public')->delete($old_image);
        }

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
