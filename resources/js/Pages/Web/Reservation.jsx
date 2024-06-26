import { useState, useRef } from 'react';
import axios from 'axios';

import Section from '@/Components/Section';
import StepOne from '@/Components/Forms/MultistepForm/StepOne';
import StepTwo from '@/Components/Forms/MultistepForm/StepTwo';
import StepThree from '@/Components/Forms/MultistepForm/StepThree';
import BookingSlotSuccess from '@/Components/Forms/BookingSlotSuccess';

import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

let formData = {
  vehicleCategory: '',
  plateLicense: '',
  selectedDate: '',
  selectedHour: '',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  agreedTerms: '',
  captcha: '',
}

let toastData;

export default function Reservation(props) {
  const toast = useRef(null);

  const [isValidFirstStep, setIsValidFirstStep] = useState(false);
  const [isValidSecondStep, setIsValidSecondStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  // First step states
  const [vehicleCategory, setVehicleCategory] = useState(null);
  const [vehicleCategoryLabel, setVehicleCategoryLabel] = useState(null);
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
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaImage, setCaptchaImage] = useState();
  const [key, setKey] = useState();


  // Show success message 
  const [successMessage, setSuccessMessage] = useState(false);

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
    if (plateLicense === '' || plateLicense.length < 6) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето Регистрационен номер не може да бъде празно или по-малко от 6 символа' };
      setIsValidFirstStep(false);
      showToast(toastData);
      return false;
    }

    const regexSpaces = /\s/;

    if (regexSpaces.test(plateLicense)) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето Регистрационен не трябва да съдържа празни места' };
      setIsValidFirstStep(false);
      showToast(toastData);
      return false;
    }

    // const regexLattin = /^[A-Za-z0-9]+$/;

    // if (!regexLattin.test(plateLicense)) {
    //   toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето Регистрационен трябва да бъде попълнено на латиница' };
    //   setIsValidFirstStep(false);
    //   showToast(toastData);
    //   return false;
    // }

    if (!vehicleCategory || vehicleCategory < 1 || vehicleCategory > 7) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Не сте избрали Категория на автомобила' };
      setIsValidFirstStep(false);
      showToast(toastData);
      return false;
    }

    Object.entries(props.categories).forEach(([key, category]) => {
      if (category.key == vehicleCategory) {
        setVehicleCategoryLabel(category.label);
      }
    });

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
    const formattedDate = selectedDate.toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    formData = { ...formData, plateLicense, selectedDate: formattedDate };
    setIsValidFirstStep(true);
    return true;

  }

  const checkSecondStepDataHandler = () => {
    if (selectedHour === '') {
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
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Попълнете валиден имейл адрес' };
      setIsValidSecondStep(false);
      showToast(toastData);
      return false;
    }
    if (phone === '' || phone.length < 9 || phone.length > 9) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето за Телефон не може да бъде празно и трябва да е с дължина 9 цифри' };
      setIsValidSecondStep(false);
      showToast(toastData);
      return false;
    }
    formData = { ...formData, selectedHour, firstname, lastname, email, phone };
    setIsValidSecondStep(true);
    return true;
  }

  const handlePrevStep = () => {
    if (activeIndex > 1) {
      if (activeIndex == 2) {
        setSelectedDate(null);
      }
      setActiveIndex(activeIndex - 1);
    }
  };

  const refreshCaptcha = () => {
    setLoadingCaptcha(true);
    fetch('/captcha/api/default')
      .then(res => res.json())
      .then(data => {
        setCaptchaImage(data.img);
        setKey(data.key)
        setLoadingCaptcha(false);
      });
  };

  const renderStepContent = () => {
    switch (activeIndex) {
      case 1:
        return <StepOne
          formData={formData}
          preferences={props.preferences}
          holidays={props.holidays}
          plateLicense={plateLicense}
          setPlateLicense={setPlateLicense}
          categories={props.categories}
          vehicleCategory={vehicleCategory}
          setVehicleCategory={setVehicleCategory}
          setSelectedDate={setSelectedDate}
        />;
      case 2:
        return <StepTwo
          loading={loading}
          setLoading={setLoading}
          showToast={showToast}
          setActiveIndex={setActiveIndex}
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
          captcha={captcha}
          setCaptcha={setCaptcha}
          setKey={setKey}
          captchaImage={captchaImage}
          refreshCaptcha={refreshCaptcha}
          loadingCaptcha={loadingCaptcha}
          plateLicense={plateLicense}
          vehicleCategoryLabel={vehicleCategoryLabel}
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
    if (!captcha) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Моля попълнете символите от картинката' };
      showToast(toastData);
      return;
    }
    if (!agreedTerms) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'За да изпратите вашите данни трябва да се съгласите с Условията за ползване' };
      showToast(toastData);
      return;
    }

    if (isValidFirstStep && isValidSecondStep) {
      setLoading(true);
      formData = { ...formData, agreedTerms, captcha, key };

      axios.post('/api/book-appointment', formData)
      .then(res => {
        const data = res.data;
        setLoading(false);
        if (data.status === 'success') {
          setSuccessMessage(true);
        }
      })
      .catch(er => {
        setLoading(false);
        refreshCaptcha();
        let errorsObj = er.response.data.errors;

        Object.entries(errorsObj).forEach(([key, message]) => {
          toastData = { severity: 'error', summary: 'Грешка', detail: message[0] };
          showToast(toastData);
        });
      });
    }
  }

  const resetFormAndStepsDataHandler = () => {
    setSuccessMessage(false);

    formData = {
      vehicleCategory: '',
      plateLicense: '',
      selectedDate: '',
      selectedHour: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      agreedTerms: '',
      captcha: '',
    }

    setIsValidFirstStep(false);
    setIsValidSecondStep(false);

    setVehicleCategory(null);
    setPlateLicense('');
    setSelectedDate(null);

    setSelectedHour('');
    setFirstname('');
    setLastname('');
    setEmail('');
    setPhone('');

    setAgreedTerms(false);
    setCaptcha('');

    setActiveIndex(1);
  }

  return (
    <>
      <Toast ref={toast} />
      <Section id='reservation' className='bg-background-light pb-20'>
        <h1 className="text-primary text-center font-montserrat text-2xl sm:text-3xl py-10 lg:py-14 lg:text-4xl">Запази час</h1>
        <div className="lg:container">
          <Card>
            {!successMessage && <> <Steps model={steps} activeIndex={activeIndex - 1} readOnly={true} className='mb-16' />
              <form onSubmit={onSubmitHandler}>
                {renderStepContent()}
                <div className='flex justify-end mt-5 mr-2'>
                  <Button type="button" label="Назад" severity="secondary" className='mr-2' onClick={handlePrevStep} disabled={activeIndex === 1} />
                  {activeIndex < totalSteps && (<>
                    <Button type="button" label="Напред" onClick={handleNextStep} disabled={activeIndex === totalSteps} loading={loading} />
                  </>
                  )}
                  {activeIndex === totalSteps && <Button label="Изпрати" loading={loading} />}
                </div>
              </form>
            </>
            }
            {successMessage && <BookingSlotSuccess resetReservationForm={resetFormAndStepsDataHandler} />}
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
        @media (max-width: 480px) {
          .p-card .p-card-body {
            padding: 0;
          } 
          .p-float-label label {
            font-size: 0.9rem;
          }
          .p-button {
            font-size: 0.9rem;
            padding: 0.7rem
          }
        }
      `}</style>
    </>
  );
}