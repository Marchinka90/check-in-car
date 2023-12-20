<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebController;
use App\Http\Controllers\BookingSlotController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Web Routes
Route::post('/free-booking-slots', [BookingSlotController::class, 'freeBookingSlots']);
Route::post('/book-appointment', [BookingSlotController::class, 'bookAppointment']);
Route::post('/contact-us', [WebController::class, 'contactUs']);