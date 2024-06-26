import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-admin-background-light text-primary">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href={route('timetable')}>
                                    <img src='./img/admin_logo_vita_21.png' alt='ВИТА 21' className="w-[14rem]" />
                                    {/* <span className='text-2xl sm:mr-10 lg:mr-0'>ВИТА 21</span> */}
                                </Link>
                            </div>

                            <div className="hidden space-x-2 sm:-my-px sm:ms-10 md:flex">
                                <NavLink href={route('timetable')} active={route().current('timetable')}>
                                График
                                </NavLink>
                                <NavLink href={route('booking-slot')} active={route().current('booking-slot')}>
                                Запази час
                                </NavLink> 
                                <NavLink href={route('services')} active={route().current('services')}>
                                Категории МПС
                                </NavLink>
                                <NavLink href={route('preferences')} active={route().current('preferences')}>
                                Настройки
                                </NavLink>
                                <NavLink href={route('holidays')} active={route().current('holidays')}>
                                Почивни дни
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden md:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name.toUpperCase()}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {/* <Dropdown.Link href={route('profile.edit')}>Профил</Dropdown.Link> */}
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Изход
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('timetable')} active={route().current('timetable')}>
                            График
                        </ResponsiveNavLink> 
                        <ResponsiveNavLink href={route('booking-slot')} active={route().current('booking-slot')}>
                            Запази час
                        </ResponsiveNavLink> 
                        <ResponsiveNavLink href={route('services')} active={route().current('services')}>
                            Категории МПС
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('preferences')} active={route().current('preferences')}>
                            Настройки
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('holidays')} active={route().current('holidays')}>
                            Почивни дни
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            {/* <ResponsiveNavLink href={route('profile.edit')}>Профил</ResponsiveNavLink> */}
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Изход
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
