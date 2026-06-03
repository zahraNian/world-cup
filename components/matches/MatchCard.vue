<script setup lang="ts">
import type { AppTheme, PredictionChoice } from '~/types'
import { Clock, Trophy, Zap, Loader2, CheckCircle2 } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    theme: AppTheme
    teamA: string
    teamB: string
    flagA: string
    flagB: string
    date: string
    time: string
    reward: number
    prediction?: PredictionChoice
    hasStarted?: boolean
  }>(),
  { hasStarted: false },
)

const emit = defineEmits<{
  predict: [choice: PredictionChoice]
}>()

const isLoading = ref(false)
const showSuccess = ref(false)

const themeClasses = computed(() => useThemeClasses(props.theme))

const voteOptions = computed(() => [
  { key: 'A' as const, label: `برد ${teamShortName(props.teamA)}` },
  { key: 'draw' as const, label: 'مساوی' },
  { key: 'B' as const, label: `برد ${teamShortName(props.teamB)}` },
])

const itemClasses = computed(() => [
  props.hasStarted
    ? 'opacity-55 border-r-transparent'
    : props.prediction
      ? `${themeClasses.value.borderRight} bg-white/[0.08]`
      : 'border-r-transparent',
])

async function handleVote(vote: PredictionChoice) {
  if (props.hasStarted || isLoading.value) return

  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  emit('predict', vote)
  isLoading.value = false
  showSuccess.value = true
  setTimeout(() => { showSuccess.value = false }, 3000)
}

function teamShortName(name: string) {
  return name.split(' ')[0]
}
</script>

<template>
  <div
    class="match-item relative px-4 py-3 transition-colors hover:bg-white/[0.06]"
    :class="itemClasses"
  >
    <!-- Card layout — عرض کم -->
    <div class="match-card-layout space-y-4">
      <div class="flex items-center justify-between gap-2" :class="{ 'blur-[0.5px]': hasStarted }">
        <div class="flex items-center gap-2 text-xs text-fg-muted min-w-0">
          <Clock class="w-4 h-4 flex-shrink-0" />
          <span class="truncate">{{ date }} • {{ time }}</span>
        </div>
        <div
          class="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm flex-shrink-0"
          :class="themeClasses.lightBg"
        >
          <Trophy class="w-3.5 h-3.5" />
          <span>{{ formatFaNumber(reward) }} تومان</span>
        </div>
      </div>

      <div class="flex items-center justify-between gap-2" :class="{ 'blur-[0.5px]': hasStarted }">
        <div class="flex flex-col items-center gap-2 flex-1 min-w-0">
          <div class="text-2xl leading-none">{{ flagA }}</div>
          <div class="text-sm font-bold text-fg text-center truncate w-full px-1">{{ teamA }}</div>
        </div>

        <div class="px-2 sm:px-4 flex flex-col items-center gap-1 flex-shrink-0">
          <Zap class="w-3 h-3" :class="themeClasses.accent" />
          <div class="text-xs font-bold text-fg-faint">VS</div>
        </div>

        <div class="flex flex-col items-center gap-2 flex-1 min-w-0">
          <div class="text-2xl leading-none">{{ flagB }}</div>
          <div class="text-sm font-bold text-fg text-center truncate w-full px-1">{{ teamB }}</div>
        </div>
      </div>

      <div
        v-if="hasStarted"
        class="border-2 rounded-lg py-2.5 text-center"
        :class="[themeClasses.border, `${themeClasses.bg}/10`]"
      >
        <span class="text-sm font-bold text-fg-secondary">مسابقه شروع شده است</span>
      </div>

      <div v-else class="grid grid-cols-3 gap-2">
        <button
          v-for="option in voteOptions"
          :key="option.key"
          type="button"
          :disabled="isLoading"
          class="py-2.5 rounded-lg transition-all text-xs sm:text-sm font-medium"
          :class="
            prediction === option.key
              ? `${themeClasses.gradient} text-white shadow-lg`
              : 'bg-surface-inset border-2 border-line hover:border-line-strong text-fg-secondary shadow-sm hover:bg-surface-hover'
          "
          @click="handleVote(option.key)"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 animate-spin mx-auto" />
          <span v-else class="truncate block px-0.5">{{ option.label }}</span>
        </button>
      </div>
    </div>

    <!-- Row layout — عرض کافی -->
    <div class="match-row-layout">
      <div
        class="flex flex-col items-start justify-center w-[72px] flex-shrink-0 gap-0.5"
        :class="{ 'blur-[0.5px]': hasStarted }"
      >
        <span class="text-sm font-bold tabular-nums text-fg leading-none">{{ time }}</span>
        <span class="text-[10px] text-fg-muted leading-tight">{{ date }}</span>
      </div>

      <div
        class="flex-1 flex items-center justify-center gap-4 min-w-0 py-1"
        :class="{ 'blur-[0.5px]': hasStarted }"
      >
        <div class="flex flex-col items-center gap-1.5 flex-1 min-w-0">
          <span class="text-2xl leading-none">{{ flagA }}</span>
          <span class="text-sm font-semibold text-fg text-center truncate w-full px-1">{{ teamA }}</span>
        </div>

        <div class="flex flex-col items-center justify-center flex-shrink-0 self-stretch py-2">
          <span class="text-[10px] font-bold tracking-widest text-fg-faint">VS</span>
        </div>

        <div class="flex flex-col items-center gap-1.5 flex-1 min-w-0">
          <span class="text-2xl leading-none">{{ flagB }}</span>
          <span class="text-sm font-semibold text-fg text-center truncate w-full px-1">{{ teamB }}</span>
        </div>
      </div>

      <div
        class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold flex-shrink-0"
        :class="[themeClasses.lightBg, themeClasses.accentDark, { 'blur-[0.5px]': hasStarted }]"
      >
        <Trophy class="w-3 h-3" />
        <span class="whitespace-nowrap">{{ formatFaNumber(reward) }} تومان</span>
      </div>

      <div class="w-[220px] flex-shrink-0">
        <div
          v-if="hasStarted"
          class="flex items-center justify-center gap-1.5 py-2.5 rounded-lg glass-inset text-fg-muted"
        >
          <Clock class="w-3.5 h-3.5" />
          <span class="text-xs font-medium whitespace-nowrap">مسابقه شروع شده</span>
        </div>

        <div v-else class="grid grid-cols-3 gap-1.5">
          <button
            v-for="option in voteOptions"
            :key="option.key"
            type="button"
            :disabled="isLoading"
            class="py-2 px-1 rounded-md transition-all text-[11px] font-medium truncate"
            :class="
              prediction === option.key
                ? `${themeClasses.gradient} text-white shadow-sm`
                : 'glass-inset border border-line hover:border-line-strong text-fg-secondary hover:bg-white/[0.08]'
            "
            @click="handleVote(option.key)"
          >
            <Loader2 v-if="isLoading" class="w-3.5 h-3.5 animate-spin mx-auto" />
            <span v-else>{{ option.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="showSuccess"
        class="fixed bottom-4 right-4 z-[100] bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-lg shadow-emerald-900/40 flex items-center gap-2"
      >
        <CheckCircle2 class="w-4 h-4 flex-shrink-0" />
        <span class="text-sm font-medium">رای شما ثبت شد</span>
      </div>
    </Transition>
  </Teleport>
</template>
