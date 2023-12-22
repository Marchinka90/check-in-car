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
use App\Http\Requests\ContactUsRequest;
use App\Http\Controllers\MailController;

class WebController extends Controller
{
  public function Welcome() {
    $preferences = Preference::select('name', 'value')->pluck('value', 'name');

    if ($preferences['saturdayShiftOn'] == 'Включен') {
        $preferences['saturdayShiftOn'] = 1;
    } else {
        $preferences['saturdayShiftOn'] = 0;
    }

    $vehicleCategories = VehicleCategory::all();
    $categories = [];

    foreach ($vehicleCategories as $vehicleCategory) {
      array_push($categories, (object)[
        'key' => $vehicleCategory->id,
        'label' => $vehicleCategory->name . ' - ' . $vehicleCategory->price . '.лв'
        ]
      );
    }
    
    return Inertia::render('Welcome', [
      'categories' => $categories,
      'preferences' => $preferences,
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
