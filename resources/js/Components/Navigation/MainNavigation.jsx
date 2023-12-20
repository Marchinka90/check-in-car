import { useState } from 'react';
import { Link } from '@inertiajs/react';

import MainHeader from '@/Components/Navigation/MainHeader';
import NavLinks from '@/Components/Navigation/NavLinks';
import Backdrop from '@/Components/Navigation/Backdrop';
import SideDrawer from '@/Components/Navigation/SideDrawer';

export default function MainNavigation(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  }

  const closeDrowerHandler = () => {
    setDrawerIsOpen(false);
  }

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrowerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrowerHandler}>
        <nav className='h-full flex items-center justify-around text-primary text-lg pr-5'>
          <NavLinks onCloseDrowerHandler={closeDrowerHandler}/>
        </nav>
      </SideDrawer>
      <MainHeader>
        <div className='container flex items-center justify-between py-5 border-b-2 border-solid border-black'>
          {/* Button for small devices  */}
          <button className='w-12 h-12 bg-transparent	flex flex-col justify-around ml-8 cursor-pointer lg:hidden' onClick={openDrawerHandler}>
            <span className='block w-12 h-0.5	bg-white'/>
            <span className='block w-12 h-0.5	bg-white'/>
            <span className='block w-12 h-0.5	bg-white'/>
          </button>

          <article className='text-white text-3xl my-2.5 mx-2 pl-5 sm:mr-10 lg:mr-0'>
            <Link to='/'>ВИТА 21</Link>
          </article>

          <nav className='text-white text-lg pr-5 sm:hidden lg:block'>
            <NavLinks onCloseDrowerHandler={closeDrowerHandler}/>
          </nav>
        </div>
      </MainHeader>
      <style>{`
          
  
      `}</style>
    </>
  );
}