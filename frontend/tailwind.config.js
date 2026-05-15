/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Overriding slate-950 since Tailwind v3 < 3.3 doesn't include it
        'slate-950': '#020617',
      },
    },
  },
  plugins: [],
};
