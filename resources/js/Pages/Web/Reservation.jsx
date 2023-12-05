import { useState, useRef, useEffect } from 'react';
import Section from '@/Components/Section';
import Calendar from '@/Components/Calendar/Calendar';

import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import { InputText } from 'primereact/inputtext';
import { TreeSelect } from 'primereact/treeselect';
import { Button } from 'primereact/button';
import { CascadeSelect } from 'primereact/cascadeselect';
import { Toast } from 'primereact/toast'; // попъп за съобщения
import { InputMask } from 'primereact/inputmask';

export default function Reservation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [vehicleCategory, setVehicleCategory] = useState(null);
  const [plateLicense, setPlateLicense] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);

  const steps = [
    {
      label: 'Дата',
    },
    {
      label: 'Детайли',
    },
    {
      label: 'Потвърдете',
    },
  ];

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

  useEffect(() => {
    setVehicleCategories(categories);
  }, []);

  const checkFirstStepDataHandler = () => {
    console.log('active step: ' + (activeIndex + 1));
    console.log('selected Vehicle Category: ' + vehicleCategory);
    console.log('plate License: ' + plateLicense);
    console.log('selected Date: ' + selectedDate);
    
  }

  return (
    <>
      <Section id='reservation' className='bg-background-light pb-5'>
        <h1 className="text-primary text-4xl text-center font-montserrat py-14">Запази час</h1>
        <div className="container">
          <Card>
            <Steps model={steps} activeIndex={activeIndex} readOnly={true} className='mb-16' />
            <div id='step-1' className='flex'>
              <div className='w-1/2 mr-5'>
                <div className="p-float-label w-full">
                  <InputText className='w-full' id="car-license-plate" value={plateLicense} onChange={(e) => setPlateLicense(e.target.value)} />
                  <label htmlFor="car-license-plate">Регистрационен номер на латиница (пр: В2345РА)</label>
                </div>


                <div className="card flex justify-content-center mt-10 w-full">
                  <span className="p-float-label w-full">
                    <TreeSelect inputId="vehicle-category" value={vehicleCategory} onChange={(e) => setVehicleCategory(e.value)} options={vehicleCategories}
                      className="md:w-20rem w-full"></TreeSelect>
                    <label htmlFor="vehicle-type">Категория на автомобила</label>
                  </span>
                </div>
              </div>

              <Calendar setSelectedDate={setSelectedDate} />

            </div>
            <div className='flex justify-end mt-5'>
               <Button label="Назад" severity="secondary" className='mr-2' />
              <Button label="Напред" onClick={checkFirstStepDataHandler} />
            </div>
          </Card>
        </div>
      </Section>
      <style>{`
        .p-component {
          font-family: 'Lato', sans-serif;
        }
        .p-steps .p-steps-item .p-menuitem-link:not(.p-disabled):focus {
          box-shadow: none;
        }
        .p-steps .p-steps-item .p-menuitem-link .p-steps-number {
          background: #575471;
          color: white;
        }
        .p-steps .p-steps-item.p-highlight .p-steps-number {
          color: white;
          background: #FFA000;
        }
        .p-steps-title {
          color: #575471;
        }
        .p-button {
          margin-left: 10px;
          background: #676388;
          border-color: #676388;
          
        }
        .p-button:enabled:hover {
          background: #575471;
          border-color: #575471
        }
        .p-treeselect-header {
          display: none;
        }
      `}</style>
    </>
  );
}