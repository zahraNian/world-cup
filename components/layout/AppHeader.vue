<script setup lang="ts">
import type { AppTheme } from '~/types'
import { LogIn, Loader2 } from 'lucide-vue-next'
import { useUserStore } from '~/stores/user.js'
import { getLoginUrl } from '~/shared/utils/url/getLoginUrl.js'

const props = defineProps<{
  theme: AppTheme
}>()

const userStore = useUserStore()
const { brand } = useBrand()
const themeClasses = computed(() => useThemeClasses(props.theme))

const loginUrl = computed(() => {
  if (import.meta.client) {
    return getLoginUrl()
  }
  return '#'
})

const userEmail = computed(() => {
  const data = userStore.userData as { email?: string; mobile?: string }
  return data?.email || data?.mobile || ''
})

onMounted(() => {
  if (userStore.isAuthenticated || userStore.isCheckingAuth) {
    userStore.fetchUserInfo()
  }
})
</script>

<template>
  <header class="sticky top-0 z-50 relative overflow-hidden border-b border-white/10 shadow-lg shadow-black/20 backdrop-blur-xl">
    <div class="absolute inset-0 bg-[#0b0f17]/35" aria-hidden="true" />

    <div class="relative max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 sm:gap-3">
          <div v-if="userStore.isAuthenticated" class="flex items-center gap-2">
            <img
              src="/images/user.png"
              alt=""
              class="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-white/30 shrink-0"
            />
            <span class="text-xs sm:text-sm text-white/90 hidden sm:inline">{{ userEmail }}</span>
          </div>

          <div
            v-else-if="userStore.isCheckingAuth"
            class="flex items-center gap-2 px-4 py-2 text-white/70"
            aria-busy="true"
          >
            <Loader2 class="w-4 h-4 animate-spin" />
            <span class="text-xs sm:text-sm hidden sm:inline">در حال بررسی...</span>
          </div>

          <a
            v-else
            :href="loginUrl"
            class="text-white px-4 sm:px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-lg hover:opacity-90 flex items-center gap-2"
            :class="themeClasses.gradient"
          >
            <LogIn class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span class="text-xs sm:text-sm">ورود/ثبت‌نام</span>
          </a>

        </div>

        <div class="text-center flex-1">
          <h1 class="text-sm sm:text-lg md:text-xl font-bold text-white drop-shadow-md">
            {{ brand.title }}
          </h1>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <a
            :href="brand.exchangeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs sm:text-sm text-white/85 hover:text-white hidden sm:inline transition-colors"
          >
            {{ brand.exchangeName }}
          </a>
          <a
            :href="brand.exchangeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="block shrink-0"
          >
            <img
              :src="brand.logoUrl"
              :alt="brand.logoAlt"
              class="h-7 sm:h-8 w-auto max-w-[7rem] sm:max-w-[8rem] object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
