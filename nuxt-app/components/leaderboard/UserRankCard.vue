<script setup lang="ts">
import type { AppTheme } from '~/types'
import { Crown, Medal, Target, Users } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    theme: AppTheme
    rank: number
    score: number
    correctPredictions?: number
    referredFriends?: number
  }>(),
  {
    correctPredictions: 12,
    referredFriends: 3,
  },
)

const themeClasses = computed(() => useThemeClasses(props.theme))
</script>

<template>
  <div
    class="flex items-center gap-2 p-2.5 rounded-lg border-r-2 transition-all"
    :class="[themeClasses.lightBg, themeClasses.borderRight]"
  >
    <div class="w-7 flex justify-center">
      <div
        v-if="rank === 1"
        class="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md"
      >
        <Crown class="w-3.5 h-3.5 text-white" />
      </div>
      <div
        v-else-if="rank === 2"
        class="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-md"
      >
        <Medal class="w-3.5 h-3.5 text-white" />
      </div>
      <div
        v-else-if="rank === 3"
        class="w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-md"
      >
        <Medal class="w-3.5 h-3.5 text-white" />
      </div>
      <span v-else class="text-xs font-bold" :class="themeClasses.text">{{ rank }}</span>
    </div>

    <div class="flex-1 min-w-0">
      <div class="text-xs font-semibold truncate" :class="themeClasses.accentDark">شما</div>
      <div class="flex items-center gap-2 mt-0.5">
        <div class="flex items-center gap-0.5 text-[10px] text-fg-muted">
          <Target class="w-2.5 h-2.5" />
          <span>{{ correctPredictions }}</span>
        </div>
        <div class="flex items-center gap-0.5 text-[10px] text-fg-muted">
          <Users class="w-2.5 h-2.5" />
          <span>{{ referredFriends }}</span>
        </div>
      </div>
    </div>

    <div class="text-xs font-bold" :class="themeClasses.text">
      {{ formatFaNumber(score) }}
    </div>
  </div>
</template>
