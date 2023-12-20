import { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';

let toastData;

export default function StepTwo(props) {
  const [ freeHoursData, setFreeHoursData] = useState([]);

  const formattedDate = props.selectedDate.toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' });
  let formData = {
    selectedDate: formattedDate
  }
  
  useEffect(() => {
    props.setLoading(true);

    axios.post('/api/free-booking-slots', formData)
        .then(res => {
          props.setLoading(false);
          const data = res.data;
          if (data.status === 'success') {
            setFreeHoursData(data.data.freeSlots);
          } 
        })
        .catch(er => {
          props.setLoading(false);
          let errorsObj = er.response.data.errors;

          Object.entries(errorsObj).forEach(([key, message]) => {
            toastData = { severity: 'error', summary: 'Грешка', detail: message[0] };
            props.showToast(toastData);
            props.setActiveIndex(1);
          });
        });
        
  }, [props.selectedDate]);

  const selectHourHandler = (hour) => {
    let oldSelectedDate = document.getElementById('selected-hour');
    if (oldSelectedDate) {
      oldSelectedDate.id = '';
    }
    props.setSelectedHour(hour.target.innerHTML);
    hour.target.id = 'selected-hour';
  }

  let freeHoursHtml = [];
  if (!props.loading) {
    if (freeHoursData.length > 0) {
      for (let x = 0; x < freeHoursData.length; x++) {
        freeHoursHtml.push(<span
          key={x}
          onClick={selectHourHandler}
          className="cursor-pointer text-lg m-2 text-primary bg-white p-2 border-none text-xl rounded-2xl hover:text-white hover:bg-primary"
        >{freeHoursData[x]}
        </span>);
      }
    }
  }

  return (
    <>
      <div className='flex flex-wrap justify-around'>
        <div className='w-full bg-background-light flex flex-wrap justify-center'>
          <h2 className='block w-full text-center text-2xl my-5 font-montserrat text-primary'>Изберете свободен час</h2>
          {freeHoursHtml}
        </div>
        <div className='w-128 mt-10'>
          <div className="p-float-label w-full">
            <InputText className='w-full' id="firstname" value={props.firstname} onChange={(e) => props.setFirstname(e.target.value)} />
            <label htmlFor="firstname">Име</label>
          </div>
          <div className="p-float-label mt-10 w-full ">
            <InputText className='w-full' id="lastname" value={props.lastname} onChange={(e) => props.setLastname(e.target.value)} />
            <label htmlFor="lastname">Фамилия</label>
          </div>
        </div>
        <div className='w-128 mt-10'>
          <div className="p-float-label w-full">
            <InputText className='w-full' id="email" type="email" value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
            <label htmlFor="email">Имейл</label>
          </div>

          <div className=" p-inputgroup  mt-10 w-full flex-1">
            <span className='p-float-label'>
              <span className="p-inputgroup-addon">+359</span>
              <InputText className='w-full' id="phone" value={props.phone} onChange={(e) => props.setPhone(e.target.value)} />
              <label htmlFor="phone" className='ml-14'>Телефон</label>
            </span>
          </div>
        </div>
      </div>
      <style>{`
        #selected-hour {
          color: white;
          background: #FFA000;
        }
      `}</style>
    </>
  );
}