<script setup lang="ts">
import type { AppTheme } from '~/types'
import { Palette, LogIn } from 'lucide-vue-next'

const props = defineProps<{
  theme: AppTheme
  isLoggedIn: boolean
  userEmail?: string
}>()

const emit = defineEmits<{ themeToggle: [] }>()

const themeClasses = computed(() => useThemeClasses(props.theme))
</script>

<template>
  <header class="sticky top-0 z-50 relative overflow-hidden border-b border-white/10 shadow-lg shadow-black/20 backdrop-blur-xl">
    <div class="absolute inset-0 bg-[#0b0f17]/35" aria-hidden="true" />

    <div class="relative max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 sm:gap-3">
          <div v-if="isLoggedIn" class="flex items-center gap-2">
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center ring-2 ring-white/30">
              <span class="text-xs sm:text-sm">👤</span>
            </div>
            <span class="text-xs sm:text-sm text-white/90 hidden sm:inline">{{ userEmail }}</span>
          </div>
          <button
            v-else
            type="button"
            class="text-white px-4 sm:px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-lg hover:opacity-90 flex items-center gap-2"
            :class="themeClasses.gradient"
          >
            <LogIn class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span class="text-xs sm:text-sm">ورود</span>
          </button>

          <button
            type="button"
            class="p-1.5 sm:p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors backdrop-blur-sm"
            title="تغییر تم"
            @click="emit('themeToggle')"
          >
            <Palette class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div class="text-center flex-1">
          <h1 class="text-sm sm:text-lg md:text-xl font-bold text-white drop-shadow-md">
            کمپین پیش‌بینی جام جهانی ۲۰۲۶
          </h1>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <a href="#" class="text-xs sm:text-sm text-white/85 hover:text-white hidden sm:inline transition-colors">
            صرافی
          </a>
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
            <span class="text-white text-base sm:text-lg">⚽</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
