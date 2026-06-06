export const QUESTION_FILTER = Object.freeze({
  ALL: 'all',
  SPECIAL: 'special',
  ANSWERED: 'answered',
  UNANSWERED: 'unanswered',
})

export const QUESTION_FILTERS = Object.freeze([
  { label: 'همه مسابقات', value: QUESTION_FILTER.ALL },
  { label: 'مسابقات ویژه', value: QUESTION_FILTER.SPECIAL },
  { label: 'پاسخ داده شده', value: QUESTION_FILTER.ANSWERED },
  { label: 'بدون پاسخ', value: QUESTION_FILTER.UNANSWERED },
])

export const SCENARIO_KEYS = Object.freeze(['scenarioOne', 'scenarioTwo', 'scenarioThree'])

export const MISSION_ERROR = Object.freeze({
  NOT_FOUND: 'MISSION_NOT_FOUND',
  ALREADY_ANSWERED: 'ALREADY_ANSWERED',
  SERVER: 'SOMETHING_WENT_WRONG',
})
