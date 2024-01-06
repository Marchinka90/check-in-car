<?php

namespace App\Http\Services;

use App\Models\BookingSlot;
use App\Models\VehicleCategory;
use App\Models\Preference;
use Carbon\Carbon;

class BookingSlotService
{
  public function getAllFreeSlotsForDate($selectedDate, $preferences) 
  {
    $time = $preferences['reviewTime'];
    $selectedDateCarbon = Carbon::createFromTimestamp(strtotime($selectedDate));

    if ($selectedDateCarbon->dayOfWeek == 6 && $preferences['saturdayShiftOn'] === 'Включен') {
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

      $timeString = ($shiftStarts->hour < '10'? '0'. $shiftStarts->hour : $shiftStarts->hour) . ':' . ($shiftStarts->minute == '0'? '00' : $shiftStarts->minute);
      $isSlotFree = true;

      foreach ($takenSlots as $takenSlot) {
        list($takenHour, $takenMinutes, $takenSeconds) = explode(":", $takenSlot->booking_hour);
        $takenSlotTime = $takenHour . ':' . $takenMinutes;
      
        if ($takenSlotTime == $timeString) { 
          $isSlotFree = false; 
        }
      }

      if ($isSlotFree) { array_push($freeSlots, $timeString); }
      
      $shiftStarts->addMinutes($time);
    }
    
    return $freeSlots;
  }

  public function bookFreeSlot($data, $customer_id) 
  {
    $service = VehicleCategory::where('id', $data['vehicleCategory'])->first();
    if (empty($service)) {
      return false;
    }

    $bookSlot = BookingSlot::create([
      'booking_date' => date('Y-m-d', strtotime($data['selectedDate'])),
      'booking_hour' => $data['selectedHour'],
      'plate_license' => $data['plateLicense'],
      'service' => $service->name,
      'customer_id' => $customer_id,
    ]);

    if (empty($bookSlot)) {
      return false;
    }

    return true;
  }

  public function isSlotFree($date, $hour, $id) 
  {
    $bookingDate = date('Y-m-d', strtotime($date));
    if (empty($id)){
      $takenSlot = BookingSlot::where('booking_date', $bookingDate)->where('booking_hour', $hour)->first();
    } else {
      $takenSlot = BookingSlot::where('booking_date', $bookingDate)
      ->where('booking_hour', $hour)
      ->whereNotIn('id', [$id])
      ->first();
    }
    
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

  public function updateBookingSlot($data) 
  {
    $service = VehicleCategory::where('id', $data['vehicleCategory'])->first();
    if (empty($service)) {
      return false;
    }

    $takenSlot = BookingSlot::where('id', $data['key'])->first();
    if(empty($takenSlot)) {
      return false;
    }

    $takenSlot->update([
      'booking_date' => date('Y-m-d', strtotime($data['selectedDate'])),
      'booking_hour' => $data['selectedHour'],
      'plate_license' => $data['plateLicense'],
      'service' => $service->name,
      'status' => $data['status'],
    ]);

    return true;
  }
}