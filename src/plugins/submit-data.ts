// 提交公共数据到服务器插件
import { action, Request, Submit } from '@/utils/api'
import { CourseScorePublicInfo } from '@/utils/api/types'

export default {
  name: 'submit-data',
  pathname: '/**',
  async init() {
    // 保证处在登陆后界面
    if (window.location.pathname !== '/login') {
      const thisTermCourseScoreInfoList = await action[Request.THIS_TERM_COURSE_SCORE_INFO_LIST]()
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
      // const userId = await action[Request.USER_ID]()
      // await action[Request.COURSE_INFO_LIST_BY_SEMESTER]('2017-2018-1-1')
      // console.log(await action[Request.STUDENT_SEMESTER_CODE_LIST]())
    }
  }
}
