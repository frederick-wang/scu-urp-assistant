const prefix = () => `%c[SCU URP Assistent](${new Date().toLocaleString()})\n`

function log(...rest: any) {
  if (process.env.NODE_ENV === 'development') {
    const style = 'color: #2EA9DF;'
    console.log(prefix(), style, ...rest)
  }
}

function info(...rest: any) {
  if (process.env.NODE_ENV === 'development') {
    const style = 'color: #227D51;'
    console.info(prefix(), style, ...rest)
  }
}

function warn(...rest: any) {
  if (process.env.NODE_ENV === 'development') {
    const style = 'color: #F9BF45;'
    console.warn(prefix(), style, ...rest)
  }
}

function error(...rest: any) {
  if (process.env.NODE_ENV === 'development') {
    const style = 'color: #CB4042;'
    console.error(prefix(), style, ...rest)
  }
}

export { log, info, warn, error }
