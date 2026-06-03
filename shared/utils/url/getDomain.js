/**
 * Return the base domain of the website (last two hostname parts, or from env).
 * @returns {string}
 */
export default function getDomain() {
  if (import.meta?.env?.VITE_PUBLIC_DOMAIN) {
    return import.meta.env.VITE_PUBLIC_DOMAIN
  }

  if (import.meta?.env?.VITE_ABR_URL) {
    const hostname = import.meta.env.VITE_ABR_URL.split(':')[0]
    const parts = hostname.split('.')

    if (parts.length === 1 || /^[0-9.]+$/.test(hostname)) {
      return hostname
    }

    return parts.slice(-2).join('.')
  }

  if (typeof window !== 'undefined' && window.location?.hostname) {
    const hostname = window.location.hostname.split(':')[0]
    const parts = hostname.split('.')

    if (parts.length === 1 || /^[0-9.]+$/.test(hostname)) {
      return hostname
    }

    return parts.slice(-2).join('.')
  }

  return 'localhost'
}
