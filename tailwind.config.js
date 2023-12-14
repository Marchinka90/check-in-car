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
            // sm: '480px',
            // md: '768px',
            // lg: '976px',
            // xl: '1440px'
            xl: '1300px'
        },
        container: {
            center: true,
        },
        extend: {
            colors: {
                'primary': '#575471',
                'secondary': '#FFA000',
                'white': '#fff',
                'black': '#3c3d47',
                'gray': '#f2efe9',
                'background-dark': '#575471',
                'background-light': '#f2efe9',
                'backgrount-dark-transperant': 'rgba(87, 84, 113, 0.6)'
            },
            backgroundImage: {
                'engine': "url('/img/engine.jpg')",
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                lato: ['Lato', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            width: {
                '128': '32rem',
            }
        },
    },

    plugins: [forms],
};
