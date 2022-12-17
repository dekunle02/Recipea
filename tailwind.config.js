/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        colorWhite: '#f5f5f5',
        colorBlack: '#0D0C0D',
        colorGray: '#1C1B1F',
        colorPrimary: '#D0BCFF',
        colorTextOnPrimary: '#381E72',
        colorTextOnBlack: '#E6E1E5'
      },
    },
  },
  plugins: [],
}
