import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { useState, useEffect, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import Calendar from '@/Components/Calendar/Calendar';

import { Toast } from 'primereact/toast';

let toastData;

export default function BookingSlot({ auth, services, preferences, holidays }) {
    const toast = useRef(null);
    const [freeHoursData, setFreeHoursData] = useState([]);
    const [heddingLabel, setHeddingLabel] = useState('Изберете дата от календара');

    const { data, setData, post, processing, errors, reset } = useForm({
        vehicleCategory: '',
        selectedDateObj: '',
        selectedDate: '',
        selectedHour: '',
        firstname: '',
        lastname: '',
        phone: '',
        plateLicense: '',
    });
    
    useEffect(() => {
        let formData = { selectedDate: '' }
        deselectHour();
        if (data.selectedDateObj) {
            const formattedDate = data.selectedDateObj.toLocaleDateString('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
            setData('selectedDate', formattedDate);
            // setData({ ...data, selectedDate: formattedDate })
            formData.selectedDate = formattedDate;

            axios.post('/api/free-booking-slots', formData)
                .then(res => {
                    const data = res.data;
                    if (data.status === 'success') {
                        setHeddingLabel('Изберете свободен час');
                        setFreeHoursData(data.data.freeSlots);
                    }
                })
                .catch(er => {
                    let errorsObj = er.response.data.errors;
                    Object.entries(errorsObj).forEach(([key, message]) => {
                        toastData = { severity: 'error', summary: 'Грешка', detail: message[0] };
                        showToast(toastData);
                    });
                    setHeddingLabel('Изберете дата от календара');
                    setFreeHoursData([]);
                    deselectDate();
                });
        }

    }, [data.selectedDateObj]);

    const showToast = (data) => {
        if (toast.current) {
            toast.current.show({ severity: data.severity, summary: data.summary, detail: data.detail });
        }
    };

    const deselectHour = () => {
        let oldSelectedHour = document.getElementById('selected-hour');
        if (oldSelectedHour) {
            oldSelectedHour.id = '';
        }
    }

    const deselectDate = () => {
        let oldSelectedDate = document.getElementById('selected-date');
        if (oldSelectedDate) {
            oldSelectedDate.id = '';
        }
    }

    const selectHourHandler = (hour) => {
        deselectHour();
        setData({ ...data, selectedHour: hour.target.innerHTML })
        hour.target.id = 'selected-hour';
    }

    let freeHoursHtml = [];
    if (!processing) {
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

    const submit = (e) => {
        e.preventDefault();
        console.log(data)
        if (isValidForm()) {
            post(route('booking-slot.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    toastData = { severity: 'success', summary: 'Успех', detail: 'Запазването е успешно' };
                    showToast(toastData);
                    setHeddingLabel('Изберете дата от календара');
                    setFreeHoursData([]);
                    deselectDate();
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
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        data.selectedDateObj.setHours(0, 0, 0, 0);

        if (data.selectedDateObj.getTime() < today.getTime()) {
            toastData = { severity: 'error', summary: 'Грешка', detail: 'Датата не може да бъде по-малка от днешната' };
            showToast(toastData);
            return false;
        }
        if (data.selectedHour === '') {
            toastData = { severity: 'error', summary: 'Грешка', detail: 'Не сте избрали свободен час' };
            showToast(toastData);
            return false;
        }
        if (!data.vehicleCategory || data.vehicleCategory < 1 || data.vehicleCategory > 7) {
            toastData = { severity: 'error', summary: 'Грешка', detail: 'Не сте избрали Категория на автомобила' };
            showToast(toastData);
            return false;
        }
        if (data.firstname === '' || data.firstname.length < 3) {
            toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето за Име не може да бъде празно или по-малко от 3 символа' };
            showToast(toastData);
            return false;
        }
        if (data.lastname === '' || data.lastname.length < 3) {
            toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето за Фамилия не може да бъде празно или по-малко от 3 символа' };
            showToast(toastData);
            return false;
        }
        if (data.phone === '' || data.phone.length < 9 || data.phone.length > 9) {
            toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето за Телефон не може да бъде празно и трябва да е дължина 9 символа' };
            showToast(toastData);
            return false;
        }
        if (data.plateLicense === '' || data.plateLicense.length < 6) {
            toastData = { severity: 'error', summary: 'Грешка', detail: 'Полето за Регистрационен номер не може да бъде празно или по-малко от 6 символа' };
            showToast(toastData);
            return false;
        }
        return true;
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Запази час</h2>}
        >
            <Head title="Запазване на час" />

            <Toast ref={toast} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white w-full overflow-hidden shadow-sm sm:rounded-lg">
                        <Head title="Запази час" />

                        <form onSubmit={submit}>

                            <div className='flex flex-col items-center lg:items-start lg:flex-row max-w-7xl'>
                                <Calendar setSelectedDate={(e) => setData('selectedDateObj', e)} preferences={preferences} holidays={holidays} />
                                <div className='w-full sm:max-w-lg overflow-hidden pt-2 lg:max-w-2xl lg:p-2 lg:ml:0 lg:w-2/3 '>
                                    <div className='w-full sm:max-w-2xl bg-background-light flex flex-wrap justify-center'>
                                        <h2 className='w-full block text-center text-xl lg:text-2xl my-5 font-montserrat text-primary'>
                                            {heddingLabel}
                                        </h2>
                                        {freeHoursHtml}
                                    </div>
                                    <div className="w-full sm:max-w-2xl mt-6 p-2 overflow-hidden">
                                        <InputLabel htmlFor="vehicleCategory" value='Категория на автомобила' />
                                        <Select
                                            id="vehicleCategory"
                                            options={services}
                                            value={data.vehicleCategory}
                                            onChange={(e) => setData('vehicleCategory', e.target.value)}
                                            type="text"
                                            className="mt-1 block w-full"
                                            autoComplete="vehicleCategory"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col items-center lg:justify-center lg:flex-row w-full '>
                                <div className="w-full sm:max-w-lg mt-6 p-2 overflow-hidden">
                                    <InputLabel htmlFor="firstname" value="Име" />

                                    <TextInput
                                        id="firstname"
                                        type="text"
                                        name="firstname"
                                        value={data.firstname}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('firstname', e.target.value)}
                                    />

                                </div>

                                <div className="w-full sm:max-w-lg mt-6 p-2 overflow-hidden">
                                    <InputLabel htmlFor="lastname" value="Фамилия" />

                                    <TextInput
                                        id="lastname"
                                        type="text"
                                        name="lastname"
                                        value={data.lastname}
                                        className="mt-1 block w-full"

                                        onChange={(e) => setData('lastname', e.target.value)}
                                    />

                                </div>
                            </div>
                            <div className='flex flex-col w-full items-center lg:justify-center lg:flex-row'>
                                <div className="w-full sm:max-w-lg mt-6 p-2 overflow-hidden">
                                    <InputLabel htmlFor="phone" value="Телефон" />

                                    <span className='flex items-center'>
                                        <span id="phone-addon">+359</span>
                                        <TextInput
                                            id="phone"
                                            type="text"
                                            name="phone"
                                            value={data.phone}
                                            className="mt-1 block w-full border-left: none"
                                            autoComplete="phone"
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                    </span>

                                </div>

                                <div className="w-full sm:max-w-lg mt-6 p-2 overflow-hidden">
                                    <InputLabel htmlFor="plateLicense" value="Регистрационен номер" />

                                    <TextInput
                                        id="plateLicense"
                                        type="text"
                                        name="plateLicense"
                                        value={data.plateLicense}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('plateLicense', e.target.value.toUpperCase())}
                                    />

                                </div>
                            </div>

                            <div className="flex items-center justify-end p-5">

                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Запази Час
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <style>{`
                #phone {
                    border-left: none;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    
                    padding: 0.5rem  0.75rem;
                    // border: 1px solid #ced4da;
                    border-radius: 0 0.25rem 0.25rem 0;
                }    

                #phone-addon {
                    margin-top: 3px;
                    background-color: #e9ecef;
                    padding: 0.5rem 0.75rem;
                    border: 1px solid #ced4da;
                    border-radius: 0.25rem 0 0 0.25rem;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
