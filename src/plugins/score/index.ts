// 成绩相关功能插件
import Vue, { VNode } from 'vue'
import GPACalculatorApp from './GPACalculator.vue'
import GPACalculatorWidgetApp from './GPACalculatorWidget.vue'
import ExpectedGradesEstimationApp from './ExpectedGradesEstimation.vue'
import { emitDataAnalysisEvent } from '../data-analysis'

function renderExpectedGradesEstimation(root: HTMLElement): void {
  $(root).append(`<div class="sua-container-expected-grades-estimation"></div>`)
  new Vue({
    render: (h): VNode => h(ExpectedGradesEstimationApp)
  }).$mount('.sua-container-expected-grades-estimation')
}

function renderGPACalculator(root: HTMLElement): void {
  $(root).append(`<div class="sua-container-gpa-calculator"></div>`)
  new Vue({
    render: (h): VNode =>
      h(GPACalculatorApp, {
        props: {
          type: 'basic'
        }
      })
  }).$mount('.sua-container-gpa-calculator')
}

function renderScoresInformation(root: HTMLElement): void {
  window.urp.confirm(
    `<p style="font-weight: 700; color: red;">警告：</p>
    <p style="text-indent: 2em;">该页面展示的部分敏感数据（最高分、平均分、最低分、名次）调用了综合教务系统<span style="color: red;">【未公开】的接口</span>，如果综合教务系统关闭了该接口，那么这个功能就报废了，我们将无法再获取到这些教务系统屏蔽的数据！</p>
    <p style="text-indent: 2em;">因此，如果您要用本页面展示的这些敏感数据和您的任课老师沟通，我希望您可以<span style="color: red;">不要透露该插件的存在</span>，只是说这些敏感数据是您私下联系同学们询问成绩，从而获得的调查结果！</p>
    <p style="text-indent: 2em;">否则，老师一旦和教务处反映，这个数据获取接口就有<span style="color: red;">被关闭</span>的风险！</p>`,
    async (res: boolean) => {
      if (res) {
        $(root).append(`<div class="sua-container-gpa-calculator"></div>`)
        new Vue({
          render: (h): VNode =>
            h(GPACalculatorApp, {
              props: {
                type: 'full'
              }
            })
        }).$mount('.sua-container-gpa-calculator')
        emitDataAnalysisEvent('成绩信息查询', '成功')
      } else {
        $(root).append(`
        <div class="sua-container-gpa-calculator">
          <p>很抱歉，因为您拒绝了使用协议，SCU URP 助手 无法显示您希望看到的数据。</p>
        </div>`)
        emitDataAnalysisEvent('成绩信息查询', '拒绝使用协议')
      }
    }
  )
}

const menu = [
  {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-utility-tools',
    name: '实用工具',
    item: {
      name: '均分绩点计算器',
      route: 'utility_tools/gpa_calculator',
      breadcrumbs: ['SCU URP 助手', '实用工具', '均分绩点计算器'],
      render: renderGPACalculator
    }
  },
  {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-utility-tools',
    name: '实用工具',
    item: {
      name: '预期成绩估计',
      route: 'utility_tools/expected_grades_estimation',
      breadcrumbs: ['SCU URP 助手', '实用工具', '预期成绩估计'],
      render: renderExpectedGradesEstimation
    }
  },
  {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-advanced-query',
    name: '高级查询',
    item: {
      name: '成绩信息查询',
      route: 'advanced_query/scores_information',
      breadcrumbs: ['SCU URP 助手', '高级查询', '成绩信息查询'],
      render: renderScoresInformation
    }
  }
]

export default {
  name: 'gpa',
  pathname: ['/', '/index.jsp'],
  route: menu.map(v => v.item.route),
  init() {
    $('.page-content').append(
      `<div class="row"><div class="sua-widget-container-gpa-calculator"></div></div>`
    )
    new Vue({
      render: (h): VNode => h(GPACalculatorWidgetApp)
    }).$mount('.sua-widget-container-gpa-calculator')
  },
  menu
} as SUAPlugin
