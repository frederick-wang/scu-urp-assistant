import { logger } from '@/utils'
import { getAvailablePluginsByLoginStatus, getAllPlugins } from './list'
import { SUAPlugin } from '@/types'

const allList = getAllPlugins()
const availableList = getAvailablePluginsByLoginStatus()
const disabledPluginsName: string[] = []

const enabledList: SUAPlugin[] = []

async function init(): Promise<void> {
  enabledList.length = 0
  enabledList.push(
    ...availableList.filter(({ name }) => !disabledPluginsName.includes(name))
  )
  logger.info('Plugin.list初始化成功:', enabledList)
}

export { init, enabledList, availableList, allList }
