import { useRef, useState } from 'react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

let toastData;

export default function Services({ auth, services, }) {
  const toast = useRef(null);
  const [confirmingServiceChange, setConfirmingServiceChange] = useState(false);
  const [inputLabelValue, setInputLabelValue] = useState();
  const [preferenceId, setPreferenceId] = useState();
  const valueInput = useRef();

  const { data, setData, put: update, processing, reset, errors } = useForm({
    service_price: '',
  });

  const onSelectHandler = (row) => {
    let id = row.id;
    setConfirmingServiceChange(true);
    services.map((item) => {
      if (item.id === id) {
        setInputLabelValue(item.name);
        setPreferenceId(item.id);
        setData('service_price', item.price);
      }
    });
  };

  const changeServiceHandler = (e) => {
    e.preventDefault();
    update(route('services.update', preferenceId), {
      preserveScroll: true,
      onSuccess: () => {
        toastData = { severity: 'success', summary: 'Успех', detail: 'Успешно променена цена на категория МПС.' };
        showToast(toastData);
      },
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

  const showToast = (data) => {
    if (toast.current) {
      toast.current.show({ severity: data.severity, summary: data.summary, detail: data.detail });
    }
  };

  const closeModal = () => {
    setConfirmingServiceChange(false);
    reset();
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight">Видове категории МПС</h2>}
    >
      <Head title="Настройки" />
      
      <Toast ref={toast} />
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="card">
              <DataTable value={services} selectionMode="single" onSelectionChange={(e) => onSelectHandler(e.value)} dataKey="id">
                <Column header="#" body={(data, options) => options.rowIndex + 1}></Column>
                <Column field="name" header="ИМЕ"></Column>
                <Column field="price" header="ЦЕНА"></Column>
              </DataTable>
            </div>
            <Modal show={confirmingServiceChange} onClose={closeModal}>
              <form onSubmit={changeServiceHandler} className="p-6 bg-background-light">
                <h2 className="text-lg font-medium">
                  Промяна на цена на категория МПС
                </h2>

                <div className='mt-6'>
                  <InputLabel htmlFor="service_price" value={inputLabelValue} />

                  <TextInput
                    id="service_price"
                    ref={valueInput}
                    value={data.service_price}
                    onChange={(e) => setData('service_price', e.target.value)}
                    type="text"
                    className="mt-1 block w-full"
                    autoComplete="service_price"
                  />

                  <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                  <SecondaryButton onClick={closeModal}>Откажи</SecondaryButton>

                  <PrimaryButton className="ms-3" disabled={processing}>
                    Промени
                  </PrimaryButton>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}