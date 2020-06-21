import Vue, { VNode, VueConstructor, VNodeData } from 'vue'
import { emitDataAnalysisEvent } from '@/plugins/data-analysis'

/**
 * 生成 Vue 单文件组件渲染函数
 *
 * @param name 组件名称
 * @param className 组件根元素的类名
 * @param component 组件对象
 * @param componentOptions 组件对象选项
 */
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
