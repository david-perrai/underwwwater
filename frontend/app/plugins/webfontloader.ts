/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export default defineNuxtPlugin(async () => {
  if (import.meta.client) {
    const webFontLoader = await import("webfontloader");

    webFontLoader.load({
      google: {
        families: ["Roboto:100,300,400,500,700,900&display=swap"],
      },
    });
  }
});
