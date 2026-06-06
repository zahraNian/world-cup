import type { AppTheme } from '~/types'

export type BrandId = AppTheme

export interface BrandConfig {
  id: BrandId
  theme: AppTheme
  title: string
  exchangeName: string
  exchangeUrl: string
  logoUrl: string
  logoAlt: string
}

export const BRANDS: Record<BrandId, BrandConfig> = {
  nipoto: {
    id: 'nipoto',
    theme: 'nipoto',
    title: 'کمپین پیش‌بینی جام جهانی ۲۰۲۶',
    exchangeName: 'نیپوتو',
    exchangeUrl: 'https://nipoto.com',
    logoUrl: '/brands/nipoto-logo.svg',
    logoAlt: 'لوگوی صرافی نیپوتو',
  },
  tetherland: {
    id: 'tetherland',
    theme: 'tetherland',
    title: 'کمپین پیش‌بینی جام جهانی ۲۰۲۶',
    exchangeName: 'تترلند',
    exchangeUrl: 'https://tetherland.com',
    logoUrl: '/brands/tetherland-logo.svg',
    logoAlt: 'لوگوی صرافی تترلند',
  },
}

export const DEFAULT_BRAND_ID: BrandId = 'nipoto'

export function isBrandId(value: string): value is BrandId {
  return value === 'nipoto' || value === 'tetherland'
}
