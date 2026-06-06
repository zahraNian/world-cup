<script setup lang="ts">
import { useCampaignStore } from '~/stores/campaign'
import { useUserStore } from '~/stores/user.js'

const { theme, toggleTheme } = useAppTheme()
const campaignStore = useCampaignStore()
const userStore = useUserStore()

async function loadCampaignData() {
  await campaignStore.initPublicData()

  if (userStore.isCheckingAuth) {
    await userStore.waitForAuthentication()
  }
  if (userStore.isAuthenticated) {
    await campaignStore.initUserData()
  }
}

onMounted(loadCampaignData)

watch(
  () => userStore.isAuthenticated,
  (authed) => {
    if (authed) {
      campaignStore.initUserData()
    } else {
      campaignStore.resetUserData()
      campaignStore.fetchQuestions(campaignStore.activeFilter, { force: true })
    }
  },
)
</script>

<template>
  <div class="h-full flex flex-col">
    <LayoutAppHeader :theme="theme" @theme-toggle="toggleTheme" />

    <main class="flex-1 overflow-y-auto">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          <div class="lg:col-span-3 order-1">
            <LeaderboardPanel :theme="theme" />
          </div>

          <div class="lg:col-span-6 order-3 lg:order-2">
            <MatchesSection :theme="theme" />
          </div>

          <div class="lg:col-span-3 order-2 lg:order-3">
            <RewardsSection :theme="theme" />
          </div>
        </div>

        <div class="mt-4">
          <HistoryPredictionHistory :theme="theme" />
        </div>
      </div>
    </main>
  </div>
</template>
