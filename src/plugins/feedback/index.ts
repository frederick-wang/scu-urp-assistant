import App from './Feedback.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

export const Feedback: SUAPlugin = {
  name: 'feedback',
  displayName: '反馈',
  icon: getPluginIcon('feedback'),
  isNecessary: true,
  defaultEnabledState: true,
  brief: '反馈页面，是助手界面的一部分，不可关闭。',
  route: { path: 'help/feedback', component: App },
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-help',
    name: '帮助',
    item: {
      name: '咨询与反馈',
      route: 'help/feedback',
      breadcrumbs: ['SCU URP 助手', '帮助', '咨询与反馈']
    }
  }
}
