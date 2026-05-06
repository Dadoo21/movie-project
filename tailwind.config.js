/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E50914', // Rosso per richiamare il tema cinema/streaming
        dark: '#141414',    // Sfondo principale scuro
        darker: '#000000',  // Sfondo ancora più scuro per footer o header
        light: '#FFFFFF',   // Testo chiaro
        gray: {
          400: '#9CA3AF',
          800: '#1F2937',
          900: '#111827'
        }
      }
    },
  },
  plugins: [],
}
