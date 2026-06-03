import { emit, EventNames } from '~/shared/utils/emitter.js'
import { useUserStore } from '~/stores/user.js'

export const SEVERITY = Object.freeze({
  FATAL: 'fatal',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
})

const config = {
  logging: import.meta.env.DEV,
}

export function handleError(error, opts = {}) {
  const normalized = normalize(error)

  if (opts.severity) {
    normalized.severity = opts.severity
  }

  if (config.logging) {
    const logLevel = opts.severity === 'warning' ? 'warn' : 'error'
    console[logLevel]('[ERROR]', {
      kind: normalized.kind,
      code: normalized.code,
      message: normalized.message,
      status: normalized.status,
      ...(opts.context && { context: opts.context }),
    })
  }

  handleSideEffects(normalized)

  return normalized
}

export function safe(fn, context) {
  return (...args) => {
    try {
      const result = fn(...args)
      if (result?.catch) {
        result.catch((err) =>
          handleError(err, {
            notify: false,
            severity: SEVERITY.WARNING,
            context,
          }),
        )
      }
      return result
    } catch (err) {
      handleError(err, {
        notify: false,
        severity: SEVERITY.WARNING,
        context,
      })
    }
  }
}

export function getFieldErrors(error) {
  if (!error) return {}
  if (error.kind === 'validation' && error.fields) {
    return error.fields
  }
  if (!error.kind) {
    const normalized = normalize(error)
    if (normalized.kind === 'validation' && normalized.fields) {
      return normalized.fields
    }
  }
  return {}
}

function normalize(error) {
  if (error?.kind && error?.raw) return error

  const status = error?.response?.status || error?.status || null
  const code = error?.code || error?.response?.data?.code || null
  const message = error?.message || error?.response?.data?.message || null
  const kind = inferKind(code, status, message)
  const fields = kind === 'validation' ? extractFields(error) : {}
  const retryable = ['network', 'timeout', 'server'].includes(kind) || (status && status >= 500)

  return { kind, code, message, status, fields, retryable, raw: error }
}

function inferKind(code, status, message) {
  if (code === 'COMMAND_VALIDATION_ERROR' || status === 400 || status === 422) {
    return 'validation'
  }

  if (status === 401 || ['UNAUTHORIZED', 'INVALID_TOKEN', 'TOKEN_EXPIRED'].includes(code)) {
    return 'auth'
  }

  if (status === 403 || code === 'FORBIDDEN') {
    return 'forbidden'
  }

  if (status === 408 || code === 'REQUEST_TIMEOUT_EXCEEDED' || code === 'TIMEOUT') {
    return 'timeout'
  }

  const msg = (message || '').toLowerCase()

  if (!status && (msg.includes('timeout') || msg.includes('timed out'))) {
    return 'timeout'
  }

  if (
    !status &&
    (msg.includes('network') || msg.includes('fetch') || msg.includes('socket') || msg.includes('disconnected'))
  ) {
    return 'network'
  }

  if (status >= 500) return 'server'

  if (code && !status) return 'domain'

  return 'unknown'
}

function extractFields(err) {
  const details = err?.data || err?.response?.data?.details || []
  const fields = {}

  for (const d of details) {
    const path = Array.isArray(d?.path) ? d.path.join('.') : d?.path
    const key = path?.split('.').pop() || d?.context?.key
    if (key) fields[key] = d?.message || ''
  }

  return fields
}

function handleSideEffects(err) {
  if (err.kind === 'auth') {
    try {
      const userStore = useUserStore()
      userStore.invalidateSession?.()
    } catch {
      // best-effort
    }
    emit(EventNames.AUTH_INVALIDATED)
  }
}
