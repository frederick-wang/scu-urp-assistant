import {
  requestCurrentSemesterStudentAcademicInfo,
  requestStudentInfo,
  requestStudentSemesterNumberList,
  requestCourseInfoListBySemester
} from './actions/request'
import { convertSemesterNumberToName, getUserId, logger } from '@/utils'
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
  let teacherTable: TeacherTable = state.getData('teacherTable')
  if (teacherTable) {
    const uncachedsemesterNumberList = state.user.semesterNumberList.filter(
      s => !Object.keys(teacherTable).includes(s)
    )
    if (uncachedsemesterNumberList.length) {
      let courseInfoLists = []
      for (const s of uncachedsemesterNumberList) {
        courseInfoLists.push(await requestCourseInfoListBySemester(s))
      }
      // 这里和地下重复了，等吧interface抽出了记得把这个也抽出函数
      teacherTable = {
        ...teacherTable,
        ...courseInfoLists
          .map(courseInfoList =>
            courseInfoList.reduce(
              (acc, cur) => {
                if (!acc[cur.courseNumber]) {
                  acc[cur.courseNumber] = {
                    [cur.courseSequenceNumber]: cur.courseTeacherList
                  }
                } else {
                  acc[cur.courseNumber][cur.courseSequenceNumber] =
                    cur.courseTeacherList
                }
                return acc
              },
              {} as {
                // 课程号
                [key: string]: {
                  // 课序号
                  [key: string]: Array<{
                    teacherNumber: string
                    teacherName: string
                  }>
                }
              }
            )
          )
          .reduce(
            (acc, cur, i) => {
              acc[state.user.semesterNumberList[i]] = cur
              return acc
            },
            {} as TeacherTable
          )
      }
    }
  } else {
    let courseInfoLists = []
    for (const s of state.user.semesterNumberList) {
      courseInfoLists.push(await requestCourseInfoListBySemester(s))
    }
    teacherTable = courseInfoLists
      .map(courseInfoList =>
        courseInfoList.reduce(
          (acc, cur) => {
            if (!acc[cur.courseNumber]) {
              acc[cur.courseNumber] = {
                [cur.courseSequenceNumber]: cur.courseTeacherList
              }
            } else {
              acc[cur.courseNumber][cur.courseSequenceNumber] =
                cur.courseTeacherList
            }
            return acc
          },
          {} as {
            // 课程号
            [key: string]: {
              // 课序号
              [key: string]: Array<{
                teacherNumber: string
                teacherName: string
              }>
            }
          }
        )
      )
      .reduce(
        (acc, cur, i) => {
          acc[state.user.semesterNumberList[i]] = cur
          return acc
        },
        {} as TeacherTable
      )
  }
  state.setData('teacherTable', teacherTable)
  // 不缓存当前学期的老师
  const newTeacherTable = JSON.parse(JSON.stringify(teacherTable))
  delete newTeacherTable[state.basic.currentSemesterNumber]
  await local.saveData({ key: 'teacherTable', payload: newTeacherTable })
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
      version,
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
  },
  getData(key: string) {
    return data[key]
  },
  setData(key: string, payload: any) {
    data[key] = payload
  }
}
