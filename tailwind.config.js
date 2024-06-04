/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        base: "'Urbanist'"
      },
      colors: {
        'main': '#09354F',
        'main-100': '#8F98AC',
        'main-200': '#5E6976',
        'main-300': '',

        'blue-40': '#6379EA'
      },
      backgroundColor: {
        'light-100': '#FEFEFE',
        'light-200': '#F4F6F9',
        'light-300': '#E6ECF0',

        'dark-100': '#060B27',
        'dark-200': '#080D2B',
        'dark-300': '#1E233C',

        'blue-10': '#E8EFFB'
      },
      borderColor: {
        light: '#d9dde6',
        dark: '#202843'
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin'), require('@tailwindcss/forms')]
}
