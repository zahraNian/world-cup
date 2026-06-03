<script setup lang="ts">
import type { AppTheme, PredictionRecord, PredictionStatus } from '~/types'
import { History, Star } from 'lucide-vue-next'
import { predictionHistory } from '~/data/mock'

const props = defineProps<{ theme: AppTheme }>()

const currentPage = ref(1)
const itemsPerPage = 5
const currentUserPredictionId = 1

const themeClasses = computed(() => useThemeClasses(props.theme))

const totalPages = computed(() => Math.ceil(predictionHistory.length / itemsPerPage))

const paginatedData = computed(() =>
  predictionHistory.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage,
  ),
)

const statusBadges: Record<PredictionStatus, { bg: string; text: string; label: string }> = {
  won: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'برنده' },
  lost: { bg: 'bg-red-500/15', text: 'text-red-400', label: 'بازنده' },
  pending: { bg: 'bg-orange-500/15', text: 'text-orange-400', label: 'در انتظار نتیجه' },
}

</script>

<template>
  <UiAppCard padding="lg">
    <div class="flex items-center gap-2 mb-4">
      <History class="w-5 h-5" :class="themeClasses.text" />
      <h2 class="text-sm md:text-base font-bold text-fg">
        تاریخچه کامل پیش‌بینی‌های شما
      </h2>
    </div>

    <div class="hidden md:block overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b-2 border-line-strong">
            <th class="text-right py-2.5 px-3 text-xs font-bold text-fg-muted">تاریخ</th>
            <th class="text-right py-2.5 px-3 text-xs font-bold text-fg-muted">مسابقه</th>
            <th class="text-right py-2.5 px-3 text-xs font-bold text-fg-muted">انتخاب شما</th>
            <th class="text-right py-2.5 px-3 text-xs font-bold text-fg-muted">نتیجه نهایی</th>
            <th class="text-right py-2.5 px-3 text-xs font-bold text-fg-muted">وضعیت</th>
            <th class="text-left py-2.5 px-3 text-xs font-bold text-fg-muted">پاداش</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in paginatedData"
            :key="record.id"
            class="border-b border-line hover:bg-white/[0.06] transition-all"
          >
            <td class="py-3 px-3 text-xs text-fg-secondary">{{ record.date }}</td>
            <td class="py-3 px-3 text-xs text-fg font-medium">
              <div class="flex items-center gap-1.5">
                {{ record.match }}
              </div>
            </td>
            <td class="py-3 px-3 text-xs text-fg-secondary">{{ record.userChoice }}</td>
            <td class="py-3 px-3 text-xs text-fg-secondary">{{ record.result }}</td>
            <td class="py-3 px-3">
              <UiStatusBadge
                :label="statusBadges[record.status].label"
                :bg-class="statusBadges[record.status].bg"
                :text-class="statusBadges[record.status].text"
              />
            </td>
            <td class="py-3 px-3 text-left">
              <span v-if="record.reward > 0" class="text-xs font-bold" :class="themeClasses.text">
                +{{ formatFaNumber(record.reward) }}
              </span>
              <span v-else class="text-fg-faint text-xs">-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="md:hidden space-y-2">
      <div
        v-for="record in paginatedData"
        :key="record.id"
        class="rounded-lg p-3 space-y-2 transition-all glass-inset"
      >
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-fg-muted">{{ record.date }}</span>
          <UiStatusBadge
            :label="statusBadges[record.status].label"
            :bg-class="statusBadges[record.status].bg"
            :text-class="statusBadges[record.status].text"
          />
        </div>
        <div class="text-xs font-bold text-fg flex items-center gap-1.5">
          {{ record.match }}
        </div>
        <div class="text-xs text-fg-secondary">
          <span class="text-fg-muted">انتخاب:</span> {{ record.userChoice }}
        </div>
        <div class="text-xs text-fg-secondary">
          <span class="text-fg-muted">نتیجه:</span> {{ record.result }}
        </div>
        <div v-if="record.reward > 0" class="text-xs font-bold" :class="themeClasses.text">
          +{{ formatFaNumber(record.reward) }} تومان
        </div>
      </div>
    </div>

    <UiPagination
      :theme="theme"
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:current-page="currentPage = $event"
    />
  </UiAppCard>
</template>
