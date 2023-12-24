import { useRef, useState } from 'react';
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

const columns = [
  'name',
  'price'
];

export default function Services({ auth, services, status }) {
  const [confirmingServiceChange, setConfirmingServiceChange] = useState(false);
  const [inputLabelValue, setInputLabelValue] = useState();
  const [preferenceId, setPreferenceId] = useState();
  const valueInput = useRef();

  const { data, setData, put: update, processing, reset, errors } = useForm({
    service_price: '',
  });

  const confirmServiceChangeHandler = (id) => {
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
      onSuccess: () => closeModal(),
      onError: () => valueInput.current.focus(),
      onFinish: () => {
        reset()
      },
    });
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

      <div className='py-1 mt-2'>
        <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {status === 'success' && (
              <div className="mt-2 py-3 ml-6 font-medium text-base text-green-600">
                Успешно променена цена на категория МПС.
              </div>
            )}
            {status === 'error' && (
              <div className="mt-2 py-3 ml-6 font-medium text-base text-red-600">
                Няма такава категория МПС.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <Table items={services} columns={columns} primary="Номер" action={confirmServiceChangeHandler} index={0}></Table>
            <Modal show={confirmingServiceChange} onClose={closeModal}>
              <form onSubmit={changeServiceHandler} className="p-6">
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