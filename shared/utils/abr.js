import Abr, { Auth } from '@abr/client'
import getDomain from './url/getDomain.js'
import { isSSR } from './ssr.js'

const abr = (function abrFactory() {
  let instance

  return {
    async getOrInit() {
      if (!instance) {
        await this.init()
      }
      return instance
    },

    async init() {
      if (isSSR()) {
        return null
      }

      let url = `ws://${import.meta.env.VITE_ABR_URL}`
      if (import.meta.env.VITE_ABR_URL?.match(/^back[.-].*/)) {
        url = `wss://${import.meta.env.VITE_ABR_URL}`
      }

      const domain = getDomain()
      if (domain !== 'localhost' && domain !== '127.0.0.1') {
        Auth.cookieAttributes.domain = `.${domain}`
      }

      try {
        instance = await Abr(url)
      } catch {
        instance = null
      }

      return instance
    },

    get() {
      return instance
    },

    isReady() {
      return Boolean(instance)
    },
  }
})()

export function useApp() {
  return abr.get()
}

export default abr
