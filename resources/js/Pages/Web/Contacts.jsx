import Section from '@/Components/Section';
import OpenLayersMap from '@/Components/Map/Map';
import ContactsForm from '@/Components/Forms/Contacts/ContactsForm';
import { Card } from 'primereact/card';

export default function Contacts(props) {
  const preferences = props.preferences;
  return (
    <>
      <Section id='contacts' className='bg-white py-32'>
        <div className='bg-background-light'>
          <OpenLayersMap />
          <div className="container relative">
            <Card className='absolute bottom-12 left-12 w-[36%] flex justify-center flex-wrap'>
              <div className="text-primary text-center w-full w-[350px] flex justify-between flex-wrap tracking-wide leading-relaxed">
                <h1 className="w-full font-montserrat">Работно време:</h1>
                <p className="w-full flex justify-between font-lato"><span className="text-secondary">{preferences.regularDaysShiftStart} - {preferences.regularDaysShiftEnd}</span> Понеделник - Петък</p>
                {preferences.saturdayShiftOn == 1 && <p className="w-full flex justify-between font-lato"><span className="text-secondary">{preferences.saturdayShiftStart} - {preferences.saturdayShiftEnd}</span> Събота</p> }
              </div>
              <div className="flex justify-between pt-5">
                <div className="text-primary text-center tracking-wide leading-relaxed">
                  <h1 className="font-montserrat">Контакти:</h1>
                  <p className="font-lato">+359 894 843 555</p>
                  <p className="font-lato"><span className="text-secondary">vita21.bg</span>@gmail.com</p>
                </div>
                <div className="text-primary text-center tracking-wide leading-relaxed">
                  <h1 className="font-montserrat">Адрес:</h1>
                  <p className="font-lato"> <span className="text-secondary">ул. Атанас Москов 2A</span> <br />гр. Варна</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="container">
          <h1 className="text-primary text-4xl text-center font-montserrat mt-20">Пишете ни</h1>
          <ContactsForm />
        </div>
      </Section>
      <style>{`
      `}</style>
    </>
  );
}