/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '325px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    container: {
      center: true,
      padding: '',
      screens: {
        xs: '300px',
        sm: '528px',
        md: '713px',
        lg: '900px',
        xl: '1080px',
        '2xl': '1300px'
      }
    },
    extend: {}
  },
  plugins: []
};
