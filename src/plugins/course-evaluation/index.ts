import EvaluateSelectedCourses from './EvaluateSelectedCourses.vue'
import QueryCourseEvaluation from './QueryCourseEvaluation.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'
import { createComponentRender } from '@/plugins/common/utils'

const renderEvaluateSelectedCourses = createComponentRender(
  '评价已选课程',
  'sua-container-course-evaluation-evaluate-selected-courses',
  EvaluateSelectedCourses
)

const renderQueryCourseEvaluation = createComponentRender(
  '查询课程评价',
  'sua-container-course-evaluation-query-course-evaluation',
  QueryCourseEvaluation
)

export default {
  name: 'course-evaluation',
  displayName: '课程评价',
  icon: getPluginIcon('course-evaluation'),
  isNecessary: false,
  brief:
    '公开的课程评价功能，您可以评价选过的课程与老师，也可以查询他人写下的评价。',
  route: [
    'course_evaluation/evaluate_selected_courses',
    'course_evaluation/query_course_evaluation'
  ],
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
