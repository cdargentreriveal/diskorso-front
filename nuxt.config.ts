// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    strict: true,
    typeCheck: true,
  },
  components: true,
  app: {
    // global transition
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  // css
  css: [
    "virtual:windi-base.css",
    "virtual:windi-components.css",
    "virtual:windi-utilities.css",
    "~/assets/sass/vendor.scss",
    "~/assets/sass/app.scss",
  ],
  modules: ["nuxt-windicss"],
});
