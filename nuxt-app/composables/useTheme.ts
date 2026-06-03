import type { AppTheme } from '~/types'

const THEME_COLORS = {
  orange: {
    primary: '#FF7A2E',
    secondary: '#FF5500',
    dark: '#E55A00',
  },
  green: {
    primary: '#34D399',
    secondary: '#10B981',
    dark: '#059669',
  },
} as const

export function useThemeClasses(theme: AppTheme) {
  const colors = THEME_COLORS[theme]

  return {
    gradient: theme === 'orange'
      ? 'bg-gradient-to-r from-[#FF7A2E] to-[#FF5500]'
      : 'bg-gradient-to-r from-[#34D399] to-[#10B981]',
    gradientBr: theme === 'orange'
      ? 'bg-gradient-to-br from-[#FF7A2E] to-[#FF5500]'
      : 'bg-gradient-to-br from-[#34D399] to-[#10B981]',
    text: theme === 'orange' ? 'text-[#FF7A2E]' : 'text-[#34D399]',
    bg: theme === 'orange' ? 'bg-[#FF7A2E]' : 'bg-[#34D399]',
    lightBg: theme === 'orange'
      ? 'bg-orange-500/15 text-orange-300'
      : 'bg-emerald-500/15 text-emerald-300',
    border: theme === 'orange' ? 'border-[#FF7A2E]/50' : 'border-[#34D399]/50',
    borderRight: theme === 'orange' ? 'border-r-[#FF7A2E]' : 'border-r-[#34D399]',
    accent: theme === 'orange' ? 'text-orange-400' : 'text-emerald-400',
    accentDark: theme === 'orange' ? 'text-orange-300' : 'text-emerald-300',
    accentText: theme === 'orange' ? 'text-orange-200' : 'text-emerald-200',
    colors,
  }
}

export function useAppTheme() {
  const theme = useState<AppTheme>('app-theme', () => 'orange')

  const toggleTheme = () => {
    theme.value = theme.value === 'orange' ? 'green' : 'orange'
  }

  const classes = computed(() => useThemeClasses(theme.value))

  return { theme, toggleTheme, classes }
}

export function formatFaNumber(value: number) {
  return value.toLocaleString('fa-IR')
}
