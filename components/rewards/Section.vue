<script setup lang="ts">
import type { AppTheme } from '~/types'
import { Wallet, Copy, UserPlus, Coins, Loader2 } from 'lucide-vue-next'
import { useCampaignStore } from '~/stores/campaign'
import { useUserStore } from '~/stores/user.js'
import { parseAmount } from '~/shared/utils/campaign'

const props = defineProps<{ theme: AppTheme }>()

const campaignStore = useCampaignStore()
const userStore = useUserStore()

const copied = ref(false)
const themeClasses = computed(() => useThemeClasses(props.theme))

const referralLink = computed(() => {
  const data = userStore.userData as { referralCode?: string; refCode?: string; id?: string }
  const code = data?.referralCode || data?.refCode || data?.id
  if (!code || typeof window === 'undefined') return ''
  return `${window.location.origin}/?ref=${code}`
})

const referralPrize = computed(() => parseAmount(campaignStore.referralMission?.currencyAmount))
const referralBonus = computed(() => parseAmount(campaignStore.referralMission?.bonusAmount))

async function handleCopy() {
  if (!referralLink.value) return
  await navigator.clipboard.writeText(referralLink.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="space-y-4">
    <UiAppCard>
      <div class="flex items-center gap-2 mb-3">
        <Wallet class="w-4 h-4" :class="themeClasses.text" />
        <h3 class="text-sm font-bold text-fg">جوایز کمپین</h3>
      </div>

      <div v-if="!userStore.isAuthenticated && !userStore.isCheckingAuth" class="py-4 text-center text-xs text-fg-muted">
        برای مشاهده جوایز وارد شوید.
      </div>

      <div v-else-if="campaignStore.loading && !campaignStore.summary" class="py-4 flex justify-center">
        <Loader2 class="w-5 h-5 animate-spin text-fg-muted" />
      </div>

      <div v-else class="space-y-3">
        <div
          class="rounded-xl border p-3 shadow-lg relative overflow-hidden"
          :class="[themeClasses.border, themeClasses.lightBg]"
        >
          <div class="relative z-10 flex items-center gap-2 mb-1">
            <Coins class="w-3.5 h-3.5" :class="themeClasses.text" />
            <div class="text-[10px] text-fg-secondary">مجموع جوایز دریافتی</div>
          </div>
          <div class="text-xl font-bold text-fg">
            {{ campaignStore.summary ? `${formatFaNumber(campaignStore.summary.totalAmount)} تومان` : '—' }}
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="glass-inset rounded-lg p-3">
            <div class="text-[10px] text-fg-muted mb-1">پیش‌بینی صحیح</div>
            <div class="text-sm font-bold text-fg">
              {{ campaignStore.summary ? formatFaNumber(campaignStore.summary.correctCount) : '—' }}
            </div>
          </div>
          <div class="glass-inset rounded-lg p-3">
            <div class="text-[10px] text-fg-muted mb-1">دوستان دعوت‌شده</div>
            <div class="text-sm font-bold text-fg">
              {{ campaignStore.summary ? formatFaNumber(campaignStore.summary.referralCount) : '—' }}
            </div>
          </div>
        </div>
      </div>
    </UiAppCard>

    <UiAppCard>
      <div class="flex items-center gap-2 mb-3">
        <UserPlus class="w-4 h-4" :class="themeClasses.text" />
        <h3 class="text-sm font-bold text-fg">دعوت از دوستان</h3>
      </div>

      <div v-if="!userStore.isAuthenticated && !userStore.isCheckingAuth" class="py-4 text-center text-xs text-fg-muted">
        برای دعوت از دوستان وارد شوید.
      </div>

      <div v-else class="space-y-3">
        <div v-if="referralPrize || referralBonus" class="text-[10px] text-fg-muted leading-relaxed">
          جایزه دعوت: {{ formatFaNumber(referralPrize) }} تومان —
          بونوس هر دعوت موفق: {{ formatFaNumber(referralBonus) }} تومان
        </div>

        <div v-if="referralLink">
          <label class="text-xs text-fg-secondary mb-1.5 block">لینک دعوت شما</label>
          <div class="flex gap-2">
            <input
              type="text"
              :value="referralLink"
              readonly
              class="flex-1 px-3 py-2 glass-inset rounded-lg text-xs text-fg-secondary"
            >
            <button
              type="button"
              class="px-3 py-2 rounded-lg border transition-colors flex items-center gap-1.5 shrink-0 text-xs"
              :class="copied
                ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                : 'border-line glass-inset text-fg-secondary hover:bg-white/[0.08] hover:text-fg'"
              @click="handleCopy"
            >
              <Copy v-if="!copied" class="w-3.5 h-3.5" />
              <span>{{ copied ? 'کپی شد' : 'کپی' }}</span>
            </button>
          </div>
        </div>
      </div>
    </UiAppCard>
  </div>
</template>
