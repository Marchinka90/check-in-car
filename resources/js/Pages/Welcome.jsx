import { Head } from '@inertiajs/react';
import WebLayout from '@/Layouts/WebLayout';
import Home from './Web/Home';
import Reservation from './Web/Reservation';
import Services from './Web/Services';
import Documents from './Web/Documents';
import AboutUs from './Web/AboutUs';
import Contacts from './Web/Contacts';

export default function Welcome({categories, preferences, holidays}) {

  return (
    <>
      <Head title="ВИТА 21" />
      <WebLayout>        
        <Home />
        <Reservation  categories={categories} preferences={preferences} holidays={holidays}/> 
        <Services /> 
        <Documents /> 
        <AboutUs /> 
        <Contacts preferences={preferences}/> 
      </WebLayout>
    </>
  );
}
