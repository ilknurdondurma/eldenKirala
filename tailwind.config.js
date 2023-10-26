/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        primary:'#00ce98',//green
        secondary:'#6366f1',//purple

        light_grey:'#f5f5f5', //grey
        dark_grey:'#282c34',//dark grey

      },
      fontSize: {
        '15': '1.5rem'
      }
    },
  },
  plugins: [],
}

