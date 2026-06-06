<script setup lang="ts">
import type { AppTheme } from '~/types'
import { Crown, Medal, Target, Users } from 'lucide-vue-next'

const props = defineProps<{
  theme: AppTheme
  correctCount: number
  referralCount: number
  totalPrize: number
}>()

const themeClasses = computed(() => useThemeClasses(props.theme))
</script>

<template>
  <div
    class="flex items-center gap-2 p-2.5 rounded-lg border-r-2 transition-all"
    :class="[themeClasses.lightBg, themeClasses.borderRight]"
  >
    <div class="w-7 flex justify-center">
      <span class="text-xs font-bold" :class="themeClasses.text">—</span>
    </div>

    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold truncate" :class="themeClasses.accentDark">شما</div>
      <div class="flex items-center gap-2 mt-0.5">
        <div class="flex items-center gap-0.5 text-[10px] text-fg-muted">
          <Target class="w-2.5 h-2.5" />
          <span>{{ correctCount }}</span>
        </div>
        <div class="flex items-center gap-0.5 text-[10px] text-fg-muted">
          <Users class="w-2.5 h-2.5" />
          <span>{{ referralCount }}</span>
        </div>
      </div>
    </div>

    <div class="text-xs font-bold" :class="themeClasses.text">
      {{ formatFaNumber(totalPrize) }}
    </div>
  </div>
</template>
