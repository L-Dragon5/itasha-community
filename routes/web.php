<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\DesignerController;
use App\Http\Controllers\GroupController;

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

Route::get('/', fn() => Inertia::render('Public/Index'));

Route::resource('vehicles', VehicleController::class)->only(['index', 'store']);
Route::resource('designers', DesignerController::class)->only(['index', 'store']);
Route::resource('groups', GroupController::class)->only(['index', 'store']);

Route::get('/resources', fn() => Inertia::render('Public/Resources'));

Route::middleware(['auth.basic'])->group(function() {
    Route::resource('vehicles', VehicleController::class)->only(['update', 'destroy']);
    Route::resource('designers', DesignerController::class)->only(['update', 'destroy']);
    Route::resource('groups', GroupController::class)->only(['update', 'destroy']);
});

Route::prefix('master')->middleware(['auth.basic'])->group(function() {
    Route::get('/', fn() => Inertia::render('Admin/Index'));

    Route::get('/vehicles', [VehicleController::class, 'adminIndex']);
    Route::get('/designers', [DesignerController::class, 'adminIndex']);
    Route::get('/groups', [GroupController::class, 'adminIndex']);

    Route::get('/resouces', fn() => Inertia::render('Admin/Resources'));
});
