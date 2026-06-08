<script setup lang="ts">
import type { AppTheme } from '~/types'
import { Trophy, Loader2 } from 'lucide-vue-next'
import { useCampaignStore } from '~/stores/campaign'
import { useUserStore } from '~/stores/user.js'

const props = defineProps<{ theme: AppTheme }>()

const campaignStore = useCampaignStore()
const userStore = useUserStore()

const themeClasses = computed(() => useThemeClasses(props.theme))

const userRank = computed(() => {
  if (!userStore.isAuthenticated) return null
  const s = campaignStore.summary
  if (!s) return null
  return {
    correctCount: s.correctCount,
    referralCount: s.referralCount,
    totalAmount: s.totalAmount,
  }
})

onMounted(() => {
  if (!campaignStore.ranking.length) {
    campaignStore.fetchRanking()
  }
})
</script>

<template>
  <UiAppCard padding="sm" class="md:p-4">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-xs md:text-sm font-bold text-fg">جدول رتبه‌بندی</h2>
      <Trophy class="w-4 h-4" :class="themeClasses.text" />
    </div>

    <div v-if="campaignStore.rankingLoading && !campaignStore.ranking.length" class="py-6 flex justify-center">
      <Loader2 class="w-5 h-5 animate-spin text-fg-muted" />
    </div>

    <div v-else-if="!campaignStore.ranking.length" class="py-6 text-center text-xs text-fg-muted">
      هنوز رتبه‌بندی ثبت نشده است.
    </div>

    <div v-else class="space-y-1.5 overflow-hidden">
      <LeaderboardUserRankCard
        v-if="userRank"
        :theme="theme"
        :correct-count="userRank.correctCount"
        :referral-count="userRank.referralCount"
        :total-amount="userRank.totalAmount"
      />
      <LeaderboardRow
        v-for="entry in campaignStore.ranking"
        :key="entry.rank"
        :theme="theme"
        :entry="entry"
      />
    </div>

    <div class="mt-4 pt-4 border-t border-line">
      <p class="text-[10px] text-fg-muted text-center leading-relaxed">
        امتیاز از مجموع پیش‌بینی‌های صحیح و دعوت از دوستان محاسبه می‌شود.
      </p>
    </div>
  </UiAppCard>
</template>
