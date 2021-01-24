import App from './BachelorDegree.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

export const BachelorDegree: SUAPlugin = {
  name: 'bachelor-degree',
  displayName: '专业授位查询',
  icon: getPluginIcon('bachelor-degree'),
  isNecessary: false,
  defaultEnabledState: true,
  brief:
    '不知道自己修读的专业会授什么学科门类的学士学位？该插件可以帮助您快捷地查询到自己专业的授位情况。',
  route: { path: 'advanced_query/bachelor_degree', component: App },
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-advanced-query',
    name: '高级查询',
    item: {
      name: '专业授位查询',
      route: 'advanced_query/bachelor_degree',
      breadcrumbs: ['SCU URP 助手', '高级查询', '专业授位查询']
    }
  }
}
