import { XOR } from '@/helper/util'

interface BaseResult {
  extra?: Record<string, string | number | boolean | null>
}

export type Result = BaseResult &
  XOR<
    {
      data: Record<string, unknown>
    },
    {
      error: {
        code: number
        title: string
        message: string
      }
    }
  >

export interface TermScoresData {
  state: string
  list: {
    avgcj: string
    bjh: string
    bm: string
    coureSequenceNumber: string
    courseName: string
    coursePropertyCode: string
    coursePropertyName: string
    courseScore: string
    credit: number
    englishCourseName: string
    examTypeCode: string
    examTypeName: string
    freeCourseTypeCode: string
    gradePoint: number
    id: {
      courseNumber: string
      examtime: string
      executiveEducationPlanNumber: string
      studentNumber: string
    }
    inputMethodCode: string
    inputStatusCode: string
    inputStatusExplain: string
    levelName: string
    levlePoint: string
    maxcj: string
    mincj: string
    operatetime: string
    operator: string
    persentlevlePoint: string
    planName: string
    planNumber: string
    programName: string
    rank: string
    remark: string
    replaceCourseNumber: string
    retakeCourseMark: string
    retakeCourseModeCode: string
    retakeCourseModeExplain: string
    standardPoint: string
    studentName: string
    studingModeCode: string
    studyHour: string
    tPoint: number
    termCode: string
    termName: string
    unpassedReasonCode: string
    unpassedReasonExplain: string
    xsh: string
    xsm: string
    zyh: string
  }[]
}
