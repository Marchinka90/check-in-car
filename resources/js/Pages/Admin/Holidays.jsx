import { useState, useEffect, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import Calendar from '@/Components/Calendar/Calendar';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';

let toastData;

export default function ChangeBookingSlot({ auth, preferences, holidays, success }) {
  const toast = useRef(null);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [holidaysInBGFormat, setHolidaysInBGFormat] = useState([]);
  const [confirmingHolidayDeletion, setConfirmingHolidayDeletion] = useState(false);
  const [holidayKey, setHolidayKey] = useState('');

  const [showSuccess, setShowSuccess] = useState(success);

  const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
    selectedDate: '',
    selectedDateObj: '',
  });

  // Specify the date format options
  const options = { timeZone: 'Europe/Sofia', year: 'numeric', month: 'long', day: 'numeric' };
  
  useEffect(() => {
    setHolidaysInBGFormat([]);
    if (holidays.length > 0) {
      for (let i = 0; i < holidays.length; i++) {
        let [year, month, day] = holidays[i].holiday_date.split('-');
        let currentHoliday = new Date(`${month}/${day}/${year}`);
        let formattedHoliday = currentHoliday.toLocaleDateString('bg-BG', options);
        setHolidaysInBGFormat(state => [...state, { key: holidays[i].id, holiday_date: formattedHoliday }]);
      }
    }
    if (data.selectedDateObj) {
      const formattedDate = data.selectedDateObj.toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
      setData({ ...data, selectedDate: formattedDate });
    }

    if (!isCalendarVisible) {
      deselectDate();
    }

  }, [data.selectedDateObj, isCalendarVisible, holidays]);

  const showToast = (data) => {
    if (toast.current) {
      toast.current.show({ severity: data.severity, summary: data.summary, detail: data.detail });
    }
  };

  const deselectDate = () => {
    let oldSelectedDate = document.getElementById('selected-date');
    if (oldSelectedDate) {
      oldSelectedDate.id = '';
    }
    setData({ ...data, selectedDate: '', selectedDateObj: '' });
  }

  const submit = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      post(route('holidays.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toastData = { severity: 'success', summary: 'Успех', detail: 'Успешно създаден почивен ден' };
          showToast(toastData);
          deselectDate();
          setCalendarVisible(false);
          reset();
        },
        onError: (er) => {
          Object.entries(er).forEach(([key, message]) => {
            toastData = { severity: 'error', summary: 'Грешка', detail: message };
            showToast(toastData);
          });
          return;
        },
      });
    }
  };

  const isValidForm = () => {
    if (!data.selectedDate) {
      toastData = { severity: 'error', summary: 'Грешка', detail: 'Не сте избрали дата от календара' };
      showToast(toastData);
      return false;
    }
    if (data.selectedDateObj) {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      data.selectedDateObj.setHours(0, 0, 0, 0);

      if (data.selectedDateObj.getTime() < today.getTime()) {
        toastData = { severity: 'error', summary: 'Грешка', detail: 'Датата не може да бъде по-малка от днешната' };
        showToast(toastData);
        return false;
      }
    }

    return true;
  }

  const onSelectHandler = (row) => {
    setConfirmingHolidayDeletion(true);
    setHolidayKey(row.key)
  };

  const deleteHoliday = (e) => {
    e.preventDefault();
    
    destroy(route('holidays.destroy', holidayKey), {
      preserveScroll: true,
      onSuccess: () => {
        toastData = { severity: 'success', summary: 'Успех', detail: 'Почивният ден беше успешно изтрит.' };
        showToast(toastData);
        deselectDate();
        setCalendarVisible(false);
        closeModal();
        reset();
      },
      onError: (er) => {
        Object.entries(er).forEach(([key, message]) => {
          toastData = { severity: 'error', summary: 'Грешка', detail: message };
          showToast(toastData);
        });
        closeModal();
        return;
      },
    });
  };

  const closeModal = () => {
    setConfirmingHolidayDeletion(false);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Почивни дни</h2>}
    >
      <Head title="Почивни дни" />

      <Toast ref={toast} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white w-full overflow-hidden shadow-sm sm:rounded-lg">
            <Head title="Запази час" />

            <form onSubmit={submit}>
              <h2 className='w-full block text-center text-xl lg:text-2xl font-montserrat bg-primary text-white py-2 mb-2 cursor-pointer' onClick={() => setCalendarVisible(state => !state)}>
                Създай почивен ден
              </h2>
              <div className={`flex flex-col items-center max-w-7xl transition-all duration-500 ${isCalendarVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <Calendar setSelectedDate={(e) => setData('selectedDateObj', e)} preferences={preferences} holidays={holidays} />
                <div className="flex justify-end p-5 w-full">
                  <PrimaryButton className="ms-4" disabled={processing}>
                    Потвърди
                  </PrimaryButton>
                </div>
              </div>
            </form>

            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              {holidaysInBGFormat.length > 0 &&
                <div className="card">
                  <DataTable value={holidaysInBGFormat} selectionMode="single" onSelectionChange={(e) => onSelectHandler(e.value)} dataKey="key">
                    <Column header="#" body={(data, options) => options.rowIndex + 1}></Column>
                    <Column field="holiday_date" header="ДАТА"></Column>
                  </DataTable>
                </div>
              }
              {holidaysInBGFormat.length == 0 &&
                <div className="card mt-5">
                  <h1 className="text-xl text-center">Няма създадени предстоящи почивни дни</h1>
                </div>
              }
            </div>

          </div>
        </div>
      </div>

      <Modal show={confirmingHolidayDeletion} onClose={closeModal} >
        <form onSubmit={deleteHoliday} className="p-6 bg-red-100">
          <h2 className="text-lg font-medium text-gray-900">
            Сигурни ли сте, че искате да изтриете този почивен ден?
          </h2>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Откажи</SecondaryButton>

            <DangerButton className="ms-3" disabled={processing}>
              Потвърди
            </DangerButton>
          </div>
        </form>
      </Modal>

    </AuthenticatedLayout>
  );
}
