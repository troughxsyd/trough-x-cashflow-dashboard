/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        trough: {
          yellow: '#FFCC00',
          yellowDark: '#E6B800',
          yellowLight: '#FFF8DB',
          dark: '#13141C',
          card: '#1E202C',
          steel: '#2B2D42',
          slate: '#4A5568',
          lightGrey: '#F1F3F5',
          border: '#373A4D'
        }
      }
    },
  },
  plugins: [],
}
