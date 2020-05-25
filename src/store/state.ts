import {
  requestCurrentSemesterStudentAcademicInfo,
  requestStudentInfo,
  requestStudentSemesterNumberList
} from './actions/request'
import { convertSemesterNumberToName, getUserId } from '@/utils'
import { version } from '@/../package.json'
import { LocalStore, TeacherTable } from './types'
import local from './local'
import { state } from '.'
import { actions, Request } from './actions'

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
let accessToken: string
const data = {} as {
  [key: string]: unknown
}

async function initTeacherTable(): Promise<void> {
  let teacherTable: TeacherTable = state.getData('teacherTable') as TeacherTable
  if (!teacherTable) {
    teacherTable = {}
  }
  state.setData('teacherTable', teacherTable)
  await local.saveData({ key: 'teacherTable', payload: teacherTable })
}

async function init(localStore: LocalStore): Promise<void> {
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
  accessToken = (await actions[Request.LOGIN]()).accessToken
  await initTeacherTable()
}

type User = {
  id: string
  accessToken: string
  programPlanNumber: number
  programPlanName: string
  semesterNumberList: string[]
  courseNumber: number
  gpa: number
  currentSemesterCourseNumber: number
  failedCourseNumber: number
}

type Core = {
  version: string
  route: string
  clientType: 'urp'
}

type Basic = {
  currentSemesterNumber: string
  currentSemesterName: string
}

export default {
  init,
  get core(): Core {
    let suaRoute = ''
    if (window.location.pathname !== '/login') {
      const regexp = window.location.hash.match(/sua_route=(.+)$/)
      if (regexp) {
        suaRoute = regexp[1]
      }
    }
    return {
      version,
      route: suaRoute,
      clientType: 'urp'
    }
  },
  get user(): User {
    return {
      id: getUserId(studentInfos),
      accessToken,
      programPlanNumber: Number(studentInfos.get('培养方案代码')),
      programPlanName: studentInfos.get('培养方案名称') || '',
      semesterNumberList: userSemesterNumberList,
      courseNumber: academicInfo.courseNumber,
      gpa: academicInfo.gpa,
      currentSemesterCourseNumber: academicInfo.currentSemesterCourseNumber,
      failedCourseNumber: academicInfo.failedCourseNumber
    }
  },
  get basic(): Basic {
    return {
      currentSemesterNumber: academicInfo.currentSemester,
      currentSemesterName: convertSemesterNumberToName(
        academicInfo.currentSemester
      )
    }
  },
  getData(key: string): unknown {
    return data[key]
  },
  setData(key: string, payload: unknown): void {
    data[key] = payload
  }
}
