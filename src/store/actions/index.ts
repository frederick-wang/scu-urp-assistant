import {
  requestCurrentSemesterStudentAcademicInfo,
  // requestTrainingSchemeList,
  // requestTrainingScheme,
  // requestBachelorDegree,
  requestCourseSchedule
  // requestStudentSemesterNumberList
  // requestScuUietpList,
  // requestAccessToken
} from './request'

// import {
//   submitCourseScorePublicInfo,
//   submitCourseScorePublicInfos,
//   submitStudentCourseScorePublicInfos
// } from './submit'

enum Request {
  ALL_TERMS_COURSE_SCORE_INFO_LIST = 'all_terms_course_score_info_list',
  THIS_TERM_COURSE_SCORE_INFO_LIST = 'this_term_course_score_info_list',
  CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO = 'current_semester_student_academic_info',
  TRAINING_SCHEME_LIST = 'training_scheme_list',
  TRAINING_SCHEME = 'training_scheme',
  BACHELOR_DEGREE = 'bachelor_degree',
  COURSE_SCHEDULE = 'course_schedule',
  COURSE_INFO_LIST_BY_SEMESTER = 'course_info_list_by_semester',
  STUDENT_SEMESTER_CODE_LIST = 'student_semester_code_list',
  SCU_UIETP_LIST = 'scu_uietp_list',
  ACCESS_TOKEN = 'login'
}

enum Submit {
  COURSE_SCORE_PUBLIC_INFO = 'course_score_public_info',
  COURSE_SCORE_PUBLIC_INFOS = 'course_score_public_infos',
  STUDENT_COURSE_SCORE_PUBLIC_INFOS = 'student_course_score_public_infos'
}

const actions = {
  [Request.CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO]: requestCurrentSemesterStudentAcademicInfo,
  // [Request.TRAINING_SCHEME_LIST]: requestTrainingSchemeList,
  // [Request.TRAINING_SCHEME]: requestTrainingScheme,
  // [Request.BACHELOR_DEGREE]: requestBachelorDegree,
  [Request.COURSE_SCHEDULE]: requestCourseSchedule
  // [Request.STUDENT_SEMESTER_CODE_LIST]: requestStudentSemesterNumberList
  // [Request.SCU_UIETP_LIST]: requestScuUietpList,
  // [Request.ACCESS_TOKEN]: requestAccessToken,
  // [Submit.COURSE_SCORE_PUBLIC_INFO]: submitCourseScorePublicInfo,
  // [Submit.COURSE_SCORE_PUBLIC_INFOS]: submitCourseScorePublicInfos,
  // [Submit.STUDENT_COURSE_SCORE_PUBLIC_INFOS]:
  // submitStudentCourseScorePublicInfos
}

export { Request, Submit, actions }
