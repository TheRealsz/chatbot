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
      maxWidth:{
        '75': '75%'
      },
    },
  },
  plugins: [],
}

