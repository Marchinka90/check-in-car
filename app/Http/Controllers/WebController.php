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

class WebController extends Controller
{
  public function Welcome() {
    $preferences = Preference::select('name', 'value')->pluck('value', 'name');
  
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

      return response()->json([
          'status' => "success",
          'data' => [
            "data" => $data
          ]
      ], 200);


      return response()->json([
          'errors' => [
            'hours' => [
              'Няма свободни часове'
            ]
          ]
      ], 404);

        
    }
}
