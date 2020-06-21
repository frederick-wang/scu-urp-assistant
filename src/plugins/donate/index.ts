import Vue, { VNode } from 'vue'
import App from './Donate.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/types'

function render(root: HTMLElement): void {
  $(root).append(`<div class="sua-container-donate"></div>`)
  new Vue({
    render: (h): VNode => h(App)
  }).$mount('.sua-container-donate')
  emitDataAnalysisEvent('打赏作者', '显示成功')
}

export default {
  name: 'donate',
  displayName: '打赏',
  icon: getPluginIcon('donate'),
  isNecessary: true,
  brief: '打赏页面，是助手界面的一部分，不可关闭。',
  route: 'help/donate',
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-help',
    name: '帮助',
    item: {
      name: '打赏作者',
      route: 'help/donate',
      breadcrumbs: ['SCU URP 助手', '帮助', '打赏作者'],
      render
    }
  }
} as SUAPlugin
