<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\WebController;
use App\Http\Controllers\PreferencesController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\BookingSlotController;
use App\Http\Controllers\TimetableController;
use App\Http\Controllers\HolidaysController;

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

Route::get('/', [WebController::class, 'Welcome']);

// Route::get('/welcome', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::middleware('auth')->group(function () {
    /*
    | Profile Routes
    */
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    /*
    | Preferences Routes
    */
    Route::get('/preferences', [PreferencesController::class, 'index'])->name('preferences');
    Route::put('/preferences/update/{id}', [PreferencesController::class, 'update'])->name('preferences.update');
    /*
    | Services Routes
    */
    Route::get('/services', [ServicesController::class, 'index'])->name('services');
    Route::put('/services/update/{id}', [ServicesController::class, 'update'])->name('services.update');
    /*
    | Booking Slot Routes
    */
    Route::get('/booking-slot', [BookingSlotController::class, 'showAdminBookingForm'])->name('booking-slot');
    Route::post('/booking-slot/store', [BookingSlotController::class, 'adminBookingAppointment'])->name('booking-slot.store');
    Route::get('/booking-slot/edit/{id}', [BookingSlotController::class, 'adminEditBookingAppointment'])->name('booking-slot.edit');
    Route::post('/booking-slot/update', [BookingSlotController::class, 'adminUpdateBookingAppointment'])->name('booking-slot.update');
    Route::delete('/booking-slot/delete/{id}', [BookingSlotController::class, 'deleteBookingAppointment'])->name('booking-slot.destroy');
    /*
    | Timetable Routes
    */
    Route::get('/timetable', [TimetableController::class, 'index'])->name('timetable');
    Route::post('/timetable', [TimetableController::class, 'index'])->name('timetable.dates');
    /*
    | Timetable Routes
    */
    Route::get('/holidays', [HolidaysController::class, 'index'])->name('holidays');
    Route::post('/holidays/store', [HolidaysController::class, 'store'])->name('holidays.store');
    Route::delete('/holidays/delete/{id}', [HolidaysController::class, 'destroy'])->name('holidays.destroy');

    
});

require __DIR__.'/auth.php';
