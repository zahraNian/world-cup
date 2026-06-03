/**
 * @returns {boolean}
 */
export function isSSR() {
  return typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.SSR
}
