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

export type APISubitemScoreLookDTO =
  | {
      msg: undefined
      scoreDetailList: ScoreDetail[]
    }
  | {
      msg: string
      scoreDetailList: never
    }

export interface ScoreDetail {
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

export interface APIAllPassingScoresDTO {
  lnList: APIAllPassingScoresDTOLn[]
  state: string
  zxjxjhh: string
}

export interface APIAllPassingScoresDTOLn {
  cjList: APIAllPassingScoresDTOLnCj[]
  xqwtg: number
  xqzms: number
  xqtgms: number
  xqzxs: number
  xqzxf: number
  zxf: number
  zxs: number
  yqzxf: number
  yqxf: number
  yxxf: number
  tgms: number
  wtgms: number
  zms: number
  cjlx: string
  cjbh: string
  fajhwkcms: number
  kznzms: number
  fajhnkcms: number
  kzxdms: number
  kzwtgms: number
  kztgms: number
  fajhzxf: number
  fajhzxs: number
  fajhzms: number
  famc: undefined
  zxjxjhh: string
}

export interface APIAllPassingScoresDTOLnCj {
  id: APIAllPassingScoresDTOLnCjId
  classNo: string
  entryStatusCode: string
  scoreEntryModeCode: string
  gradePointScore?: number
  standardScore?: number
  percentileRankScore?: number
  gradeScore?: number
  planNO: string
  courseAttributeName: string
  courseAttributeCode: string
  payableMoney: undefined
  examTypeCode?: string
  examTime: string
  electiveTypeCode?: string
  studyModeCode: string
  courseScore: number
  operator?: string
  operatingTime?: string
  makeupExaminationTypeCode?: string
  notByReasonCode: undefined
  notByReasonName: undefined
  remark?: string
  cycle?: string
  courseName: string
  englishCourseName: string
  planName: string
  planName2: string
  academicYearCode: string
  termTypeCode: string
  termTypeName: string
  termCode: string
  termName: string
  gradeName?: string
  cj: string
  xkcsxdm: undefined
  xkcsxmc: undefined
  tdkcm: undefined
  cjlrfsdm: undefined
  bm: undefined
  kzlbmc: undefined
  avgcj: undefined
  rank: undefined
  xkkzm: undefined
  credit: string
  tscore?: number
  substituteCourseNo?: string
}

export interface APIAllPassingScoresDTOLnCjId {
  executiveEducationPlanNumber: string
  courseNumber: string
  startTime: string
  studentId: string
  coureSequenceNumber: string
  kch_zj: string
}

export interface APITeachingAssessmentEvaluationQueryAllResult {
  status: number
  msg: string
  data: {
    pageSize: number
    pageNum: number
    pageContext: {
      totalCount: number
    }
    records: {
      KTID: string // 课堂ID
      LSRXM: string // 老师人姓名
      WJBM: string // 问卷编码
      ZXJXJHH: string // 执行教学计划号
      KCH: string // 课程号
      KXH: string // 课序号
      SFPG: '1' | '0' // 是否评估
      JKRQ: string // 结课日期
      WJMC: string // 问卷名称
      YXDCPG: string // 允许多次评估
      PGLXDM: '01' | '02' // 评估类型代码: '01' - 过程评估, '02' - 绩效评估, 还有一个未知代码的「投票评估」
      JKKG: '1' | '0' | '' // 结课开关，不过目前看到的代码里返回的全是 ''
      JKPGTS: string // 结课评估天数
      KCM: string // 课程名
      PGID: string // 评估ID
      RN: string // 记录编号（RecordNumber）
    }[]
  }
}

export interface TeachingAssessmentEvaluationRecord {
  courseId: string
  teacherName: string
  questionnaireId: string
  executiveEducationPlanNumber: string
  courseNumber: string
  courseSequenceNumber: string
  isEvaluated: boolean
  courseEndDate: string
  questionnaireName: string
  allowMultipleEvaluations: boolean
  evaluationTypeCode: string
  JKKG: string
  JKPGTS: string
  courseName: string
  evaluationId: string
  recordNumber: string
}
