import { Logger } from '@/helper/logger'
import { getAvailablePluginsByLoginStatus, getAllPlugins } from './list'
import { SUAPlugin } from '@/core/types'
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

/**
 * 可以被启用的插件，即用户在插件管理中选择启用的插件
 */
const canBeEnabledList: SUAPlugin[] = []

async function init(): Promise<void> {
  const pluginEnabledStates = state.getData('pluginEnabledStates') as
    | Record<string, boolean>
    | undefined
  enabledList.length = 0
  canBeEnabledList.length = 0
  if (pluginEnabledStates) {
    enabledList.push(
      ...availableList.filter(({ name }) => pluginEnabledStates[name])
    )
    canBeEnabledList.push(
      ...allList.filter(({ name }) => pluginEnabledStates[name])
    )
  } else {
    enabledList.push(...availableList)
  }
  Logger.info('Plugin.list初始化成功:', enabledList)
}

const isPluginEnabled = (name: string): boolean =>
  enabledList.map(({ name }) => name).includes(name)

export {
  init,
  enabledList,
  canBeEnabledList,
  availableList,
  allList,
  isPluginEnabled
}
