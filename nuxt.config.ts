export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  experimental: {
    payloadExtraction: false,
  },
  modules: [
    '@nuxt/content'
  ],
})