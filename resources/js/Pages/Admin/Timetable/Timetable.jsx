import { useRef, useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Table from "@/Components/Table.jsx";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from '@/Components/Select';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabMenu } from 'primereact/tabmenu';
import { Tag } from 'primereact/tag';

let toastData;

export default function Timetable({ auth, date, dateSlots, startOfWeek, endOfWeek, weekSlots, status }) {
  const toast = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date(date));
  const [currentStartOfWeek, setCurrentStartOfWeek] = useState(startOfWeek);

  const [month, setMonth] = useState();
  const [dayOfWeek, setDayOfWeek] = useState();
  const [monthDate, setMonthDate] = useState();

  const { data, setData, post, processing, errors, reset } = useForm({
    date: '',
    startOfWeek: ''
  });

  const items = [
    { label: 'Седмица' },
    { label: 'Ден' },
  ];

  const months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
  const days = ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  // const firstDay = new Date(currentYear, currentMonth, 1);
  // const lastDay = new Date(currentYear, currentMonth + 1, 0);
  // const lastDayIndex = lastDay.getDay();
  // const lastDayDate = lastDay.getDate();
  // const prevLastDay = new Date(currentYear, currentMonth, 0);
  // const today = new Date();
  // const prevLastDayDate = prevLastDay.getDate();
  // const nextDays = 7 - lastDayIndex;

  useEffect(() => {
    console.log(currentDate);
    setDayOfWeek(currentDate.getDay());
    setMonthDate(currentDate.getDate());
    setMonth(`${months[currentMonth]} ${currentYear}`);

    if (data.date || data.startOfWeek) {
      submitData();
    }

  }, [data, currentDate, ]);

  const onSelectHandler = (data) => {
    console.log(data)
  };

  const showToast = (data) => {
    if (toast.current) {
      toast.current.show({ severity: data.severity, summary: data.summary, detail: data.detail });
    }
  };

  const headerTemplate = (data) => {
    return (
      <div className="flex align-items-center gap-2">
        <span className="font-bold text-secondary">{data.booking_date}</span>
      </div>
    );
  };

  const onPrevDateHandler = () => {
    let prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    const formattedDate = prevDate.toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' });
    setCurrentDate(prevDate);
    setData({ date: formattedDate, startOfWeek: '' });
  }
  
  const onNextDateHandler = () => {
    let nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const formattedDate = nextDate.toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' });
    setCurrentDate(nextDate);
    setData({ date: formattedDate, startOfWeek: '' });
  }
  
  const onPrevWeekHandler = () => {
    let prevWeek = new Date(currentStartOfWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    const formattedDate = prevWeek.toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' });
    setCurrentStartOfWeek(prevWeek);
    setCurrentDate(prevWeek);
    setData({ date: '', startOfWeek: formattedDate });
  }

  const onNextWeekHandler = () => {
    let nextWeek = new Date(currentStartOfWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const formattedDate = nextWeek.toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' });
    setCurrentStartOfWeek(nextWeek);
    setCurrentDate(nextWeek);
    setData({ date: '', startOfWeek: formattedDate });
  }


  const submitData = () => {
    post(route('timetable', data), {
      preserveScroll: true,
      onSuccess: () => {},
      onError: (er) => {
        Object.entries(er).forEach(([key, message]) => {
          toastData = { severity: 'error', summary: 'Грешка', detail: message };
          showToast(toastData);
        });
        return;
      },
    });
  }



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight text-primary">График</h2>}
    >
      <Head title="График" />

      <Toast ref={toast} />

      <div className="py-12 text-primary">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="card flex w-full justify-center">
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
          </div>
          {activeIndex == 1 && (
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              <div className='flex justify-end pb-5'>
                <div className="text-2xl">{days[dayOfWeek]}</div>
                <div className="text-2xl">
                  <span className='ml-2'>{monthDate} {month}</span>
                  <button className='mx-2 px-2 border text-secondary' onClick={onPrevDateHandler}><i className="pi pi-angle-double-left"></i></button>
                  <button className='ml-2 px-2 border text-secondary' onClick={onNextDateHandler}><i className="pi pi-angle-double-right"></i></button>
                </div>
              </div>
              {dateSlots.length > 0 &&
                <div className="card">
                  <DataTable value={dateSlots} selectionMode="single" onSelectionChange={(e) => onSelectHandler(e.value)} dataKey="key">
                    <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                    <Column field="booking_hour" header="Час"></Column>
                    <Column field="service" header="Услуга"></Column>
                    <Column field="customer.phone" header="Телефон"></Column>
                    <Column field="status" header="Статус"></Column>
                  </DataTable>
                </div>
              }
              {dateSlots.length == 0 &&
                <div className="card mt-5">
                  <h1 className="text-xl text-center">Няма запазени часове за тази дата</h1>
                </div>
              }
            </div>
          )}

          {activeIndex == 0 && (
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              <div className='flex justify-end pb-5'>
                <div className="text-2xl">{startOfWeek.slice(-2)} - {endOfWeek.slice(-2)} {month}</div>
                <button className='mx-2 px-2 border text-secondary' onClick={onPrevWeekHandler}><i className="pi pi-angle-double-left"></i></button>
                <button className='ml-2 px-2 border text-secondary' onClick={onNextWeekHandler}><i className="pi pi-angle-double-right"></i></button>
              </div>
              {weekSlots.length > 0 &&
                <div className="card">
                  <DataTable value={weekSlots} selectionMode="single" onSelectionChange={(e) => onSelectHandler(e.value)} dataKey="key"
                    rowGroupMode="subheader" groupRowsBy="booking_date" sortMode="single" sortField="booking_date"
                    sortOrder={1} scrollable scrollHeight="400px" rowGroupHeaderTemplate={headerTemplate} >
                    <Column header="Дата" headerStyle={{ width: '6rem' }}></Column>
                    <Column field="booking_hour" header="Час"></Column>
                    <Column field="service" header="Услуга"></Column>
                    <Column field="status" header="Статус"></Column>
                  </DataTable>
                </div>
              }
              {weekSlots.length == 0 &&
                <div className="card mt-5">
                  <h1 className="text-xl text-center">Няма запазени часове за тази седмица</h1>
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}