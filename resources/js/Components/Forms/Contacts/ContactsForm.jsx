import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export default function ContactsForm() {
  const [contactUsTitle, setContactUsTitle] = useState('');
  const [contactUsEmail, setContactUsEmail] = useState('');
  const [contactUsDescription, setcontactUsDescription] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('contactUsTitle: ' + contactUsTitle);
    console.log('contactUsEmail: ' + contactUsEmail);
    console.log('contactUsDescription: ' + contactUsDescription);
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='mx-5'>
        <div className='flex flex-col mt-5'>
          <div className='w-full flex my-10'>
            <div className="p-float-label w-full mr-5">
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
          <Button label="Изпрати" />
        </div>
      </form>
    </>
  );
}