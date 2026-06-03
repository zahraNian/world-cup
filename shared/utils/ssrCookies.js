/**
 * SSR-compatible cookie helper (request headers on server, document.cookie on client).
 */

function parseCookies(cookieString) {
  if (!cookieString) return {}

  return cookieString
    .split(';')
    .map((cookie) => cookie.trim().split('='))
    .reduce((acc, [key, value]) => {
      if (key && value) {
        acc[key] = decodeURIComponent(value)
      }
      return acc
    }, {})
}

function getClientCookie(name) {
  if (typeof document === 'undefined') return undefined
  const cookies = parseCookies(document.cookie)
  return cookies[name]
}

function setClientCookie(name, value, options = {}) {
  if (typeof document === 'undefined') return
  const { path = '/', domain, maxAge } = options
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}`
  if (domain) cookie += `; domain=${domain}`
  if (maxAge != null) cookie += `; max-age=${maxAge}`
  document.cookie = cookie
}

function removeClientCookie(name, options = {}) {
  setClientCookie(name, '', { ...options, maxAge: 0 })
}

/**
 * @param {{ req?: { headers?: { cookie?: string } } } | null} ssrContext
 */
export function createCookieHandler(ssrContext = null) {
  return {
    get(name) {
      if (ssrContext?.req) {
        const cookies = parseCookies(ssrContext.req.headers?.cookie)
        return cookies[name]
      }

      return getClientCookie(name)
    },

    set(name, value, options = {}) {
      setClientCookie(name, value, options)
    },

    remove(name, options = {}) {
      removeClientCookie(name, options)
    },
  }
}

let activeHandler = createCookieHandler()

/**
 * @param {{ req?: { headers?: { cookie?: string } } } | null} ssrContext
 */
export function setSsrCookieContext(ssrContext) {
  activeHandler = createCookieHandler(ssrContext)
}

export const ssrCookies = {
  get(name) {
    return activeHandler.get(name)
  },
  set(name, value, options) {
    return activeHandler.set(name, value, options)
  },
  remove(name, options) {
    return activeHandler.remove(name, options)
  },
}

export default ssrCookies
