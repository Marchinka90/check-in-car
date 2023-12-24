
import { Link as ScrollLink } from 'react-scroll';
import { Carousel } from 'primereact/carousel';
import Section from '@/Components/Section';

export default function Services() {
  const products = [
    {
      name: 'Лек Автомобил',
      icon: 'directions_car',
      description: 'Осигурете безопасността и ефективността на вашия автомобил с нашия бърз и ефективен годишен преглед. Извършване на щателна проверка на основните компоненти ипредоставяне на доклад за спокойствие на пътя. Насрочете годишен преглед на вашия автомобил днес и шофирайте с увереност през цялата година.',
      image: 'car-resized.webp',
    },
    {
      name: 'Мотор',
      icon: 'motorcycle',
      description: 'Ние сме вашата дестинация за грижа на мотоциклети. С нашия опит, ние предлагаме бързи и надеждни годишни прегледи, за да гарантираме, че мотоциклетът ви е в отлично състояние. Карайте с увереност – изберете нас за благополучието на вашия мотоциклет. Насрочете своя годишен преглед на мотор днес и поддържайте мотора си в най-добра форма.',
      image: 'motor-resized.webp',
    },{
      name: 'Товарен автомобил',
      icon: 'local_shipping',
      description: 'Поддържайте безпроблемната работа на вашия камион с нашата годишна инспекция. Извършване на подробна проверка на критичните компоненти, за да се гарантира безопасност и надеждност. Получете изчерпателен отчет за вашето спокойствие на пътя. Планирайте годишната техническа проверка на вашия камион днес за надеждна работа през цялата година.',
      image: 'truck-resized.webp',
    },

  ];

  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3 bg-background-light h-full relative">
        <div className="mb-3">
          <img src={`./img/${product.image}`} alt={product.name} className="w-auto shadow-6 h-64 mx-auto" />
        </div>
        <div className='flex flex-wrap flex-col xl:h-80 justify-between items-center'>
          <h4 className="mb-1 flex text-primary font-montserrat text-xl font-bold justify-center"><span className="material-icons text-secondary mr-2">{product.icon}</span> {product.name}</h4>
          <p className='text-primary font-lato text-justify mx-3'>{product.description}</p>
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
    );
  };

  return (
    <>
      <Section id='services' className='bg-white pt-16'>
        <div className="lg:container">
          <h1 className="text-primary text-center font-montserrat text-3xl lg:py-14 lg:text-4xl">Видове технически прегледи</h1>
          <div className="card pt-12">
            <Carousel value={products} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular itemTemplate={productTemplate} />
        </div>
        </div>
      </Section>
      <style>{`
        .p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button {
          background-color: #575471;
        }
      `}</style>
    </>
  );
}