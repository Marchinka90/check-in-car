<?php

namespace App\Http\Services;

use App\Models\Customer;

class CustomerService
{
  public function checkCustomer($data) {
    $emal = $data['email'];

    return Customer::where('email', $emal)->first();
  }

  public function adminCheckCustomer($data) {
    $phone = $data['phone'];

    return Customer::where('phone', $phone)->first();
  }

  public function createCustomer($data, $isAdmin) {
    if ($isAdmin) {
      $customer = Customer::create([
        'firstname' => $data['firstname'],
        'lastname' => $data['lastname'],
        'phone' => $data['phone'],
      ]);
    } else {
      $customer = Customer::create([
        'firstname' => $data['firstname'],
        'lastname' => $data['lastname'],
        'phone' => $data['phone'],
        'email' => $data['email'],
      ]);
    }

    return $customer;
  }
}