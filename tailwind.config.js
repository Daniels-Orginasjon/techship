/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
  theme: {
    extends: {
      colors: {
        bluemain: "#006DBE",
      },
    },
  },
};
