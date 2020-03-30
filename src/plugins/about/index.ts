import Vue, { VNode } from 'vue'
import App from './About.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { getPluginIcon } from '@/utils'

function render(root: HTMLElement): void {
  $(root).append(`<div class="sua-container-about"></div>`)
  new Vue({
    render: (h): VNode => h(App)
  }).$mount('.sua-container-about')
  emitDataAnalysisEvent('关于', '显示成功')
}

export default {
  name: 'about',
  displayName: '关于',
  icon: getPluginIcon('about'),
  isNecessary: true,
  route: 'help/about',
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-help',
    name: '帮助',
    item: {
      name: '关于',
      route: 'help/about',
      breadcrumbs: ['SCU URP 助手', '帮助', '关于'],
      render
    }
  }
} as SUAPlugin
