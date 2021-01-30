import { isDev } from './judger'

const prefix = (): string =>
  `%c[SCU URP Assistent](${new Date().toLocaleString()})\n`

function log(...rest: unknown[]): void {
  if (isDev()) {
    const style = 'color: #2EA9DF;'
    console.log(prefix(), style, ...rest)
  }
}

function info(...rest: unknown[]): void {
  if (isDev()) {
    const style = 'color: #227D51;'
    console.info(prefix(), style, ...rest)
  }
}

function warn(...rest: unknown[]): void {
  if (isDev()) {
    const style = 'color: #F9BF45;'
    console.warn(prefix(), style, ...rest)
  }
}

function error(...rest: unknown[]): void {
  if (isDev()) {
    const style = 'color: #CB4042;'
    console.error(prefix(), style, ...rest)
  }
}

function evaMessage(msg: string): void {
  const style = 'color: #227D51;'
  console.info(`%c${msg}`, style)
}

export const Logger = { log, info, warn, error, evaMessage }

export { log, info, warn, error, evaMessage }
