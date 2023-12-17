<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('booking_slots', function (Blueprint $table) {
            $table->id();
            $table->date('booking_date');
            $table->time('booking_hour');
            $table->string('status');
            $table->unsignedBigInteger('customer_id'); // Foreign key
            $table->unsignedBigInteger('vehicle_category_id'); // Foreign key
            $table->timestamps();
        });

        // Define foreign key constraint
        Schema::table('booking_slots', function (Blueprint $table) {
            $table->foreign('customer_id')->references('id')->on('customers');
        });

        // Define foreign key constraint
        Schema::table('booking_slots', function (Blueprint $table) {
            $table->foreign('vehicle_category_id')->references('id')->on('vehicle_categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_slots');
        
    }
};
