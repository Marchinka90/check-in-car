<?php

namespace App\Http\Services;

use App\Models\BookingSlot;
use App\Models\Preference;
use Carbon\Carbon;

class BookingSlotService
{
  public function getAllFreeSlotsForDate($selectedDate, $preferences) {
    $time = $preferences['reviewTime'];
    $selectedDateCarbon = Carbon::createFromTimestamp(strtotime($selectedDate));

    if ($selectedDateCarbon->dayOfWeek == 6 && $preferences['saturdayShiftOn'] === '1') {
      $start = $preferences['saturdayShiftStart'];
      $end = $preferences['saturdayShiftEnd'];
    } else {
      $start = $preferences['regularDaysShiftStart'];
      $end = $preferences['regularDaysShiftEnd'];
    }
    
    $shiftStarts = Carbon::createFromTimestamp(strtotime($selectedDate));
    list($startHour, $startMinutes) = explode(":", $start);
    $shiftStarts = $shiftStarts->setTime($startHour, $startMinutes);
    
    $shiftEnds = Carbon::createFromTimestamp(strtotime($selectedDate));
    list($endHour, $endMinutes) = explode(":", $end);
    $shiftEnds = $shiftEnds->setTime($endHour, $endMinutes);
    
    $freeSlots = [];
    $now = Carbon::now();

    $bookingDate = date('Y-m-d', strtotime($selectedDate));
    $takenSlots = BookingSlot::where('booking_date', $bookingDate)->get();

    while ($shiftStarts->lt($shiftEnds)) {

      $timeString = $shiftStarts->hour . ':' . ($shiftStarts->minute == '0'? '00' : $shiftStarts->minute);
      $isSlotFree = true;

      foreach ($takenSlots as $takenSlot) {
        list($takenHour, $takenMinutes, $takenSeconds) = explode(":", $takenSlot->booking_hour);
        $takenSlotTime = $takenHour . ':' . $takenMinutes;
      
        if ($takenSlotTime == $timeString) { $isSlotFree = false; }
      }

      if ($isSlotFree) { array_push($freeSlots, $timeString); }
      
      $shiftStarts->addMinutes($time);
    }
    return $freeSlots;
  }

  public function bookFreeSlot($data, $customer_id) {

    $bookSlot = BookingSlot::create([
      'booking_date' => date('Y-m-d', strtotime($data['selectedDate'])),
      'booking_hour' => $data['selectedHour'],
      'plate_license' => $data['plateLicense'],
      'customer_id' => $customer_id,
    ]);

    return $bookSlot;
  }

  public function isSlotFree($date, $hour) {
    $bookingDate = date('Y-m-d', strtotime($date));
    $takenSlot = BookingSlot::where('booking_date', $bookingDate)->where('booking_hour', $hour)->first();
    
    if (!empty($takenSlot)) {
      return false;
    }
    
    $preferences = Preference::select('name', 'value')->where('name', 'saturdayShiftOn')->pluck('value', 'name');
    $selectedDateCarbon = Carbon::createFromTimestamp(strtotime($date));                
      
    if ($selectedDateCarbon->dayOfWeek == 6 && $preferences['saturdayShiftOn'] === '0') {
      return false;
    }

    return true;
  }
}