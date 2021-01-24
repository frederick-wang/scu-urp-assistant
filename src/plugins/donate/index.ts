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
  route: { path: 'help/donate', component: App },
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-help',
    name: '帮助',
    item: {
      name: '打赏作者',
      route: 'help/donate',
      breadcrumbs: ['SCU URP 助手', '帮助', '打赏作者']
    }
  }
}
