/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/routes/**/*.{svelte,js,ts}",
    "./src/**/*.{svelte,js,ts,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lofi"],
  },
};
