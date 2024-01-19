import Section from '@/Components/Section';

export default function Home(props){

  return (
    <>
      <Section id='home' className='bg-primary pt-32' >
            {/* <div className="container w-full h-full relative bg-[url('/img/engine.jpg')] bg-cover	bg-no-repeat bg-left-top border-box "> */}
            <div className="lg:container home-wrapper w-full h-full relative">
              {/* <div className='w-full h-full bg-gradient-to-r from-background-dark to-backgrount-dark-transperant opacity-50'></div> */}
              <h1 className="absolute text-white text-xl text-center left-2 top-16 z-3 font-montserrat sm:text-2xl md:text-3xl lg:text-5xl lg:text-left lg:top-16 lg:left-14">Годишни Технически Прегледи Варна</h1>
              <h2 className="absolute text-white text-lg text-center left-2 top-32 z-3 font-montserrat sm:text-xl md:text-2xl lg:text-3xl lg:text-left lg:top-40 lg:left-14">Онлайн часове на промо цена</h2>
              <h2 className="absolute text-white text-lg text-center left-2 top-40 z-3 font-montserrat sm:text-xl md:text-2xl lg:text-3xl lg:text-left lg:top-52 lg:left-14">на леки автомобили<span className='text-secondary text-2xl md:text-3xl lg:text-4xl'> {props.promoPrice} ЛВ</span></h2>
            </div>
        </Section>
        <style>{`
          #home {
            height: 26rem;
            text-shadow: 2px 2px #575471;
          }
          .home-wrapper {
            background: linear-gradient(to right, rgba(87, 84, 113, 0.6) 10%, transparent), url(./img/engine.webp) left 10% top 10%/cover no-repeat border-box, #54536f;
          }
          @media (min-width: 768px) {
            #home {
              height: 30rem;
            }
          }
          @media (min-width: 976px) {
            #home {
              height: 46rem;
            }
          }
      `}</style>
    </>
  );
}