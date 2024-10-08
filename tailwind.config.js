/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '64': '21rem', // Adding a custom spacing value
      },
      colors: {
        lightBg: '#BBE9FF',
        darkBg:'#F5E8C7',
        regalBlue:'#243c5a',
      
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
