import { SUAObject } from '@/core/types'

declare global {
  interface Window {
    $sua: SUAObject
    TDAPP: {
      onEvent: (
        EventId: string,
        Label?: string,
        MapKv?: Record<string, string>
      ) => void
    }
    layer: {
      open: (a: unknown) => number
      close: (a: unknown) => number
      msg: (a: unknown, b?: unknown, c?: unknown) => void
    }
    urp: {
      alert: (msg: string, callback?: () => void) => void
      confirm: (msg: string, callback?: (res: boolean) => void) => void
    }
    toSelect: (obj: HTMLElement) => void
  }
}

export {}
