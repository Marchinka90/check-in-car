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

export default function Timetable({ auth, date, dateSlots, startOfWeek, endOfWeek, weekSlots, success }) {
  const toast = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date(date));
  const [currentStartOfWeek, setCurrentStartOfWeek] = useState(startOfWeek);

  const [showSuccess, setShowSuccess] = useState(success);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    booking_date: '',
    booking_hour: '',
    plate_license: '',
    service: '',
    status: '',
    customer: {
      firstname: '',
      lastname: '',
      phone: '',
      email: ''
    },
  });

  const [timetableData, setTimetableData] = useState({
    date: '',
    startOfWeek: '',
  });

  const [month, setMonth] = useState();
  const [dayOfWeek, setDayOfWeek] = useState();
  const [monthDate, setMonthDate] = useState();

  const { data, setData, get, post, processing, errors, reset } = useForm({});

  const items = [
    { label: 'Седмица' },
    { label: 'Ден' },
  ];

  const months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
  const days = ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  

  useEffect(() => {
    if (showSuccess) {
      toastData = { severity: 'success', summary: 'Успех', detail: showSuccess, life: 3000 };
      showToast(toastData);
      setShowSuccess(false);
    }

    setDayOfWeek(currentDate.getDay());
    setMonthDate(currentDate.getDate());
    setMonth(`${months[currentMonth]} ${currentYear}`);

    if (timetableData.date || timetableData.startOfWeek) {
      submitData();
    }

  }, [timetableData, currentDate]);

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
    const formattedDate = prevDate.toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    setCurrentDate(prevDate);
    setTimetableData({ date: '', startOfWeek: formattedDate });
  }

  const onNextDateHandler = () => {
    let nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const formattedDate = nextDate.toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    setCurrentDate(nextDate);
    setTimetableData({ date: '', startOfWeek: formattedDate });
    
  }

  const onPrevWeekHandler = () => {
    let prevWeek = new Date(currentStartOfWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);
    const formattedDate = prevWeek.toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    setCurrentStartOfWeek(prevWeek);
    setCurrentDate(prevWeek);
    setTimetableData({ date: '', startOfWeek: formattedDate });
  }

  const onNextWeekHandler = () => {
    let nextWeek = new Date(currentStartOfWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const formattedDate = nextWeek.toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    setCurrentStartOfWeek(nextWeek);
    setCurrentDate(nextWeek);
    setTimetableData({ date: '', startOfWeek: formattedDate });
  }

  const submitData = () => {
    post(route('timetable', timetableData), {
      preserveScroll: true,
      onSuccess: () => { },
      onError: (er) => {
        Object.entries(er).forEach(([key, message]) => {
          toastData = { severity: 'error', summary: 'Грешка', detail: message };
          showToast(toastData);
        });
        return;
      },
    });
  }

  const onSelectHandler = (row) => {
    // Specify the date format options
    const options = { timeZone: 'Europe/Sofia', year: 'numeric', month: 'long', day: 'numeric' };
    const [selectedDate, currentMonth, currentYear] = row.booking_date.split('-');
    let dateObj = new Date(currentYear, currentMonth, selectedDate);
    // Convert the date to the specific format
    const formattedDate = dateObj.toLocaleDateString('bg-BG', options);

    const numericPhoneNumber = '+359' + row.customer.phone.replace(/\D/g, '');
    const formattedPhoneNumber = numericPhoneNumber.replace(/(\d{1,3})/g, '$1 ').trim();

    let selectedRowData = { ...row, booking_date: formattedDate, phone: formattedPhoneNumber }
    setModalData(selectedRowData);
    setShowModal(true);
  };

  const changeSlotHandler = () => {
    get(route('booking-slot.edit', modalData.key), {
      preserveScroll: true,
      onSuccess: () => { },
      onError: (er) => {
        Object.entries(er).forEach(([key, message]) => {
          toastData = { severity: 'error', summary: 'Грешка', detail: message };
          showToast(toastData);
        });
      },
      onFinish: () => {
        closeModal()
      },
    });
  };

  const closeModal = () => {
    setShowModal(false);
    // reset();
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight text-primary">График</h2>}
    >
      <Head title="График" />

      <Toast ref={toast} />

      <div className="py-12 text-primary">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="card flex w-full justify-end">
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

      <Modal show={showModal} onClose={closeModal}>
        <div className="p-6 bg-background-light">
          <h2 className="text-lg font-medium pt-6">
            Информация за часа
          </h2>
          <div className='text-primary font-lato mt-6'>

            <p>Дата: <strong>{modalData.booking_date}</strong></p>
            <p>Час: <strong>{modalData.booking_hour}</strong></p>
            <p>Регистрационен номер: <strong>{modalData.plate_license}</strong></p>
            <p>Категория на автомобила: <strong>{modalData.service}</strong></p>
            <p>Име: <strong>{modalData.customer.firstname}</strong></p>
            <p>Фамилия: <strong>{modalData.customer.lastname}</strong></p>
            <p>Телефон: <strong>{modalData.phone}</strong></p>
            <p>Имейл: <strong>{modalData.customer.email ? modalData.customer.email : 'Не е въведен'}</strong></p>
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Откажи</SecondaryButton>

            <PrimaryButton onClick={changeSlotHandler} className="ms-3" disabled={processing}>
              Промени
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}