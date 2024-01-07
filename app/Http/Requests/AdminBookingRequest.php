<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'vehicleCategory' => 'required|numeric',
            'plateLicense' => 'required|string|min:6|regex:/^[\p{Cyrillic}0-9]+$/u',
            'selectedDate' => 'required|date_format:m/d/Y',
            'selectedHour' => 'required|string',
            'firstname' => 'required|string|min:3|regex:/^[\p{Cyrillic}0-9]+$/u',
            'lastname' => 'required|string|min:3|regex:/^[\p{Cyrillic}0-9]+$/u',
            'phone' => 'required|string|size:9',
            'email' => 'nullable|email',
            'status' => 'nullable|in:Запазен,Пропуснат,Отменен,Неуспешен,Завършен',
        ];
    }
}
