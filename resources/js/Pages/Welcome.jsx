import { Link, Head } from '@inertiajs/react';
import WebLayout from '@/Layouts/WebLayout';
import Home from './Web/Home';
import Reservation from './Web/Reservation';

export default function Welcome() {
  return (
    <>
      <Head title="Vita 21" />
      <WebLayout>        
        <Home />
        <Reservation /> 
        <div className='bg-white pt-96'>
            <div className="container ">
                <h1 className="home-title">Годишни Технически Прегледи</h1>
                <h2 className="home-subtitle">Онлайн часове на промо цена 
                  <span>49.00 ЛВ</span>
                  </h2>
            </div>
        </div>
        <div className='bg-white pt-96'>
            <div className="container ">
                <h1 className="home-title">Годишни Технически Прегледи</h1>
                <h2 className="home-subtitle">Онлайн часове на промо цена 
                  <span>49.00 ЛВ</span>
                  </h2>
            </div>
        </div>
        <div className='bg-white pt-96'>
            <div className="container ">
                <h1 className="home-title">Годишни Технически Прегледи</h1>
                <h2 className="home-subtitle">Онлайн часове на промо цена 
                  <span>49.00 ЛВ</span>
                  </h2>
            </div>
        </div>
        <div className='bg-secondary pt-96' id='services'>
            <div className="container ">
                <h1 className="home-title">Годишни Технически Прегледи</h1>
                <h2 className="home-subtitle">Онлайн часове на промо цена 
                  <span>49.00 ЛВ</span>
                  </h2>
            </div>
        </div>
        <div className='bg-white pt-96'>
            <div className="container ">
                <h1 className="home-title">Годишни Технически Прегледи</h1>
                <h2 className="home-subtitle">Онлайн часове на промо цена 
                  <span>49.00 ЛВ</span>
                  </h2>
            </div>
        </div>
        <div className='bg-white pt-96'>
            <div className="container ">
                <h1 className="home-title">Годишни Технически Прегледи</h1>
                <h2 className="home-subtitle">Онлайн часове на промо цена 
                  <span>49.00 ЛВ</span>
                  </h2>
            </div>
        </div>
        <div className='bg-white pt-96'>
            <div className="container ">
                <h1 className="home-title">Годишни Технически Прегледи</h1>
                <h2 className="home-subtitle">Онлайн часове на промо цена 
                  <span>49.00 ЛВ</span>
                  </h2>
            </div>
        </div>
    
        
      </WebLayout>
      <style>{`
        .bg-dots-darker {
            background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
        }
        @media (prefers-color-scheme: dark) {
            .dark\\:bg-dots-lighter {
                background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
            }
        }
      `}</style>
    </>
  );
}
