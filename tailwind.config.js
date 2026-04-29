/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-mint': {
          DEFAULT: '#E8F5F0',
          50: '#F0FBF7',
          100: '#E8F5F0',
          200: '#D0EAE2',
          300: '#A8D6C7',
          400: '#7BC1AB',
          500: '#4FAA8F',
          600: '#2A9D8F',
          700: '#238A7D',
          800: '#1C736A',
          900: '#165E56',
        },
        'teal': {
          DEFAULT: '#2A9D8F',
          50: '#F0FBF7',
          100: '#E0F7F1',
          200: '#B2EBDF',
          300: '#81D4C7',
          400: '#4DB8AC',
          500: '#26A69A',
          600: '#23867a',
          700: '#00897B',
          800: '#00796B',
          900: '#00695C',
        },
        'warm-white': {
          DEFAULT: '#FAFAFA',
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#EEEEEE',
          400: '#E0E0E0',
          500: '#BDBDBD',
          600: '#9E9E9E',
          700: '#757575',
          800: '#616161',
          900: '#424242',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-light': 'bounceLight 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
