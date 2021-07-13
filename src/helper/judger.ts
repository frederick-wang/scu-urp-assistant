type Version = 'bookmarklet' | 'userscript'

let version: Version

export const setVersion = (v: Version) => (version = v)

export const isVersion = (v: string) => v === version

export const isDev = (): boolean => process.env.NODE_ENV === 'development'

export const isSCU = (): boolean =>
  window.location.href.indexOf('202.115.47.141') !== -1 ||
  window.location.href.indexOf('zhjw.scu.edu.cn') !== -1

export const isLoginPage = (): boolean => window.location.pathname === '/login'

export function isError(arg: unknown): arg is Error {
  return Object.prototype.toString.call(arg).includes('Error')
}
