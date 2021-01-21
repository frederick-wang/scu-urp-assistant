import App from './Feedback.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'
import { createComponentRender } from '@/plugins/common/utils'

const render = createComponentRender(
  '咨询与反馈',
  'sua-container-feedback',
  App
)

export const Feedback: SUAPlugin = {
  name: 'feedback',
  displayName: '反馈',
  icon: getPluginIcon('feedback'),
  isNecessary: true,
  defaultEnabledState: true,
  brief: '反馈页面，是助手界面的一部分，不可关闭。',
  route: 'help/feedback',
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-help',
    name: '帮助',
    item: {
      name: '咨询与反馈',
      display: true,
      route: 'help/feedback',
      breadcrumbs: ['SCU URP 助手', '帮助', '咨询与反馈'],
      render
    }
  }
}
