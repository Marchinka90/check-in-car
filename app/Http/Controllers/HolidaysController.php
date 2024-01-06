<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\HolidaysRequest;
use App\Http\Services\HolidayService;
use App\Models\Holiday;
use App\Models\Preference;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class HolidaysController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $preferences = Preference::select('name', 'value')->pluck('value', 'name');

        if ($preferences['saturdayShiftOn'] == 'Включен') {
            $preferences['saturdayShiftOn'] = 1;
        } else {
            $preferences['saturdayShiftOn'] = 0;
        }

        $today = date('Y-m-d');
        $holidays = Holiday::select('id', 'holiday_date')->where('holiday_date', '>=', $today)->orderBy('holiday_date')->get();
        
        return Inertia::render('Admin/Holidays', [
            'preferences' => $preferences, 
            'holidays' => (object)$holidays,
            'success' => session()->get('success')
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
    public function store(HolidaysRequest $request)
    {
        $selectedDate = $request->get('selectedDate');
        $holidayDate = Carbon::createFromTimestamp(strtotime($selectedDate));
        $today = Carbon::now();
        $today->setTime(0, 0, 0, 0);

        if ($holidayDate->lt($today)) {
            return back()->withErrors('Почивния ден не може да бъде по-малък от днешния ден.');
        }

        $preferences = Preference::select('name', 'value')->where('name', 'saturdayShiftOn')->pluck('value', 'name');               
        
        if ($holidayDate->dayOfWeek == 6 && $preferences['saturdayShiftOn'] === 'Изключен') {
            return back()->withErrors('Почивния ден не може да бъде в Събота, когато настройката за работа в Събота е изключена.');
        }

        DB::beginTransaction();
    
        try {
            $holidayService = new HolidayService();
            $holiday = $holidayService->createHoliday(date('Y-m-d', strtotime($selectedDate)));

        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors('Този почивен ден не може да бъде създаден в момента. Моля, опитайте по-късно.');
        }

        if (!$holiday) {
            DB::rollBack();
            return back()->withErrors('Този почивен ден не може да бъде създаден в момента. Моля, опитайте по-късно.');
        }
    
        DB::commit();
        return back();
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $holiday = Holiday::where('id', $id)->first();
    
        if (!$holiday) {
            return back()->withErrors('Този почивен ден не съществува в системата');
        }
    
        try {
            DB::transaction(function () use ($holiday) {
                $holiday->delete();
            });

        } catch (\Throwable $th) {
            return back()->withErrors('Този час не може да бъде изтрит в момента. Моля, опитайте по-късно.');
        }

        Session::flash('success', 'Почивният ден беше успешно изтрит.');
        return redirect()->route('holidays');
    }
}
