import twElementPlugin from "tw-elements/dist/plugin.cjs"
/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'azulCreame' : '#003366', 
        'naranjaCreame' : '#DA7800',
        'turquesaCreame' : '#00FFFF',
        'negroCreame' : '#333333',
        'lightBlueCreame' : '#ADD8E6',
        'lightGrayCreame' : '#D1D2D2',
        'grayCreame' : '#A5A7AA',
        'darkGrayCreame' : '#58595B',
        
      },
      width: {
        '3/5': '60%',
        '2/5': '40%',
        '1/10': '10%',
        '9/10': '90%',
        '1/15': '15%',
      },
      fontFamily: {
        Horatio: ['Horatio', 'sans-serif'],
        Helvetica: ['Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [twElementPlugin],
}

