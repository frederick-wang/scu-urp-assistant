import {
  CourseScoreInfo,
  CurrentSemesterStudentAcademicInfo,
  // TrainingSchemeYearInfo,
  // InstructionalTeachingPlanDTO,
  // TrainingSchemeDTO,
  // TrainingSchemeNodeDTO,
  // TrainingSchemeCourseInfo,
  CourseScheduleInfoDTO,
  CourseScheduleInfo
  // ScuUietpDTO,
  // TrainingSchemeBaseInfo,
  // BachelorDegreeInfo,
  // TrainingScheme
} from '../types'
import { pipe, map } from 'ramda'
// import state from '../state'
import {
  APIAllPassingScoresDTO,
  APIAllPassingScoresDTOLnCj,
  APISubitemScoreFxcjDTO,
  APISubitemScoreLookDTO,
  APITeachingAssessmentEvaluationQueryAllResult,
  // Result,
  SubitemScoreRecord,
  TeachingAssessmentEvaluationRecord,
  TermScoresData
} from './result.interface'
import {
  getLevelCodeByScore,
  getLevelNameByScore,
  getPointByScore
} from '@/plugins/score/utils'
// import { sleep, http } from '@/helper/util'
import { Num, sleep } from '@/helper/util'
import { getChineseNumber } from '@/helper/getter'
import { Logger } from '@/helper/logger'
import {
  getExamTypeNameByCode,
  getPageHTML,
  getThisTermScoresDataURL,
  getAllPassingScoresURL,
  LoadHTMLToDealWithError
} from './utils'

const requestTeachingAssessmentEvaluationQueryAll = async ({
  pageNum,
  pageSize,
  flag
}: {
  pageNum: number
  pageSize: number
  flag: 'kt' | 'ktjs'
}): Promise<APITeachingAssessmentEvaluationQueryAllResult> =>
  await $.post('/student/teachingAssessment/evaluation/queryAll', {
    pageNum,
    pageSize,
    flag
  })

const requestTeachingAssessmentEvaluationRecords = async (
  type: '期末评教' | '课堂及时评教'
): Promise<TeachingAssessmentEvaluationRecord[]> => {
  const flag =
    type === '期末评教' ? 'kt' : type === '课堂及时评教' ? 'ktjs' : null
  if (!flag) {
    throw new Error(`[教学评估查询] 错误的查询类型: ${type}`)
  }
  const probeRes = await requestTeachingAssessmentEvaluationQueryAll({
    pageNum: 1,
    pageSize: 1,
    flag
  })
  if (
    probeRes.status !== 200 ||
    probeRes.msg !== 'OK' ||
    !probeRes?.data?.records
  ) {
    throw new Error(
      `[教学评估查询] teachingAssessment/evaluation/queryAll 探针返回值错误: ${JSON.stringify(
        probeRes
      )}`
    )
  }
  const {
    data: {
      pageContext: { totalCount: pageSize }
    }
  } = probeRes
  const res = await requestTeachingAssessmentEvaluationQueryAll({
    pageNum: 1,
    pageSize,
    flag
  })
  if (res.status !== 200 || res.msg !== 'OK' || !res?.data?.records) {
    throw new Error(
      `[教学评估查询] teachingAssessment/evaluation/queryAll 返回值错误: ${JSON.stringify(
        res
      )}`
    )
  }
  const {
    data: { records }
  } = res
  const convert = (
    list: typeof records
  ): TeachingAssessmentEvaluationRecord[] =>
    list.map(
      ({
        KTID,
        LSRXM,
        WJBM,
        ZXJXJHH,
        KCH,
        KXH,
        SFPG,
        JKRQ,
        WJMC,
        YXDCPG,
        PGLXDM,
        JKKG,
        JKPGTS,
        KCM,
        PGID,
        RN
      }) => ({
        courseId: KTID,
        teacherName: LSRXM,
        questionnaireId: WJBM,
        executiveEducationPlanNumber: ZXJXJHH,
        courseNumber: KCH,
        courseSequenceNumber: KXH,
        isEvaluated: Boolean(Num(SFPG)),
        courseEndDate: JKRQ,
        questionnaireName: WJMC,
        allowMultipleEvaluations: Boolean(Num(YXDCPG)),
        evaluationTypeCode: PGLXDM,
        JKKG,
        JKPGTS: JKPGTS,
        courseName: KCM,
        evaluationId: PGID,
        recordNumber: RN
      })
    )
  return convert(records)
}

const requestTeachingEvaluationPageHTML = async (
  courseId: string
): Promise<string> => {
  const url = `/student/teachingEvaluation/newEvaluation/evaluation/${courseId}`
  const html = await getPageHTML(url)
  return html
}

async function requestStudentSemesterNumberList(): Promise<string[]> {
  const url = '/student/courseSelect/calendarSemesterCurriculum/index'
  const rawHTML = await getPageHTML(url)
  const codeList = Array.from($('#planCode', rawHTML).find('option')).map(
    v => $(v).val() as string
  )
  return codeList
}

async function requestStudentInfo(): Promise<Map<string, string>> {
  const url = '/student/rollManagement/rollInfo/index'
  const rawHTML = await getPageHTML(url)
  const programPlanNumber = $('#zx', rawHTML).val() as string
  const programPlanName = $('#zx', rawHTML)
    .parent()
    .text()
    .trim()
  const infos = Array.from($('.profile-info-row', rawHTML))
    .map((v): HTMLElement[][] => {
      const num = $(v).children('.profile-info-name').length
      if (num === 1) {
        return [
          [
            $(v).children('.profile-info-name')[0] as HTMLElement,
            $(v).children('.profile-info-value')[0] as HTMLElement
          ]
        ]
      } else if (num === 2) {
        return [
          [
            $(v).children('.profile-info-name')[0] as HTMLElement,
            $(v).children('.profile-info-value')[0] as HTMLElement
          ],
          [
            $(v).children('.profile-info-name')[1] as HTMLElement,
            $(v).children('.profile-info-value')[1] as HTMLElement
          ]
        ]
      }
      return [[]]
    })
    .flat(1)
    .filter(v => v.length)
    .map(v =>
      v.map(element =>
        $(element)
          .text()
          .trim()
      )
    )
    .filter(v => v[0])
    .concat([
      ['培养方案名称', programPlanName],
      ['培养方案代码', programPlanNumber]
    ])
  return new Map(infos as [string, string][])
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
): Promise<{
  response: string
  sequence?: CourseScheduleInfo[]
}> {
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
    const res: CourseScheduleInfoDTO = await $.post(
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
            courseDeptNumber: kkxsh || '',
            courseDeptName: kkxsjc || '',
            credit: xf || 0,
            courseCategoryCode: kclbdm || '',
            courseCategoryName: kclbmc || '',
            examTypeCode: kslxdm || '',
            examTypeName: kslxmc || '',
            courseTeacher: skjs || '',
            courseTime: `${zcsm}星期${getChineseNumber(skxq)}${skjc}节`,
            campusName: `${xqm}校区${jxlm}${jasm}`,
            classCapacityRemaining: `${bkskyl} / ${bkskrl}`,
            courseRegNote: xkxzsm && xkxzsm !== ';' ? xkxzsm : ''
          })
        )
        .reduce((acc, cur) => {
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
          ): CourseScheduleInfo => {
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
        }, [] as CourseScheduleInfo[])
        .sort(
          (a, b) => Num(a.courseSequenceNumber) - Num(b.courseSequenceNumber)
        )
    }
  }
  return {
    response: 'no_render'
  }
}

// function requestTrainingScheme(num: number): Promise<{
//   info: TrainingSchemeBaseInfo
//   list: TrainingSchemeYearInfo[]
// }> {
//   const coursePropertyNameList = ['必修', '选修']
//   const res = Promise.all([
//     $.get(`/student/rollManagement/project/${num}/2/detail`).then(
//       ({ jhFajhb, treeList }: InstructionalTeachingPlanDTO) => ({
//         info: jhFajhb,
//         list: treeList
//           .reduce((acc, cur) => {
//             if (cur.name.match(/^\d{4}-\d{4}学年$/)) {
//               acc.push({
//                 name: cur.name,
//                 children: []
//               })
//             } else if (cur.name === '春' || cur.name === '秋') {
//               acc[acc.length - 1].children.push({
//                 name: cur.name,
//                 children: []
//               })
//             } else {
//               const r = cur.urlPath.match(/project\/.+\/(\d+)$/)
//               acc[acc.length - 1].children[
//                 acc[acc.length - 1].children.length - 1
//               ].children.push({
//                 courseName: cur.name,
//                 courseNumber: r ? r[1] : '',
//                 courseAttributes: [],
//                 courseMajor: '',
//                 coursePropertyName: ''
//               })
//             }
//             return acc
//           }, [] as TrainingSchemeYearInfo[])
//           .sort((a, b) => {
//             const regexpResultA = a.name.match(/^(\d+)-(\d+)学年$/)
//             const regexpResultB = b.name.match(/^(\d+)-(\d+)学年$/)
//             if (!regexpResultA || !regexpResultB) {
//               return 0
//             }
//             const resultA = Num(regexpResultA[1]) + Num(regexpResultA[2])
//             const resultB = Num(regexpResultB[1]) + Num(regexpResultB[2])
//             return resultA - resultB
//           })
//       })
//     ),
//     $.get(`/student/rollManagement/project/${num}/1/detail`).then(
//       ({ treeList }: TrainingSchemeDTO) =>
//         Object.values(
//           treeList.reduce(
//             (acc, cur) => {
//               acc[cur.id] = cur
//               if (!acc[cur.pId]) {
//                 acc[cur.pId] = {
//                   id: cur.pId,
//                   courseName: '',
//                   coursePropertyName: '',
//                   isDir: false,
//                   name: '',
//                   pId: '',
//                   urlPath: ''
//                 }
//               }
//               cur.parent = acc[cur.pId]
//               cur.isDir = cur.name.includes('fa-kz')
//               if (cur.name.includes('必修')) {
//                 cur.coursePropertyName = '必修'
//               } else if (cur.name.includes('选修')) {
//                 cur.coursePropertyName = '选修'
//               } else {
//                 cur.coursePropertyName = ''
//               }
//               // 有时候 cur.name 里会混入 CRLF
//               const r = cur.name.replace(/\r|\n/g, '').match(/<\/i>(.+)$/)
//               cur.courseName = r
//                 ? r[1].replace(' 必修', '').replace(' 选修', '')
//                 : ''
//               return acc
//             },
//             {} as {
//               [key: string]: TrainingSchemeNodeDTO
//             }
//           )
//         ).reduce(
//           (acc, { urlPath, isDir, parent, courseName, coursePropertyName }) => {
//             if (urlPath) {
//               const r = urlPath.match(/@(.+)$/)
//               const courseNumber = r ? r[1] : ''
//               if (!isDir) {
//                 const courseAttributes = []
//                 let p = parent
//                 while (p && p.courseName) {
//                   if (!coursePropertyNameList.includes(p.courseName)) {
//                     courseAttributes.unshift(p.courseName)
//                   }
//                   p = p.parent
//                 }
//                 acc[courseNumber] = {
//                   courseName,
//                   courseNumber,
//                   coursePropertyName,
//                   courseAttributes,
//                   courseMajor: ''
//                 }
//               }
//             }
//             return acc
//           },
//           {} as {
//             [key: string]: TrainingSchemeCourseInfo
//           }
//         )
//     )
//   ]).then(([{ info, list }, table]) => ({
//     info,
//     list: list.map((year) => ({
//       name: year.name,
//       children: year.children.map((semester) => ({
//         name: semester.name,
//         children: semester.children
//           .map((v) =>
//             Object.assign(v, table[v.courseNumber], {
//               courseMajor: `${info.zym}（${info.njmc}）`
//             })
//           )
//           .sort((a, b) => {
//             const propertyWeight = {
//               必修: 100,
//               '中华文化（春）': 75,
//               '中华文化（秋）': 75,
//               选修: 50
//             } as {
//               [key: string]: number
//             }
//             const attributeWeight = {
//               公共基础课: 10,
//               公共课: 10,
//               '中华文化（春）_kz': 9,
//               '中华文化（秋）_kz': 9,
//               学科基础课: 8,
//               专业基础课: 8,
//               专业课: 6,
//               实践环节: 4
//             } as {
//               [key: string]: number
//             }
//             const getAttributesWeight = (attributes: string[]): number =>
//               attributes.reduce(
//                 (acc, cur) => acc + (attributeWeight[cur] || 0),
//                 0
//               )
//             const weightA =
//               (propertyWeight[a.coursePropertyName] || 0) +
//               getAttributesWeight(a.courseAttributes)
//             const weightB =
//               (propertyWeight[b.coursePropertyName] || 0) +
//               getAttributesWeight(b.courseAttributes)
//             return weightB - weightA
//           })
//       }))
//     })) as TrainingSchemeYearInfo[]
//   }))
//   return res
// }

// let trainingSchemeList: TrainingScheme[]

// async function requestTrainingSchemeList(): Promise<TrainingScheme[]> {
//   const url = `student/training_scheme`
//   try {
//     if (!trainingSchemeList) {
//       trainingSchemeList = (await http().get(url)).data
//     }
//     return trainingSchemeList
//   } catch (error) {
//     const {
//       status,
//       statusText,
//       responseJSON: { message }
//     } = error
//     throw new Error(`[${status}] ${statusText}: ${message}`)
//   }
// }

// async function requestBachelorDegree(
//   queryStr: string
// ): Promise<BachelorDegreeInfo[]> {
//   const url = `info/bachelor_degree/${encodeURIComponent(queryStr)}`
//   try {
//     return (await http().get(url)).data
//   } catch (error) {
//     const {
//       status,
//       statusText,
//       responseJSON: { message }
//     } = error
//     throw new Error(`[${status}] ${statusText}: ${message}`)
//   }
// }

// async function requestScuUietpList(queryStr: string): Promise<ScuUietpDTO> {
//   const url = `info/scu_uietp/${encodeURIComponent(queryStr)}`
//   try {
//     const res = (await http().get(url)).data
//     return res as ScuUietpDTO
//   } catch (error) {
//     const {
//       status,
//       statusText,
//       responseJSON: { message }
//     } = error
//     throw new Error(`[${status}] ${statusText}: ${message}`)
//   }
// }

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

function convertSemesterNumberToText(number: string): string {
  const r = number.match(/(\d+)-(\d+)-(.+)/)
  if (r) {
    const begin = r[1]
    const end = r[2]
    const season = r[3] === '1-1' ? '秋' : '春'
    return `${begin}-${end}学年 ${season}季学期`
  }
  return number
}

function filterCourseScoreInfoList(list: CourseScoreInfo[]): CourseScoreInfo[] {
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

export async function requestAllPassingScores(): Promise<CourseScoreInfo[]> {
  const url = await getAllPassingScoresURL()
  try {
    const { lnList } = (await $.get(url)) as APIAllPassingScoresDTO
    const records = lnList.reduce(
      (acc, cur) => acc.concat(cur.cjList),
      [] as APIAllPassingScoresDTOLnCj[]
    )
    const formatRecord = ({
      id: {
        executiveEducationPlanNumber,
        courseNumber,
        // 对，你没看错，教务系统把 course 打成 coure 了
        coureSequenceNumber: courseSequenceNumber
      },
      examTime,
      entryStatusCode: inputStatusCode,
      courseAttributeCode: coursePropertyCode,
      examTypeCode,
      scoreEntryModeCode: inputMethodCode,
      courseScore,
      gradeScore: levelCode,
      notByReasonCode: unpassedReasonCode,
      notByReasonName: unpassedReasonExplain,
      courseName,
      englishCourseName,
      credit,
      cycle: studyHour,
      gradeName: levelName,
      courseAttributeName: coursePropertyName,
      gradePointScore
    }: APIAllPassingScoresDTOLnCj): CourseScoreInfo => ({
      executiveEducationPlanNumber,
      executiveEducationPlanName: convertSemesterNumberToText(
        executiveEducationPlanNumber
      ),
      courseNumber,
      courseSequenceNumber,
      examTime,
      inputStatusCode,
      coursePropertyCode,
      examTypeCode,
      inputMethodCode,
      courseScore,
      // levelCode 在本学期成绩信息接口里是 string，在全部成绩信息接口里却是 number
      levelCode:
        levelCode?.toString() ||
        getLevelCodeByScore(courseScore, executiveEducationPlanNumber),
      unpassedReasonCode,
      courseName,
      englishCourseName,
      credit: Num(credit),
      studyHour: Num(studyHour),
      coursePropertyName,
      examTypeName: getExamTypeNameByCode(examTypeCode),
      levelName:
        levelName ||
        getLevelNameByScore(courseScore, executiveEducationPlanNumber),
      unpassedReasonExplain,
      gradePoint:
        gradePointScore ||
        getPointByScore(courseScore, executiveEducationPlanNumber)
    })

    return pipe(map(formatRecord), filterCourseScoreInfoList)(records)
  } catch (error) {
    console.log(error)
    // const { title, message, html } = await LoadHTMLToDealWithError(url)
    // Logger.error({ title, message, html })
    // throw new Error(`${title}: ${message}`)
    throw new Error(String(error))
  }
}

async function requestThisTermCourseScoreInfoList(): Promise<
  CourseScoreInfo[]
> {
  const url = await getThisTermScoresDataURL()
  try {
    const data = await $.get(url)
    const [{ list }]: TermScoresData[] = data
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
            credit: Num(v.credit) || 0,
            coursePropertyCode: v.coursePropertyCode || '',
            coursePropertyName: v.coursePropertyName || '',
            maxScore: Num(v.maxcj) || 0,
            avgScore: Num(v.avgcj) || 0,
            minScore: Num(v.mincj) || 0,
            courseScore: Num(v.courseScore) || 0,
            // 对，你没看错，这个地方教务处接口是错别字，把level打成了levle
            levelCode:
              v.levlePoint ||
              getLevelCodeByScore(
                Num(v.courseScore) || 0,
                v.id.executiveEducationPlanNumber || ''
              ) ||
              '',
            levelName:
              v.levelName ||
              getLevelNameByScore(
                Num(v.courseScore) || 0,
                v.id.executiveEducationPlanNumber || ''
              ) ||
              '',
            gradePoint: Num(v.gradePoint) || 0,
            rank: Num(v.rank) || 0,
            examTime: v.id.examtime || '',
            unpassedReasonCode: v.unpassedReasonCode || '',
            unpassedReasonExplain: v.unpassedReasonExplain || '',
            executiveEducationPlanNumber:
              v.id.executiveEducationPlanNumber || '',
            executiveEducationPlanName:
              convertSemesterNumberToText(v.id.executiveEducationPlanNumber) ||
              '',
            inputStatusCode: v.inputStatusCode || '',
            inputMethodCode: v.inputMethodCode || '',
            studyHour: Num(v.studyHour) || 0,
            examTypeName: v.examTypeName || ''
          } as CourseScoreInfo)
      )
    )
    return res
  } catch (error) {
    const { title, message, html } = await LoadHTMLToDealWithError(url)
    Logger.error({ title, message, html })
    throw new Error(`${title}: ${message}`)
  }
}

/**
 * 2021-12-13 01:40:29
 * NOTE: 发现调用接口时会返回 { msg: '当前不允许查看分项成绩！' }
 * 不知道是暂时的还是永久的，有待进一步观察。
 */
export async function requestSubitemScoreLook(
  executiveEducationPlanNumber: string,
  courseNumber: string,
  courseSequenceNumber: string,
  examTime: string
): Promise<APISubitemScoreLookDTO> {
  const url = '/student/integratedQuery/scoreQuery/subitemScore/look'
  try {
    const result: APISubitemScoreLookDTO = await $.post(url, {
      zxjxjhh: executiveEducationPlanNumber,
      kch: courseNumber,
      kxh: courseSequenceNumber,
      kssj: examTime,
      param: 1
    })
    return result
  } catch (error) {
    const { title, message, html } = await LoadHTMLToDealWithError(url)
    Logger.error({ title, message, html })
    throw new Error(`${title}: ${message}`)
  }
}

/**
 * 2021-7-12
 * NOTE: 这个接口目前已经没有修复的必要了
 * 即使在 /student/integratedQuery/scoreQuery/subitemScore/fxcjIndex 页面中加上随机字符串正确调用了接口，返回的数据仍然为空。
 */
export async function requestSubitemScoreFxcj(
  fxcjId: string
): Promise<SubitemScoreRecord[]> {
  const url = '/student/integratedQuery/scoreQuery/subitemScore/searchFxcj'
  try {
    const { records }: APISubitemScoreFxcjDTO = await $.post(url, {
      fxcjId,
      pageNum: 1,
      pageSize: 30
    })
    return records
  } catch (error) {
    const { title, message, html } = await LoadHTMLToDealWithError(url)
    Logger.error({ title, message, html })
    throw new Error(`${title}: ${message}`)
  }
}

// type LoginResultData = {
//   accessToken: string
// }

// export async function requestAccessToken(): Promise<LoginResultData> {
//   const { version, clientType: type } = state.core
//   const { id } = state.user
//   const url = `user/login`
//   try {
//     const res: Result = (
//       await http().post(url, {
//         id,
//         client: { version, type }
//       })
//     ).data
//     if (res.error) {
//       const { code, title, message } = res.error
//       throw new Error(`[${code}] ${title}: ${message}`)
//     }
//     const { accessToken } = res.data as LoginResultData
//     return { accessToken }
//   } catch (error) {
//     try {
//       const {
//         status,
//         statusText,
//         responseJSON: { message }
//       } = error
//       throw new Error(`[${status}] ${statusText}: ${message}`)
//     } catch (error) {
//       throw new Error(error)
//     }
//   }
// }

export {
  requestTeachingAssessmentEvaluationRecords,
  requestTeachingEvaluationPageHTML,
  requestThisTermCourseScoreInfoList,
  requestCurrentSemesterStudentAcademicInfo,
  // requestTrainingSchemeList,
  // requestTrainingScheme,
  requestCourseSchedule,
  requestStudentSemesterNumberList,
  requestStudentInfo
  // requestScuUietpList,
  // requestBachelorDegree,
}
