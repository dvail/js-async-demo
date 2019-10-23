module.exports = {
  theme: {
    extend: {},
    flexGrow: {
      default: 1,
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
    }
  },
  variants: {},
  plugins: [
    require('tailwindcss-transitions')(),
  ],
}
