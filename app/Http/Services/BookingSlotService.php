<?php

namespace App\Http\Services;

use App\Models\BookingSlot;

use Carbon\Carbon;

class BookingSlotService
{
  public function getAllFreeSlotsForDate($selectedDate, $takenSlots, $preferences) {
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
    // this is format form UI = 12/18/2023 -> Y-m-d
   
    // dd(date('Y-m-d', strtotime($data['selectedDate'])));

    $bookSlot = BookingSlot::create([
      'booking_date' => date('Y-m-d', strtotime($data['selectedDate'])),
      'booking_hour' => $data['selectedHour'],
      'customer_id' => $customer_id,
      'vehicle_category_id' => $data['vehicleCategory']
    ]);

    return $bookSlot;
  }

  public function isSlotFree($date, $hour) {
    
  }
}