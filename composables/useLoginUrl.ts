import { getLoginUrl } from '~/shared/utils/url/getLoginUrl.js'

export function useLoginUrl() {
  const loginUrl = ref('')

  onMounted(() => {
    loginUrl.value = getLoginUrl()
  })

  return { loginUrl }
}
