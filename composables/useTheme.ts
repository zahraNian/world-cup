import type { AppTheme } from '~/types'

const THEME_COLORS = {
  nipoto: {
    primary: '#FF9270',
    secondary: '#E0715F',
    dark: '#C85A48',
  },
  tetherland: {
    primary: '#009B87',
    secondary: '#007A6B',
    dark: '#005F54',
  },
} as const

export function useThemeClasses(theme: AppTheme) {
  const colors = THEME_COLORS[theme]

  return {
    gradient: theme === 'nipoto'
      ? 'bg-gradient-to-r from-[#FF9270] to-[#E0715F]'
      : 'bg-gradient-to-r from-[#009B87] to-[#007A6B]',
    gradientBr: theme === 'nipoto'
      ? 'bg-gradient-to-br from-[#FF9270] to-[#E0715F]'
      : 'bg-gradient-to-br from-[#009B87] to-[#007A6B]',
    text: theme === 'nipoto' ? 'text-[#FF9270]' : 'text-[#009B87]',
    bg: theme === 'nipoto' ? 'bg-[#FF9270]' : 'bg-[#009B87]',
    lightBg: theme === 'nipoto'
      ? 'bg-[#FF9270]/15 text-[#FFB89E]'
      : 'bg-[#009B87]/15 text-[#5ECFBF]',
    border: theme === 'nipoto' ? 'border-[#FF9270]/50' : 'border-[#009B87]/50',
    borderRight: theme === 'nipoto' ? 'border-r-[#FF9270]' : 'border-r-[#009B87]',
    accent: theme === 'nipoto' ? 'text-[#FF9270]' : 'text-[#00B39E]',
    accentDark: theme === 'nipoto' ? 'text-[#FFB89E]' : 'text-[#5ECFBF]',
    accentText: theme === 'nipoto' ? 'text-[#FFD4C4]' : 'text-[#8FE0D4]',
    colors,
  }
}

export function useAppTheme() {
  const { brand } = useBrand()
  const theme = computed<AppTheme>(() => brand.value.theme)
  const classes = computed(() => useThemeClasses(theme.value))

  return { theme, classes }
}

export function formatFaNumber(value: number) {
  return value.toLocaleString('fa-IR')
}
