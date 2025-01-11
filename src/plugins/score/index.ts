// 成绩相关功能插件
import Vue, { VNode } from 'vue'
import GPACalculatorApp from './GPACalculator.vue'
import GPACalculatorWidgetApp from './GPACalculatorWidget.vue'
import ExpectedGradesEstimationApp from './ExpectedGradesEstimation.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'
import { RouteHookNextFunction } from '@/core/router'

const menu = [
  {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-utility-tools',
    name: '实用工具',
    item: {
      name: '均分绩点计算器',
      route: 'utility_tools/gpa_calculator'
    }
  },
  {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-utility-tools',
    name: '实用工具',
    item: {
      name: '预期成绩估计',
      route: 'utility_tools/expected_grades_estimation'
    }
  },
  {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-advanced-query',
    name: '高级查询',
    item: {
      name: '成绩信息查询',
      route: 'advanced_query/scores_information'
    }
  }
]

export const Score: SUAPlugin = {
  name: 'score',
  displayName: '成绩相关工具',
  icon: getPluginIcon('score'),
  isNecessary: false,
  defaultEnabledState: true,
  brief:
    '让您直接看到全部均分、全部绩点与必修均分、必修绩点，还可自由地选择课程进行计算，并方便地估计预期成绩。还可以在每年的出分季帮助您查询到本学期课程成绩的最高分、最低分、平均分和名次。',
  pathname: ['/', '/index.jsp'],
  route: [
    {
      path: 'utility_tools/gpa_calculator',
      component: GPACalculatorApp,
      componentOptions: {
        props: {
          type: 'basic'
        }
      }
    },
    {
      path: 'utility_tools/expected_grades_estimation',
      component: ExpectedGradesEstimationApp
    },
    {
      path: 'advanced_query/scores_information',
      component: GPACalculatorApp,
      componentOptions: {
        props: {
          type: 'full'
        }
      },
      beforeEnter(next: RouteHookNextFunction): void {
        window.urp.confirm(
          `<p style="font-weight: 700; color: red;">警告：</p>
          <p style="text-indent: 2em;">该页面的api目前已废止</p>
           <p style="text-indent: 2em;">相关功能已无法使用！</p>`,
          async (res: boolean) => {
            if (res) {
              next(
                new Error(
                  '很抱歉，该页面的api目前已废止，无法显示您希望看到的数据。'
                )
              )
                
            } else {
              next(
                new Error(
                  '很抱歉，因为您拒绝了使用协议，SCU URP 助手 无法显示您希望看到的数据。'
                )
              )
              emitDataAnalysisEvent('成绩信息查询', '拒绝使用协议')
            }
          }
        )
      }
    }
  ],
  init() {
    $('.page-content').append(
      `<div class="row"><div class="sua-widget-container-gpa-calculator"></div></div>`
    )
    new Vue({
      render: (h): VNode => h(GPACalculatorWidgetApp)
    }).$mount('.sua-widget-container-gpa-calculator')
  },
  menu
}
