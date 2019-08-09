import {
  requestAllTermsCourseScoreInfoList,
  requestThisTermCourseScoreInfoList,
  requestCurrentSemesterStudentAcademicInfo,
  requestTrainingSchemeList,
  requestTrainingScheme,
  requestSelfMajorNumber,
  requestCourseSchedule
} from './requestActions'

enum Request {
  ALL_TERMS_COURSE_SCORE_INFO_LIST,
  THIS_TERM_COURSE_SCORE_INFO_LIST,
  CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO,
  TRAINING_SCHEME_LIST,
  TRAINING_SCHEME,
  SELF_MAJOR_NUMBER,
  COURSE_Schedule
}

const action = {
  [Request.ALL_TERMS_COURSE_SCORE_INFO_LIST]: requestAllTermsCourseScoreInfoList,
  [Request.THIS_TERM_COURSE_SCORE_INFO_LIST]: requestThisTermCourseScoreInfoList,
  [Request.CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO]: requestCurrentSemesterStudentAcademicInfo,
  [Request.TRAINING_SCHEME_LIST]: requestTrainingSchemeList,
  [Request.TRAINING_SCHEME]: requestTrainingScheme,
  [Request.SELF_MAJOR_NUMBER]: requestSelfMajorNumber,
  [Request.COURSE_Schedule]: requestCourseSchedule
}

export { Request, action }
