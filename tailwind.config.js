let tailwindTransitions = require('tailwindcss-transitions')()
let tailwindTransforms = require('tailwindcss-transforms')()
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
      'expand-up': {
        from: {
          transform: 'scale(1, 0)',
        },
        to: {
          transform: 'scale(1, 1)',
        },
      },
      'collapse-down': {
        from: {
          transform: 'scale(1, 1)',
        },
        to: {
          transform: 'scale(1, 0)',
        },
      },
    },
    animationDuration: { // defaults to these values
      default: '1s',
      '200ms': '0.2s',
      '0s': '0s',
      '1s': '1s',
      '2s': '2s',
      '3s': '3s',
      '4s': '4s',
      '5s': '5s',
    },
  },
  variants: {},
  plugins: [
    tailwindTransforms,
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
