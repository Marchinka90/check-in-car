<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Request;
use Mews\Captcha\Captcha;
use Inertia\Inertia;
use Inertia\Response;
use Validator;
use App\Models\VehicleCategory;
use App\Models\Preference;
use App\Models\Holiday;
use App\Http\Requests\ContactUsRequest;
use App\Http\Controllers\MailController;

use SEOMeta;

class WebController extends Controller
{
  public function Welcome() {
    SEOMeta::setTitle('ВИТА 21 - Годишни Технически Прегледи Варна');
    SEOMeta::setDescription('Запазете час за годишния си технически преглед бързо и лесно. Предлагаме технически прегледи за всякакви автомобили на достъпни цени.');
    SEOMeta::setCanonical('https://vita21.bg');
    SEOMeta::addMeta('language', 'bg', 'name');
    SEOMeta::addMeta('Home', 'Начало', 'section');
    SEOMeta::addMeta('Reservation', 'Запази час', 'section');
    SEOMeta::addMeta('Services', 'Видове технически прегледи', 'section');
    SEOMeta::addMeta('Documents', 'Необходими документи', 'section');
    SEOMeta::addMeta('AboutUs', 'Кои сме ние', 'section');
    SEOMeta::addMeta('Contacts', 'Пишете ни', 'section');
    SEOMeta::addKeyword(['годишни технически прегледи', 'технически преглед', 'автосервиз', 'услуги за автомобили', 'варна', 'часове', 'автомобили', 'мотори', 'товарни автомобили', 'услуги', 'свидетелство за регистрация', 'МПС', 'превозното средство']);
    
    $preferences = Preference::select('name', 'value')->pluck('value', 'name');
    
    if ($preferences['saturdayShiftOn'] == 'Включен') {
        $preferences['saturdayShiftOn'] = 1;
    } else {
        $preferences['saturdayShiftOn'] = 0;
    }

    $vehicleCategories = VehicleCategory::all();
    $categories = [];
    $promoPrice = '51.00';

    foreach ($vehicleCategories as $vehicleCategory) {
      if ($vehicleCategory->id == 1) {
        $promoPrice = $vehicleCategory->price;
      }
      
      array_push($categories, (object)[
        'key' => $vehicleCategory->id,
        'label' => $vehicleCategory->name . ' - ' . $vehicleCategory->price . '.лв'
        ]
      );
    }

    $today = date('Y-m-d');
    $holidays = Holiday::select('id', 'holiday_date')->where('holiday_date', '>=', $today)->orderBy('holiday_date')->get();
    
    return Inertia::render('Welcome', [
      'categories' => $categories,
      'preferences' => $preferences,
      'holidays' => $holidays,
      'promoPrice' => $promoPrice
    ]);
  }


    public function contactUs(ContactUsRequest $request)
    {
      $data = $request->all();

      $mailController = new MailController();
      $result = $mailController->sendEmailFromContactUs($data);
      
      if (!$result) {
        return response()->json(['errors' => ['message' => ['Неуспешно изпращане на съобщението. Моля, опитайте по-късно']]], 404);
      }
      return response()->json(['status' => "success", 'data' => ['message' => 'Съобщението е изпратено успешно.']], 200);
    }
}
