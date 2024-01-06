<?php

namespace App\Http\Services;

use App\Models\Holiday;

class HolidayService
{
  public function createHoliday($date) 
  {
      $holiday = Holiday::create([
        'holiday_date' => $date,
      ]);

      return $holiday;
  }
}