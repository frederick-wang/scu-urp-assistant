import {
  requestCurrentSemesterStudentAcademicInfo,
  requestUserId
} from './actions/request'
import { convertSemesterNumberToName } from '@/utils'

interface AcademicInfo {
  courseNumber: number
  currentSemester: string
  gpa: number
  currentSemesterCourseNumber: number
  failedCourseNumber: number
}

let ready: boolean = false
let academicInfo: AcademicInfo
let userId: string
;(async () => {
  const res = await Promise.all([
    requestCurrentSemesterStudentAcademicInfo(),
    requestUserId()
  ])
  academicInfo = res[0]
  userId = res[1]
  ready = true
})()

export default {
  get ready() {
    return ready
  },
  get core() {
    let suaPath = ''
    if (window.location.pathname !== '/login') {
      const regexp = window.location.hash.match(/suapath=(.+)$/)
      if (regexp) {
        suaPath = regexp[1]
      }
    }
    return {
      suaPath
    }
  },
  get user() {
    return {
      id: userId,
      courseNumber: academicInfo.courseNumber,
      currentSemester: academicInfo.currentSemester,
      gpa: academicInfo.gpa,
      currentSemesterCourseNumber: academicInfo.currentSemesterCourseNumber,
      failedCourseNumber: academicInfo.failedCourseNumber
    }
  },
  get basic() {
    return {
      currentSemesterNumber: academicInfo.currentSemester,
      currentSemesterName: convertSemesterNumberToName(
        academicInfo.currentSemester
      )
    }
  }
}
