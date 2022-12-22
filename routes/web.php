<?php

use App\Http\Controllers\DesignerController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [IndexController::class, 'index']);

Route::resource('vehicles', VehicleController::class)->only(['index', 'store']);
Route::resource('designers', DesignerController::class)->only(['index', 'store']);
Route::resource('groups', GroupController::class)->only(['index', 'store']);

Route::get('/resources', fn () => Inertia::render('Public/Resources'));

Route::middleware(['auth.basic'])->group(function () {
    Route::resource('vehicles', VehicleController::class)->only(['update', 'destroy']);
    Route::patch('vehicles/{vehicle}/approve', [VehicleController::class, 'approve']);

    Route::resource('designers', DesignerController::class)->only(['update', 'destroy']);
    Route::patch('designers/{designer}/approve', [DesignerController::class, 'approve']);

    Route::resource('groups', GroupController::class)->only(['update', 'destroy']);
    Route::patch('groups/{group}/approve', [GroupController::class, 'approve']);
});

Route::prefix('master')->middleware(['auth.basic'])->group(function () {
    Route::get('/', function () {
        $audits = App\Models\MongoAudit::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Index', [
            'audits' => $audits,
        ]);
    });

    Route::get('/vehicles', [VehicleController::class, 'adminIndex']);
    Route::get('/designers', [DesignerController::class, 'adminIndex']);
    Route::get('/groups', [GroupController::class, 'adminIndex']);

    Route::get('/resources', fn () => Inertia::render('Admin/Resources'));
});
