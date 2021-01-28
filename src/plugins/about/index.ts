import App from './About.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

export const About: SUAPlugin = {
  name: 'about',
  displayName: '关于',
  icon: getPluginIcon('about'),
  isNecessary: true,
  defaultEnabledState: true,
  brief: '关于页面，是助手界面的一部分，不可关闭。',
  route: {
    path: 'help/about',
    component: App
  },
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-help',
    name: '帮助',
    item: {
      name: '关于',
      route: 'help/about'
    }
  }
}
