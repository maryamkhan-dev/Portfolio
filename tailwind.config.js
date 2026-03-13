/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          50:  '#f7f9fc',
          100: '#eef2f8',
          200: '#e2e8f4',
        },
        accent: {
          sky:    '#0ea5e9',
          violet: '#8b5cf6',
          pink:   '#ec4899',
          teal:   '#14b8a6',
          orange: '#f97316',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundSize: {
        '300%': '300%',
        '210%': '210%',
      },
    },
  },
  plugins: [],
}
