import { logger } from '@/utils'
import { getAvailablePluginsByLoginStatus, getAllPlugins } from './list'
import { SUAPlugin } from '@/types'
import { state } from '@/store'

/**
 * 所有已安装的插件
 */
const allList = getAllPlugins()

/**
 * 当前网址下可用的插件
 */
const availableList = getAvailablePluginsByLoginStatus()

/**
 * 当前处于启用状态的插件（如果一个插件在当前网址下不可用，那它同样不会被启用）
 */
const enabledList: SUAPlugin[] = []

async function init(): Promise<void> {
  const pluginEnabledStates = state.getData('pluginEnabledStates') as Record<
    string,
    boolean
  >
  enabledList.length = 0
  enabledList.push(
    ...availableList.filter(({ name }) => pluginEnabledStates[name])
  )
  logger.info('Plugin.list初始化成功:', enabledList)
}

export { init, enabledList, availableList, allList }
