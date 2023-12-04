import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px'
        },
        container: {
            center: true,
        },
        extend: {
            colors: {
                'primary-color': '#575471',
                'secondary-color': '#FFA000',
                'white': '#fff',
                'border-color': '#3c3d47',
                'background-dark': '#575471',
                'background-light': '#f2efe9',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                lato: ['Lato', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
        },
    },

    plugins: [forms],
};
