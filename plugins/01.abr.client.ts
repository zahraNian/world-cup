import abr from '~/shared/utils/abr.js'

export default defineNuxtPlugin({
  name: 'abr',
  enforce: 'pre',
  async setup() {
    try {
      await abr.getOrInit()
    } catch {
      // Connection failure handled by route middleware → /500
    }
  },
})
