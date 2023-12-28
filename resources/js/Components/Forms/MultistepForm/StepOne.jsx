import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { TreeSelect } from 'primereact/treeselect';
import Calendar from '@/Components/Calendar/Calendar';

export default function StepOne(props) {
  const [vehicleCategories, setVehicleCategories] = useState([]);
  
  const setVehicleCategoryHandler = (e) => {
    props.setVehicleCategory(e.value);
    props.formData.vehicleCategory = e.value;
  }

  useEffect(() => {
    // set categories from server database - do not fetch them 
    setVehicleCategories(props.categories);
  }, []);

  return (
      <div  className='flex flex-col-reverse lg:flex-row'>
        <div className='w-full mt-8 lg:w-1/2 lg:mr-5'>
          <div className="p-float-label w-full">
            <InputText className='w-full' id="car-license-plate" value={props.plateLicense} onChange={(e) => props.setPlateLicense(e.target.value.toUpperCase())} required/>
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

        <Calendar setSelectedDate={props.setSelectedDate} preferences={props.preferences}/>
      </div>
  );
}