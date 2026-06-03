import { Auth } from '@abr/client'
import { useApp } from '~/shared/utils/abr.js'
import { subscribe as subscribeEmitter, EventNames } from '~/shared/utils/emitter.js'
import { safe, handleError, SEVERITY } from '~/shared/errors/index.js'
import { ERROR_SOURCE, ABR_EVENT, ERROR_COMPONENT } from '~/shared/constants/errorContext.js'
import ssrCookies from '~/shared/utils/ssrCookies.js'

let authBusCleanup = null
let verificationPromise = null

/**
 * Cookie name @abr/client reads for sendToken (not user_token).
 */
export function getAbrTokenCookie() {
  return ssrCookies.get('token') || (typeof window !== 'undefined' ? Auth.getToken() : undefined)
}

/**
 * Register auth bus handlers and sync tokenVerified from ABR auth state.
 * @returns {() => void} cleanup
 */
export function setupAbrAuthBus(userStore, app = useApp()) {
  if (authBusCleanup) {
    syncTokenVerifiedFromAbr(userStore, app)
    return authBusCleanup
  }

  const onAuthInvalidated = safe(
    () => {
      userStore.invalidateSession?.()
    },
    {
      source: ERROR_SOURCE.EMITTER,
      event: EventNames.AUTH_INVALIDATED,
      component: ERROR_COMPONENT.ABR_BUS_SUBSCRIPTIONS,
    },
  )
  const offAuth = subscribeEmitter(EventNames.AUTH_INVALIDATED, onAuthInvalidated)

  const bus = app?.$abr?.bus
  if (!bus) {
    if (import.meta.env.DEV) {
      console.warn('[abr-auth] bus not ready; will retry when connection exists')
    }
    return () => {
      try {
        offAuth()
      } catch (error) {
        handleError(error, { notify: false, severity: SEVERITY.WARNING })
      }
    }
  }

  const handlers = {
    tokenVerified: safe(
      () => {
        userStore.setTokenVerified()
      },
      {
        source: ERROR_SOURCE.ABR_BUS,
        event: ABR_EVENT.TOKEN_VERIFIED,
        component: ERROR_COMPONENT.ABR_BUS_SUBSCRIPTIONS,
      },
    ),
    tokenRemoved: safe(
      () => {
        userStore.invalidateSession?.()
      },
      {
        source: ERROR_SOURCE.ABR_BUS,
        event: ABR_EVENT.TOKEN_REMOVED,
        component: ERROR_COMPONENT.ABR_BUS_SUBSCRIPTIONS,
      },
    ),
  }

  const subscriptions = []

  Object.entries(handlers).forEach(([event, handler]) => {
    try {
      const sub = bus.subscribe(event, handler)
      if (sub?.cancel) subscriptions.push(sub)
    } catch (error) {
      handleError(error, { notify: false, severity: SEVERITY.WARNING })
    }
  })

  syncTokenVerifiedFromAbr(userStore, app)

  authBusCleanup = () => {
    subscriptions.forEach((sub) => {
      try {
        sub.cancel()
      } catch (error) {
        handleError(error, { notify: false, severity: SEVERITY.WARNING })
      }
    })
    try {
      offAuth()
    } catch (error) {
      handleError(error, { notify: false, severity: SEVERITY.WARNING })
    }
    authBusCleanup = null
  }

  return authBusCleanup
}

export function syncTokenVerifiedFromAbr(userStore, app = useApp()) {
  if (app?.$abr?.auth?.tokenVerified) {
    userStore.setTokenVerified()
    return true
  }
  return false
}

/**
 * ABR resolves before sendToken finishes; wait for verify or fail so UI does not hang.
 */
export function waitForAbrTokenVerification(userStore, app = useApp(), maxWaitTime = 5000) {
  if (verificationPromise) {
    return verificationPromise
  }

  if (!getAbrTokenCookie()) {
    return Promise.resolve(false)
  }

  if (syncTokenVerifiedFromAbr(userStore, app)) {
    return Promise.resolve(true)
  }

  const bus = app?.$abr?.bus
  if (!bus) {
    return Promise.resolve(false)
  }

  verificationPromise = new Promise((resolve) => {
    let settled = false

    const finish = (verified) => {
      if (settled) return
      settled = true
      clearTimeout(timeoutId)
      try {
        verifiedSub?.cancel?.()
      } catch {
        // ignore
      }
      try {
        removedSub?.cancel?.()
      } catch {
        // ignore
      }
      verificationPromise = null
      resolve(verified)
    }

    const verifiedSub = bus.subscribe('tokenVerified', () => {
      userStore.setTokenVerified()
      finish(true)
    })

    const removedSub = bus.subscribe('tokenRemoved', () => {
      userStore.invalidateSession?.()
      finish(false)
    })

    const timeoutId = setTimeout(() => {
      const verified = Boolean(app?.$abr?.auth?.tokenVerified)
      if (verified) {
        userStore.setTokenVerified()
      } else {
        userStore.settleAuthCheck?.()
      }
      finish(verified)
    }, maxWaitTime)
  })

  return verificationPromise
}
