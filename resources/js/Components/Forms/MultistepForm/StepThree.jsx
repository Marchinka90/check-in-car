import { useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';

export default function StepThree(props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // reload google captcha
  }, []);

  return (
    <>
      <div className="flex justify-around">
        <div className='w-1/3 flex justify-between'>
          <div className='text-primary font-lato tracking-wide leading-relaxed'>
            <p>Дата и час:</p>
            <p>Регистрационен номер:</p>
            <p>Категория на автомобила:</p>
            <p>Име:</p>
            <p>Фамилия:</p>
            <p>Телефон:</p>
            <p>Имейл:</p>
          </div>
          <div className='text-primary font-lato tracking-wide leading-relaxed'>
            <p><strong>{props.selectedDate} {props.selectedHour}</strong></p>
            <p><strong>{props.plateLicense}</strong></p>
            <p><strong>{props.vehicleCategory}</strong></p>
            <p><strong>{props.firstname}</strong></p>
            <p><strong>{props.lastname}</strong></p>
            <p><strong>{props.phone}</strong></p>
            <p><strong>{props.email}</strong></p>
          </div>
        </div>
        <div className='text-primary font-lato tracking-wide leading-relaxed'>
          <p>Google Capcha!!!</p>
          <p>
            <Checkbox onChange={e => props.setAgreedTerms(e.checked)} checked={props.agreedTerms}></Checkbox> Съгласявам се с  
            <span> <button onClick={() => setVisible(true)} className='underline'> Условия за ползване</button></span>
            <Dialog header="Header" visible={visible} modal={false} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Dialog>
          </p>
        </div>
      </div>
      <style>{`
        .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box {
          border-color: #575471;
            outline: none;
            box-shadow: none;
        }
        .p-checkbox .p-checkbox-box.p-highlight,
        .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover {
          background: #575471;
          border: none;
        }
      `}</style>
    </>
  );
}