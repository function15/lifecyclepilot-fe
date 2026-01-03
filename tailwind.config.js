/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
                graphik: ['graphik', 'Arial', 'Helvetica', 'sans-serif'],
                postoni: ['Postoni', 'Garamond', 'serif'],
                georgia: ['georgia', "Times New Roman", 'serif'],
                franklin: ['Franklin', 'Arial', 'Helvetica', 'sans-serif'],
            }
        }
    },
    corePlugins: {
        aspectRatio: false
    },
    plugins: [
        forms,
        aspectRatio
    ]
}