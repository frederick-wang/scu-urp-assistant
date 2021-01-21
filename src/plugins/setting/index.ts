import PluginManager from './PluginManager.vue'
import CacheManager from './CacheManager.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'
import { createComponentRender } from '@/plugins/common/utils'

const renderPluginManager = createComponentRender(
  '插件管理器',
  'sua-container-setting-plugin-manager',
  PluginManager
)

const renderCacheManager = createComponentRender(
  '缓存管理器',
  'sua-container-setting-cache-manager',
  CacheManager
)

export const Setting: SUAPlugin = {
  name: 'setting',
  displayName: '设置',
  icon: getPluginIcon('setting'),
  isNecessary: true,
  defaultEnabledState: true,
  brief: '设置中心，是助手界面的一部分，不可关闭。',
  route: ['setting/plugin_manager', 'setting/cache_manager'],
  menu: [
    {
      rootMenuId: 'sua-menu-list',
      rootMenuName: 'SCU URP 助手',
      id: 'menu-setting',
      name: '设置',
      item: {
        name: '插件管理',
        display: true,
        route: 'setting/plugin_manager',
        breadcrumbs: ['SCU URP 助手', '设置', '插件管理'],
        render: renderPluginManager
      }
    },
    {
      rootMenuId: 'sua-menu-list',
      rootMenuName: 'SCU URP 助手',
      id: 'menu-setting',
      name: '设置',
      item: {
        name: '缓存管理',
        display: true,
        route: 'setting/cache_manager',
        breadcrumbs: ['SCU URP 助手', '设置', '缓存管理'],
        render: renderCacheManager
      }
    }
  ]
}
