export type AppTheme = 'orange' | 'green'

export type PredictionChoice = 'A' | 'draw' | 'B'

export type PredictionStatus = 'won' | 'lost' | 'pending'

export type ReferralStatus = 'verified' | 'kyc' | 'registered'

export interface Match {
  id: number
  teamA: string
  teamB: string
  flagA: string
  flagB: string
  date: string
  time: string
  reward: number
  hasStarted?: boolean
}

export interface LeaderboardUser {
  rank: number
  name: string
  score: number
  correctPredictions: number
  referredFriends: number
}

export interface PredictionRecord {
  id: number
  date: string
  match: string
  userChoice: string
  result: string
  status: PredictionStatus
  reward: number
}

export interface ReferredUser {
  name: string
  status: ReferralStatus
  statusText: string
  reward: number
}

export interface StatItem {
  label: string
  value: string
  gradient: string
}
