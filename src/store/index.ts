import state from './state'

import {
  requestAllTermsCourseScoreInfoList,
  requestThisTermCourseScoreInfoList,
  requestCurrentSemesterStudentAcademicInfo,
  requestTrainingSchemeList,
  requestTrainingScheme,
  requestSelfMajorNumber,
  requestCourseSchedule,
  requestUserId,
  requestCourseInfoListBySemester,
  requestStudentSemesterCodeList,
  requestCourseTeacherList
} from './requestActions'

import {
  submitCourseScorePublicInfo,
  submitCourseScorePublicInfos,
  submitStudentCourseScorePublicInfos
} from './submitActions'

enum Request {
  ALL_TERMS_COURSE_SCORE_INFO_LIST = 'all_terms_course_score_info_list',
  THIS_TERM_COURSE_SCORE_INFO_LIST = 'this_term_course_score_info_list',
  CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO = 'current_semester_student_academic_info',
  TRAINING_SCHEME_LIST = 'training_scheme_list',
  TRAINING_SCHEME = 'training_scheme',
  SELF_MAJOR_NUMBER = 'self_major_number',
  COURSE_Schedule = 'course_schedule',
  USER_ID = 'user_id',
  COURSE_INFO_LIST_BY_SEMESTER = 'course_info_list_by_semester',
  STUDENT_SEMESTER_CODE_LIST = 'student_semester_code_list',
  COURSE_TEACHER_LIST = 'course_teacher_list'
}

enum Submit {
  COURSE_SCORE_PUBLIC_INFO = 'course_score_public_info',
  COURSE_SCORE_PUBLIC_INFOS = 'course_score_public_infos',
  STUDENT_COURSE_SCORE_PUBLIC_INFOS = 'student_course_score_public_infos'
}

const actions = {
  [Request.ALL_TERMS_COURSE_SCORE_INFO_LIST]: requestAllTermsCourseScoreInfoList,
  [Request.THIS_TERM_COURSE_SCORE_INFO_LIST]: requestThisTermCourseScoreInfoList,
  [Request.CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO]: requestCurrentSemesterStudentAcademicInfo,
  [Request.TRAINING_SCHEME_LIST]: requestTrainingSchemeList,
  [Request.TRAINING_SCHEME]: requestTrainingScheme,
  [Request.SELF_MAJOR_NUMBER]: requestSelfMajorNumber,
  [Request.COURSE_Schedule]: requestCourseSchedule,
  [Request.USER_ID]: requestUserId,
  [Request.COURSE_INFO_LIST_BY_SEMESTER]: requestCourseInfoListBySemester,
  [Request.STUDENT_SEMESTER_CODE_LIST]: requestStudentSemesterCodeList,
  [Request.COURSE_TEACHER_LIST]: requestCourseTeacherList,
  [Submit.COURSE_SCORE_PUBLIC_INFO]: submitCourseScorePublicInfo,
  [Submit.COURSE_SCORE_PUBLIC_INFOS]: submitCourseScorePublicInfos,
  [Submit.STUDENT_COURSE_SCORE_PUBLIC_INFOS]: submitStudentCourseScorePublicInfos
}

export { Request, Submit, actions, state }
