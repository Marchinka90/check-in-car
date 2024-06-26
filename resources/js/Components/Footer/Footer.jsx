import React, { useState } from "react";
import { ScrollTop } from 'primereact/scrolltop';
import PrivacyPolicy from '@/Components/Footer/PrivacyPolicy';

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-primary w-full">
        <div className="container flex flex-col items-center h-30 lg:flex-row lg:justify-between  lg:px-10 lg:h-20">
          <p className="text-gray my-2 lg:my-0">© {year} ВИТА 21. All Rights Reserved.</p>
          <p className="flex flex-col lg:flex-row justify-center text-gray mr-12">
            <button className="my-2 lg:my-0 lg:my-0" onClick={() => setShowPrivacy(true)}>Политика за Поверителност</button>
            <span className="mx-2 hidden lg:inline-block">|</span>
            <button className="my-2 lg:my-0" onClick={() => setShowTerms(true)}>Условия за ползване</button>
            <PrivacyPolicy title='Политика за Поверителност' visible={showPrivacy} setVisible={setShowPrivacy}/>
            <PrivacyPolicy title='Условия за ползване' visible={showTerms} setVisible={setShowTerms}/>
          </p>
        </div>
        <ScrollTop id='back-to-top' />
      </footer>
      <style>{`
        #back-to-top {
          background-color: #FFA000; transition: 0.2s ease-out; color: #fff; font-size: 2.5rem; transition: 0.2s ease-out; border-radius: 0.5rem; padding: 0.25rem; text-decoration: none;
        }
        #back-to-top:hover,
        #back-to-top:focus {
          background-color: #cb8716; transform: translateY(-4px); box-shadow: none;
        }
        
      `}</style>
    </>
  );
}