// https://nuxt.com/docs/api/configuration/nuxt-config
import { CustomPreset } from "./app/theme/preset";

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
  typescript: {
    strict: true,
    typeCheck: false,
  },

  imports: {
    dirs: ["types/**"],
  },

  /*********** i18n ***********/
  i18n: {
    restructureDir: "app/i18n",
    locales: [
      { code: "en", file: "en.json" },
      { code: "fr", file: "fr.json" },
    ],
    defaultLocale: "en",
  },

  /*********** PrimeVue ***********/
  primevue: {
    components: {
      prefix: "Prime",
    },
    directives: {
      prefix: "Prime",
    },
    options: {
      theme: {
        preset: CustomPreset,
        options: {
          darkModeSelector: true,
        },
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
    families: [
      { name: "Barlow-Condensed", provider: "google" },
      { name: "Playfair Display", provider: "google" },
      { name: "Inter Tight", provider: "google" },

    ],
  },
});
