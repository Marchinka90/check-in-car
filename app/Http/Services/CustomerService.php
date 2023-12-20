<?php

namespace App\Http\Services;

use App\Models\Customer;

class CustomerService
{
  public function checkCustomer($data) {
    $emal = $data['email'];

    return Customer::where('email', $emal)->first();
  }

  public function createCustomer($data) {
    $customer = Customer::create([
      'firstname' => $data['firstname'],
      'lastname' => $data['lastname'],
      'phone' => $data['phone'],
      'email' => $data['email'],
    ]);

    return $customer;
  }
}