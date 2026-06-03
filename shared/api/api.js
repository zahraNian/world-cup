import { handleError, getFieldErrors } from '~/shared/errors/index.js'

export { getFieldErrors }

/**
 * @param {Object} request - ABR request with .send()
 * @param {Object} [opts]
 */
export async function api(request, opts = {}) {
  if (!request?.send) {
    throw new Error('Invalid request: missing send() method')
  }

  try {
    return await request.send()
  } catch (error) {
    throw handleError(error, opts)
  }
}

export default api
