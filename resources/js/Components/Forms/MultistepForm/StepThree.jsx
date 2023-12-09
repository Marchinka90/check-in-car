import { useEffect } from 'react';
import { Divider } from 'primereact/divider';

export default function StepThree(props) {

  useEffect(() => {
    // reload google captcha
  }, []);

  return (
    <>
       <div className="">
            <p> <strong>Регистрационен номер</strong> {props.plateLicense}</p> 
           <br />
            <p> <strong>Категория на автомобила</strong> {props.plateLicense}</p>
          
            
        </div>
      <style>{`
        
      `}</style>
    </>
  );
}