<script setup lang="ts">
import type { AppTheme } from '~/types'
import { Trophy } from 'lucide-vue-next'
import { topUsers } from '~/data/mock'

const props = withDefaults(
  defineProps<{
    theme: AppTheme
    currentUserRank?: number
    currentUserScore?: number
  }>(),
  {
    currentUserRank: 45,
    currentUserScore: 890,
  },
)

const themeClasses = computed(() => useThemeClasses(props.theme))
</script>

<template>
  <UiAppCard padding="sm" class="md:p-4">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-xs md:text-sm font-bold text-fg">جدول رتبه‌بندی</h2>
      <Trophy class="w-4 h-4" :class="themeClasses.text" />
    </div>

    <div class="space-y-1.5 overflow-hidden">
      <LeaderboardUserRankCard
        :theme="theme"
        :rank="currentUserRank"
        :score="currentUserScore"
      />
      <LeaderboardRow v-for="user in topUsers" :key="user.rank" :theme="theme" :user="user" />
    </div>

    <div class="mt-4 pt-4 border-t border-line">
      <p class="text-[10px] text-fg-muted text-center leading-relaxed">
        امتیاز از مجموع پیش‌بینی‌های صحیح و دعوت از دوستان محاسبه می‌شود.
      </p>
    </div>
  </UiAppCard>
</template>
