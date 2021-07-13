import pack from '@/../package.json'
import { isDev, isVersion } from './judger'

const { version } = pack

export const API_PATH = process.env.API_PATH
export const API_PATH_V2 = process.env.API_PATH_V2
export const getVersionName = () => {
  const versionStatus = isDev() ? 'dev' : 'stable'
  const versionInfo = `${
    isVersion('userscript')
      ? 'userscript'
      : isVersion('bookmarklet')
      ? 'bookmarklet'
      : 'unknown'
  }`
  const versionName = `${version} (${versionInfo}.${versionStatus})`
  return versionName
}
