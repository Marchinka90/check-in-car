<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Http\Request;
use Mews\Captcha\Captcha;
use Inertia\Inertia;
use Inertia\Response;
use Validator;

class WebController extends Controller
{
    public function bookAppointment(Request $request)
    {

    //key is the one that you got from json response
    // fix validator
    $rules = ['captcha' => 'required|captcha_api:'. request('key')];
    $date = date_create(request('selectedDate'));
  //   $date = date_create('2023-12-15');
    return response()->json([
      'data' => $date,
  ]);
      // dd(request('key'));

    // $rules = ['captcha' => 'required|captcha_api:'. request('key') . ',default'];
    $validator = validator()->make(request()->all(), $rules);
    if ($validator->fails()) {
        return response()->json([
            'message' => 'invalid captcha',
        ]);

    } else {
      return response()->json([
          'message' => 'АЙде веееее',
        ]);
    }
















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
