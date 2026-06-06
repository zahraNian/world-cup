<script setup lang="ts">
import type { AppTheme, CampaignQuestion, ScenarioKey } from '~/types'
import { Clock, Trophy, Zap, Loader2, CheckCircle2, Star, LogIn } from 'lucide-vue-next'
import {
  formatQuestionDate,
  getScenarioOptions,
  isQuestionLocked,
  parseAmount,
} from '~/shared/utils/campaign'
import { useCampaignStore } from '~/stores/campaign'
import { useUserStore } from '~/stores/user.js'
import { getLoginUrl } from '~/shared/utils/url/getLoginUrl.js'

const props = defineProps<{
  theme: AppTheme
  question: CampaignQuestion
}>()

const campaignStore = useCampaignStore()
const userStore = useUserStore()

const isLoading = computed(() => campaignStore.submittingMissionIds.has(props.question.missionId))
const showSuccess = ref(false)
const isLocked = computed(() => isQuestionLocked(props.question))

const themeClasses = computed(() => useThemeClasses(props.theme))

const formattedDate = computed(() => formatQuestionDate(props.question.finishesAt))

const reward = computed(() => parseAmount(props.question.currencyAmount))

const voteOptions = computed(() => getScenarioOptions(props.question.details))

const loginUrl = computed(() => {
  if (import.meta.client) return getLoginUrl()
  return '#'
})

const showLoginCta = computed(
  () => !userStore.isAuthenticated && !userStore.isCheckingAuth && !isLocked.value,
)

const showVoteButtons = computed(() => userStore.isAuthenticated && !isLocked.value)

const itemClasses = computed(() => [
  isLocked.value
    ? 'opacity-55 border-r-transparent'
    : props.question.userAnswer
      ? `${themeClasses.value.borderRight} bg-white/[0.08]`
      : 'border-r-transparent',
])

async function handleVote(key: ScenarioKey) {
  if (isLocked.value || isLoading.value) return

  const result = await campaignStore.submitAnswer(props.question.missionId, key)

  if (result.ok) {
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 3000)
  }
}
</script>

<template>
  <div
    class="match-item relative px-4 py-3 transition-colors hover:bg-white/[0.06]"
    :class="itemClasses"
  >
    <div class="match-card-layout space-y-4">
      <div class="flex items-center justify-between gap-2" :class="{ 'blur-[0.5px]': isLocked }">
        <div class="flex items-center gap-2 text-xs text-fg-muted min-w-0">
          <Clock class="w-4 h-4 flex-shrink-0" />
          <span class="truncate">{{ formattedDate.date }} • {{ formattedDate.time }}</span>
          <span
            v-if="question.special"
            class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300"
          >
            <Star class="w-2.5 h-2.5" />
            ویژه
          </span>
        </div>
        <div
          class="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm flex-shrink-0"
          :class="themeClasses.lightBg"
        >
          <Trophy class="w-3.5 h-3.5" />
          <span>{{ formatFaNumber(reward) }} تومان</span>
        </div>
      </div>

      <div class="text-center" :class="{ 'blur-[0.5px]': isLocked }">
        <div class="flex items-center justify-center gap-2">
          <Zap class="w-3.5 h-3.5" :class="themeClasses.accent" />
          <h3 class="text-sm font-bold text-fg">{{ question.missionName }}</h3>
        </div>
      </div>

      <div
        v-if="isLocked"
        class="border-2 rounded-lg py-2.5 text-center"
        :class="[themeClasses.border, `${themeClasses.bg}/10`]"
      >
        <span class="text-sm font-bold text-fg-secondary">
          {{ question.userAnswer ? 'پاسخ شما ثبت شده است' : 'مهلت پاسخ‌دهی به پایان رسیده' }}
        </span>
      </div>

      <a
        v-else-if="showLoginCta"
        :href="loginUrl"
        class="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-white shadow-lg hover:opacity-90 transition-opacity"
        :class="themeClasses.gradient"
      >
        <LogIn class="w-4 h-4 flex-shrink-0" />
        <span>ورود / شرکت در مسابقه</span>
      </a>

      <div v-else-if="userStore.isCheckingAuth" class="py-2.5 flex justify-center">
        <Loader2 class="w-5 h-5 animate-spin text-fg-muted" />
      </div>

      <div v-else-if="showVoteButtons" class="grid grid-cols-3 gap-2">
        <button
          v-for="option in voteOptions"
          :key="option.key"
          type="button"
          :disabled="isLoading"
          class="py-2.5 rounded-lg transition-all text-xs sm:text-sm font-medium"
          :class="
            question.userAnswer === option.key
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

    <div class="match-row-layout">
      <div
        class="flex flex-col items-start justify-center w-[72px] flex-shrink-0 gap-0.5"
        :class="{ 'blur-[0.5px]': isLocked }"
      >
        <span class="text-sm font-bold tabular-nums text-fg leading-none">{{ formattedDate.time }}</span>
        <span class="text-[10px] text-fg-muted leading-tight">{{ formattedDate.date }}</span>
      </div>

      <div
        class="flex-1 flex items-center justify-center gap-2 min-w-0 py-1"
        :class="{ 'blur-[0.5px]': isLocked }"
      >
        <Zap class="w-3.5 h-3.5 flex-shrink-0" :class="themeClasses.accent" />
        <span class="text-sm font-semibold text-fg text-center truncate">{{ question.missionName }}</span>
        <span
          v-if="question.special"
          class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-300 flex-shrink-0"
        >
          <Star class="w-2.5 h-2.5" />
        </span>
      </div>

      <div
        class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold flex-shrink-0"
        :class="[themeClasses.lightBg, themeClasses.accentDark, { 'blur-[0.5px]': isLocked }]"
      >
        <Trophy class="w-3 h-3" />
        <span class="whitespace-nowrap">{{ formatFaNumber(reward) }} تومان</span>
      </div>

      <div class="w-[220px] flex-shrink-0">
        <div
          v-if="isLocked"
          class="flex items-center justify-center gap-1.5 py-2.5 rounded-lg glass-inset text-fg-muted"
        >
          <Clock class="w-3.5 h-3.5" />
          <span class="text-xs font-medium whitespace-nowrap">
            {{ question.userAnswer ? 'ثبت شده' : 'مهلت تمام شد' }}
          </span>
        </div>

        <a
          v-else-if="showLoginCta"
          :href="loginUrl"
          class="flex items-center justify-center gap-1.5 py-2 px-2 rounded-md text-[11px] font-medium text-white shadow-sm hover:opacity-90 transition-opacity truncate"
          :class="themeClasses.gradient"
        >
          <LogIn class="w-3.5 h-3.5 flex-shrink-0" />
          <span class="truncate">ورود / شرکت در مسابقه</span>
        </a>

        <div v-else-if="userStore.isCheckingAuth" class="py-2.5 flex justify-center">
          <Loader2 class="w-4 h-4 animate-spin text-fg-muted" />
        </div>

        <div v-else-if="showVoteButtons" class="grid grid-cols-3 gap-1.5">
          <button
            v-for="option in voteOptions"
            :key="option.key"
            type="button"
            :disabled="isLoading"
            class="py-2 px-1 rounded-md transition-all text-[11px] font-medium truncate"
            :class="
              question.userAnswer === option.key
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
