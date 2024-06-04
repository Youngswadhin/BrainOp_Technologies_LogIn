const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', './public/index.html',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
