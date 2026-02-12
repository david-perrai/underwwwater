// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";

// Custom preset with your brand colors
const CustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#e6fffd",
      100: "#ccfffb",
      200: "#99fff7",
      300: "#66fff3",
      400: "#33ffef",
      500: "#00FFEF", // $color-turquoise
      600: "#00ccbf",
      700: "#00998f",
      800: "#006660",
      900: "#003330",
      950: "#001a18",
    },
    success: {
      50: "#e6fff7",
      100: "#ccffef",
      200: "#99ffdf",
      300: "#66ffcf",
      400: "#33ffbe",
      500: "#00FF9D", // $color-green
      600: "#00cc7e",
      700: "#00995e",
      800: "#00663f",
      900: "#00331f",
      950: "#001a10",
    },
    danger: {
      50: "#ffe6e6",
      100: "#ffcccc",
      200: "#ff9999",
      300: "#ff6666",
      400: "#ff4d4d",
      500: "#FF2A2A", // $color-red
      600: "#cc2222",
      700: "#991919",
      800: "#661111",
      900: "#330808",
      950: "#1a0404",
    },
    warn: {
      50: "#fffce6",
      100: "#fff9cc",
      200: "#fff399",
      300: "#ffed66",
      400: "#ffe733",
      500: "#FFD600", // $color-yellow
      600: "#ccab00",
      700: "#998000",
      800: "#665500",
      900: "#332b00",
      950: "#1a1500",
    },
    info: {
      50: "#e6f9ff",
      100: "#ccf3ff",
      200: "#99e7ff",
      300: "#66dbff",
      400: "#33cfff",
      500: "#00BFFF", // $color-blue
      600: "#0099cc",
      700: "#007399",
      800: "#004d66",
      900: "#002633",
      950: "#001319",
    },
    secondary: {
      50: "#e8ecff",
      100: "#d1d9ff",
      200: "#a3b3ff",
      300: "#758dff",
      400: "#4767ff",
      500: "#244cff", // $color-navy
      600: "#1d3dcc",
      700: "#162e99",
      800: "#0e1e66",
      900: "#070f33",
      950: "#040819",
    },
  },
});

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
      prefix: "PV",
    },
    directives: {
      prefix: "PV",
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
