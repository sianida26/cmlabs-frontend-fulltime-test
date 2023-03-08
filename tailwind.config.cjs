/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        lightGreen: "#EAF6BF",
      },
      spacing: {
        18: "4.5rem"
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
