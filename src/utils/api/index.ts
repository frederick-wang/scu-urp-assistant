import {
  requestAllTermsCourseScoreInfoList,
  requestThisTermCourseScoreInfoList,
  requestCurrentSemesterStudentAcademicInfo,
  requestTrainingSchemeList,
  requestTrainingScheme,
  requestSelfMajorNumber,
  requestCourseSchedule,
  requestUserId
} from './requestActions'

import {
  submitCourseScorePublicInfo,
  submitCourseScorePublicInfos
} from './submitActions'

enum Request {
  ALL_TERMS_COURSE_SCORE_INFO_LIST = 'all_terms_course_score_info_list',
  THIS_TERM_COURSE_SCORE_INFO_LIST = 'this_term_course_score_info_list',
  CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO = 'current_semester_student_academic_info',
  TRAINING_SCHEME_LIST = 'training_scheme_list',
  TRAINING_SCHEME = 'training_scheme',
  SELF_MAJOR_NUMBER = 'self_major_number',
  COURSE_Schedule = 'course_schedule',
  REQUEST_USER_ID = 'request_user_id'
}

enum Submit {
  COURSE_SCORE_PUBLIC_INFO = 'course_score_public_info',
  COURSE_SCORE_PUBLIC_INFOS = 'course_score_public_infos'
}

const action = {
  [Request.ALL_TERMS_COURSE_SCORE_INFO_LIST]: requestAllTermsCourseScoreInfoList,
  [Request.THIS_TERM_COURSE_SCORE_INFO_LIST]: requestThisTermCourseScoreInfoList,
  [Request.CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO]: requestCurrentSemesterStudentAcademicInfo,
  [Request.TRAINING_SCHEME_LIST]: requestTrainingSchemeList,
  [Request.TRAINING_SCHEME]: requestTrainingScheme,
  [Request.SELF_MAJOR_NUMBER]: requestSelfMajorNumber,
  [Request.COURSE_Schedule]: requestCourseSchedule,
  [Request.REQUEST_USER_ID]: requestUserId,
  [Submit.COURSE_SCORE_PUBLIC_INFO]: submitCourseScorePublicInfo,
  [Submit.COURSE_SCORE_PUBLIC_INFOS]: submitCourseScorePublicInfos
}

export { Request, Submit, action }
