<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Preference;

class PreferencesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = [
            [
                'name' => 'reviewTime',
                'value' => '30',
                'description' => 'Продължителност на преглед на кола в минути'
            ],
            [
                'name' => 'regularDaysShiftStart',
                'value' => '8:00',
                'description' => 'Начало на работното време през седмицата'
            ],
            [
                'name' => 'regularDaysShiftEnd',
                'value' => '18:00',
                'description' => 'Край на работното време през седмицата'
            ],
            [
                'name' => 'saturdayShiftOn',
                'value' => 'Включен',
                'description' => 'Работен ден в събота'
            ],
            [
                'name' => 'saturdayShiftStart',
                'value' => '8:00',
                'description' => 'Начало на работното време в събота'
            ],
            [
                'name' => 'saturdayShiftEnd',
                'value' => '16:00',
                'description' => 'Край на работното време в събота'
            ],
        ];

        // Insert data into the 'preferences' table
        foreach ($data as $preference) {
            Preference::create([
                'name' => $preference['name'],
                'value' => $preference['value'],
                'description' => $preference['description'],
            ]);
        }
    }
}
