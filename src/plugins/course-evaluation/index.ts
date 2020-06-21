import Vue, { VNode, VueConstructor } from 'vue'
import EvaluateSelectedCourses from './EvaluateSelectedCourses.vue'
import QueryCourseEvaluation from './QueryCourseEvaluation.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/types'

function renderComponent(
  root: HTMLElement,
  name: string,
  className: string,
  component: VueConstructor<Vue>
) {
  $(root).append(`<div class="${className}"></div>`)
  new Vue({
    render: (h): VNode => h(component)
  }).$mount(`.${className}`)
  emitDataAnalysisEvent(name, '显示成功')
}

function renderEvaluateSelectedCourses(root: HTMLElement): void {
  const className = 'sua-container-course-evaluation-evaluate-selected-courses'
  const name = '评价已选课程'
  renderComponent(root, name, className, EvaluateSelectedCourses)
}

function renderQueryCourseEvaluation(root: HTMLElement): void {
  const className = 'sua-container-course-evaluation-query-course-evaluation'
  const name = '查询课程评价'
  renderComponent(root, name, className, QueryCourseEvaluation)
}

export default {
  name: 'course-evaluation',
  displayName: '课程评价',
  icon: getPluginIcon('course-evaluation'),
  isNecessary: false,
  brief: '公开的课程评价功能，您可以评价选过的课程与老师，也可以查询他人写下的评价。',
  route: ['course_evaluation/evaluate_selected_courses', 'course_evaluation/query_course_evaluation'],
  menu: [
    {
      rootMenuId: 'sua-menu-list',
      rootMenuName: 'SCU URP 助手',
      id: 'menu-course-evaluation',
      name: '课程评价',
      item: {
        name: '评价已选课程',
        route: 'course_evaluation/evaluate_selected_courses',
        breadcrumbs: ['SCU URP 助手', '课程评价', '评价已选课程'],
        render: renderEvaluateSelectedCourses
      }
    },
    {
      rootMenuId: 'sua-menu-list',
      rootMenuName: 'SCU URP 助手',
      id: 'menu-course-evaluation',
      name: '课程评价',
      item: {
        name: '查询课程评价',
        route: 'course_evaluation/query_course_evaluation',
        breadcrumbs: ['SCU URP 助手', '课程评价', '查询课程评价'],
        render: renderQueryCourseEvaluation
      }
    }
  ]
} as SUAPlugin
