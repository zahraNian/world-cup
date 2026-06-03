import type abr from '~/shared/utils/abr.js'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    abr: typeof abr
    $app: ReturnType<typeof abr.get>
  }
}

export {}
