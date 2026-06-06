<script setup lang="ts">
import type { AppTheme, ReferralStatus } from '~/types'
import {
  Wallet,
  Lock,
  Copy,
  CheckCircle,
  UserPlus,
  Shield,
  Coins,
  AlertTriangle,
  Loader2,
} from 'lucide-vue-next'
import { useCampaignStore } from '~/stores/campaign'
import { useUserStore } from '~/stores/user.js'
import { getReferralStatus } from '~/shared/utils/campaign'

const props = defineProps<{ theme: AppTheme }>()

const campaignStore = useCampaignStore()
const userStore = useUserStore()

const copied = ref(false)
const themeClasses = computed(() => useThemeClasses(props.theme))

const statusBadges: Record<ReferralStatus, { bg: string; text: string; icon: typeof Shield }> = {
  pending_kyc: { bg: 'bg-amber-500/15', text: 'text-amber-400', icon: AlertTriangle },
  kyc_only: { bg: 'bg-blue-500/15', text: 'text-blue-400', icon: Shield },
  active: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', icon: CheckCircle },
}

const referralLink = computed(() => {
  const data = userStore.userData as { referralCode?: string; refCode?: string; id?: string }
  const code = data?.referralCode || data?.refCode || data?.id
  if (!code || typeof window === 'undefined') return ''
  return `${window.location.origin}/?ref=${code}`
})

const refsList = computed(() => campaignStore.refs?.refs || [])

const referralPrize = computed(() => campaignStore.refs?.prize ?? 0)
const referralBonus = computed(() => campaignStore.refs?.bonus ?? 0)

function getStatusBadge(ref: { isKYC: boolean; hasAnswered: boolean }) {
  const { status } = getReferralStatus(ref)
  return statusBadges[status as ReferralStatus] ?? statusBadges.pending_kyc
}

function getStatusText(ref: { isKYC: boolean; hasAnswered: boolean }) {
  return getReferralStatus(ref).statusText
}

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
        <h3 class="text-sm font-bold text-fg">موجودی و تسویه جوایز</h3>
      </div>

      <div v-if="!userStore.isAuthenticated && !userStore.isCheckingAuth" class="py-4 text-center text-xs text-fg-muted">
        برای مشاهده جوایز وارد شوید.
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
            {{ campaignStore.summary ? `${formatFaNumber(campaignStore.summary.totalPrize)} تومان` : '—' }}
          </div>
        </div>

        <div class="glass-inset rounded-lg p-3 flex items-start gap-2">
          <Lock class="w-4 h-4 text-fg-muted mt-0.5 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="text-xs text-fg-secondary mb-0.5">بونوس فعال از دعوت‌ها</div>
            <div class="text-sm font-bold text-fg">
              {{ campaignStore.summary ? `${formatFaNumber(campaignStore.summary.activeBonus)} تومان` : '—' }}
            </div>
            <div class="text-[10px] text-fg-muted mt-0.5">به جایزه هر پاسخ صحیح اضافه می‌شود</div>
          </div>
        </div>

        <a
          v-if="campaignStore.summary && !campaignStore.summary.isKYC"
          href="#"
          class="w-full text-white py-2.5 rounded-lg transition-all shadow-lg hover:shadow-xl hover:opacity-90 flex items-center justify-center gap-2"
          :class="themeClasses.gradientBr"
        >
          <Shield class="w-3.5 h-3.5" />
          <span class="text-xs font-medium">تکمیل احراز هویت و فعال‌سازی تسویه</span>
        </a>
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
          <label class="text-xs text-fg-secondary mb-1.5 mt-2 block">لینک دعوت شما</label>
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

        <div>
          <div class="text-xs font-bold text-fg-secondary mb-2 mt-3">افراد دعوت شده</div>

          <div v-if="campaignStore.loading && !refsList.length" class="py-4 flex justify-center">
            <Loader2 class="w-5 h-5 animate-spin text-fg-muted" />
          </div>

          <div v-else-if="!refsList.length" class="py-4 text-center text-xs text-fg-muted">
            هنوز کسی را دعوت نکرده‌اید.
          </div>

          <div v-else class="space-y-1.5 max-h-[210px] overflow-y-auto pr-1 scrollbar-thin">
            <RewardsReferredUserRow
              v-for="(ref, index) in refsList"
              :key="`${ref.identifier}-${index}`"
              :theme="theme"
              :identifier="ref.identifier"
              :status-text="getStatusText(ref)"
              :badge="getStatusBadge(ref)"
              :show-warning="!ref.isKYC"
            />
          </div>
        </div>
      </div>
    </UiAppCard>
  </div>
</template>
