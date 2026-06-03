import { setSsrCookieContext } from '~/shared/utils/ssrCookies.js'

export default defineNuxtPlugin(() => {
  const event = useRequestEvent()
  if (event?.node?.req) {
    setSsrCookieContext({ req: event.node.req })
  }
})
