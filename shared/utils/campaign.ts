import type { CampaignQuestion, PredictionRecord } from '~/types'
import { getTeamName } from '~/shared/constants/teams'

export function parseAmount(value: string | number | undefined | null) {
  if (typeof value === 'number') return value
  return Math.floor(parseFloat(value || '0') || 0)
}

export function formatQuestionDate(isoString: string | undefined) {
  if (!isoString) return { date: '', time: '' }

  const date = new Date(isoString)
  return {
    date: date.toLocaleDateString('fa-IR', { month: 'long', day: 'numeric', year: 'numeric' }),
    time: date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
  }
}

export function getMatchTitle(question: CampaignQuestion) {
  return `${getTeamName(question.firstItem)} - ${getTeamName(question.secondItem)}`
}

export function formatScenarioLabel(value: string, question: CampaignQuestion) {
  if (value === 'DRAW') return 'مساوی'

  const winMatch = value.match(/^WIN_(.+)$/)
  if (winMatch) return `برد ${getTeamName(winMatch[1])}`

  return value
}

export function getScenarioOptions(question: CampaignQuestion) {
  return [
    { value: question.scenarioOne, label: formatScenarioLabel(question.scenarioOne, question) },
    { value: question.scenarioTwo, label: formatScenarioLabel(question.scenarioTwo, question) },
    { value: question.scenarioThree, label: formatScenarioLabel(question.scenarioThree, question) },
  ].filter((option) => option.value && option.label)
}

export function isQuestionLocked(question: CampaignQuestion | null | undefined) {
  if (!question) return true
  if (question.userAnswer) return true
  if (question.finishesAt && Date.now() > new Date(question.finishesAt).getTime()) return true
  return false
}

export function mapQuestionToHistoryRecord(question: CampaignQuestion): PredictionRecord {
  const { missionId, userAnswer, correctScenario, rewardAmount, finishesAt } = question

  let status: PredictionRecord['status'] = 'pending'
  if (correctScenario && userAnswer) {
    status = userAnswer === correctScenario ? 'won' : 'lost'
  }

  const reward = status === 'won' ? parseAmount(rewardAmount) : 0

  return {
    id: missionId,
    date: formatQuestionDate(finishesAt).date,
    match: getMatchTitle(question),
    userChoice: userAnswer ? formatScenarioLabel(userAnswer, question) : '—',
    result: correctScenario ? formatScenarioLabel(correctScenario, question) : 'در انتظار نتیجه',
    status,
    reward,
  }
}

export function resolveCampaignId(campaign: { id?: string; campaignId?: string }) {
  return campaign.id || campaign.campaignId || ''
}
