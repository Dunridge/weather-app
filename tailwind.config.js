/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#3378CC",
                secondary: "#CC3378",
                tertiary: "#78CC33",
            },
        },
    },
    plugins: [],
};