let tailwindTransitions = require('tailwindcss-transitions')()
let tailwindAnimations = require('tailwindcss-animations')()

module.exports = {
  theme: {
    extend: {},
    flexGrow: {
      default: 1,
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
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
  ],
}
