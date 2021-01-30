import App from './Changelog.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

export const Changelog: SUAPlugin = {
  name: 'changelog',
  displayName: '更新日志',
  icon: getPluginIcon('changelog'),
  isNecessary: true,
  defaultEnabledState: true,
  brief: '更新日志页面，是助手界面的一部分，不可关闭。',
  route: {
    path: 'help/changelog',
    component: App
  },
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-help',
    name: '帮助',
    item: {
      name: '更新日志',
      route: 'help/changelog'
    }
  }
}
