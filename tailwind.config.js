/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#353535',
        'secondary-color': '#0087D2',
      },
      animation: {
        fadeOut: "fadeOut 1s ease-in-out",
        fadeIn: "fadeIn 1s ease-in-out",
        pingOnce: "ping 500ms cubic-bezier(0,0,0.2,1)",
        removal: "",
      },
      keyframes: (theme) => ({
        fadeOut: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 1 },
          "15%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        ping: {
          "75%": { transform: "scale(2)", opacity: 0 },
          "100%": { transform: "scale(2)", opacity: 0 },
        },
      }),
    },
  },
  plugins: [],
}
