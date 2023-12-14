import { useState, useRef, useEffect } from 'react';
import Section from '@/Components/Section';

import StepOne from '@/Components/Forms/MultistepForm/StepOne';
import StepTwo from '@/Components/Forms/MultistepForm/StepTwo';
import StepThree from '@/Components/Forms/MultistepForm/StepThree';

import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';

import { Toast } from 'primereact/toast'; // попъп за съобщения

export default function Reservation() {
  const toast = useRef(null);

  const [isValidFirstStep, setIsValidFirstStep] = useState(false);
  const [isValidSecondStep, setIsValidSecondStep] = useState(false);

  // First step states
  const [activeIndex, setActiveIndex] = useState(1);
  const [vehicleCategory, setVehicleCategory] = useState(null);
  const [plateLicense, setPlateLicense] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // Second step states
  const [selectedHour, setSelectedHour] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Third step states
  const [agreedTerms, setAgreedTerms] = useState(false);

  const totalSteps = 3;
  const steps = [
    { label: 'Дата' },
    { label: 'Детайли' },
    { label: 'Потвърдете' }
  ];

  const handleNextStep = () => {
    let isValid = false;
    if (activeIndex == 1) {
      isValid = checkFirstStepDataHandler();
    } else {
      isValid = checkSecondStepDataHandler();
    }

    if (activeIndex < totalSteps && isValid) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const checkFirstStepDataHandler = () => {
    let toastData;
    if (plateLicense === '' || plateLicense.length < 6) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето за Регистрационен номер не може да бъде празно или по-малко от 6 символа' };
      setIsValidFirstStep(false);
      showToast(toastData);
      return false;
    }
    if (!vehicleCategory || vehicleCategory < 1 || vehicleCategory > 7) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Не сте избрали Категория на автомобила' };
      setIsValidFirstStep(false);
      showToast(toastData);
      return false;
    }

    if (!selectedDate) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Не сте избрали дата' };
      setIsValidFirstStep(false);
      showToast(toastData);
      return false;
    }
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
  
    if (selectedDate.getTime() < today.getTime()) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Датата не може да бъде по-малка от днешната' };
      setIsValidFirstStep(false);
      showToast(toastData);
      return false;
    }
    setIsValidFirstStep(true);
    return true;

  }

  const checkSecondStepDataHandler = () => {
    let toastData;
    if (selectedHour === '' ) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Не сте избрали свободен час' };
      setIsValidSecondStep(false);
      showToast(toastData);
      return false;
    }

    if (firstname === '' || firstname.length < 3) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето за Име не може да бъде празно или по-малко от 3 символа' };
      setIsValidSecondStep(false);
      showToast(toastData);
      return false;
    }
    if (lastname === '' || lastname.length < 3) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето за Фамилия не може да бъде празно или по-малко от 3 символа' };
      setIsValidSecondStep(false);
      showToast(toastData);
      return false;
    }
    if (email === '' || !email.includes('@')) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Попълнете валиден емайл адрес' };
      setIsValidSecondStep(false);
      showToast(toastData);
      return false;
    }
    if (phone === '' || phone.length < 9 || phone.length > 9) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето за Телефон не може да бъде празно и трябва да е дължина 9 символа' };
      setIsValidSecondStep(false);
      showToast(toastData);
      return false;
    }

    setIsValidSecondStep(true);
    return true;
  }

  const handlePrevStep = () => {
    if (activeIndex > 1) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const renderStepContent = () => {
    switch (activeIndex) {
      case 1:
        return <StepOne
          plateLicense={plateLicense}
          setPlateLicense={setPlateLicense}
          vehicleCategory={vehicleCategory}
          setVehicleCategory={setVehicleCategory}
          setSelectedDate={setSelectedDate}
        />;
      case 2:
        return <StepTwo
          selectedDate={selectedDate}
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          firstname={firstname}
          setFirstname={setFirstname}
          lastname={lastname}
          setLastname={setLastname}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
        />;
      case 3:
        return <StepThree
          agreedTerms={agreedTerms}
          setAgreedTerms={setAgreedTerms}
          plateLicense={plateLicense}
          vehicleCategory={vehicleCategory}
          selectedDate={selectedDate}
          selectedHour={selectedHour}
          firstname={firstname}
          lastname={lastname}
          email={email}
          phone={phone}
        />;
      default:
        return null;
    }
  };

  const showToast = (data) => {
    if (toast.current) {
      toast.current.show({ severity: data.severity, summary: data.summary, detail: data.detail });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('plateLicense: ' + plateLicense);
    console.log('vehicleCategory: ' + vehicleCategory);
    console.log('selectedDate: ' + selectedDate);

    console.log('selectedHour: ' + selectedHour);
    console.log('firstname: ' + firstname);
    console.log('lastname: ' + lastname);
    console.log('email: ' + email);
    console.log('phone: ' + phone);
  }

  return (
    <>
      <Toast ref={toast} />
      <Section id='reservation' className='bg-background-light pb-20'>
        <h1 className="text-primary text-4xl text-center font-montserrat py-14">Запази час</h1>
        <div className="container">
          <Card>
            <Steps model={steps} activeIndex={activeIndex - 1} readOnly={true} className='mb-16' />
            <form onSubmit={onSubmitHandler}>
              {renderStepContent()}
              <div className='flex justify-end mt-5'>
                <Button type="button" label="Назад" severity="secondary" className='mr-2' onClick={handlePrevStep} disabled={activeIndex === 1} />
                {activeIndex < totalSteps && (<>
                  <Button type="button" label="Напред" onClick={handleNextStep} disabled={activeIndex === totalSteps} />
                </>
                )}
                {activeIndex === totalSteps && <Button label="Изпрати" />}
              </div>
            </form>
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
          box-shadow:none;
        }
        .p-button:enabled:hover {
          background: #575471;
          border-color: #575471
        }
        .p-button:enabled:focus {
          box-shadow:none;
          background: #575471;
        }
        .p-button.p-button-secondary:enabled:focus {
          box-shadow:none;
        }
        .p-treeselect-header {
          display: none;
        }
      `}</style>
    </>
  );
}