module.exports = {
  theme: {
    ripple: theme => ({
      colors: theme('colors')
  }),
    extend: {
      keyframes: {
        'fade-in-up': {
            '0%': {
                opacity: '0',
                transform: 'translateY(10px)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateY(0)'
            },
        }
    },
    animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
    }
,
      colors: {
        primary: {
          300: "#4caf50",
          500: "#2e7d32",
          800: "#1b5e20",
        },
        secondary: {
          300: "#4caf50",
          500: "#2e7d32",
          800: "#1b5e20",
        },
      },
    },
  },
  plugins: [    require('@tailwindcss/forms'),
  require('tailwindcss-ripple')()

],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
};
