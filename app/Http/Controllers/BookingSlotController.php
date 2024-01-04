<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Validator;
use App\Http\Services\CustomerService;
use App\Http\Services\BookingSlotService;
use App\Http\Requests\FreeBookingSlotsRequest;
use App\Http\Requests\BookingRequest;
use App\Http\Requests\AdminBookingRequest;
use App\Models\Preference;
use App\Models\BookingSlot;
use App\Models\Customer;
use App\Models\VehicleCategory;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class BookingSlotController extends Controller
{
    public function showAdminBookingForm()
    {
      $preferences = Preference::select('name', 'value')->pluck('value', 'name');

      if ($preferences['saturdayShiftOn'] == 'Включен') {
          $preferences['saturdayShiftOn'] = 1;
      } else {
          $preferences['saturdayShiftOn'] = 0;
      }

      $vehicleCategories = VehicleCategory::all();
      $services = [
        (object)[
          'key' => 0,
          'label' => '',
          'data' => '',
      ]];

      foreach ($vehicleCategories as $vehicleCategory) {
        array_push($services, (object)[
          'key' => $vehicleCategory->id,
          'label' => $vehicleCategory->name . ' - ' . $vehicleCategory->price . '.лв',
          'data' => $vehicleCategory->id
          ]
        );
      }
        return Inertia::render('Admin/BookingSlot', [
          'services' => $services,
          'preferences' => $preferences,
          'status' => session('status'),
      ]);
    }

    public function bookAppointment(BookingRequest $request)
    {
      $data = $request->all();      
      $bookingSlotService = new BookingSlotService();
      $isSlotFree = $bookingSlotService->isSlotFree($request->get('selectedDate'), $request->get('selectedHour'));

      if (!$isSlotFree) {
        return response()->json(['errors' => ['hours' => ['Този час вече е запазен, моля изберете друг час.']]], 404);
      }
      
      $customerService = new CustomerService();
      $isCustomerExist = $customerService->checkCustomer($data);
      
      DB::beginTransaction();

      try {
        if (!empty($isCustomerExist)) {
          $customer = $isCustomerExist;
        } else {
          $customer = $customerService->createCustomer($data, false);
        }
        
        $bookFreeSlot = $bookingSlotService->bookFreeSlot($data, $customer->id);

      } catch (\Throwable $th) {
        DB::rollBack();
        return response()->json(['errors' => ['hours' => ['Този час не може да бъде запазен в момента. Моля, опитайте по-късно.']]], 404);
      }

      
      if (!$bookFreeSlot) {
        DB::rollBack();
        return response()->json(['errors' => ['hours' => ['Този час не може да бъде запазен в момента. Моля, опитайте по-късно.']]], 404);
      }

      DB::commit();

      $mailController = new MailController();
      $sendMail = $mailController->sendEmailForBookingSlot($data);

      return response()->json(['status' => 'success', 'hours' => ['Успешно запазен час' ]], 200);

    }

    public function freeBookingSlots(FreeBookingSlotsRequest $request) 
    {
      $selectedDate = $request->get('selectedDate');
      $preferences = Preference::select('name', 'value')->pluck('value', 'name');
                                  
      $selectedDateCarbon = Carbon::createFromTimestamp(strtotime($selectedDate));
      
      if ($selectedDateCarbon->dayOfWeek == 6 && $preferences['saturdayShiftOn'] === '0') {
        return response()->json(['errors' => ['date' => ['Не може да запзвате часове в събота.']]], 404);
      }
      
      $bookingSlotService = new BookingSlotService();
      $result = $bookingSlotService->getAllFreeSlotsForDate($selectedDate, $preferences);  
      
      if (empty($result)) {
        return response()->json(['errors' => ['hours' => ['Няма свободни часове за тази дата. Моля, изберете друга дата.']]], 404);
      }

      return response()->json(['status' => 'success', 'data' => ['freeSlots' => $result]], 200);
    }

    public function adminBookingAppointment(AdminBookingRequest $request) 
    {
      $data = $request->all();      
      $bookingSlotService = new BookingSlotService();
      $isSlotFree = $bookingSlotService->isSlotFree($request->get('selectedDate'), $request->get('selectedHour'));

      if (!$isSlotFree) {
        return back()->withErrors('Този час вече е запазен, моля изберете друг час.');
      }
      
      $customerService = new CustomerService();
      $isCustomerExist = $customerService->adminCheckCustomer($data);

      DB::beginTransaction();

      try {
        if (!empty($isCustomerExist)) {
          $customer = $isCustomerExist;
        } else {
          $customer = $customerService->createCustomer($data, true);
        }
        
        $bookFreeSlot = $bookingSlotService->bookFreeSlot($data, $customer->id);

      } catch (\Throwable $th) {
        DB::rollBack();
        return back()->withErrors('Този час не може да бъде запазен в момента. Моля, опитайте по-късно.');
      }
      
      if (!$bookFreeSlot) {
        DB::rollBack();
        return back()->withErrors('Този час не може да бъде запазен в момента. Моля, опитайте по-късно.');
      }

      DB::commit();
      return back();
    }

    public function adminEditBookingAppointment(string $id)
    {
        $preferences = Preference::select('name', 'value')->pluck('value', 'name');

        if ($preferences['saturdayShiftOn'] == 'Включен') {
            $preferences['saturdayShiftOn'] = 1;
        } else {
            $preferences['saturdayShiftOn'] = 0;
        }

        $vehicleCategories = VehicleCategory::all();
        $services = [];

        foreach ($vehicleCategories as $vehicleCategory) {
          array_push($services, (object)[
            'key' => $vehicleCategory->id,
            'label' => $vehicleCategory->name . ' - ' . $vehicleCategory->price . '.лв',
            'data' => $vehicleCategory->id,
            'name' => $vehicleCategory->name
            ]
          );
        }

        $takenSlot = BookingSlot::select('id', 'booking_date', 'booking_hour', 'plate_license', 'service', 'status', 'customer_id')
                                ->with(['customer:id,firstname,lastname,email,phone'])
                                ->where('id', $id)
                                ->first(); 
        
        $dateSlot = $this->formatBookingSlot($takenSlot, $services);
                
        return Inertia::render('Admin/ChangeBookingSlot', [
          'services' => $services,
          'preferences' => $preferences,
          'takenSlot' => $dateSlot
      ]);
    }

    public function deleteBookingAppointment(string $id) 
    {
      $takenSlot = BookingSlot::where('id', $id)->first();
      
      if (!$takenSlot) {
        return back()->withErrors('Този запазен час не съществува в нашата база данни');
      }

      $customerId = $takenSlot->customer->id;

      $otherTakenSlots = BookingSlot::whereNotIn('id', [$id])
                                    ->where('customer_id', $customerId)
                                    ->get();
    
      $customer = Customer::where('id', $customerId)->first();
  
      if (empty($otherTakenSlots) || count($otherTakenSlots) == 0) {
        try {

          DB::transaction(function () use ($customerId) {
            // DB::listen(function ($query) {
            //   Log::info('Query: ' . $query->sql . ' | Parameters: ' . json_encode($query->bindings));
            // });
            $customer = Customer::where('id', $customerId)->first();

            if (!empty($customer)){
              $customer->booking_slots()->delete();
              $customer->delete();
            }
          });
        } catch (\Throwable $th) {
          
          return back()->withErrors('Този час не може да бъде изтрит в момента. Моля, опитайте по-късно.');
        }
      } else {
        DB::transaction(function () use ($takenSlot) {
          $takenSlot->delete();
        });
      }

      Session::flash('success', 'Запазеният час беше успешно изтрит.');
      return redirect()->route('timetable');
    }

    public function adminUpdateBookingAppointment (AdminBookingRequest $request) 
    {

    }

    private function formatBookingSlot($slot, $sevices) 
    {
        foreach ($sevices as $sevice) {
          if ($sevice->name === $slot->service) {
            $serviceKey = $sevice->key;
          }
        }
        
        $data = (object)[
          'key' => $slot->id,
          'booking_date' => date('d-m-Y', strtotime($slot->booking_date)),
          'booking_hour' => substr($slot->booking_hour, 0, 5),
          'plate_license' => $slot->plate_license,
          'service' => $serviceKey,
          'status' => $slot->status,
          'customer' => (object)[
              'firstname' => $slot->customer->firstname,
              'lastname' => $slot->customer->lastname,
              'email' => $slot->customer->email,
              'phone' => $slot->customer->phone,
              ]
          ];

        return $data;
    }
}
