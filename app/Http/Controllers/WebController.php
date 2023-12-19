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
use App\Http\Requests\BookingRequest;

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


    public function Test(Request $request)
    {
      
      return response()->json([
          'status' => "success",
          'data' => [
            "message" => "Success message"
          ]
      ], 200);


      return response()->json([
          'errors' => [
            'hours' => [
              'Няма свободни часове'
            ]
          ]
      ], 404);


      
  //   $rules = ['captcha' => 'required|captcha_api:'. request('key')];
  //   $date = date_create(request('selectedDate'));
  // //   $date = date_create('2023-12-15');
  //     return response()->json([
  //       'data' => $date,
  //   ]);
  //     // dd(request('key'));

  //   // $rules = ['captcha' => 'required|captcha_api:'. request('key') . ',default'];
  //   $validator = validator()->make(request()->all(), $rules);
  //   if ($validator->fails()) {
  //       return response()->json([
  //           'message' => 'invalid captcha',
  //       ]);

  //   } else {
  //     return response()->json([
  //         'message' => 'АЙде веееее',
  //       ]);
  //   }
        $data = $request->all();
        
        $rules = [
          'captcha' => 'required|captcha',
        ];
      
    $validator = Validator::make($data, $rules);
    if ($validator->passes()) {
        //TODO Handle your data
        dd('goood');
    } else {
        //TODO Handle your error
        dd($validator->errors()->all());
    }
      // $request->all()->validate([
      //   // Your validation rules, including captcha validation
      //   'captcha' => 'required|captcha',
      // ]);
      // return response()->json([
      //   'message' => 'cabuum baybe',
      // ]);
      
        $rules = ['captcha' => 'required|captcha'];
        $validator = validator()->make(request()->all(), $rules);
        if ($validator->fails()) {
          return response()->json([
            'message' => 'noooooo',
          ]);
        } else {
          return response()->json([
              'message' => 'cabuum baybe',
            ]);
          
        }

        // Handle form submission
    }
}
