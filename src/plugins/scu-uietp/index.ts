import Vue, { VNode } from 'vue'
import App from './ScuUietp.vue'
import { getPluginIcon } from '@/utils'
import { SUAPlugin } from '@/types'

function render(root: HTMLElement): void {
  $(root).append(`<div class="sua-container-scu-uietp"></div>`)
  new Vue({
    render: (h): VNode => h(App)
  }).$mount('.sua-container-scu-uietp')
}

export default {
  name: 'scu-uietp',
  displayName: '历届大创查询',
  icon: getPluginIcon('scu-uietp'),
  isNecessary: false,
  brief: '查询历年大创的立项信息。',
  route: 'advanced_query/scu_uietp',
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-advanced-query',
    name: '高级查询',
    item: {
      name: '历届大创查询',
      route: 'advanced_query/scu_uietp',
      breadcrumbs: ['SCU URP 助手', '高级查询', '历届大创查询'],
      render
    }
  }
} as SUAPlugin
