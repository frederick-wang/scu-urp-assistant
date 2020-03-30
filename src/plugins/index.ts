import { logger } from '@/utils'
import { getSuitablePluginsByLoginStatus } from './list'

const allPlugins = getSuitablePluginsByLoginStatus()
const disabledPluginsName: string[] = []

async function init(): Promise<SUAPlugin[]> {
  const list = allPlugins.filter(
    ({ name }) => !disabledPluginsName.includes(name)
  )
  logger.info('Plugin.list初始化成功:', list)
  return list
}

export { init }
