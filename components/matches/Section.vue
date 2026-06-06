<script setup lang="ts">
import type { AppTheme, QuestionFilter } from '~/types'
import { Info, TrendingUp, Award, Target, Users, Loader2 } from 'lucide-vue-next'
import { QUESTION_FILTERS } from '~/shared/constants/campaign.js'
import { useCampaignStore } from '~/stores/campaign'

const props = defineProps<{ theme: AppTheme }>()

const campaignStore = useCampaignStore()

const stats = computed(() => {
  const s = campaignStore.summary
  const themeGradient =
    props.theme === 'nipoto' ? 'from-[#FF9270] to-[#E0715F]' : 'from-[#009B87] to-[#007A6B]'

  if (!s) {
    return [
      { icon: TrendingUp, label: 'مجموع جوایز', value: '—', gradient: 'from-blue-500 to-blue-600' },
      { icon: Award, label: 'جایزه هر پاسخ صحیح', value: '—', gradient: 'from-purple-500 to-purple-600' },
      { icon: Target, label: 'پیش‌بینی‌های صحیح', value: '—', gradient: themeGradient },
      { icon: Users, label: 'دوستان دعوت شده', value: '—', gradient: 'from-pink-500 to-pink-600' },
    ]
  }

  return [
    {
      icon: TrendingUp,
      label: 'مجموع جوایز',
      value: `${formatFaNumber(s.totalPrize)} تومان`,
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Award,
      label: 'جایزه هر پاسخ صحیح',
      value: `${formatFaNumber(s.prizePerCorrectAnswer)} تومان`,
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      icon: Target,
      label: 'پیش‌بینی‌های صحیح',
      value: `${formatFaNumber(s.correctCount)} از ${formatFaNumber(s.totalQuestions)}`,
      gradient: themeGradient,
    },
    {
      icon: Users,
      label: 'دوستان دعوت شده',
      value: `${formatFaNumber(s.referralCount)} نفر`,
      gradient: 'from-pink-500 to-pink-600',
    },
  ]
})

function handleFilterChange(filterValue: QuestionFilter) {
  campaignStore.setFilter(filterValue)
}

onMounted(() => {
  campaignStore.fetchQuestions()
})
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <UiStatCard
        v-for="(stat, index) in stats"
        :key="index"
        :icon="stat.icon"
        :label="stat.label"
        :value="stat.value"
        :gradient="stat.gradient"
      />
    </div>

    <div class="rounded-xl p-3 border border-blue-400/20 bg-blue-500/10 backdrop-blur-md">
      <div class="flex items-start gap-2">
        <Info class="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-400" />
        <p class="text-xs leading-relaxed text-blue-200/90">
          <strong>نحوه محاسبه پاداش:</strong>
          برای هر پیش‌بینی صحیح، مبلغ جایزه به حساب شما واریز می‌شود. دعوت از دوستان نیز امتیاز اضافی دارد.
        </p>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
    >
      <div
        v-if="campaignStore.errorMessage"
        class="rounded-lg px-3 py-2 text-xs bg-red-500/15 text-red-300 border border-red-500/20 flex items-center justify-between gap-2"
      >
        <span>{{ campaignStore.errorMessage }}</span>
        <button type="button" class="text-red-200 hover:text-white" @click="campaignStore.clearError()">
          ✕
        </button>
      </div>
    </Transition>

    <UiAppCard>
      <h2 class="text-base font-bold text-fg mb-4">
        لیست مسابقات و پیش‌بینی رویدادهای زنده
      </h2>

      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin mb-4">
        <UiThemeButton
          v-for="filter in QUESTION_FILTERS"
          :key="filter.value"
          :theme="theme"
          :active="campaignStore.activeFilter === filter.value"
          @click="handleFilterChange(filter.value)"
        >
          {{ filter.label }}
        </UiThemeButton>
      </div>

      <div v-if="campaignStore.questionsLoading && !campaignStore.visibleQuestions.length" class="py-8 flex justify-center">
        <Loader2 class="w-6 h-6 animate-spin text-fg-muted" />
      </div>

      <div v-else-if="!campaignStore.visibleQuestions.length" class="py-8 text-center text-sm text-fg-muted">
        موردی برای نمایش وجود ندارد.
      </div>

      <div v-else class="match-list max-h-[365px] overflow-y-auto scrollbar-thin">
        <MatchesMatchCard
          v-for="question in campaignStore.visibleQuestions"
          :key="question.missionId"
          :theme="theme"
          :question="question"
        />
      </div>
    </UiAppCard>
  </div>
</template>
