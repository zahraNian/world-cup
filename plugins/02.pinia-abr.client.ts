import abr from '~/shared/utils/abr.js'
import { useUserStore } from '~/stores/user.js'
import { setupAbrAuthBus } from '~/shared/auth/setupAbrAuthBus.js'

export default defineNuxtPlugin({
  name: 'pinia-abr',
  enforce: 'post',
  async setup(nuxtApp) {
    const conn = await abr.getOrInit()

    if (nuxtApp.$pinia) {
      nuxtApp.$pinia.use(() => ({ abr, $app: conn }))
    }

    if (!import.meta.client || !conn || !nuxtApp.$pinia) {
      return
    }

    const userStore = useUserStore(nuxtApp.$pinia)
    setupAbrAuthBus(userStore, conn)
  },
})
