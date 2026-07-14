/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#059669',   // Emerald Green
          secondary: '#0ea5e9', // Sky Blue
          accent: '#10b981',    // Medium Emerald Green
          light: '#f0fdf4',     // Light emerald green background
          textDark: '#111827',  // Very dark gray for clean text contrast
          textMuted: '#6b7280' // Gray text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
