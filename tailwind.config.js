/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8edf5',
          100: '#c5d0e6',
          500: '#2d4a8a',
          600: '#1e3a7a',
          700: '#162d66',
          800: '#0e2052',
          900: '#1A2F5E',
        },
        gold: {
          400: '#f7c948',
          500: '#F4B942',
          600: '#e0a030',
        },
      },
    },
  },
  plugins: [],
}
