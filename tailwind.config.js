/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ig: {
          purple: '#833AB4',
          pink: '#E1306C',
          orange: '#F77737',
          yellow: '#FCAF45',
          darkBg: '#0B0C10',
          darkCard: '#15161E',
          darkBorder: '#232533',
          darkHover: '#1D1E2C',
          accent: '#FF007F'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
