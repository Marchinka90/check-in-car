import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';

export default function Footer() {
  const [visible, setVisible] = useState(false);

  return (
    <footer className="bg-primary w-full p-5">
      <div className="container flex justify-between">
        <p className="text-gray mt-5">© 2023 Vita 21 Creative. All Rights Reserved.</p>
        <p className="flex justify-content-center m-5 text-gray">
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
    </footer>
  );
}