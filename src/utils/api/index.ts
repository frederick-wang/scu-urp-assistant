import {
  CourseScoreBaseInfo,
  CourseScoreInfo,
  CurrentSemesterStudentAcademicInfo
} from '@/utils/api/types'
import {
  requestAllTermsCourseScoreInfoList,
  requestThisTermCourseScoreInfoList,
  requestCurrentSemesterStudentAcademicInfo
} from './requestData'

enum Request {
  ALL_TERMS_COURSE_SCORE_INFO_LIST,
  THIS_TERM_COURSE_SCORE_INFO_LIST,
  CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO
}

function requestData(type: Request) {
  const actions = {
    async [Request.ALL_TERMS_COURSE_SCORE_INFO_LIST]() {
      return requestAllTermsCourseScoreInfoList()
    },
    async [Request.THIS_TERM_COURSE_SCORE_INFO_LIST]() {
      return requestThisTermCourseScoreInfoList()
    },
    async [Request.CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO]() {
      return requestCurrentSemesterStudentAcademicInfo()
    }
  }
  return actions[type]()
}

export { Request, requestData }
