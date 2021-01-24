import EvaluateSelectedCourses from './EvaluateSelectedCourses.vue'
import QueryCourseEvaluation from './QueryCourseEvaluation.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

export default {
  name: 'course-info-exchange',
  displayName: '课程信息交流',
  icon: getPluginIcon('course-info-exchange'),
  isNecessary: false,
  defaultEnabledState: true,
  brief:
    '公开的课程信息交流功能，您可以评价选过的课程与老师，也可以查询他人写下的评价。',
  route: [
    {
      path: 'course_evaluation/evaluate_selected_courses',
      component: EvaluateSelectedCourses
    },
    {
      path: 'course_evaluation/query_course_evaluation',
      component: QueryCourseEvaluation
    }
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
        breadcrumbs: ['SCU URP 助手', '课程信息交流', '评价已选课程']
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
        breadcrumbs: ['SCU URP 助手', '课程信息交流', '查询课程评价']
      }
    }
  ]
} as SUAPlugin
