import { useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import PrivacyPolicy from '@/Components/Footer/PrivacyPolicy';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function StepThree(props) {
  const [visible, setVisible] = useState(false);
  
  // Specify the date format options
  const options = { timeZone: 'Europe/Sofia', year: 'numeric', month: 'long', day: 'numeric' };
  const dateObj = props.selectedDate;
  // Convert the date to the specific format
  const formattedDate = dateObj.toLocaleDateString('bg-BG', options);

  useEffect(() => {
    props.refreshCaptcha();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center w-full sm:flex-col lg:flex-row lg:justify-around">
        <div className='text-primary font-lato tracking-wide leading-relaxed mb-5 w-96 md:w-128'>
          <p>Дата: <strong>{formattedDate}</strong></p>
          <p>Час: <strong>{props.selectedHour}</strong></p>
          <p>Регистрационен номер: <strong>{props.plateLicense}</strong></p>
          <p>Категория на автомобила: <strong>{props.vehicleCategoryLabel}</strong></p>
          <p>Име: <strong>{props.firstname}</strong></p>
          <p>Фамилия: <strong>{props.lastname}</strong></p>
          <p>Телефон: <strong>{props.phone}</strong></p>
          <p>Имейл: <strong>{props.email}</strong></p>
        </div>
        <div className='text-primary font-lato tracking-wide leading-relaxed w-96 md:w-128'>
          <div className='bg-background-light p-2'>
            <div className="flex justify-content-center mb-2 ">
              <div className="w-48">
                <img src={props.captchaImage} alt="captchaImage" />
              </div>
              <Button type="button" className="text-xs" label="Презареди" icon="pi pi-refresh" onClick={props.refreshCaptcha} loading={props.loadingCaptcha} />
            </div>

            <div className="p-float-label mt-8 mb-3 w-full ">
              <InputText className='w-full' id="captcha" value={props.captcha} onChange={(e) => props.setCaptcha(e.target.value)} />
              <label htmlFor="captcha">Попълнете символите от картинката</label>
            </div>
          </div>
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