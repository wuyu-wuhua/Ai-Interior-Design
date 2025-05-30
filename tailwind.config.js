/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: theme => ({
        'gradient-to-r': `linear-gradient(to right, ${theme('colors.pink.500')}, ${theme('colors.purple.500')}, ${theme('colors.blue.500')})`,
      }),
    },
  },
  plugins: [],
};
