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

export interface APISubitemScoreLookDTO {
  scoreDetailList: {
    id: {
      executiveEducationPlanNumber: string
      courseNumber: string
      coureSequenceNumber: string
      scoreSubItemCode: string
      examTime: string
      studentId: string
    }
    scoreSubItemName?: string
    subItemScore: number
  }[]
}

export interface SubitemScoreRecord {
  /**
   * 执行教学计划号（即学期编号）
   */
  ZXJXJHH: string
  /**
   * 课程号
   */
  KCH: string
  /**
   * 课序号
   */
  KXH: string
  /**
   * 学号
   */
  XH: string
  /**
   * 考试时间
   */
  KSSJ: string
  /**
   * 分项成绩
   */
  FXCJ?: string
  /**
   * 成绩分项占比
   */
  CJFXZB?: string
  /**
   * 课程名
   */
  KCM: string
  /**
   * 成绩分项名称
   */
  CJFXMC?: string
  /**
   * XS（项数？）序号
   */
  XSXH: string
  /**
   * 好像也是序号
   */
  RN: string
}

export interface APISubitemScoreFxcjDTO {
  pageSize: number
  pageNum: number
  pageContext: {
    totalCount: number
  }
  records: SubitemScoreRecord[]
}
