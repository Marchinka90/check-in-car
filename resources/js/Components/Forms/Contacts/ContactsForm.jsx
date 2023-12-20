import { useState, useEffect, useRef } from 'react';
import ContactUsSuccess from '@/Components/Forms/ContactUsSuccess';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';


let toastData;

export default function ContactsForm() {
  const toast = useRef(null);

  const [loading, setLoading] = useState(false);
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);
  const [contactUsTitle, setContactUsTitle] = useState('');
  const [contactUsEmail, setContactUsEmail] = useState('');
  const [contactUsDescription, setcontactUsDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaImage, setCaptchaImage] = useState();
  const [key, setKey] = useState();

  // Show success message 
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    refreshCaptcha();
  }, []);

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

  const showToast = (data) => {
    if (toast.current) {
      toast.current.show({ severity: data.severity, summary: data.summary, detail: data.detail });
    }
  };

  const onSubmitHandler = (e) => {
    if (contactUsTitle === '') {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето Заглавие не може да бъде празно' };
      showToast(toastData);
      return;
    }

    if (contactUsEmail === '' || !contactUsEmail.includes('@')) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Попълнете валиден емайл адрес' };
      showToast(toastData);
      return;
    }

    if (contactUsDescription === '') {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето Съобщение не може да бъде празно' };
      showToast(toastData);
      return;
    }

    setShowConfirmation(true);
  }

  const onConfirmationHandler = (e) => {
    e.preventDefault();

    let formData = {
      title: contactUsTitle.trim(),
      email: contactUsEmail.trim(),
      description: contactUsDescription.trim(),
      captcha: captcha,
      key: key
    }

    setLoading(true);

    axios.post('/api/contact-us', formData)
      .then(res => {
        const data = res.data;
        setShowConfirmation(false);
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
          console.log(message[0])
          toastData = { severity: 'error', summary: 'Грешка', detail: message[0] };
          showToast(toastData);
        });
      });
  }

  return (
    <>
      <Toast ref={toast} />
      {successMessage && <ContactUsSuccess />}
      {!successMessage && <form className='mx-5'>
        <div className='flex flex-col mt-5'>
          <div className='w-full flex my-10 sm:flex-col lg:flex-row'>
            <div className="p-float-label w-full sm:mb-10 lg:mb-0 lg:mr-2 ">
              <InputText className='w-full' id="contact-us-title" value={contactUsTitle} onChange={(e) => setContactUsTitle(e.target.value)} />
              <label htmlFor="contact-us-title">Заглавие</label>
            </div>

            <div className="p-float-label w-full">
              <InputText className='w-full' id="contact-us-email" value={contactUsEmail} onChange={(e) => setContactUsEmail(e.target.value)} />
              <label htmlFor="contact-us-email">Вашия имейл</label>
            </div>
          </div>

          <div className="card flex justify-content-center">
            <span className="p-float-label">
              <InputTextarea id="contact-us-description" autoResize value={contactUsDescription} onChange={(e) => setcontactUsDescription(e.target.value)} rows={5} cols={200} className='w-full' />
              <label htmlFor="contact-us-description">Съобщение</label>
            </span>
          </div>
        </div>
        <div className='flex justify-end mt-5'>
          <Button type="button" label="Изпрати" onClick={onSubmitHandler} />
        </div>
      </form>
      }

      <Dialog header={'Потвърдете, че не сте робот'} visible={showConfirmation} style={{ width: '30rem' }} onHide={() => setShowConfirmation(false)}>
        <div className='text-primary font-lato tracking-wide leading-relaxed w-96 items-center flex flex-col items-center'>
          <div className='bg-background-light p-2'>
            <div className="flex justify-content-center mb-2 ">
              <div className="w-48">
                <img src={captchaImage} alt="captchaImage" />
              </div>
              <Button type="button" className="text-xs" label="Презареди" icon="pi pi-refresh" onClick={refreshCaptcha} loading={loadingCaptcha} />
            </div>

            <div className="p-float-label mt-8 mb-3 w-full ">
              <InputText className='w-full' id="captcha" value={captcha} onChange={(e) => setCaptcha(e.target.value)} />
              <label htmlFor="captcha">Попълнете символите от картинката</label>
            </div>
          </div>
          <div className='flex justify-end mt-5'>
            <Button type="button" label="Потвърди" onClick={onConfirmationHandler} loading={loading} />
          </div>
        </div>
      </Dialog>
    </>
  );
}