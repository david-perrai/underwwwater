// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@primevue/nuxt-module",
    "@nuxt/fonts",
  ],

  /*********** Config ***********/
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:3001",
    },
  },

  /*********** i18n ***********/
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },

  /*********** PrimeVue ***********/
  primevue: {
    components: {
      prefix: "PV",
    },
    directives: {
      prefix: "PV",
    },
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  /*********** CSS ***********/
  css: ["~/assets/scss/main.scss"], // Import global du fichier SCSS principal

  /*********** Vite ***********/
  vite: {
    clearScreen: false, // Pour voir les logs de rebuild
    server: {
      hmr: {
        protocol: "ws",
        host: "localhost",
      },
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;',
        },
      },
      devSourcemap: true,
    },
  },

  // Forcer le rechargement des composants
  experimental: {
    componentIslands: false,
  },

  /*********** Nuxt Fonts ***********/
  fonts: {
    families: [{ name: "Barlow", provider: "google" }],
  },
});
