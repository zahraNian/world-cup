export default defineNuxtConfig({
  compatibilityDate: '2025-03-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { dir: 'rtl', lang: 'fa' },
      title: 'کمپین پیش‌بینی جام جهانی ۲۰۲۶',
    },
  },
  runtimeConfig: {
    public: {
      abrUrl: process.env.VITE_ABR_URL || '',
      publicDomain: process.env.VITE_PUBLIC_DOMAIN || '',
      loginPort: process.env.VITE_LOGIN_PORT || '8081',
    },
  },
  vite: {
    envPrefix: ['VITE_'],
  },
})
