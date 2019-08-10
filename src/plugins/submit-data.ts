// 提交公共数据到服务器插件
import { action, Request, Submit } from '@/utils/api'
import { CourseScorePublicInfo } from '@/utils/api/types'

export default {
  name: 'submit-data',
  pathname: '/**',
  async init() {
    // 保证处在登陆后界面
    if (window.location.pathname !== '/login') {
      const res = await action[Request.THIS_TERM_COURSE_SCORE_INFO_LIST]()
      const courseScorePublicList: CourseScorePublicInfo[] = res.map(
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
      action[Submit.COURSE_SCORE_PUBLIC_INFOS](courseScorePublicList)
    }
  }
}
