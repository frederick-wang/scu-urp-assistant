import App from './Donate.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

export const Donate: SUAPlugin = {
  name: 'donate',
  displayName: '打赏',
  icon: getPluginIcon('donate'),
  isNecessary: true,
  defaultEnabledState: true,
  brief: '打赏页面，是助手界面的一部分，不可关闭。',
  route: {
    path: 'donate/donate-developer',
    component: App
  },
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-donate',
    name: '打赏',
    item: {
      name: '打赏开发者',
      route: 'donate/donate-developer'
    }
  }
}
