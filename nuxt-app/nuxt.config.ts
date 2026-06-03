export default defineNuxtConfig({
  compatibilityDate: '2025-03-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { dir: 'rtl', lang: 'fa' },
      title: 'کمپین پیش‌بینی جام جهانی ۲۰۲۶',
    },
  },
})
