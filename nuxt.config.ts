// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    telemetry: false,
    devtools: { enabled: true },
    modules: [
        "@nuxt/content",
        "@nuxtjs/tailwindcss",
        "@tailwindcss/typography",
        "@nuxt/icon",
    ],

    app: {
        head: {
            htmlAttrs: {
                lang: "en",
            },
        },
    },

    icon: {
        clientBundle: {
            icons: [
                "ant-design:github-filled",
                "ri:mastodon-fill",
                "ri:bluesky-fill",
                "ri:sun-fill",
                "ri:moon-fill",
            ],
            scan: true,
        },
    },

    typescript: {
        typeCheck: true,
    },

    routeRules: {
        "/": { prerender: true },
        "/about": { prerender: true },
        "/posts/**": { prerender: true },
    },

    compatibilityDate: "2025-03-17",
});
