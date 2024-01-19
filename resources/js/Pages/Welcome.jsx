import { Head } from '@inertiajs/react';
import WebLayout from '@/Layouts/WebLayout';
import Home from './Web/Home';
import Reservation from './Web/Reservation';
import Services from './Web/Services';
import Documents from './Web/Documents';
import AboutUs from './Web/AboutUs';
import Contacts from './Web/Contacts';

import { useState } from 'react';
// import { Dialog } from 'primereact/dialog';

export default function Welcome({ categories, preferences, holidays, promoPrice }) {
  // const [showDialog, setShowDialog] = useState(true);

  // let contentPolocy;

  // contentPolocy = (
  //   <div className="m-0 font-loto text-primary leading-8">
  //     <p className="mt-5">Здравейте,</p>
  //     <p className="mt-5">Благодарим ви, че се интересувате от vita21.bg!</p>
  //     <p className="mt-5">В момента нашето приложение е в пробен период. Работим усилено, за да направим възможно най-доброто приложение за запазване на годишни технически прегледи.</p>
  //     <p className="mt-5">Пълната версия на приложението ще пуснем много скоро. Междувременно, моля, разгледайте приложението и не се колебайте да се свържете с нас, ако имате въпроси или коментари.</p>
  //     <p className="mt-5">Благодарим ви за разбирането!</p>
  //     <p className="mt-5">Екипа на ВИТА 21</p>
  //   </div>
  // )

  return (
    <>      
      <WebLayout>
        <Home promoPrice={promoPrice}/>
        <Reservation categories={categories} preferences={preferences} holidays={holidays} />
        <Services />
        <Documents />
        <AboutUs />
        <Contacts preferences={preferences} />
        {/* <Dialog header="Инфорамационно съобщение" visible={showDialog} style={{ width: '85vw' }} onHide={() => setShowDialog(false)}>{contentPolocy}</Dialog> */}
      </WebLayout>

    </>
  );
}
