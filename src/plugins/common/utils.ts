import Vue, { VNode, VueConstructor, VNodeData } from 'vue'
import { emitDataAnalysisEvent } from '@/plugins/data-analysis'

export const createComponentRender = (
  name: string,
  className: string,
  component: VueConstructor<Vue>,
  componentOptions?: VNodeData
) => (root: HTMLElement): void => {
  $(root).append(`<div class="${className}"></div>`)
  if (componentOptions) {
    new Vue({
      render: (h): VNode => h(component, componentOptions)
    }).$mount(`.${className}`)
  } else {
    new Vue({
      render: (h): VNode => h(component)
    }).$mount(`.${className}`)
  }
  emitDataAnalysisEvent(name, '显示成功')
}
