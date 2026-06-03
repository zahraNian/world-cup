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
  TrendingUp,
} from 'lucide-vue-next'
import { referredUsers, referralLink } from '~/data/mock'

const props = defineProps<{ theme: AppTheme }>()

const copied = ref(false)
const themeClasses = computed(() => useThemeClasses(props.theme))

const statusBadges: Record<ReferralStatus, { bg: string; text: string; icon: typeof Shield }> = {
  verified: { bg: 'bg-blue-500/15', text: 'text-blue-400', icon: Shield },
  kyc: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', icon: CheckCircle },
  registered: { bg: 'bg-surface-inset', text: 'text-fg-muted', icon: UserPlus },
}

function getStatusBadge(status: string) {
  return statusBadges[status as ReferralStatus] ?? statusBadges.registered
}

async function handleCopy() {
  await navigator.clipboard.writeText(referralLink)
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

      <div class="space-y-3">
        <div class="rounded-xl border p-3 shadow-lg relative overflow-hidden"
          :class="[themeClasses.border, themeClasses.lightBg]">
          <div class="absolute inset-0" />
          <div class="relative z-10 flex items-center gap-2 mb-1">
            <Coins class="w-3.5 h-3.5" :class="themeClasses.text" />
            <div class="text-[10px] text-fg-secondary">موجودی قابل برداشت</div>
          </div>
          <div class="text-xl font-bold text-fg">۸۹۰,۰۰۰ تومان</div>
        </div>

        <div class="bg-surface-inset rounded-lg p-3 flex items-start gap-2 border border-line">
          <Lock class="w-4 h-4 text-fg-muted mt-0.5 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="text-xs text-fg-secondary mb-0.5">جوایز در انتظار تسویه</div>
            <div class="text-sm font-bold text-fg">۳۵۰,۰۰۰ تومان</div>
            <div class="text-[10px] text-fg-muted mt-0.5">پس از قطعی شدن نتایج آزاد می‌شود</div>
          </div>
        </div>

        <button type="button"
          class="w-full text-white py-2.5 rounded-lg transition-all shadow-lg hover:shadow-xl hover:opacity-90 flex items-center justify-center gap-2"
          :class="themeClasses.gradientBr">
          <Shield class="w-3.5 h-3.5" />
          <span class="text-xs font-medium">تکمیل احراز هویت و فعال‌سازی تسویه</span>
        </button>
      </div>
    </UiAppCard>

    <UiAppCard>
      <div class="flex items-center gap-2 mb-3">
        <UserPlus class="w-4 h-4" :class="themeClasses.text" />
        <h3 class="text-sm font-bold text-fg">دعوت از دوستان</h3>
      </div>

      <div class="space-y-3">
        <div>
          <label class="text-xs text-fg-secondary mb-1.5 mt-5 block">لینک دعوت شما</label>
          <div class="flex gap-2">
            <input type="text" :value="referralLink" readonly
              class="flex-1 px-3 py-2 bg-surface-inset border border-line rounded-lg text-xs text-fg-secondary">
            <button type="button"
              class="px-3 py-2 rounded-lg border transition-colors flex items-center gap-1.5 shrink-0 text-xs"
              :class="copied
                ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                : 'border-line bg-surface-inset text-fg-secondary hover:bg-surface-hover hover:text-fg'"
              @click="handleCopy">
              <Copy v-if="!copied" class="w-3.5 h-3.5" />
              <span>{{ copied ? 'کپی شد' : 'کپی' }}</span>
            </button>
          </div>
        </div>

        <div>
          <div class="text-xs font-bold text-fg-secondary mb-2 mt-5">افراد دعوت شده</div>
          <div class="space-y-1.5 max-h-[210px] overflow-y-auto pr-1 scrollbar-thin">
            <RewardsReferredUserRow v-for="(user, index) in referredUsers" :key="index" :theme="theme" :user="user"
              :badge="getStatusBadge(user.status)" />
          </div>
        </div>
      </div>
    </UiAppCard>
  </div>
</template>
