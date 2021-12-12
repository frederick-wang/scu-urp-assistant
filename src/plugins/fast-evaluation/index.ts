import App from './FastEvaluation.vue'
import { SUAPlugin } from '@/core/types'
import { getPluginIcon } from '@/helper/getter'

export const FastEvaluation: SUAPlugin = {
  name: 'fast-evaluation',
  displayName: '快捷评教',
  icon: getPluginIcon('fast-evaluation'),
  isNecessary: false,
  defaultEnabledState: true,
  brief:
    '嫌评教系统交互太不方便？该插件可以让您快捷地在系统中完成问卷，给老师填上正确的评价与合适的分数。',
  route: {
    path: 'utility_tools/fast_evaluation',
    component: App
  },
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-utility-tools',
    name: '实用工具',
    item: {
      name: '快捷评教',
      route: 'utility_tools/fast_evaluation'
    }
  }
}
