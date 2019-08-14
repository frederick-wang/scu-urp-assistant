import {
  requestCurrentSemesterStudentAcademicInfo,
  requestStudentInfo,
  requestStudentSemesterNumberList,
  requestCourseInfoListBySemester
} from './actions/request'
import {
  convertSemesterNumberToName,
  getUserId,
  logger,
  convertCourseInfoListsToTeacherTable
} from '@/utils'
import { version } from '@/../package.json'
import { LocalStore, TeacherTable } from './types'
import local from './local'
import { state } from '.'

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
let data = {} as {
  [key: string]: any
}

async function init(localStore: LocalStore) {
  if (localStore) {
    for (const key of Object.keys(localStore.state.data)) {
      data[key] = local.get(key)
    }
  }
  const res = await Promise.all([
    requestCurrentSemesterStudentAcademicInfo(),
    requestStudentInfo(),
    requestStudentSemesterNumberList()
  ])
  academicInfo = res[0]
  studentInfos = res[1]
  userSemesterNumberList = res[2]
  await initTeacherTable()
}

async function initTeacherTable() {
  let teacherTable: TeacherTable = state.getData('teacherTable')
  if (!teacherTable) {
    teacherTable = await getFreshTeacherTableWhenNoCache()
  }
  state.setData('teacherTable', teacherTable)
  await local.saveData({ key: 'teacherTable', payload: teacherTable })
}

async function getFreshTeacherTableWhenNoCache() {
  let courseInfoLists = []
  for (const s of state.user.semesterNumberList) {
    courseInfoLists.push(await requestCourseInfoListBySemester(s))
  }
  return convertCourseInfoListsToTeacherTable(courseInfoLists)
}

export default {
  init,
  get core() {
    let suaRoute = ''
    if (window.location.pathname !== '/login') {
      const regexp = window.location.hash.match(/sua_route=(.+)$/)
      if (regexp) {
        suaRoute = regexp[1]
      }
    }
    return {
      version,
      route: suaRoute
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
  },
  getData(key: string) {
    return data[key]
  },
  setData(key: string, payload: any) {
    data[key] = payload
  }
}
