export type AppTheme = 'orange' | 'green'

export type QuestionFilter = 'all' | 'special' | 'answered' | 'unanswered'

export type ScenarioKey = 'scenarioOne' | 'scenarioTwo' | 'scenarioThree'

export type PredictionStatus = 'won' | 'lost' | 'pending'

export type ReferralStatus = 'pending_kyc' | 'kyc_only' | 'active'

export interface QuestionDetails {
  scenarioOne: string
  scenarioTwo: string
  scenarioThree: string
  correctScenario: ScenarioKey | null
}

export interface CampaignQuestion {
  missionId: string
  missionName: string
  taskName: string
  status: string
  startsAt: string
  finishesAt: string
  currencyAmount: string
  special: boolean
  bonusAmount: string
  details: QuestionDetails
  userAnswer: ScenarioKey | null
}

export interface CampaignSummary {
  totalPrize: number
  isKYC: boolean
  correctCount: number
  totalQuestions: number
  referralCount: number
  activeBonus: number
  prizePerCorrectAnswer: number
}

export interface RankingEntry {
  rank: number
  identifier: string
  correctCount: number
  totalPrize: number
}

export interface ReferralRef {
  identifier: string
  isKYC: boolean
  hasAnswered: boolean
}

export interface RefsResponse {
  prize: number
  bonus: number
  refs: ReferralRef[]
}

export interface PredictionRecord {
  id: string
  date: string
  match: string
  userChoice: string
  result: string
  status: PredictionStatus
  reward: number
}

export interface StatItem {
  label: string
  value: string
  gradient: string
}
