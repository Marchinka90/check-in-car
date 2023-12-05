import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

export default function NavLinks() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSetActive = (section) => {
    setActiveSection(section);
  };
  return (
    <>
      <ul className='flex justify-between'>
        <li className='mr-3'>
          <ScrollLink
            to='home'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            className={`${activeSection === 'home' ? 'nav-link-active' : ''} nav-link relative cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary  after:absolute after:w-0 after:left-0 after:bg-transparent after:hover:bg-secondary after:hover:transition-all after:hover:ease-in-out after:hover:duration-300 after:hover:w-full`}
          >НАЧАЛО
          </ScrollLink>
        </li>
        <li className='relative mr-3'>
          <ScrollLink
            to='services'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            className={`${activeSection === 'services' ? 'nav-link-active' : ''} nav-link relative cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary after:absolute after:w-0 after:left-0 after:bg-transparent after:hover:bg-secondary after:hover:transition-all after:hover:ease-in-out after:hover:duration-300 after:hover:w-full`}
          >УСЛУГИ
          </ScrollLink>
        </li>
        <li className='relative mr-3'>
          <ScrollLink
            to='documents'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            className={`${activeSection === 'documents' ? 'nav-link-active' : ''} nav-link relative cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary after:absolute after:w-0 after:left-0 after:bg-transparent after:hover:bg-secondary after:hover:transition-all after:hover:ease-in-out after:hover:duration-300 after:hover:w-full`}
          >ДОКУМЕНТИ
          </ScrollLink>
        </li>
        <li className='relative mr-3'>
          <ScrollLink
            to='about-us'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            className={`${activeSection === 'about-us' ? 'nav-link-active' : ''} nav-link relative cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary after:absolute after:w-0 after:left-0 after:bg-transparent after:hover:bg-secondary after:hover:transition-all after:hover:ease-in-out after:hover:duration-300 after:hover:w-full`}
          >ЗА НАС
          </ScrollLink>
        </li>
        <li className='relative mr-3'>
          <ScrollLink
            to='contacts'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            className={`${activeSection === 'contacts' ? 'nav-link-active' : ''} nav-link relative cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary after:absolute after:w-0 after:left-0 after:bg-transparent after:hover:bg-secondary after:hover:transition-all after:hover:ease-in-out after:hover:duration-300 after:hover:w-full`}
          >КОНТАКТИ
          </ScrollLink>
        </li>
        <li className='relative mr-3'>
          <ScrollLink
            to='reservation'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            className='cursor-pointer transition-all ease-in-out duration-300 text-white bg-secondary p-2 border-none text-xl rounded-2xl	shadow-2xl shadow-black hover:text-primary hover:bg-white'
          >Запази час
          </ScrollLink>
        </li>
      </ul>

      <style>{`
          .nav-link:after {
            bottom: -38.5px; height: 2px;
          }
          .nav-link-active {
            color: #FFA000; transition: all 0.25s ease-in-out 0s;
          }
      `}</style>
    </>
  );
}

// font-size: 1.1rem;
//     border: none;
//     padding: 10px;
//     border-radius: 20px;
//     box-shadow: 1px 1px 6px -2px black;
//     color: white;
//     background:  #FFA000;