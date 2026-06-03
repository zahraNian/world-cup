<script setup lang="ts">
import type { AppTheme } from '~/types'
import { Info } from 'lucide-vue-next'
import { matches, matchFilters } from '~/data/mock'
import type { PredictionChoice } from '~/types'
import { TrendingUp, Award, Target, Users } from 'lucide-vue-next'

const props = defineProps<{ theme: AppTheme }>()

const activeFilter = ref<string>(matchFilters[0])
const predictions = ref<Record<number, PredictionChoice>>({})

const stats = computed(() => [
  { icon: TrendingUp, label: 'مجموع جوایز', value: '۲,۵۰۰,۰۰۰', gradient: 'from-blue-500 to-blue-600' },
  { icon: Award, label: 'جوایز در انتظار تسویه', value: '۳۵۰,۰۰۰', gradient: 'from-purple-500 to-purple-600' },
  {
    icon: Target,
    label: 'پیش‌بینی‌های صحیح',
    value: '۲۸ مورد',
    gradient: props.theme === 'orange' ? 'from-[#FF6600] to-[#FF4500]' : 'from-[#28A745] to-[#218838]',
  },
  { icon: Users, label: 'دوستان دعوت شده', value: '۱۲ نفر', gradient: 'from-pink-500 to-pink-600' },
])

function handlePredict(matchId: number, prediction: PredictionChoice) {
  predictions.value = { ...predictions.value, [matchId]: prediction }
}
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <UiStatCard v-for="(stat, index) in stats" :key="index" :icon="stat.icon" :label="stat.label" :value="stat.value"
        :gradient="stat.gradient" />
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

    <UiAppCard>
      <h2 class="text-base font-bold text-fg mb-4">
        لیست مسابقات و پیش‌بینی رویدادهای زنده
      </h2>

      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin mb-4">
        <UiThemeButton v-for="filterName in matchFilters" :key="filterName" :theme="theme"
          :active="activeFilter === filterName" @click="activeFilter = filterName">
          {{ filterName }}
        </UiThemeButton>
      </div>

      <div class="match-list max-h-[365px] overflow-y-auto scrollbar-thin">
        <MatchesMatchCard
          v-for="match in matches"
          :key="match.id"
          v-bind="match"
          :theme="theme"
          :prediction="predictions[match.id]"
          @predict="handlePredict(match.id, $event)"
        />
      </div>
    </UiAppCard>
  </div>
</template>
