interface TrainingSchemeCourseInfo {
  courseName: string
  courseNumber: string
  coursePropertyName: string
  courseAttributes: string[]
  courseMajor: string
  [key: string]: any
}

interface TrainingSchemeYearInfo {
  name: string
  children: TrainingSchemeSemesterInfo[]
}

interface TrainingSchemeSemesterInfo {
  name: string
  children: TrainingSchemeCourseInfo[]
}

interface TrainingSchemeBaseInfo {
  fajhh: string
  nj: string
  xsh: string
  zyh: string
  zyfxh?: string
  zym: string
  zyfxm?: string
  famc: string
  jhmc: string
  xwdm?: string
  bylxdm?: string
  xzlxdm: string
  xdlxdm: string
  fajhlxm: string
  ksxndm: string
  xqlxdm: string
  ksxqdm: string
  pymb?: string
  xdyq?: string
  yqzxf: number
  kczxf: number
  kczms: number
  kczxs: number
  bz: string
  xsm: string
  fajhlx: string
  xqlxm: string
  xdlxmc: string
  xzlxmc: string
  xnmc: string
  xqm: string
  njmc: string
  bylxmc?: string
  xwm?: string
  id?: string
  ckchengshuxing?: string
  renshu?: string
  [key: string]: string | number | undefined
}

interface InstructionalTeachingPlanAPIData {
  title: string
  jhFajhb: TrainingSchemeBaseInfo
  treeList: Array<{
    id: string
    pId: string
    name: string
    title?: string
    open: boolean
    urlPath: string
  }>
}

interface TrainingSchemeAPIData {
  title: string
  jhFajhb: TrainingSchemeBaseInfo
  treeList: TrainingSchemeNodeAPIData[]
}

interface TrainingSchemeNodeAPIData {
  id: string
  pId: string
  name: string
  title?: any
  urlPath: string
  parent?: TrainingSchemeNodeAPIData
  isDir: boolean
  coursePropertyName: string
  courseName: string
}

interface CourseScoreBaseInfo {
  executiveEducationPlanNumber: string
  executiveEducationPlanName: string
  courseNumber: string
  courseSequenceNumber: string
  examtime: string
  inputStatusCode: string
  coursePropertyCode: string
  inputMethodCode: string
  courseScore: number
  levelCode: string
  courseName: string
  englishCourseName: string
  credit: number
  studyHour: number
  coursePropertyName: string
  examTypeName: string
  levelName: string
  unpassedReasonExplain: string
  gradePoint: number
}

interface CourseScoreInfo extends CourseScoreBaseInfo {
  maxScore: number
  avgScore: number
  minScore: number
  rank: number
  unpassedReasonCode: string
}

interface AllTermScoresAPIData {
  list: {
    pageSize: number
    pageNum: number
    pageContext: {
      totalCount: number
    }
    records: (null | string | number)[][]
  }
}

interface CurrentSemesterStudentAcademicInfo {
  courseNumber: number
  currentSemester: string
  gpa: number
  currentSemesterCourseNumber: number
  failedCourseNumber: number
}

export {
  CourseScoreBaseInfo,
  CourseScoreInfo,
  AllTermScoresAPIData,
  CurrentSemesterStudentAcademicInfo,
  TrainingSchemeYearInfo,
  TrainingSchemeSemesterInfo,
  TrainingSchemeCourseInfo,
  InstructionalTeachingPlanAPIData,
  TrainingSchemeAPIData,
  TrainingSchemeNodeAPIData,
  TrainingSchemeBaseInfo
}
