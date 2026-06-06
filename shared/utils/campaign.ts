import type { CampaignQuestion, PredictionRecord, QuestionDetails, ScenarioKey } from '~/types'

export function parseAmount(value: string | number | undefined) {
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

export function isQuestionLocked(question: CampaignQuestion | null | undefined) {
  if (!question) return true
  if (question.userAnswer) return true
  if (question.status !== 'active') return true
  if (question.finishesAt && Date.now() > new Date(question.finishesAt).getTime()) return true
  return false
}

export function getScenarioOptions(details: QuestionDetails | undefined) {
  if (!details) return [] as { key: ScenarioKey; label: string }[]

  const keys: ScenarioKey[] = ['scenarioOne', 'scenarioTwo', 'scenarioThree']

  return keys.map((key) => ({
    key,
    label: details[key] || '',
  })).filter((option) => option.label)
}

export function getScenarioLabel(details: QuestionDetails | undefined, key: ScenarioKey | null) {
  if (!key) return ''
  return details?.[key] || key
}

export function mapQuestionToHistoryRecord(question: CampaignQuestion): PredictionRecord {
  const { missionId, missionName, details, userAnswer, currencyAmount, finishesAt } = question
  const { correctScenario } = details

  let status: PredictionRecord['status'] = 'pending'
  if (correctScenario && userAnswer) {
    status = userAnswer === correctScenario ? 'won' : 'lost'
  }

  const reward = status === 'won' ? parseAmount(currencyAmount) : 0

  return {
    id: missionId,
    date: formatQuestionDate(finishesAt).date,
    match: missionName,
    userChoice: getScenarioLabel(details, userAnswer),
    result: correctScenario ? getScenarioLabel(details, correctScenario) : 'در انتظار نتیجه',
    status,
    reward,
  }
}

export function getReferralStatus(ref: { isKYC: boolean; hasAnswered: boolean }) {
  if (!ref.isKYC) {
    return {
      status: 'pending_kyc' as const,
      statusText: 'احراز هویت نشده',
    }
  }

  if (ref.hasAnswered) {
    return {
      status: 'active' as const,
      statusText: 'شرکت در کمپین',
    }
  }

  return {
    status: 'kyc_only' as const,
    statusText: 'احراز هویت شده',
  }
}
