module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {}
  },
  safelist: [
    {
      pattern: /(w|h)-(.*)/
    }
  ],
  plugins: [require('daisyui')]
}
