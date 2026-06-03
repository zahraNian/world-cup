import { onBeforeMount, onScopeDispose } from 'vue'
import { useUserStore } from '~/stores/user.js'
import {
  setupAbrAuthBus,
  waitForAbrTokenVerification,
  getAbrTokenCookie,
} from '~/shared/auth/setupAbrAuthBus.js'
import { useApp } from '~/shared/utils/abr.js'

let activeCleanup = null

/**
 * Auth-related ABR bus subscriptions (consumer-only).
 */
export function useAbrBusSubscriptions() {
  const userStore = useUserStore()

  const start = async () => {
    const app = useApp()
    activeCleanup = setupAbrAuthBus(userStore, app)

    if (app && shouldWaitForVerification(userStore)) {
      await waitForAbrTokenVerification(userStore, app)
    }
  }

  onBeforeMount(() => {
    void start()
  })

  onScopeDispose(() => {
    try {
      activeCleanup?.()
    } catch {
      // ignore
    }
    activeCleanup = null
  })

  return { start }
}

function shouldWaitForVerification(userStore) {
  return Boolean(getAbrTokenCookie()) && !userStore.tokenVerified
}
