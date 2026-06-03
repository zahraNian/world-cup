import type { Match, LeaderboardUser, PredictionRecord, ReferredUser } from '~/types'

export const matches: Match[] = [
  {
    id: 1,
    teamA: 'آرژانتین',
    teamB: 'برزیل',
    flagA: '🇦🇷',
    flagB: '🇧🇷',
    date: '۱۵ خرداد ۱۴۰۵',
    time: '۲۱:۳۰',
    reward: 50000,
    hasStarted: true,
  },
  {
    id: 2,
    teamA: 'فرانسه',
    teamB: 'آلمان',
    flagA: '🇫🇷',
    flagB: '🇩🇪',
    date: '۱۶ خرداد ۱۴۰۵',
    time: '۱۸:۰۰',
    reward: 45000,
  },
  {
    id: 3,
    teamA: 'اسپانیا',
    teamB: 'ایتالیا',
    flagA: '🇪🇸',
    flagB: '🇮🇹',
    date: '۱۶ خرداد ۱۴۰۵',
    time: '۲۲:۰۰',
    reward: 40000,
  },
  {
    id: 4,
    teamA: 'انگلیس',
    teamB: 'پرتغال',
    flagA: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    flagB: '🇵🇹',
    date: '۱۷ خرداد ۱۴۰۵',
    time: '۲۰:۳۰',
    reward: 42000,
  },
  {
    id: 5,
    teamA: 'هلند',
    teamB: 'بلژیک',
    flagA: '🇳🇱',
    flagB: '🇧🇪',
    date: '۱۷ خرداد ۱۴۰۵',
    time: '۱۹:۰۰',
    reward: 38000,
  },
  {
    id: 6,
    teamA: 'اروگوئه',
    teamB: 'کلمبیا',
    flagA: '🇺🇾',
    flagB: '🇨🇴',
    date: '۱۸ خرداد ۱۴۰۵',
    time: '۲۱:۰۰',
    reward: 35000,
  },
]

export const topUsers: LeaderboardUser[] = [
  { rank: 1, name: 'علی محمدی', score: 2850, correctPredictions: 42, referredFriends: 8 },
  { rank: 2, name: 'سارا احمدی', score: 2720, correctPredictions: 38, referredFriends: 12 },
  { rank: 3, name: 'رضا کریمی', score: 2610, correctPredictions: 35, referredFriends: 10 },
  { rank: 4, name: 'فاطمه رضایی', score: 2480, correctPredictions: 32, referredFriends: 9 },
  { rank: 5, name: 'محمد حسینی', score: 2350, correctPredictions: 30, referredFriends: 7 },
  { rank: 6, name: 'زهرا اکبری', score: 2180, correctPredictions: 28, referredFriends: 6 },
  { rank: 7, name: 'حسین جعفری', score: 2050, correctPredictions: 26, referredFriends: 5 },
  { rank: 8, name: 'مریم موسوی', score: 1920, correctPredictions: 24, referredFriends: 4 },
  { rank: 9, name: 'امیر نوری', score: 1780, correctPredictions: 22, referredFriends: 3 },
  { rank: 10, name: 'نرگس صادقی', score: 1650, correctPredictions: 20, referredFriends: 2 },
]

export const predictionHistory: PredictionRecord[] = [
  {
    id: 1,
    date: '۱۴ خرداد ۱۴۰۵',
    match: 'آرژانتین vs برزیل',
    userChoice: 'برد آرژانتین',
    result: 'آرژانتین ۲-۱ برزیل',
    status: 'won',
    reward: 50000,
  },
  {
    id: 2,
    date: '۱۳ خرداد ۱۴۰۵',
    match: 'فرانسه vs آلمان',
    userChoice: 'مساوی',
    result: 'فرانسه ۲-۰ آلمان',
    status: 'lost',
    reward: 0,
  },
  {
    id: 3,
    date: '۱۳ خرداد ۱۴۰۵',
    match: 'اسپانیا vs ایتالیا',
    userChoice: 'برد اسپانیا',
    result: 'اسپانیا ۳-۱ ایتالیا',
    status: 'won',
    reward: 40000,
  },
  {
    id: 4,
    date: '۱۲ خرداد ۱۴۰۵',
    match: 'انگلیس vs پرتغال',
    userChoice: 'برد انگلیس',
    result: 'در حال برگزاری',
    status: 'pending',
    reward: 0,
  },
  {
    id: 5,
    date: '۱۲ خرداد ۱۴۰۵',
    match: 'هلند vs بلژیک',
    userChoice: 'برد هلند',
    result: 'هلند ۱-۱ بلژیک',
    status: 'lost',
    reward: 0,
  },
  {
    id: 6,
    date: '۱۱ خرداد ۱۴۰۵',
    match: 'اروگوئه vs کلمبیا',
    userChoice: 'برد کلمبیا',
    result: 'کلمبیا ۲-۰ اروگوئه',
    status: 'won',
    reward: 35000,
  },
]

export const referredUsers: ReferredUser[] = [
  { name: 'علی رضایی', status: 'verified', statusText: 'احراز هویت', reward: 25000 },
  { name: 'سارا محمدی', status: 'kyc', statusText: 'KYC تکمیل', reward: 50000 },
  { name: 'رضا احمدی', status: 'registered', statusText: 'ثبت‌نام', reward: 10000 },
  { name: 'فاطمه کریمی', status: 'kyc', statusText: 'KYC تکمیل', reward: 50000 },
  { name: 'محمد حسینی', status: 'registered', statusText: 'ثبت‌نام', reward: 10000 },
  { name: 'نازنین احمدی', status: 'verified', statusText: 'احراز هویت', reward: 25000 },
  { name: 'امیر کریمی', status: 'kyc', statusText: 'KYC تکمیل', reward: 50000 },
]

export const matchFilters = ['همه مسابقات', 'امروز', 'فردا', 'گروهی', 'حذفی'] as const

export const referralLink = 'https://exchange.ir/ref/YOUR_CODE'
