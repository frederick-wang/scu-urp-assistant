import { SUAObject } from "./types";

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
      alert: (msg: string, callback?: Function) => void
      confirm: (msg: string, callback?: Function) => void
    }
    toSelect: (obj: HTMLElement) => void
  }
}

export {}
