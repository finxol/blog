module.exports = {
    content: [
        "./app.vue",
        "./pages/**/*.{vue,js,ts}",
        "./components/**/*.{vue,js,ts}",
        "./layouts/**/*.{vue,js,ts}",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}"
    ],
    darkMode: "selector",
    plugins: [
        require("@tailwindcss/typography")
        // other plugins...
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: "'OrkneyRegular', sans-serif",
                serif: "'recoleta-regular', serif;",
                "serif-bold": "'recoleta-bold', serif;"
            }
        }
    }
};
