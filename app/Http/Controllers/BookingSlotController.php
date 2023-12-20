<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use App\Http\Services\CustomerService;
use App\Http\Services\BookingSlotService;
use App\Http\Requests\FreeBookingSlotsRequest;
use App\Http\Requests\BookingRequest;
use App\Models\Preference;
use App\Models\BookingSlot;
use Carbon\Carbon;

class BookingSlotController extends Controller
{
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

      if (!empty($isCustomerExist)) {
        $customer = $isCustomerExist;
      } else {
        $customer = $customerService->createCustomer($data);
      }

      $bookFreeSlot = $bookingSlotService->bookFreeSlot($data, $customer->id);
      
      if (empty($bookFreeSlot)) {
        DB::rollBack();
        return response()->json(['errors' => ['hours' => ['Този час не може да бъде запазен в момента. Моля, опитайте по-късно.']]], 404);
      }

      DB::commit();

      $mailController = new MailController();
      $sendMail = $mailController->sendEmailForBookingSlot($data);

      return response()->json(['status' => 'success', 'data' => ['bookSlot' => $bookFreeSlot]], 200);

    }

    public function freeBookingSlots(FreeBookingSlotsRequest $request) {
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
}
