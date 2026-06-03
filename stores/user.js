import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import ssrCookies from '~/shared/utils/ssrCookies.js'
import { getAbrTokenCookie } from '~/shared/auth/setupAbrAuthBus.js'
import { useApp } from '~/shared/utils/abr.js'
import getDomain from '~/shared/utils/url/getDomain.js'
import { api } from '~/shared/api/api.js'
import { safe } from '~/shared/errors/index.js'
import { TR_ERR_SCOPE } from '~/shared/constants/trErrScope.js'
import { ERROR_SOURCE, ABR_EVENT, ERROR_COMPONENT } from '~/shared/constants/errorContext.js'

export const useUserStore = defineStore('user', () => {
  const userData = ref({})
  const avatar = ref()
  const isLoading = ref(false)
  const tokenVerified = ref(false)
  const authCheckSettled = ref(false)
  const panelSettings = ref(null)

  const getToken = () => ssrCookies?.get('token') || ssrCookies?.get('user_token')

  const getUserLevel = computed(() => Number(userData.value?.level ?? 0))
  const isUserVerified = computed(() => getUserLevel.value >= 1)

  const isAuthenticated = computed(() => {
    const authToken = getToken()
    return !!authToken && tokenVerified.value
  })

  /** Only `token` is verified by @abr/client (not user_token alone). */
  const isCheckingAuth = computed(() => {
    return !!getAbrTokenCookie() && !tokenVerified.value && !authCheckSettled.value
  })

  function setTokenVerified() {
    tokenVerified.value = true
    authCheckSettled.value = true
  }

  function resetTokenVerification() {
    tokenVerified.value = false
  }

  function settleAuthCheck() {
    authCheckSettled.value = true
  }

  function removeAuthCookies(tokenNames = ['token', 'user_token']) {
    if (typeof window === 'undefined') return
    const hostname = window.location.hostname
    const domain =
      hostname === 'localhost' || hostname === '127.0.0.1' ? '' : `.${getDomain()}`
    for (const name of tokenNames) {
      try {
        ssrCookies.remove(name, { path: '/', ...(domain ? { domain } : {}) })
      } catch {
        // best-effort
      }
    }
  }

  async function waitForAuthentication(maxWaitTime = 5000) {
    if (isAuthenticated.value) return true
    if (!getToken()) return false

    const app = useApp()
    if (!app?.$abr?.bus) return false

    return new Promise((resolve) => {
      let resolved = false
      let timeoutId

      let tokenSub

      const cleanup = () => {
        if (!resolved) {
          resolved = true
          try {
            tokenSub?.cancel?.()
          } catch {
            // ignore
          }
          clearTimeout(timeoutId)
        }
      }

      const onTokenVerified = safe(
        () => {
          cleanup()
          resolve(isAuthenticated.value)
        },
        {
          source: ERROR_SOURCE.ABR_BUS,
          event: ABR_EVENT.TOKEN_VERIFIED,
          component: ERROR_COMPONENT.USER_STORE,
        },
      )

      timeoutId = setTimeout(() => {
        cleanup()
        resolve(isAuthenticated.value)
      }, maxWaitTime)

      try {
        tokenSub = app.$abr.bus.subscribe('tokenVerified', onTokenVerified)
      } catch {
        // ignore
      }

      if (tokenVerified.value) {
        cleanup()
        resolve(true)
      }
    })
  }

  async function fetchUserInfo() {
    if (isLoading.value) return null

    const token = getToken()
    if (!token) return null

    isLoading.value = true

    try {
      const isAuth = await waitForAuthentication()
      if (!isAuth) {
        return null
      }

      const app = useApp()
      if (!app) return null

      const response = await api(app.User.User.lists.user.info(), { scope: TR_ERR_SCOPE.USER })
      userData.value = response
      return response
    } catch {
      invalidateSession()
      return null
    } finally {
      isLoading.value = false
    }
  }

  function invalidateSession() {
    userData.value = {}
    avatar.value = null
    isLoading.value = false
    panelSettings.value = null
    resetTokenVerification()
    authCheckSettled.value = true
    removeAuthCookies()
  }

  async function setUserLogout() {
    try {
      const app = useApp()
      if (!app) return null
      await api(app.User.Auth.logout().await('loggedOut'), { scope: TR_ERR_SCOPE.USER })
      return true
    } catch {
      return null
    } finally {
      userData.value = {}
      resetTokenVerification()
      removeAuthCookies(['token'])
    }
  }

  return {
    userData,
    avatar,
    isLoading,
    tokenVerified,
    panelSettings,
    isUserVerified,
    isAuthenticated,
    isCheckingAuth,
    getUserLevel,
    fetchUserInfo,
    setUserLogout,
    setTokenVerified,
    resetTokenVerification,
    settleAuthCheck,
    waitForAuthentication,
    invalidateSession,
  }
})
