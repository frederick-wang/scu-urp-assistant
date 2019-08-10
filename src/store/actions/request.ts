import { API_PATH, getChineseNumber, sleep } from '@/utils'
import {
  AllTermScoresAPIData,
  CourseScoreBaseInfo,
  CourseScoreInfo,
  CurrentSemesterStudentAcademicInfo,
  TrainingSchemeYearInfo,
  InstructionalTeachingPlanAPIData,
  TrainingSchemeAPIData,
  TrainingSchemeNodeAPIData,
  TrainingSchemeCourseInfo,
  CourseScheduleInfoAPIData,
  CourseScheduleInfo,
  AjaxStudentScheduleAPIData
} from '../types'
import crypto from 'crypto'

let courseTeachersTable: {
  // 学期
  [key: string]: {
    // 课程号
    [key: string]: {
      // 课序号
      [key: string]: Array<{
        teacherNumber: string
        teacherName: string
      }>
    }
  }
} = {}
async function requestCourseTeacherList(
  semesterCode: string,
  courseNumber: string,
  courseSequenceNumber: string
) {
  if (!courseTeachersTable[semesterCode]) {
    const courseInfoList = await requestCourseInfoListBySemester(semesterCode)
    courseTeachersTable[semesterCode] = courseInfoList.reduce(
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
  }
  return courseTeachersTable[semesterCode][courseNumber][courseSequenceNumber]
}

async function requestStudentSemesterCodeList() {
  $.ajaxSetup({
    beforeSend: xhr =>
      xhr.setRequestHeader('X-Requested-With', {
        toString() {
          return ''
        }
      } as any)
  })
  const url = '/student/courseSelect/calendarSemesterCurriculum/index'
  const rawHTML = await $.get(url)
  const codeList = Array.from($('#planCode', rawHTML).find('option')).map(
    v => $(v).val() as string
  )
  // 还原Ajax配置
  $.ajaxSetup({
    beforeSend: null as any
  })
  return codeList
}

async function requestCourseInfoListBySemester(semesterCode: string) {
  const {
    xkxx: [rawCourseInfoList]
  } = (await $.post(
    '/student/courseSelect/thisSemesterCurriculum/ajaxStudentSchedule/callback',
    { planCode: semesterCode }
  )) as AjaxStudentScheduleAPIData
  const courseInfoList = Object.values(rawCourseInfoList).map(
    ({
      courseCategoryCode,
      courseCategoryName,
      courseName,
      coursePropertiesCode,
      coursePropertiesName,
      dgFlag,
      examTypeCode,
      examTypeName,
      id: {
        coureNumber: courseNumber,
        coureSequenceNumber: courseSequenceNumber,
        executiveEducationPlanNumber
      },
      restrictedCondition,
      timeAndPlaceList
    }) => ({
      courseCategoryCode,
      courseCategoryName,
      courseName,
      coursePropertiesCode,
      coursePropertiesName,
      courseTeacherList: dgFlag
        .split('|')
        .map(s => s.split(','))
        .map(v => ({
          teacherNumber: v[0],
          teacherName: v[1].replace(/[（\(].+[）\)]/, '')
        })),
      examTypeCode,
      examTypeName,
      courseNumber,
      courseSequenceNumber,
      executiveEducationPlanNumber,
      restrictedCondition,
      timeAndPlaceList: timeAndPlaceList
        ? timeAndPlaceList.map(
            ({
              campusName,
              classDay,
              classSessions,
              classWeek,
              classroomName,
              continuingSession,
              teachingBuildingName,
              weekDescription
            }) => ({
              campusName,
              classDay,
              classSessions,
              classWeek,
              classroomName,
              continuingSession,
              teachingBuildingName,
              weekDescription
            })
          )
        : []
    })
  )
  return courseInfoList
}

async function requestUserId() {
  $.ajaxSetup({
    beforeSend: xhr =>
      xhr.setRequestHeader('X-Requested-With', {
        toString() {
          return ''
        }
      } as any)
  })
  const url = '/student/rollManagement/rollInfo/index'
  const rawHTML = await $.get(url)
  const secret = Array.from($('.profile-info-value', rawHTML))
    .map(v =>
      $(v)
        .text()
        .trim()
    )
    .filter(v => v)
    .filter(
      (v, i) =>
        i === 3 || i === 7 || i === 10 || i === 21 || i === 29 || i === 33
    )
    .join('')
  const userId = crypto
    .createHmac('sha256', secret)
    .update('scu-urp-assistant')
    .digest('hex')
  // 还原Ajax配置
  $.ajaxSetup({
    beforeSend: null as any
  })
  return userId
}

// 根据测试，教务处的课程信息查询时间间隔为5秒，否则会报频繁查询
const QUERY_TIME_INTERVAL = 5000
let robustnessAdditionalInterval = 1000
let lastTimeScheduleQuery: number = new Date().getTime()
let currentcourseNameScheduleQuery = ''
let currentcourseNumberScheduleQuery = ''
async function requestCourseSchedule(
  semester: string,
  courseName: string,
  courseNumber: string
) {
  currentcourseNameScheduleQuery = courseName
  currentcourseNumberScheduleQuery = courseNumber
  const delta = new Date().getTime() - lastTimeScheduleQuery
  if (delta < QUERY_TIME_INTERVAL) {
    await sleep(QUERY_TIME_INTERVAL - delta + robustnessAdditionalInterval)
  }
  if (
    currentcourseNameScheduleQuery === courseName &&
    currentcourseNumberScheduleQuery === courseNumber
  ) {
    lastTimeScheduleQuery = new Date().getTime()
    const res: CourseScheduleInfoAPIData = await $.post(
      // 对，你没看错，这里教务处系统打错字了，把Schedule打成了Schdule
      '/student/integratedQuery/course/courseSchdule/courseInfo',
      {
        zxjxjhh: semester,
        kch: courseNumber,
        kcm: courseName,
        pageNum: 1,
        pageSize: 1000
      }
    )
    if (!res.list) {
      robustnessAdditionalInterval *= 2
      return {
        response: 'network_error'
      }
    }
    return {
      response: '',
      sequence: res.list.records
        .map(
          ({
            kcm,
            kch,
            kxh,
            kkxsh,
            kkxsjc,
            xf,
            kclbdm,
            kclbmc,
            kslxdm,
            kslxmc,
            skjs,
            zcsm,
            skxq,
            skjc,
            xqm,
            jxlm,
            jasm,
            bkskrl,
            bkskyl,
            xkxzsm
          }) => ({
            courseName: kcm || '',
            courseNumber: kch || '',
            courseSequenceNumber: kxh || '',
            departmentCode: kkxsh || '',
            departmentName: kkxsjc || '',
            credit: xf || 0,
            courseTypeCode: kclbdm || '',
            courseTypeName: kclbmc || '',
            examTypeCode: kslxdm || '',
            examTypeName: kslxmc || '',
            teacherName: skjs || '',
            courseTime: `${zcsm}星期${getChineseNumber(skxq)}${skjc}节`,
            courseSite: `${xqm}校区${jxlm}${jasm}`,
            availibleCapacity: `${bkskyl} / ${bkskrl}`,
            note: xkxzsm && xkxzsm !== ';' ? xkxzsm : ''
          })
        )
        .reduce(
          (acc, cur) => {
            let index = -1
            for (let i = 0; i < acc.length; i++) {
              if (acc[i].courseSequenceNumber === cur.courseSequenceNumber) {
                index = i
                break
              }
            }
            const merge = (
              obj1: CourseScheduleInfo,
              obj2: CourseScheduleInfo
            ) => {
              const result = {} as CourseScheduleInfo
              for (const key in obj1) {
                result[key] =
                  obj1[key] === obj2[key]
                    ? obj1[key]
                    : `${obj1[key]}，${obj2[key]}`
              }
              return result
            }
            if (index === -1) {
              return acc.concat(cur)
            }
            acc[index] = merge(acc[index], cur)
            return acc
          },
          [] as CourseScheduleInfo[]
        )
        .sort(
          (a, b) =>
            Number(a.courseSequenceNumber) - Number(b.courseSequenceNumber)
        )
    }
  }
  return {
    response: 'no_render'
  }
}

function requestTrainingScheme(num: number) {
  $.ajaxSetup({
    beforeSend: xhr =>
      xhr.setRequestHeader('X-Requested-With', {
        toString() {
          return ''
        }
      } as any)
  })
  const coursePropertyNameList = ['必修', '选修']
  const res = Promise.all([
    $.get(`/student/rollManagement/project/${num}/2/detail`).then(
      ({ jhFajhb, treeList }: InstructionalTeachingPlanAPIData) => ({
        info: jhFajhb,
        list: treeList
          .reduce(
            (acc, cur) => {
              if (cur.name.match(/^\d{4}-\d{4}学年$/)) {
                acc.push({
                  name: cur.name,
                  children: []
                })
              } else if (cur.name === '春' || cur.name === '秋') {
                acc[acc.length - 1].children.push({
                  name: cur.name,
                  children: []
                })
              } else {
                const r = cur.urlPath.match(/project\/.+\/(\d+)$/)
                acc[acc.length - 1].children[
                  acc[acc.length - 1].children.length - 1
                ].children.push({
                  courseName: cur.name,
                  courseNumber: r ? r[1] : '',
                  courseAttributes: [],
                  courseMajor: '',
                  coursePropertyName: ''
                })
              }
              return acc
            },
            [] as TrainingSchemeYearInfo[]
          )
          .sort((a, b) => {
            const regexpResultA = a.name.match(/^(\d+)-(\d+)学年$/)
            const regexpResultB = b.name.match(/^(\d+)-(\d+)学年$/)
            if (!regexpResultA || !regexpResultB) {
              return 0
            }
            const resultA = Number(regexpResultA[1]) + Number(regexpResultA[2])
            const resultB = Number(regexpResultB[1]) + Number(regexpResultB[2])
            return resultA - resultB
          })
      })
    ),
    $.get(`/student/rollManagement/project/${num}/1/detail`).then(
      ({ treeList }: TrainingSchemeAPIData) =>
        Object.values(
          treeList.reduce(
            (acc, cur) => {
              acc[cur.id] = cur
              if (!acc[cur.pId]) {
                acc[cur.pId] = {
                  id: cur.pId,
                  courseName: '',
                  coursePropertyName: '',
                  isDir: false,
                  name: '',
                  pId: '',
                  urlPath: ''
                }
              }
              cur.parent = acc[cur.pId]
              cur.isDir = cur.name.includes('fa-kz')
              if (cur.name.includes('必修')) {
                cur.coursePropertyName = '必修'
              } else if (cur.name.includes('选修')) {
                cur.coursePropertyName = '选修'
              } else {
                cur.coursePropertyName = ''
              }
              const r = cur.name.match(/<\/i>(.+)$/)
              cur.courseName = r
                ? r[1].replace(' 必修', '').replace(' 选修', '')
                : ''
              return acc
            },
            {} as {
              [key: string]: TrainingSchemeNodeAPIData
            }
          )
        ).reduce(
          (acc, { urlPath, isDir, parent, courseName, coursePropertyName }) => {
            if (urlPath) {
              const r = urlPath.match(/@(.+)$/)
              const courseNumber = r ? r[1] : ''
              if (!isDir) {
                const courseAttributes = []
                let p = parent
                while (p && p.courseName) {
                  if (!coursePropertyNameList.includes(p.courseName)) {
                    courseAttributes.unshift(p.courseName)
                  }
                  p = p.parent
                }
                acc[courseNumber] = {
                  courseName,
                  courseNumber,
                  coursePropertyName,
                  courseAttributes,
                  courseMajor: ''
                }
              }
            }
            return acc
          },
          {} as {
            [key: string]: TrainingSchemeCourseInfo
          }
        )
    )
  ]).then(([{ info, list }, table]) => ({
    info,
    list: list.map(year => ({
      name: year.name,
      children: year.children.map(semester => ({
        name: semester.name,
        children: semester.children
          .map(v =>
            Object.assign(v, table[v.courseNumber], {
              courseMajor: `${info.zym}（${info.njmc}）`
            })
          )
          .sort((a, b) => {
            const propertyWeight = {
              必修: 100,
              '中华文化（春）': 75,
              '中华文化（秋）': 75,
              选修: 50
            } as {
              [key: string]: number
            }
            const attributeWeight = {
              公共基础课: 10,
              公共课: 10,
              '中华文化（春）_kz': 9,
              '中华文化（秋）_kz': 9,
              学科基础课: 8,
              专业基础课: 8,
              专业课: 6,
              实践环节: 4
            } as {
              [key: string]: number
            }
            const getAttributesWeight = (attributes: string[]) =>
              attributes.reduce(
                (acc, cur) => acc + (attributeWeight[cur] || 0),
                0
              )
            const weightA =
              (propertyWeight[a.coursePropertyName] || 0) +
              getAttributesWeight(a.courseAttributes)
            const weightB =
              (propertyWeight[b.coursePropertyName] || 0) +
              getAttributesWeight(b.courseAttributes)
            return weightB - weightA
          })
      }))
    })) as TrainingSchemeYearInfo[]
  }))
  // 还原Ajax配置
  $.ajaxSetup({
    beforeSend: null as any
  })
  return res
}

async function requestSelfMajorNumber() {
  $.ajaxSetup({
    beforeSend: xhr =>
      xhr.setRequestHeader('X-Requested-With', {
        toString() {
          return ''
        }
      } as any)
  })
  const res = await $.get('/student/rollManagement/rollInfo/index')
  const r = res.match(/name="zx" value="(\d+)"/)
  if (r) {
    return Number(r[1])
  }
  // 还原Ajax配置
  $.ajaxSetup({
    beforeSend: null as any
  })
  return 0
}

let trainingSchemeList: string[][]

async function requestTrainingSchemeList(): Promise<string[][]> {
  if (!trainingSchemeList) {
    trainingSchemeList = await $.get(`${API_PATH}/student/training_scheme`)
  }
  return trainingSchemeList
}

async function requestCurrentSemesterStudentAcademicInfo(): Promise<
  CurrentSemesterStudentAcademicInfo
> {
  // 加载本学期基本信息
  const [
    {
      zxjxjhh: currentSemester,
      gpa,
      courseNum: courseNumber,
      courseNum_bxqyxd: currentSemesterCourseNumber,
      coursePas: failedCourseNumber
    }
  ] = JSON.parse(await $.post('/main/academicInfo'))
  return {
    courseNumber,
    currentSemester,
    gpa,
    currentSemesterCourseNumber,
    failedCourseNumber
  }
}

function convertSemesterNumberToText(number: string) {
  const r = number.match(/(\d+)-(\d+)-(.+)/)
  if (r) {
    const begin = r[1]
    const end = r[2]
    const season = r[3] === '1-1' ? '秋' : '春'
    return `${begin}-${end}学年 ${season}季学期`
  }
  return number
}

/**
 * 根据分数返回对应的绩点
 *
 * @param {number} score 分数
 * @param {string} semester 学期
 * @returns 绩点
 */
function getPointByScore(score: number, semester: string) {
  // 2017年起，川大修改了绩点政策，因此要检测学期的年份
  const r = semester.match(/^\d+/)
  if (!r) {
    return 0
  }
  const enrollmentYear = Number(r[0])
  if (enrollmentYear >= 2017) {
    // 2017-2018秋季学期起使用如下标准（Fall Term 2017-2018~Present）
    if (score >= 90) {
      return 4
    } else if (score >= 85) {
      return 3.7
    } else if (score >= 80) {
      return 3.3
    } else if (score >= 76) {
      return 3
    } else if (score >= 73) {
      return 2.7
    } else if (score >= 70) {
      return 2.3
    } else if (score >= 66) {
      return 2
    } else if (score >= 63) {
      return 1.7
    } else if (score >= 61) {
      return 1.3
    } else if (score >= 60) {
      return 1
    } else {
      return 0
    }
  } else {
    // 2017-2018秋季学期以前使用如下标准（Before Fall Term 2017-2018）
    if (score >= 95) {
      return 4
    } else if (score >= 90) {
      return 3.8
    } else if (score >= 85) {
      return 3.6
    } else if (score >= 80) {
      return 3.2
    } else if (score >= 75) {
      return 2.7
    } else if (score >= 70) {
      return 2.2
    } else if (score >= 65) {
      return 1.7
    } else if (score >= 60) {
      return 1
    } else {
      return 0
    }
  }
}

function filterCourseScoreInfoList(list: CourseScoreBaseInfo[]) {
  return (
    list
      // 根据 http://jwc.scu.edu.cn/detail/122/6891.htm 《网上登录成绩的通知》 的说明
      // 教师「暂存」的成绩学生不应看到
      // 因此为了和教务处成绩显示保持一致，这里只显示「已提交」的成绩
      // TODO: 考虑做开关，让用户决定看不看
      .filter(v => v.inputStatusCode === '05')
      // 分数可能为null，必须分数不为null才显示
      .filter(v => v.courseScore)
  )
}

async function requestAllTermsCourseScoreInfoList(): Promise<
  CourseScoreBaseInfo[]
> {
  const url = '/student/integratedQuery/scoreQuery/allTermScores/data'
  const {
    list: {
      pageContext: { totalCount }
    }
  } = (await $.post(url, {
    zxjxjhh: '',
    kch: '',
    kcm: '',
    pageNum: 1,
    pageSize: 1
  })) as AllTermScoresAPIData

  const {
    list: { records }
  } = (await $.post('/student/integratedQuery/scoreQuery/allTermScores/data', {
    zxjxjhh: '',
    kch: '',
    kcm: '',
    pageNum: 1,
    pageSize: totalCount
  })) as AllTermScoresAPIData

  return filterCourseScoreInfoList(
    records.map(v => ({
      executiveEducationPlanNumber: (v[0] as string) || '',
      executiveEducationPlanName:
        convertSemesterNumberToText(v[0] as string) || '',
      courseNumber: (v[1] as string) || '',
      courseSequenceNumber: (v[2] as string) || '',
      examTime: (v[3] as string) || '',
      inputStatusCode: (v[4] as string) || '',
      coursePropertyCode: (v[5] as string) || '',
      inputMethodCode: (v[7] as string) || '',
      courseScore: Number(v[8]) || 0,
      levelCode: (v[9] as string) || '',
      courseName: (v[11] as string) || '',
      englishCourseName: (v[12] as string) || '',
      credit: Number(v[13]) || 0,
      studyHour: Number(v[14]) || 0,
      coursePropertyName: (v[15] as string) || '',
      examTypeName: (v[16] as string) || '',
      levelName: (v[17] as string) || '',
      unpassedReasonExplain: (v[18] as string) || '',
      gradePoint: getPointByScore(v[8] as number, v[0] as string) || 0
    }))
  )
}

async function requestThisTermCourseScoreInfoList(): Promise<
  CourseScoreInfo[]
> {
  const url = '/student/integratedQuery/scoreQuery/thisTermScores/data'
  const [{ state, list }]: [{ state: string; list: any[] }] = await $.get(url)
  // console.log(`state: ${state}`)
  const res = filterCourseScoreInfoList(
    list.map(
      v =>
        ({
          courseName: v.courseName || '',
          englishCourseName: v.englishCourseName || '',
          courseNumber: v.id.courseNumber || '',
          // 对，你没看错，这个地方教务处接口是错别字，把course打成了coure
          courseSequenceNumber: v.coureSequenceNumber || '',
          credit: Number(v.credit) || 0,
          coursePropertyCode: v.coursePropertyCode || '',
          coursePropertyName: v.coursePropertyName || '',
          maxScore: Number(v.maxcj) || 0,
          avgScore: Number(v.avgcj) || 0,
          minScore: Number(v.mincj) || 0,
          courseScore: Number(v.courseScore) || 0,
          // 对，你没看错，这个地方教务处接口是错别字，把level打成了levle
          levelCode: v.levlePoint || '',
          levelName: v.levelName || '',
          gradePoint: Number(v.gradePoint) || 0,
          rank: Number(v.rank) || 0,
          examTime: v.id.examtime || '',
          unpassedReasonCode: v.unpassedReasonCode || '',
          unpassedReasonExplain: v.unpassedReasonExplain || '',
          executiveEducationPlanNumber: v.id.executiveEducationPlanNumber || '',
          executiveEducationPlanName:
            convertSemesterNumberToText(v.id.executiveEducationPlanNumber) ||
            '',
          inputStatusCode: v.inputStatusCode || '',
          inputMethodCode: v.inputMethodCode || '',
          studyHour: Number(v.studyHour) || 0,
          examTypeName: v.examTypeName || ''
        } as CourseScoreInfo)
    )
  ).sort((a, b) => {
    const weights = new Map([['必修', 100], ['选修', 75], ['任选', 50]])
    return (
      (weights.get(b.coursePropertyName) || 0) +
      b.credit -
      (weights.get(a.coursePropertyName) || 0) -
      a.credit
    )
  })
  return res as CourseScoreInfo[]
}

export {
  requestThisTermCourseScoreInfoList,
  requestAllTermsCourseScoreInfoList,
  requestCurrentSemesterStudentAcademicInfo,
  requestTrainingSchemeList,
  requestTrainingScheme,
  requestSelfMajorNumber,
  requestCourseSchedule,
  requestUserId,
  requestCourseInfoListBySemester,
  requestStudentSemesterCodeList,
  requestCourseTeacherList
}
