let tailwindTransitions = require('tailwindcss-transitions')()
let tailwindAnimations = require('tailwindcss-animations')()
let tailwindCustomForms = require('@tailwindcss/custom-forms')

module.exports = {
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Fira Sans', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', 'sans-serif'],
    },
    flexGrow: {
      default: 1,
      0: 0,
      1: 1,
      2: 2,
      3: 3,
    },
    animations: {
      pulse: {
        from: {
          transform: 'scale(1)',
        },
        to: {
          transform: 'scale(0.9)',
        },
      },
    },
  },
  variants: {},
  plugins: [
    tailwindTransitions,
    tailwindAnimations,
    tailwindCustomForms,
    function filter({ addUtilities }) {
      addUtilities({
        '.filter-invert': { filter: 'invert(1)' },
        '.filter-invert-25': { filter: 'invert(0.25)' },
        '.filter-invert-50': { filter: 'invert(0.5)' },
        '.filter-invert-75': { filter: 'invert(0.75)' },
      })
    },
    function rotate({ addUtilities }) {
      addUtilities({
        '.rotate-90': { transform: 'rotate(90deg)' },
        '.rotate-180': { transform: 'rotate(180deg)' },
        '.rotate-270': { transform: 'rotate(270deg)' },
      })
    },
  ],
}
