import Vue from 'vue'
import { requestStudentInfo } from './actions/request'
import { convertSemesterNumberToName, getUserId } from '@/utils'
import { version } from '@/../package.json'
import { LocalStore, TeacherTable } from './types'
import local from './local'
import { state } from '.'
import { actions, Request } from './actions'
import { allList as pluginList } from '@/plugins'

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
  const key = 'teacherTable'
  let teacherTable: TeacherTable = state.getData(key) as TeacherTable
  if (!teacherTable) {
    teacherTable = {}
  }
  state.setData(key, teacherTable)
  await local.saveData({ key, payload: teacherTable })
}

async function initPluginEnabledStates(): Promise<void> {
  const key = 'pluginEnabledStates'
  let pluginEnabledStates = state.getData(key) as Record<string, boolean>
  if (!pluginEnabledStates) {
    pluginEnabledStates = Object.fromEntries(
      pluginList.map(v => [v.name, true])
    )
  }
  state.setData(key, pluginEnabledStates)
  await local.saveData({ key, payload: pluginEnabledStates })
}

async function init(localStore: LocalStore): Promise<void> {
  if (localStore) {
    for (const key of Object.keys(localStore.state.data)) {
      data[key] = local.get(key)
    }
  }
  await initPluginEnabledStates()
  const res = await Promise.all([
    actions[Request.CURRENT_SEMESTER_STUDENT_ACADEMIC_INFO](),
    requestStudentInfo(),
    actions[Request.STUDENT_SEMESTER_CODE_LIST]()
  ])
  academicInfo = res[0]
  studentInfos = res[1]
  userSemesterNumberList = res[2]
  try {
    accessToken = (await actions[Request.ACCESS_TOKEN]()).accessToken
  } catch (error) {
    Vue.prototype.$notify.error({
      title: '[初始化错误] 获取accessToken失败',
      message:
        '获取accessToken失败，以下插件将无法使用：专业授位查询、培养方案相关、历届大创查询。您可以尝试刷新页面，也许能解决问题。'
    })
  }
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
