import EvaluateSelectedCourses from './EvaluateSelectedCourses.vue'
import QueryCourseEvaluation from './QueryCourseEvaluation.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'
import { createComponentRender } from '@/plugins/common/utils'

const renderEvaluateSelectedCourses = createComponentRender(
  '评价已选课程',
  'sua-container-course-info-exchange-evaluate-selected-courses',
  EvaluateSelectedCourses
)

const renderQueryCourseEvaluation = createComponentRender(
  '查询课程评价',
  'sua-container-course-info-exchange-query-course-info-exchange',
  QueryCourseEvaluation
)

export default {
  name: 'course-info-exchange',
  displayName: '课程信息交流',
  icon: getPluginIcon('course-info-exchange'),
  isNecessary: false,
  brief:
    '公开的课程信息交流功能，您可以评价选过的课程与老师，也可以查询他人写下的评价。',
  route: [
    'course_evaluation/evaluate_selected_courses',
    'course_evaluation/query_course_evaluation'
  ],
  menu: [
    {
      rootMenuId: 'sua-menu-list',
      rootMenuName: 'SCU URP 助手',
      id: 'menu-course-info-exchange',
      name: '课程信息交流',
      item: {
        name: '评价已选课程',
        route: 'course_evaluation/evaluate_selected_courses',
        breadcrumbs: ['SCU URP 助手', '课程信息交流', '评价已选课程'],
        render: renderEvaluateSelectedCourses
      }
    },
    {
      rootMenuId: 'sua-menu-list',
      rootMenuName: 'SCU URP 助手',
      id: 'menu-course-info-exchange',
      name: '课程信息交流',
      item: {
        name: '查询课程评价',
        route: 'course_evaluation/query_course_evaluation',
        breadcrumbs: ['SCU URP 助手', '课程信息交流', '查询课程评价'],
        render: renderQueryCourseEvaluation
      }
    }
  ]
} as SUAPlugin
