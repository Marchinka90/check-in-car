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
import Select from '@/Components/Select';
import { Toast } from 'primereact/toast';

const columns = [
  'description',
  'value'
];

let toastData;

export default function Preferences({ auth, preferences, status }) {
  const toast = useRef(null);
  const [confirmingPreferenceChange, setConfirmingPreferenceChange] = useState(false);
  const [inputLabelValue, setInputLabelValue] = useState();
  const [preferenceId, setPreferenceId] = useState();
  const [showSelect, setShowSelect] = useState(false);
  const valueInput = useRef();

  const { data, setData, put: update, processing, reset, errors } = useForm({
    preferance_value: '',
  });

  const options = [
    {
      key: 1,
      label: "Включен",
      value: "Включен",
    },
    {
      key: 2,
      label: "Изключен",
      value: "Изключен",
    },
  ];

  const confirmPreferenceChangeHandler = (id) => {
    setConfirmingPreferenceChange(true);
    preferences.map((item) => {
      if (item.id === id) {
        if (item.name == 'saturdayShiftOn') {
          setShowSelect(true);
        } else {
          setShowSelect(false);
        }

        setInputLabelValue(item.description);
        setPreferenceId(item.id);
        setData('preferance_value', item.value);
      }
    });
  };

  const showToast = (data) => {
    if (toast.current) {
      toast.current.show({ severity: data.severity, summary: data.summary, detail: data.detail });
    }
  };

  const changePreferenceHandler = (e) => {
    e.preventDefault();
    update(route('preferences.update', preferenceId), {
      preserveScroll: true,
      onSuccess: () => {
        toastData = { severity: 'success', summary: 'Успех', detail: 'Успешно променена настройка.' };
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

  const closeModal = () => {
    setConfirmingPreferenceChange(false);
    reset();
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl leading-tight">Настройки на системата</h2>}
    >
      <Head title="Настройки" />

      <Toast ref={toast} />
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <Table items={preferences} columns={columns} primary="Номер" action={confirmPreferenceChangeHandler} index={1}></Table>
            <Modal show={confirmingPreferenceChange} onClose={closeModal}>
              <form onSubmit={changePreferenceHandler} className="p-6">
                <h2 className="text-lg font-medium">
                  Промяна на настройка
                </h2>

                <div className='mt-6'>
                  <InputLabel htmlFor="preferance_value" value={inputLabelValue} />

                  {!showSelect && <TextInput
                    id="preferance_value"
                    ref={valueInput}
                    value={data.preferance_value}
                    onChange={(e) => setData('preferance_value', e.target.value)}
                    type="text"
                    className="mt-1 block w-full"
                    autoComplete="preferance_value"
                  />}

                  {showSelect && <Select
                    id="preferance_value"
                    options={options}
                    value={data.preferance_value}
                    onChange={(e) => setData('preferance_value', e.target.value)}
                    type="text"
                    className="mt-1 block w-full"
                    autoComplete="preferance_value"
                  />}

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