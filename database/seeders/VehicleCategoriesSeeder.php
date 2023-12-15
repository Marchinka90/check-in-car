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
            'Лек Автомобил',
            'Лек Автомобил Джип /4x4/',
            'Таксиметров автомобил',
            'Мотоциклет',
            'Ремаркета до 750 кг.',
            'Товарен автомобил до 3.5 тона',
            'Проверка на амортисьори (на ос)',
        ];

        // Insert data into the 'vehicle_categories' table
        foreach ($data as $categoryData) {
            VehicleCategory::create([
                'label' => $categoryData
            ]);
        }
    }
}
