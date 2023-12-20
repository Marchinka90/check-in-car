<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ContactUs;
use App\Mail\BookingSlot;
use Mail;

class MailController extends Controller
{
  public function sendEmailFromContactUs($data) {
    $mailData = [
      'title' => $data['title'],
      'email' => $data['email'],
      'description' => $data['description']
    ];
  
    try {
      Mail::to('vita21.bg@gmail.com')->send(new ContactUs($mailData));
      return true;
    } catch (\Throwable $e) {
      \Log::error('Contact us email sending failed: ' . $e->getMessage());
      
      return false;
    }
  }

  public function sendEmailForBookingSlot($data) { 
    $mailData = [
      'date' => $data['selectedDate'],
      'hour' => $data['selectedHour'],
      'email' => $data['email'],
    ];
  
    try {
      Mail::to($data['email'])->send(new BookingSlot($mailData));
      return true;
    } catch (\Throwable $e) {
      \Log::error('Booking slot email sending failed: ' . $e->getMessage());
      
      return false;
    }
  }
}