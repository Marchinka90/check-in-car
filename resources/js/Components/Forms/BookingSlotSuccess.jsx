import { Button } from 'primereact/button';

export default function BookingSlotSuccess(props) {
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="block w-full text-center text-lg my-5 font-montserrat text-primary tracking-wide leading-relaxed mb-3 sm:mr-8">Успешно запазен час. Изпратихме имейл с детайли относно запазеня час. Очакваме ви!</h1>
      <Button type="button" label="Запазете друг час" severity="primary" onClick={props.resetReservationForm}/>
    </div>
  );
}