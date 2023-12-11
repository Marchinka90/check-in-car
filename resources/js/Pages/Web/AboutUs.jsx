import { Image } from 'primereact/image';
import { Link as ScrollLink } from 'react-scroll';
import Section from '@/Components/Section';

export default function Documents() {

  return (
    <>
      <Section id='about-us' className='bg-background-light py-16'>
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="w-2/5 text-center">
              <Image src="./img/about-us.webp" alt="about-us" width="450"  preview />
            </div>
            <div className="w-3/5 flex flex-col items-center">
              <h1 className="text-primary text-4xl text-center font-montserrat mb-10">Кои сме ние</h1>
              <p className="text-primary font-lato text-justify text-xl tracking-wide leading-relaxed mb-3">Ние сме екип от отдадени професионалисти, ангажирани да гарантират безопасността и надеждността на вашите превозни средства. Със страст към съвършенството в автомобилите, нашите сертифицирани техници са специализирани в провеждането на задълбочени годишни прегледи на широк набор от автомобилни превозни средства. Нашата мисия е да предоставим ефективни и прозрачни услуги, които ви дават възможност да шофирате с увереност. Доверете ни се за всичките си нужди от проверка на превозни средства и усетете разликата в екипа, който поставя вашата безопасност на първо място.</p>
              <ScrollLink
                to='reservation'
                smooth={true}
                duration={1000}
                spy={true}
                offset={-90}
                className='w-64 text-center font-lato cursor-pointer transition-all ease-in-out duration-300 text-white bg-primary p-2 border-none text-lg rounded-2xl hover:text-white hover:bg-secondary'
              >Запази час
              </ScrollLink>
            </div>
          </div>
        </div>
      </Section>
      <style>{`
      `}</style>
    </>
  );
}