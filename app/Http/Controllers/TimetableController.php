<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Models\Preference;
use App\Models\BookingSlot;
use App\Models\Customer;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class TimetableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = $request->all();
        if (empty($data)) {
            $date = Carbon::now();
            $searchDate = date('Y-m-d', $date->timestamp);
            
            $startOfWeek = date('Y-m-d', Carbon::now()->startOfWeek()->timestamp);
            $endOfWeek = date('Y-m-d', Carbon::now()->endOfWeek()->timestamp);
            
        } else {   
            if (!empty($data['date'])) {
                $date = Carbon::createFromTimestamp(strtotime($data['date']));
                $searchDate = date('Y-m-d', $date->timestamp); 
                $startOfWeek = date('Y-m-d', Carbon::createFromTimestamp(strtotime($data['date']))->startOfWeek()->timestamp);
                $endOfWeek = date('Y-m-d', Carbon::createFromTimestamp(strtotime($data['date']))->endOfWeek()->timestamp);
            } 

            if (!empty($data['startOfWeek'])) {
                $date = Carbon::createFromTimestamp(strtotime($data['startOfWeek']));
                $searchDate = date('Y-m-d', $date->timestamp);
                $startOfWeek = date('Y-m-d', Carbon::createFromTimestamp(strtotime($data['startOfWeek']))->startOfWeek()->timestamp);
                $endOfWeek = date('Y-m-d', Carbon::createFromTimestamp(strtotime($data['startOfWeek']))->endOfWeek()->timestamp);
            } 

        } 

        $takenSlots = BookingSlot::select('id', 'booking_date', 'booking_hour', 'plate_license', 'service', 'status', 'customer_id')
                                ->with(['customer:id,firstname,lastname,email,phone'])
                                ->where('booking_date', $searchDate)
                                ->orderBy('booking_hour')
                                ->get(); 

        $dateSlots = $this->formatBookingSlots($takenSlots);

        
        $takenSlotsWeek = BookingSlot::select('id', 'booking_date', 'booking_hour', 'plate_license', 'service', 'status', 'customer_id')
                                    ->with(['customer:id,firstname,lastname,email,phone'])
                                    ->whereBetween('booking_date', [$startOfWeek, $endOfWeek])
                                    ->orderBy('booking_date')
                                    ->orderBy('booking_hour')
                                    ->get(); 
        
        $weekSlots = $this->formatBookingSlots($takenSlotsWeek);
        
        return Inertia::render('Admin/Timetable/Timetable', [
            'date' => $searchDate,
            'dateSlots' => $dateSlots,
            'startOfWeek' => $startOfWeek,
            'endOfWeek' => $endOfWeek,
            'weekSlots' => $weekSlots
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $preference = Preference::find($id);
        if (empty($preference)) {
            return back()->withErrors('Няма такава настройка.');
        }

        if ($preference->value == $request->get('preferance_value')) {
            return back()->withErrors('Новата стойност трябва да бъде различна от старата');
        }

        $preference->value = $request->get('preferance_value');
        $preference->save();
        
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function formatBookingSlots($slots) 
    {
        $data = [];
        foreach ($slots as $slot) {
            $phoneNumber = preg_replace('/[^0-9]/', '', $slot->customer->phone);
            $formattedPhoneNumber = number_format($phoneNumber, 0, '', ' ');
            
            array_push($data, (object)[
                'key' => $slot->id,
                'booking_date' => date('d-m-Y', strtotime($slot->booking_date)),
                'booking_hour' => substr($slot->booking_hour, 0, 5),
                'plate_license' => $slot->plate_license,
                'service' => $slot->service,
                'status' => $slot->status,
                'customer' => (object)[
                    'name' => $slot->customer->firstname . ' ' . $slot->customer->lastname,
                    'email' => $slot->customer->email,
                    'phone' => '+359 ' . $formattedPhoneNumber,
                    ]
                ]
            );
        }
        return $data;
    }
}
