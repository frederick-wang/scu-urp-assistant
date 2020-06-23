import {
  convertSemesterNameToNumber,
  convertSemesterNumberToName,
  convertCourseInfoListToSemesterTeacherTable
} from './converter'
import { state, actions, Request } from '@/store'
import { TeacherTable } from '@/store/types'
import local from '@/store/local'
import crypto from 'crypto'
import { Logger } from './logger'

export const getChineseNumber = (num: number): string =>
  ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][num] || ''

export const getPluginIcon = (name: string): string =>
  `https://gitee.com/frederick-wang/scu-urp-assistant/raw/master/src/plugins/${name}/icon.png`

const getLevenshteinDistance = (a: string, b: string): number => {
  const distanceMatrix: number[][] = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null))

  for (let i = 0; i <= a.length; i += 1) {
    distanceMatrix[0][i] = i
  }

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

export const getTextSimilarity = (str1: string, str2: string): number =>
  1 - getLevenshteinDistance(str1, str2) / Math.max(str1.length, str2.length)

export const getUserId = (studentInfos: Map<string, string>): string => {
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

export const getCourseTeacherList = async (
  semester: string,
  courseNumber: string,
  courseSequenceNumber: string
): Promise<{
  teacherNumber: string
  teacherName: string
}[]> => {
  let result: {
    teacherNumber: string
    teacherName: string
  }[] = []
  const rName = semester.match(/^(\d+)-(\d+)学年\s(.)季学期$/)
  if (rName) {
    semester = convertSemesterNameToNumber(semester)
  }
  const rNumber = semester.match(/(\d+)-(\d+)-(\d)/)
  if (rNumber) {
    // 确实是标准学期号格式
    const teacherTable = state.getData('teacherTable') as TeacherTable
    /**
     * TODO: 2020-6-10 00:32:58
     * 因为现在教务系统牵扯到一个“缓考科目出分后会记到下学期”的问题，导致下面的代码打上补丁后看起来非常恶心
     * 之后有时间的话需要重新写一下逻辑。
     */
    try {
      if (teacherTable[semester][courseNumber]) {
        result = teacherTable[semester][courseNumber][courseSequenceNumber]
      } else {
        // 如果是缓考科目，那么上一个学期的成绩会出分到这个学期，需要去上个学期查教师名单表
        const currentSemesterIndex = state.user.semesterNumberList.indexOf(
          semester
        )
        if (currentSemesterIndex !== 0) {
          const lastSemester =
            state.user.semesterNumberList[currentSemesterIndex + 1]
          if (teacherTable[lastSemester][courseNumber]) {
            result =
              teacherTable[lastSemester][courseNumber][courseSequenceNumber]
          } else {
            throw new Error(
              `Error: 从该学期及上一学期读取courseTeacherList均失败: [${convertSemesterNumberToName(
                lastSemester
              )}] ${courseNumber}-${courseSequenceNumber}\n Error:`
            )
          }
        } else {
          throw new Error(
            `Error: 读取courseTeacherList失败: [${convertSemesterNumberToName(
              semester
            )}] ${courseNumber}-${courseSequenceNumber}\n Error:`
          )
        }
      }
    } catch (error) {
      Logger.error(error)
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
      if (teacherTable[semester][courseNumber]) {
        result = teacherTable[semester][courseNumber][courseSequenceNumber]
        Logger.info(
          `二次读取courseTeacherList成功: [${convertSemesterNumberToName(
            semester
          )}] ${courseNumber}-${courseSequenceNumber}\n Value:`,
          result
        )
      } else {
        // 如果是缓考科目，那么上一个学期的成绩会出分到这个学期，需要去上个学期查教师名单表
        const currentSemesterIndex = state.user.semesterNumberList.indexOf(
          semester
        )
        if (currentSemesterIndex !== 0) {
          const lastSemester =
            state.user.semesterNumberList[currentSemesterIndex + 1]
          // 说明当前的teacherTable缓存中没有这个课程的课序号的任课老师列表信息
          // 应该重新获取一下上个学期的老师情况，缓存进teacherTable中
          const courseInfoList = await actions[
            Request.COURSE_INFO_LIST_BY_SEMESTER
          ](lastSemester)
          const newSemesterTeacherTable = convertCourseInfoListToSemesterTeacherTable(
            courseInfoList
          )
          if (!teacherTable[lastSemester]) {
            // 缓存里根本没有上个学期的老师对应表
            teacherTable[lastSemester] = newSemesterTeacherTable
          } else {
            // 缓存里有上个学期的老师对应表，只是缺这个课程的老师
            teacherTable[lastSemester] = {
              ...teacherTable[lastSemester],
              ...newSemesterTeacherTable
            }
          }
          state.setData('teacherTable', teacherTable)
          await local.saveData({ key: 'teacherTable', payload: teacherTable })
          try {
            result =
              teacherTable[lastSemester][courseNumber][courseSequenceNumber]
          } catch (error) {
            throw new Error(
              `Error: 无法获取courseTeacherList: [${convertSemesterNumberToName(
                semester
              )}] ${courseNumber}-${courseSequenceNumber}\n Error:`
            )
          }
          Logger.info(
            `二次读取上一学期courseTeacherList成功: [${convertSemesterNumberToName(
              lastSemester
            )}] ${courseNumber}-${courseSequenceNumber}\n Value:`,
            result
          )
        } else {
          throw new Error(
            `Error: 无法获取courseTeacherList: [${convertSemesterNumberToName(
              semester
            )}] ${courseNumber}-${courseSequenceNumber}\n Error:`
          )
        }
      }
    }
  }
  return result
}
