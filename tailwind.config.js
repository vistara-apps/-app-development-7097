/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220 38.2% 40.6%)',
        accent: 'hsl(204 100% 50%)',
        background: 'hsl(220 15% 8%)',
        surface: 'hsl(220 15% 12%)',
        'surface-light': 'hsl(220 15% 16%)',
        'text-primary': 'hsl(210 40% 98%)',
        'text-secondary': 'hsl(215 20.2% 65.1%)',
        border: 'hsl(220 13% 18%)',
        success: 'hsl(142 76% 36%)',
        warning: 'hsl(38 92% 50%)',
        error: 'hsl(0 84% 60%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 4px hsla(0, 0%, 0%, 0.1)',
        'modal': '0 10px 30px hsla(220, 40%, 20%, 0.3)',
      },
    },
  },
  plugins: [],
}