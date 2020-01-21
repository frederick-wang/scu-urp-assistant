import Vue, { VNode } from 'vue'
import App from './BachelorDegree.vue'

function render(root: HTMLElement): void {
  $(root).append(`<div class="sua-container-bachelor-degree"></div>`)
  new Vue({
    render: (h): VNode => h(App)
  }).$mount('.sua-container-bachelor-degree')
}

export default {
  name: 'bachelor-degree',
  route: 'advanced_query/bachelor_degree',
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-advanced-query',
    name: '高级查询',
    item: {
      name: '专业授位查询',
      route: 'advanced_query/bachelor_degree',
      breadcrumbs: ['SCU URP 助手', '高级查询', '专业授位查询'],
      render
    }
  }
} as SUAPlugin
