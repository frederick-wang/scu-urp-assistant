import Vue from 'vue'
import App from './About.vue'
import { emitDataAnalysisEvent } from '../data-analysis';


function render(root: HTMLElement) {
  $(root).append(`<div class="sua-container-about"></div>`)
  new Vue({
    render: h => h(App)
  }).$mount('.sua-container-about')
  emitDataAnalysisEvent('关于', '成功')
}

export default {
  name: 'about',
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
