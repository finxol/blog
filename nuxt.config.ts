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

  typescript: {
    typeCheck: true,
  },

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2024-11-14",
});
