import App from './Donate.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'
import { createComponentRender } from '@/plugins/common/utils'

const render = createComponentRender('打赏作者', 'sua-container-donate', App)

export const Donate: SUAPlugin = {
  name: 'donate',
  displayName: '打赏',
  icon: getPluginIcon('donate'),
  isNecessary: true,
  defaultEnabledState: true,
  brief: '打赏页面，是助手界面的一部分，不可关闭。',
  route: 'help/donate',
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-help',
    name: '帮助',
    item: {
      name: '打赏作者',
      display: true,
      route: 'help/donate',
      breadcrumbs: ['SCU URP 助手', '帮助', '打赏作者'],
      render
    }
  }
}
