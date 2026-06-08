const TEAM_NAMES: Record<string, string> = {
  ARG: 'آرژانتین',
  AUS: 'استرالیا',
  BEL: 'بلژیک',
  BRA: 'برزیل',
  CAN: 'کانادا',
  COL: 'کلمبیا',
  CRO: 'کرواسی',
  EGY: 'مصر',
  ENG: 'انگلیس',
  ESP: 'اسپانیا',
  FRA: 'فرانسه',
  GER: 'آلمان',
  IRN: 'ایران',
  ITA: 'ایتالیا',
  JPN: 'ژاپن',
  KOR: 'کره جنوبی',
  MAR: 'مراکش',
  MEX: 'مکزیک',
  NED: 'هلند',
  NZL: 'نیوزیلند',
  POR: 'پرتغال',
  QAT: 'قطر',
  SAU: 'عربستان',
  SEN: 'سنگال',
  URU: 'اروگوئه',
  USA: 'آمریکا',
}

export function getTeamName(code: string) {
  return TEAM_NAMES[code] || code
}
