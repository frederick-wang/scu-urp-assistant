import {
  requestAllTermsCourseScoreInfoList,
  requestThisTermCourseScoreInfoList
} from './requestData'

enum Request {
  ALL_TERMS_COURSE_SCORE_INFO_LIST,
  THIS_TERM_COURSE_SCORE_INFO_LIST
}

function requestData(type: Request, params?: any) {
  const actions = {
    async [Request.ALL_TERMS_COURSE_SCORE_INFO_LIST]() {
      return requestAllTermsCourseScoreInfoList()
    },
    async [Request.THIS_TERM_COURSE_SCORE_INFO_LIST]() {
      return requestThisTermCourseScoreInfoList()
    }
  }
  return actions[type]()
}

export { Request, requestData }
