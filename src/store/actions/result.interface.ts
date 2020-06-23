type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

type XOR<T, U> = T | U extends Record<string, unknown>
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

interface BaseResult {
  extra?: Record<string, string | number | boolean | null>
}

export type Result = BaseResult &
  XOR<
    {
      data: Record<string, unknown>
    },
    {
      error: {
        code: number
        title: string
        message: string
      }
    }
  >
