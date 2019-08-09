import {
  requestAllTermsCourseScoreInfoList,
  requestThisTermCourseScoreInfoList,
  requestCurrentSemesterStudentAcademicInfo,
  requestTrainingSchemeList,
  requestTrainingScheme,
  requestSelfMajorNumber
} from './requestActions'

enum Request {
  ALL_TERMS_COURSE_SCORE_INFO_LIST,
  THIS_TERM_COURSE_SCORE_INFO_LIST,
  CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO,
  TRAINING_SCHEME_LIST,
  TRAINING_SCHEME,
  SELF_MAJOR_NUMBER
}

const action = {
  [Request.ALL_TERMS_COURSE_SCORE_INFO_LIST]() {
    return requestAllTermsCourseScoreInfoList()
  },
  [Request.THIS_TERM_COURSE_SCORE_INFO_LIST]() {
    return requestThisTermCourseScoreInfoList()
  },
  [Request.CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO]() {
    return requestCurrentSemesterStudentAcademicInfo()
  },
  [Request.TRAINING_SCHEME_LIST]() {
    return requestTrainingSchemeList()
  },
  [Request.TRAINING_SCHEME](num: number) {
    return requestTrainingScheme(num)
  },
  [Request.SELF_MAJOR_NUMBER]() {
    return requestSelfMajorNumber()
  }
}

export { Request, action }
