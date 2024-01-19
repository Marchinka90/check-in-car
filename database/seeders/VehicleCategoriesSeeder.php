<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\VehicleCategory;

class VehicleCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = [
            [
                'name' => 'Лек Автомобил',
                'price' => '51.00'
            ],
            [
                'name' => 'Лек Автомобил Джип /4x4/',
                'price' => '51.00'
            ],
            [
                'name' => 'Таксиметров автомобил',
                'price' => '70.00'
            ],
            [
                'name' => 'Мотоциклет',
                'price' => '45.00'
            ],
            [
                'name' => 'Ремаркета до 750 кг.',
                'price' => '49.00'
            ],
            [
                'name' => 'Товарен автомобил до 3.5 тона',
                'price' => '65.00'
            ],
            [
                'name' => 'Проверка на амортисьори (на ос)',
                'price' => '20.00'
            ]
        ];

        // Insert data into the 'vehicle_categories' table
        foreach ($data as $categoryData) {
            VehicleCategory::create([
                'name' => $categoryData['name'],
                'price' => $categoryData['price'],
            ]);
        }
    }
}
