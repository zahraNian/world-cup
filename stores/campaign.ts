import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import type {
  CampaignInfo,
  CampaignQuestion,
  CampaignSummary,
  MissionsResponse,
  OtherMission,
  QuestionFilter,
  RankingEntry,
} from '~/types'
import { useApp } from '~/shared/utils/abr.js'
import { api } from '~/shared/api/api.js'
import { TR_ERR_SCOPE } from '~/shared/constants/trErrScope.js'
import { MISSION_ERROR, QUESTION_FILTER } from '~/shared/constants/campaign.js'
import { mapQuestionToHistoryRecord, resolveCampaignId } from '~/shared/utils/campaign'
import { useUserStore } from '~/stores/user.js'

export const useCampaignStore = defineStore('campaign', () => {
  const campaignId = ref('')
  const summary = ref<CampaignSummary | null>(null)
  const ranking = ref<RankingEntry[]>([])
  const otherMissions = ref<OtherMission[]>([])
  const questionsByFilter = shallowRef<Partial<Record<QuestionFilter, CampaignQuestion[]>>>({})
  const activeFilter = ref<QuestionFilter>(QUESTION_FILTER.ALL)
  const hiddenMissionIds = ref(new Set<string>())
  const submittingMissionIds = ref(new Set<string>())
  const loading = ref(false)
  const rankingLoading = ref(false)
  const questionsLoading = ref(false)
  const initialized = ref(false)
  const errorMessage = ref<string | null>(null)

  const referralMission = computed(() =>
    otherMissions.value.find((mission) => mission.taskName === 'referral') ?? null,
  )

  const visibleQuestions = computed(() => {
    const list = questionsByFilter.value[activeFilter.value] || []
    return list.filter((q) => !hiddenMissionIds.value.has(q.missionId))
  })

  const historyRecords = computed(() => {
    const answered = questionsByFilter.value[QUESTION_FILTER.ANSWERED] || []
    return answered.map(mapQuestionToHistoryRecord)
  })

  function patchQuestion(missionId: string, patch: Partial<CampaignQuestion>) {
    const next = { ...questionsByFilter.value }

    for (const filter of Object.keys(next) as QuestionFilter[]) {
      const list = next[filter]
      if (!list) continue

      const index = list.findIndex((q) => q.missionId === missionId)
      if (index >= 0) {
        next[filter] = [
          ...list.slice(0, index),
          { ...list[index], ...patch },
          ...list.slice(index + 1),
        ]
      }
    }

    questionsByFilter.value = next
  }

  function setQuestions(filter: QuestionFilter, list: CampaignQuestion[]) {
    questionsByFilter.value = {
      ...questionsByFilter.value,
      [filter]: list,
    }
  }

  async function ensureAuth() {
    const userStore = useUserStore()
    if (!userStore.isAuthenticated) {
      const authed = await userStore.waitForAuthentication()
      if (!authed) return false
    }
    return true
  }

  async function ensureCampaignId() {
    if (campaignId.value) return campaignId.value

    const app = useApp()
    if (!app) return ''

    const campaign = await api(app.Marketing.Campaign.lists.campaign.get(), {
      scope: TR_ERR_SCOPE.CAMPAIGN,
    }) as CampaignInfo[]
    campaignId.value = resolveCampaignId(campaign[0] ?? { id: '', campaignId: '' })
    return campaignId.value
  }

  async function fetchMissions(filter: QuestionFilter = activeFilter.value, { force = false } = {}) {
    if (!force && questionsByFilter.value[filter]) {
      return questionsByFilter.value[filter]!
    }

    const app = useApp()
    if (!app) return []

    const id = await ensureCampaignId()
    if (!id) return []

    questionsLoading.value = true
    try {
      const data = await api(
        app.Marketing.Campaign.lists.campaign.getMissions({ campaignId: id, filter }),
        { scope: TR_ERR_SCOPE.CAMPAIGN },
      ) as MissionsResponse
      setQuestions(filter, data?.questions || [])

      if (data?.otherMissions?.length) {
        otherMissions.value = data.otherMissions
      }

      return data?.questions || []
    } finally {
      questionsLoading.value = false
    }
  }

  async function fetchSummary({ force = false } = {}) {
    if (!force && summary.value) return summary.value

    const authed = await ensureAuth()
    if (!authed) return null

    const app = useApp()
    if (!app) return null

    summary.value = await api(app.Marketing.Campaign.lists.campaign.getSummary(), {
      scope: TR_ERR_SCOPE.CAMPAIGN,
    }) as CampaignSummary
    return summary.value
  }

  async function fetchRanking({ force = false } = {}) {
    if (!force && ranking.value.length) return ranking.value

    const app = useApp()
    if (!app) return []

    rankingLoading.value = true
    try {
      ranking.value = (await api(app.Marketing.Campaign.lists.campaign.getRanking(), {
        scope: TR_ERR_SCOPE.CAMPAIGN,
      })) as RankingEntry[] || []
      return ranking.value
    } finally {
      rankingLoading.value = false
    }
  }

  async function initPublicData() {
    await Promise.all([
      fetchRanking(),
      fetchMissions(QUESTION_FILTER.ALL),
    ])
  }

  async function initUserData() {
    if (loading.value) return
    loading.value = true
    errorMessage.value = null

    try {
      const authed = await ensureAuth()
      if (!authed) return

      await Promise.all([
        fetchSummary(),
        fetchMissions(activeFilter.value, { force: true }),
        fetchMissions(QUESTION_FILTER.ANSWERED, { force: true }),
      ])
      initialized.value = true
    } catch (err) {
      const error = err as { message?: string }
      errorMessage.value = error?.message || 'خطا در بارگذاری اطلاعات کمپین'
    } finally {
      loading.value = false
    }
  }

  async function initDashboard() {
    await initPublicData()
    await initUserData()
  }

  async function setFilter(filter: QuestionFilter) {
    activeFilter.value = filter
    if (!questionsByFilter.value[filter]) {
      await fetchMissions(filter)
    }
  }

  async function submitAnswer(missionId: string, value: string) {
    if (submittingMissionIds.value.has(missionId)) return { ok: false as const }

    const authed = await ensureAuth()
    if (!authed) return { ok: false as const, reason: 'auth' as const }

    const app = useApp()
    if (!app) return { ok: false as const }

    submittingMissionIds.value = new Set([...submittingMissionIds.value, missionId])
    errorMessage.value = null

    try {
      await api(
        app.Marketing.Mission.submitAnswer({ missionId, value }).await('answerSubmitted'),
        { scope: TR_ERR_SCOPE.CAMPAIGN },
      )

      patchQuestion(missionId, { userAnswer: value })

      await Promise.all([
        fetchSummary({ force: true }),
        fetchMissions(activeFilter.value, { force: true }),
        fetchMissions(QUESTION_FILTER.ANSWERED, { force: true }),
      ])

      return { ok: true as const }
    } catch (err) {
      const error = err as { code?: string; message?: string }
      const code = error?.code

      if (code === MISSION_ERROR.NOT_FOUND) {
        hiddenMissionIds.value = new Set([...hiddenMissionIds.value, missionId])
        return { ok: false as const, code }
      }

      if (code === MISSION_ERROR.ALREADY_ANSWERED) {
        patchQuestion(missionId, { userAnswer: value })
        return { ok: false as const, code }
      }

      if (code === MISSION_ERROR.SERVER) {
        errorMessage.value = 'خطای سرور — لطفاً دوباره تلاش کنید'
        return { ok: false as const, code }
      }

      errorMessage.value = error?.message || 'خطا در ثبت پاسخ'
      return { ok: false as const, code }
    } finally {
      const next = new Set(submittingMissionIds.value)
      next.delete(missionId)
      submittingMissionIds.value = next
    }
  }

  function clearError() {
    errorMessage.value = null
  }

  function resetUserData() {
    summary.value = null
    hiddenMissionIds.value = new Set()
    submittingMissionIds.value = new Set()
    initialized.value = false
    errorMessage.value = null

    const next = { ...questionsByFilter.value }
    delete next[QUESTION_FILTER.ANSWERED]
    questionsByFilter.value = next
  }

  return {
    campaignId,
    summary,
    ranking,
    otherMissions,
    referralMission,
    activeFilter,
    visibleQuestions,
    historyRecords,
    loading,
    rankingLoading,
    questionsLoading,
    initialized,
    errorMessage,
    submittingMissionIds,
    initDashboard,
    initPublicData,
    initUserData,
    fetchMissions,
    fetchSummary,
    fetchRanking,
    setFilter,
    submitAnswer,
    clearError,
    resetUserData,
  }
})
