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

        text_primary:"#52525b", //text-zinc-[600]
        text_secondary:"#00ce98",// green

        my_border_color:"#d4d4d8", //border-zinc-[300]
        my_input_bg:"#f4f4f5", //bg-zinc-[100]
      },
    },
  },
  plugins: [],
}

