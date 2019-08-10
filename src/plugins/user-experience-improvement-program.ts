// 用户体验改善计划插件
import { actions, Request, Submit } from '@/store'
import { CourseScorePublicInfo } from '@/store/types'

export default {
  name: 'user-experience-improvement-program',
  pathname: '/**',
  async init() {
    // 保证处在登陆后界面
    if (window.location.pathname !== '/login') {
      const thisTermCourseScoreInfoList = await actions[Request.THIS_TERM_COURSE_SCORE_INFO_LIST]()
      const courseScorePublicList: CourseScorePublicInfo[] = thisTermCourseScoreInfoList.map(
        ({
          courseName,
          englishCourseName,
          courseNumber,
          courseSequenceNumber,
          executiveEducationPlanNumber,
          executiveEducationPlanName,
          credit,
          examTime,
          examTypeName,
          studyHour,
          maxScore,
          avgScore,
          minScore
        }) => ({
          courseName,
          englishCourseName,
          courseNumber,
          courseSequenceNumber,
          executiveEducationPlanNumber,
          executiveEducationPlanName,
          credit,
          examTime,
          examTypeName,
          studyHour,
          maxScore,
          avgScore,
          minScore
        })
      )
      // action[Submit.COURSE_SCORE_PUBLIC_INFOS](courseScorePublicList)
      // await action[Request.COURSE_INFO_LIST_BY_SEMESTER]('2017-2018-1-1')
      // console.log(await action[Request.STUDENT_SEMESTER_CODE_LIST]())
    }
  }
}
