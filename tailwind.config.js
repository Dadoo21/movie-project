/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#E50914',
          hover: '#F40612',
        },
        dark: {
          DEFAULT: '#0A0A0B',
          lighter: '#18181B',
        },
        darker: '#000000',
        light: '#F8F9FA',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(229, 9, 20, 0.3)',
      }
    },
  },
  plugins: [],
}
