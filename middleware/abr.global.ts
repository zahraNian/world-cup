import abr from '~/shared/utils/abr.js'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  if (to.path === '/500') {
    return
  }

  if (!abr.isReady()) {
    const conn = await abr.getOrInit()
    if (!conn) {
      return navigateTo('/500')
    }
  }
})
