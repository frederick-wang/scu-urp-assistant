import App from './ScuUietp.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

export const ScuUietp: SUAPlugin = {
  name: 'scu-uietp',
  displayName: '历届大创查询',
  icon: getPluginIcon('scu-uietp'),
  isNecessary: false,
  defaultEnabledState: true,
  brief: '查询历年大创的立项信息。',
  route: { path: 'advanced_query/scu_uietp', component: App },
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-advanced-query',
    name: '高级查询',
    item: {
      name: '历届大创查询',
      route: 'advanced_query/scu_uietp',
      breadcrumbs: ['SCU URP 助手', '高级查询', '历届大创查询']
    }
  }
}
