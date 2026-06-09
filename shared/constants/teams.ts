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

const TEAM_FLAG_CODES: Record<string, string> = {
  ARG: 'ar',
  AUS: 'au',
  BEL: 'be',
  BRA: 'br',
  CAN: 'ca',
  COL: 'co',
  CRO: 'hr',
  EGY: 'eg',
  ENG: 'gb-eng',
  ESP: 'es',
  FRA: 'fr',
  GER: 'de',
  IRN: 'ir',
  ITA: 'it',
  JPN: 'jp',
  KOR: 'kr',
  MAR: 'ma',
  MEX: 'mx',
  NED: 'nl',
  NZL: 'nz',
  POR: 'pt',
  QAT: 'qa',
  SAU: 'sa',
  SEN: 'sn',
  URU: 'uy',
  USA: 'us',
}

export function getTeamName(code: string) {
  return TEAM_NAMES[code.toUpperCase()] || code
}

export function getTeamFlagUrl(code: string) {
  const flagCode = TEAM_FLAG_CODES[code.toUpperCase()]
  if (!flagCode) return null
  return `/flags/${flagCode}.png`
}
