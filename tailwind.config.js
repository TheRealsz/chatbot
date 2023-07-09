/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '105': '420px',
      },
      height: {
        '125': '500px'
      },
      boxShadow: {
        'specific': '0 0 128px 0px rgba(0, 0, 0, 0.1), 0 32px 64px -48px rgba(0, 0, 0, 0.5)',
      },
      maxWidth: {
        '75': '75%'
      },
      colors:{
        'brown-rust': {
          '50': '#f9f5ed',
          '100': '#f0e6d1',
          '200': '#e2cda6',
          '300': '#d1ad73',
          '400': '#c3904c',
          '500': '#b47c3e',
          '600': '#a46837',
          '700': '#7c492c',
          '800': '#683d2b',
          '900': '#5a3529',
          '950': '#341b14',
        }
      }
    },
  },
  plugins: [],
}

