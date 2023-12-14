import { useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import PrivacyPolicy from '@/Components/Footer/PrivacyPolicy';

export default function StepThree(props) {
  const [visible, setVisible] = useState(false);
  // Specify the date format options
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateObj = props.selectedDate;
  // Convert the date to the specific format
  const formattedDate = dateObj.toLocaleDateString('bg-BG', options);
  useEffect(() => {
    // reload google captcha
  }, []);

  return (
    <>
      <div className="flex justify-around">
        <div className='text-primary font-lato tracking-wide leading-relaxed'>
          <p>Дата: <strong>{formattedDate}</strong></p>
          <p>Час: <strong>{props.selectedHour}</strong></p>
          <p>Регистрационен номер: <strong>{props.plateLicense}</strong></p>
          <p>Категория на автомобила: <strong>{props.vehicleCategory}</strong></p>
          <p>Име: <strong>{props.firstname}</strong></p>
          <p>Фамилия: <strong>{props.lastname}</strong></p>
          <p>Телефон: <strong>{props.phone}</strong></p>
          <p>Имейл: <strong>{props.email}</strong></p>
        </div>
        <div className='text-primary font-lato tracking-wide leading-relaxed'>
          <p>Google Capcha!!!</p>
          <div>
            <Checkbox onChange={e => props.setAgreedTerms(e.checked)} checked={props.agreedTerms}></Checkbox> Съгласявам се с
            <span> <button type='button' onClick={() => setVisible(true)} className='underline'> Условия за ползване</button></span>
            <PrivacyPolicy title='Условия за ползване' visible={visible} setVisible={setVisible} />
          </div>
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