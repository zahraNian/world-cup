import getDomain from './getDomain.js'

/**
 * External login URL (app.{domain}/login or localhost login app).
 * @returns {string}
 */
export function getLoginUrl() {
  if (typeof window === 'undefined') {
    const domain = getDomain()
    if (domain === 'localhost' || domain === '127.0.0.1') {
      const port = import.meta.env.VITE_LOGIN_PORT || '8081'
      return `http://localhost:${port}/login`
    }
    return `https://app.${domain}/login`
  }

  const hostname = window.location.hostname
  const isLocal =
    hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('localhost')

  if (isLocal) {
    const port = import.meta.env.VITE_LOGIN_PORT || '8081'
    return `http://${hostname}:${port}/login`
  }

  const domain = getDomain()
  return `https://app.${domain}/login`
}
