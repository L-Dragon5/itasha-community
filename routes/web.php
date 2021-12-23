<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;

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
Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/designers', fn() => Inertia::render('Public/Designers'));
Route::get('/resources', fn() => Inertia::render('Public/Resources'));
