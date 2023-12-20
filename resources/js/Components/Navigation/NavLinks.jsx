import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

export default function NavLinks(props) {
  const [activeSection, setActiveSection] = useState(null);

  const classes = {
    listItem: `
    py-3 lg:mr-3
    `,
    scrollLink: `
    nav-link relative cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary focus:text-white active:text-white visited:text-white after:absolute after:w-0 after:left-0 after:bg-transparent after:hover:bg-secondary after:hover:transition-all after:hover:ease-in-out after:hover:duration-300 after:hover:w-full
    `,
    scrollLinkBtn: `cursor-pointer transition-all ease-in-out duration-300 text-white bg-secondary p-2 border-none lg:text-lg xl:text-xl rounded-2xl hover:text-primary hover:bg-white`
  }
  const handleSetActive = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <ul className='flex items-center sm:flex-col lg:flex-row '>
        <li className={classes.listItem}>
          <ScrollLink
            to='home'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            onClick={props.onCloseDrowerHandler}
            className={`${activeSection === 'home' ? 'nav-link-active' : ''} ${classes.scrollLink}`}
          >НАЧАЛО
          </ScrollLink>
        </li>
        <li className={classes.listItem}>
          <ScrollLink
            to='services'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            onClick={props.onCloseDrowerHandler}
            className={`${activeSection === 'services' ? 'nav-link-active' : ''} ${classes.scrollLink}`}
          >УСЛУГИ
          </ScrollLink>
        </li>
        <li className={classes.listItem}>
          <ScrollLink
            to='documents'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            onClick={props.onCloseDrowerHandler}
            className={`${activeSection === 'documents' ? 'nav-link-active' : ''} ${classes.scrollLink}`}
          >ДОКУМЕНТИ
          </ScrollLink>
        </li>
        <li className={classes.listItem}>
          <ScrollLink
            to='about-us'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            onClick={props.onCloseDrowerHandler}
            className={`${activeSection === 'about-us' ? 'nav-link-active' : ''} ${classes.scrollLink}`}
          >ЗА НАС
          </ScrollLink>
        </li>
        <li className={classes.listItem}>
          <ScrollLink
            to='contacts'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            onClick={props.onCloseDrowerHandler}
            className={`${activeSection === 'contacts' ? 'nav-link-active' : ''} ${classes.scrollLink}`}
          >КОНТАКТИ
          </ScrollLink>
        </li>

        <li className={`${classes.listItem} sm:inline-block lg:hidden`}>
          <ScrollLink
            to='reservation'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            onClick={props.onCloseDrowerHandler}
            className={`${activeSection === 'reservation' ? 'nav-link-active' : ''} ${classes.scrollLink}`}
          >ЗАПАЗИ ЧАС
          </ScrollLink>
        </li>
        <li className={`${classes.listItem} sm:hidden lg:inline-block`}>
          <ScrollLink
            to='reservation'
            smooth={true}
            duration={1000}
            spy={true}
            offset={-90}
            onSetActive={handleSetActive}
            className={classes.scrollLinkBtn}
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
        @media (max-width: 976px) {
          .nav-link:after {
            height: 0;
            background: transparent;
          }
        }
      `}</style>
    </>
  );
}