import {
  requestCurrentSemesterStudentAcademicInfo,
  requestStudentInfo,
  requestStudentSemesterNumberList
} from './actions/request'
import { convertSemesterNumberToName, getUserId } from '@/utils'

interface AcademicInfo {
  courseNumber: number
  currentSemester: string
  gpa: number
  currentSemesterCourseNumber: number
  failedCourseNumber: number
}
let academicInfo: AcademicInfo
let studentInfos: Map<string, string>
let userSemesterNumberList: string[]

async function init() {
  const res = await Promise.all([
    requestCurrentSemesterStudentAcademicInfo(),
    requestStudentInfo(),
    requestStudentSemesterNumberList()
  ])
  academicInfo = res[0]
  studentInfos = res[1]
  userSemesterNumberList = res[2]
}

export default {
  init,
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
      id: getUserId(studentInfos),
      programPlanNumber: Number(studentInfos.get('培养方案代码')),
      programPlanName: studentInfos.get('培养方案名称'),
      semesterNumberList: userSemesterNumberList,
      courseNumber: academicInfo.courseNumber,
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
