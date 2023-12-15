import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { TreeSelect } from 'primereact/treeselect';
import Calendar from '@/Components/Calendar/Calendar';

export default function StepOne(props) {
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const categories = [
    {
      key: '1',
      label: 'Лек Автомобил',
      data: 'Лек Автомобил',
    },
    {
      key: '2',
      label: 'Лек Автомобил Джип /4x4/',
      data: 'Лек Автомобил Джип /4x4/',

    },
    {
      key: '3',
      label: 'Таксиметров автомобил',
      data: 'Таксиметров автомобил',
    },
    {
      key: '4',
      label: 'Мотоциклет',
      data: 'Мотоциклет',
    },
    {
      key: '5',
      label: 'Ремаркета до 750 кг.',
      data: 'Ремаркета до 750 кг.',
    },
    {
      key: '6',
      label: 'Товарен автомобил до 3.5 тона',
      data: 'Товарен автомобил до 3.5 тона',
    },
    {
      key: '7',
      label: 'Проверка на амортисьори (на ос)',
      data: 'Проверка на амортисьори (на ос)',
    },
  ];
  
  const setVehicleCategoryHandler = (e) => {
    props.setVehicleCategory(e.value)
    Object.entries(vehicleCategories).forEach(([key, category]) => {
      if (category.key == e.value) {
        props.formData.vehicleCategory = category.data;
      }
    });
  }

  useEffect(() => {
    // set categories from server database - do not fetch them 
    setVehicleCategories(categories);
  }, []);

  return (
      <div  className='flex'>
        <div className='w-1/2 mr-5'>
          <div className="p-float-label w-full">
            <InputText className='w-full' id="car-license-plate" value={props.plateLicense} onChange={(e) => props.setPlateLicense(e.target.value.trim())} required/>
            <label htmlFor="car-license-plate">Регистрационен номер на латиница (пр: В2345РА)</label>
          </div>

          <div className="card flex justify-content-center mt-10 w-full">
            <span className="p-float-label w-full">
              <TreeSelect inputId="vehicle-category" value={props.vehicleCategory} onChange={setVehicleCategoryHandler} options={vehicleCategories}
                className="md:w-20rem w-full"></TreeSelect>
              <label htmlFor="vehicle-type">Категория на автомобила</label>
            </span>
          </div>
        </div>

        <Calendar setSelectedDate={props.setSelectedDate} />
      </div>
  );
}