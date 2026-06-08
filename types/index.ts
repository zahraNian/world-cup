export type AppTheme = 'nipoto' | 'tetherland'

export type QuestionFilter = 'all' | 'special' | 'answered' | 'unanswered'

export interface CampaignQuestion {
  firstItem: string
  secondItem: string
  scenarioOne: string
  scenarioTwo: string
  scenarioThree: string
  correctScenario: string | null
  missionId: string
  displayOrder: number | null
  special: boolean
  startsAt: string
  finishesAt: string
  rewardAmount: string
  rewardCurrency: string
  userAnswer: string | null
}

export interface OtherMission {
  taskName: string
  currency: string | null
  currencyAmount: string | null
  bonusAmount: string | null
  bonusCurrency: string | null
  details: Record<string, unknown>
}

export interface MissionsResponse {
  questions: CampaignQuestion[]
  otherMissions: OtherMission[]
}

export interface CampaignInfo {
  id?: string
  campaignId?: string
}

export interface CampaignSummary {
  totalAmount: number
  correctCount: number
  totalQuestions: number
  referralCount: number
  withdrawCount: number
}

export interface RankingEntry {
  rank: number
  mobile: string
  correctAnswers: number
  friends: number
  totalAmount: number
}

export type PredictionStatus = 'won' | 'lost' | 'pending'

export interface PredictionRecord {
  id: string
  date: string
  match: string
  userChoice: string
  result: string
  status: PredictionStatus
  reward: number
}
