import App from './SubitemScore.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

export const SubitemScore: SUAPlugin = {
  name: 'subitem-score',
  displayName: '分项成绩查询',
  icon: getPluginIcon('subitem-score'),
  isNecessary: false,
  defaultEnabledState: true,
  brief:
    '不了解自己成绩的构成？该插件可以帮助您查询到课程成绩各分项的得分与占比，以便反省自己在课程学习中的哪一部分做得还不够好。',
  route: {
    path: 'advanced_query/subitem_score',
    component: App
  },
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-advanced-query',
    name: '高级查询',
    item: {
      name: '分项成绩查询',
      route: 'advanced_query/subitem_score'
    }
  }
}
