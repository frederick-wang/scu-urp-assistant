import PluginManager from './PluginManager.vue'
import CacheManager from './CacheManager.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

export const Setting: SUAPlugin = {
  name: 'setting',
  displayName: '设置',
  icon: getPluginIcon('setting'),
  isNecessary: true,
  defaultEnabledState: true,
  brief: '设置中心，是助手界面的一部分，不可关闭。',
  route: [
    {
      path: 'setting/plugin_manager',
      component: PluginManager
    },
    {
      path: 'setting/cache_manager',
      component: CacheManager
    }
  ],
  menu: [
    {
      rootMenuId: 'sua-menu-list',
      rootMenuName: 'SCU URP 助手',
      id: 'menu-setting',
      name: '设置',
      item: {
        name: '插件管理',
        route: 'setting/plugin_manager'
      }
    },
    {
      rootMenuId: 'sua-menu-list',
      rootMenuName: 'SCU URP 助手',
      id: 'menu-setting',
      name: '设置',
      item: {
        name: '缓存管理',
        route: 'setting/cache_manager'
      }
    }
  ]
}
