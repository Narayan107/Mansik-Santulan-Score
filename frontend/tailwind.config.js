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
        mint: {
          50: '#F4F8F5',
          100: '#E8F2EC',
          200: '#D1E6DA',
          500: '#2A9D8F',
          600: '#1D786D',
          800: '#0E4B3C',
          900: '#072A22'
        },
        forest: {
          DEFAULT: '#0E4B3C',
          light: '#135D4B',
          dark: '#083228',
          card: '#0B3A2F'
        },
        coral: {
          light: '#FF8A73',
          DEFAULT: '#F4694B',
          dark: '#D94D2E'
        },
        amberGold: {
          light: '#FBD38D',
          DEFAULT: '#F5A623',
          dark: '#D6880B'
        },
        wellnessGreen: {
          light: '#6EE7B7',
          DEFAULT: '#4CAF7D',
          dark: '#2E7D52'
        },
        wellnessTeal: {
          light: '#5EEAD4',
          DEFAULT: '#2DD4BF',
          dark: '#0F766E'
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.12)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
        'glow-green': '0 0 25px -3px rgba(45, 212, 191, 0.35)',
        'glow-forest': '0 0 30px -5px rgba(14, 75, 60, 0.4)'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
