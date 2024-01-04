<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BookingSlot extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'booking_slots';

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['created_at', 'updated_at'];
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'booking_date',
        'booking_hour',
        'status',
        'plate_license',
        'service',
        'customer_id',
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'status' => 'Запазен', // booked(reserved), missed(not show up), canceled, failed(didn't passed), completed(passed)
    ];

    /**
     * Get the customer associated with the booking slot.
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
