// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: true,
  typescript: {
    strict: true,
    typeCheck: true,
  },
  components: true,
  app: {
    head: {
      title: 'Diskorso - Promenades numériques',
      htmlAttrs: {
        lang: 'fr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Plateforme collaborative de promenades numériques',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Playfair+Display:ital@0;1&display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseURL: 'https://api.diskorso.org',
    },
  },
  css: [
    'virtual:windi-base.css',
    'virtual:windi-components.css',
    'virtual:windi-utilities.css',
    '~/assets/sass/vendor.scss',
    '~/assets/sass/app.scss',
  ],
  modules: ['nuxt-windicss', '@pinia/nuxt'],
})
