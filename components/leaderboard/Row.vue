<script setup lang="ts">
import type { AppTheme, LeaderboardUser } from '~/types'
import { Crown, Medal, Target, Users } from 'lucide-vue-next'

const props = defineProps<{
  theme: AppTheme
  user: LeaderboardUser
}>()

const themeClasses = computed(() => useThemeClasses(props.theme))
</script>

<template>
  <div
    class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-surface-hover transition-all"
  >
    <div class="w-7 flex justify-center">
      <div
        v-if="user.rank === 1"
        class="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md"
      >
        <Crown class="w-3.5 h-3.5 text-white" />
      </div>
      <div
        v-else-if="user.rank === 2"
        class="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-md"
      >
        <Medal class="w-3.5 h-3.5 text-white" />
      </div>
      <div
        v-else-if="user.rank === 3"
        class="w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-md"
      >
        <Medal class="w-3.5 h-3.5 text-white" />
      </div>
      <span v-else class="text-xs font-bold text-fg-muted">{{ user.rank }}</span>
    </div>

    <div class="flex-1 min-w-0">
      <div class="text-xs font-medium text-fg truncate">{{ user.name }}</div>
      <div class="flex items-center gap-2 mt-0.5">
        <div class="flex items-center gap-0.5 text-[10px] text-fg-muted">
          <Target class="w-2.5 h-2.5" />
          <span>{{ user.correctPredictions }}</span>
        </div>
        <div class="flex items-center gap-0.5 text-[10px] text-fg-muted">
          <Users class="w-2.5 h-2.5" />
          <span>{{ user.referredFriends }}</span>
        </div>
      </div>
    </div>

    <div class="text-xs font-bold" :class="themeClasses.text">
      {{ formatFaNumber(user.score) }}
    </div>
  </div>
</template>
