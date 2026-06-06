import {
  BRANDS,
  DEFAULT_BRAND_ID,
  isBrandId,
  type BrandConfig,
  type BrandId,
} from '~/config/brands'

function resolveBrandId(): BrandId {
  const fromEnv = import.meta.env.VITE_BRAND as string | undefined
  if (fromEnv && isBrandId(fromEnv)) {
    return fromEnv
  }
  return DEFAULT_BRAND_ID
}

function applyEnvOverrides(brand: BrandConfig): BrandConfig {
  const logoUrl = import.meta.env.VITE_LOGO_URL as string | undefined
  const exchangeUrl = import.meta.env.VITE_EXCHANGE_URL as string | undefined
  const exchangeName = import.meta.env.VITE_EXCHANGE_NAME as string | undefined
  const title = import.meta.env.VITE_APP_TITLE as string | undefined

  return {
    ...brand,
    ...(title ? { title } : {}),
    ...(exchangeName ? { exchangeName } : {}),
    ...(exchangeUrl ? { exchangeUrl } : {}),
    ...(logoUrl ? { logoUrl } : {}),
  }
}

export function useBrand() {
  const brandId = useState<BrandId>('app-brand', resolveBrandId)
  const brand = computed<BrandConfig>(() =>
    applyEnvOverrides(BRANDS[brandId.value]),
  )

  return { brandId, brand }
}
