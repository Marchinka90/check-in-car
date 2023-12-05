import MainHeader from '@/Components/Navigation/MainHeader';
import NavLinks from '@/Components/Navigation/NavLinks';
import { Link } from '@inertiajs/react';

export default function MainNavigation(props) {
  return (
    <>
      <MainHeader>
        {/* Button for small devices */
        /* <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
            <span />
            <span />
            <span />
        </button> */}
        <div className='xl:container flex justify-between items-center py-5 border-b-2 border-solid	border-black'> 
          <article className='text-white text-3xl my-2.5 mx-2 pl-5'>
            <Link to='/'>ВИТА 21</Link>
          </article>
      
          <nav className='text-white text-lg pr-5'>
            <NavLinks />
          </nav> 
        </div>
      </MainHeader>
    </>
  );
}