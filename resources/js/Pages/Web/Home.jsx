import Section from '@/Components/Section';

export default function Home(){
  return (
    <>
      <Section id='home' className='bg-primary pt-32' >
            {/* <div className="container w-full h-full relative bg-[url('/img/engine.jpg')] bg-cover	bg-no-repeat bg-left-top border-box "> */}
            <div className="container home-wrapper w-full h-full relative">
              {/* <div className='w-full h-full bg-gradient-to-r from-background-dark to-backgrount-dark-transperant opacity-50'></div> */}
              <h1 className="absolute text-white text-5xl text-left top-16 left-14 z-3 font-montserrat">Годишни Технически Прегледи</h1>
              <h2 className="absolute text-white text-3xl text-left top-40 left-14 z-3 font-montserrat">
                Онлайн часове на промо цена <span className='text-secondary'> 49.00 ЛВ</span>
              </h2>
            </div>
        </Section>
        <style>{`
          #home {
            height: 60vh;
          }
          .home-wrapper {
            background: linear-gradient(to right, rgba(87, 84, 113, 0.6) 10%, transparent), url(./img/engine.jpg) left 10% top 10%/cover no-repeat border-box, #54536f;
          }
      `}</style>
    </>
  );
}