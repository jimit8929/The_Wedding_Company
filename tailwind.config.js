export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      fontFamily: {
        'dm-serif': ['DM Serif Display', 'serif'],
      },
      backdropBlur: {
        '200': '200px',
      },
    },
  },
  plugins: [],
}
