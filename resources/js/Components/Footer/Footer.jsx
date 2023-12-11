import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { ScrollTop } from 'primereact/scrolltop';

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-primary w-full">
        <div className="container flex justify-between items-center px-10 h-20">
          <p className="text-gray">© {year} Vita 21 Creative. All Rights Reserved.</p>
          <p className="flex justify-center text-gray mr-12">
            <button onClick={() => setVisible(true)}>Правила на сайта</button>
            <span className="mx-2">|</span>
            <button onClick={() => setVisible(true)}> Условия за ползване </button>
            <Dialog header="Header" visible={visible} modal={false} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Dialog>
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