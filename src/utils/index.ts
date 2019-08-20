import minimatch from 'minimatch'
import crypto from 'crypto'
import * as logger from './logger'
import { state, actions, Request } from '@/store'
import { CourseInfoList, TeacherTable, CourseScoreInfo } from '@/store/types'
import local from '@/store/local'
import { SemesterScoreRecord } from '@/plugins/score/types'

function getLevenshteinDistance(a: string, b: string) {
  // Create empty edit distance matrix for all possible modifications of
  // substrings of a to substrings of b.
  const distanceMatrix: number[][] = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null))

  // Fill the first row of the matrix.
  // If this is first row then we're transforming empty string to a.
  // In this case the number of transformations equals to size of a substring.
  for (let i = 0; i <= a.length; i += 1) {
    distanceMatrix[0][i] = i
  }

  // Fill the first column of the matrix.
  // If this is first column then we're transforming empty string to b.
  // In this case the number of transformations equals to size of b substring.
  for (let j = 0; j <= b.length; j += 1) {
    distanceMatrix[j][0] = j
  }

  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1
      distanceMatrix[j][i] = Math.min(
        distanceMatrix[j][i - 1] + 1, // deletion
        distanceMatrix[j - 1][i] + 1, // insertion
        distanceMatrix[j - 1][i - 1] + indicator // substitution
      )
    }
  }

  return distanceMatrix[b.length][a.length]
}

function getTextSimilarity(str1: string, str2: string) {
  return (
    1 - getLevenshteinDistance(str1, str2) / Math.max(str1.length, str2.length)
  )
}

function getUserId(studentInfos: Map<string, string>) {
  const name = studentInfos.get('姓名')
  const studentNumber = studentInfos.get('学号')
  const identificationNumber = studentInfos.get('证件号码')
  const enrollDate = studentInfos.get('入学日期')
  const birthday = studentInfos.get('出生日期')
  const secret = [
    name,
    studentNumber,
    identificationNumber,
    enrollDate,
    birthday
  ].join('')
  return crypto
    .createHmac('sha256', secret)
    .update('scu-urp-assistant')
    .digest('hex')
}

const chineseNumbers = [
  '零',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十'
]

const API_PATH =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost/scu-urp-assistant-server/public'
    : 'https://sua.zhaoji.wang/api/v1'

function convertCourseScoreInfoListToScoreRecords(list: CourseScoreInfo[]) {
  return (
    list
      .sort((a, b) => {
        const weights = new Map([['必修', 100], ['选修', 75], ['任选', 50]])
        return (
          (weights.get(b.coursePropertyName) || 0) +
          b.credit -
          (weights.get(a.coursePropertyName) || 0) -
          a.credit
        )
      })
      .reduce(
        (acc, cur) => {
          // 如果没有挂科，那么 unpassedReasonExplain ≡ null
          // 如果挂科了，检查是否是因为「缓考」才在系统中记录为「未通过」，如果是缓考，则跳过这条记录
          const failReason = cur.unpassedReasonExplain
            ? (cur.unpassedReasonExplain as string)
            : null
          if (failReason && failReason.includes('缓考')) {
            return acc
          }
          const currentSemesterRecords = acc.filter(
            v => v.semester === cur.executiveEducationPlanName
          )
          const record = {
            ...cur,
            courseTeacherList: [],
            selected: false
          }
          if (currentSemesterRecords.length) {
            currentSemesterRecords[0].courses.push(record)
          } else {
            acc.push({
              semester: record.executiveEducationPlanName,
              courses: [record]
            })
          }
          return acc
        },
        [] as SemesterScoreRecord[]
      )
      // 不显示还没有课程成绩的学期
      .filter(v => v.courses && v.courses.length)
      .sort((a, b) => {
        const getWeightSum = ({ semester }: SemesterScoreRecord) => {
          const r = semester.match(/^(\d+)-(\d+)学年\s(.)季学期$/)
          return r ? Number(r[1]) + Number(r[2]) + (r[3] === '秋' ? 0 : 1) : 0
        }
        // 从大到小排
        return getWeightSum(b) - getWeightSum(a)
      })
  )
}

function convertSemesterNumberToName(semesterNumber: string) {
  const r = semesterNumber.match(/(\d+)-(\d+)-(\d)/)
  if (!r) {
    return semesterNumber
  }
  return `${r[1]}-${r[2]}学年 ${r[3] === '1' ? '秋' : '春'}季学期`
}

function convertSemesterNameToNumber(semesterName: string) {
  const r = semesterName.match(/^(\d+)-(\d+)学年\s(.)季学期$/)
  if (!r) {
    return semesterName
  }
  return `${r[1]}-${r[2]}-${r[3] === '秋' ? 1 : 2}-1`
}

function getChineseNumber(num: number) {
  return chineseNumbers[num] || ''
}

function sleep(time: number) {
  return new Promise(resolve => setTimeout(() => resolve(), time))
}

/**
 * 检测当前的url是否满足插件触发要求
 *
 * @param pathname 可以是 Boolean、String、Array、Object、Function等类型。
 * @returns 检测的结果
 */
function pathnameTrigger(
  pathname:
    | string
    | boolean
    | string[]
    | (() => boolean)
    | {
        [key: string]: string
      }
    | undefined
) {
  let result =
    pathname === true
      ? true
      : !state.core.route && matchTrigger(window.location.pathname, pathname)
  return result
}
function routeTrigger(
  route:
    | string
    | boolean
    | string[]
    | (() => boolean)
    | {
        [key: string]: string
      }
    | undefined
) {
  let result =
    window.location.pathname !== '/login' &&
    matchTrigger(state.core.route, route)
  return result
}

function matchTrigger(
  subject: string,
  object:
    | string
    | boolean
    | string[]
    | (() => boolean)
    | {
        [key: string]: string
      }
    | undefined
) {
  if (!object) {
    return false
  } else if (typeof object === 'boolean') {
    return object
  } else if (typeof object === 'string') {
    return minimatch(subject, object)
  } else if (Array.isArray(object)) {
    for (const item of object) {
      if (minimatch(subject, item)) {
        return true
      }
    }
    return false
  } else if (typeof object === 'object') {
    for (const item of Object.values(object)) {
      if (minimatch(subject, item)) {
        return true
      }
    }
    return false
  } else if (typeof object === 'function') {
    return object.bind(object)()
  }
  return false
}

function convertCourseInfoListToSemesterTeacherTable(
  courseInfoList: CourseInfoList[]
) {
  return courseInfoList.reduce(
    (acc, cur) => {
      if (!acc[cur.courseNumber]) {
        acc[cur.courseNumber] = {
          [cur.courseSequenceNumber]: cur.courseTeacherList
        }
      } else {
        acc[cur.courseNumber][cur.courseSequenceNumber] = cur.courseTeacherList
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
}

function convertCourseInfoListsToTeacherTable(
  courseInfoLists: CourseInfoList[][]
) {
  return courseInfoLists
    .map(courseInfoList =>
      convertCourseInfoListToSemesterTeacherTable(courseInfoList)
    )
    .reduce(
      (acc, cur, i) => {
        acc[courseInfoLists[i][0].executiveEducationPlanNumber] = cur
        return acc
      },
      {} as TeacherTable
    )
}

async function getCourseTeacherList(
  semester: string,
  courseNumber: string,
  courseSequenceNumber: string
): Promise<
  {
    teacherNumber: string
    teacherName: string
  }[]
> {
  const rName = semester.match(/^(\d+)-(\d+)学年\s(.)季学期$/)
  if (rName) {
    semester = convertSemesterNameToNumber(semester)
  }
  const rNumber = semester.match(/(\d+)-(\d+)-(\d)/)
  if (rNumber) {
    // 确实是标准学期号格式
    const teacherTable: TeacherTable = state.getData('teacherTable')
    try {
      return teacherTable[semester][courseNumber][courseSequenceNumber]
    } catch (error) {
      logger.info(
        `读取courseTeacherList失败: [${convertSemesterNumberToName(
          semester
        )}] ${courseNumber}-${courseSequenceNumber}\n Error:`,
        error
      )
      // 说明当前的teacherTable缓存中没有这个课程的课序号的任课老师列表信息
      // 应该重新获取一下这个学期的老师情况，缓存进teacherTable中
      const courseInfoList = await actions[
        Request.COURSE_INFO_LIST_BY_SEMESTER
      ](semester)
      const newSemesterTeacherTable = convertCourseInfoListToSemesterTeacherTable(
        courseInfoList
      )
      if (!teacherTable[semester]) {
        // 缓存里根本没有这个学期的老师对应表
        teacherTable[semester] = newSemesterTeacherTable
      } else {
        // 缓存里有这个学期的老师对应表，只是缺这个课程的老师
        teacherTable[semester] = {
          ...teacherTable[semester],
          ...newSemesterTeacherTable
        }
      }
      state.setData('teacherTable', teacherTable)
      await local.saveData({ key: 'teacherTable', payload: teacherTable })
      logger.info(
        `二次读取courseTeacherList成功: [${convertSemesterNumberToName(
          semester
        )}] ${courseNumber}-${courseSequenceNumber}\n Value:`,
        teacherTable[semester][courseNumber][courseSequenceNumber]
      )
      return teacherTable[semester][courseNumber][courseSequenceNumber]
    }
  }
  return []
}

export {
  getChineseNumber,
  API_PATH,
  pathnameTrigger,
  routeTrigger,
  sleep,
  convertSemesterNumberToName,
  convertSemesterNameToNumber,
  getUserId,
  logger,
  convertCourseInfoListsToTeacherTable,
  getCourseTeacherList,
  convertCourseScoreInfoListToScoreRecords,
  getTextSimilarity
}
