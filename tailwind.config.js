/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [],

theme: {
  extend: {
    animation: {
      marquee: 'marquee 10s linear infinite',
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-50%)' },
      },
    },
  },
},

variants: {
  extend: {
    animation: ['group-hover'],
  },
},
}

