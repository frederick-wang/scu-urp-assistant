interface SemesterTeacherTable {
  // 课程号
  [key: string]: {
    // 课序号
    [key: string]: Array<{
      teacherNumber: string
      teacherName: string
    }>
  }
}

interface TeacherTable {
  // 学期
  [key: string]: SemesterTeacherTable
}

interface LocalStore {
  time: number
  state: {
    core: {
      version: string
    }
    data: {
      [key: string]: {
        time: number
        expirationTime: number
        payload: unknown
      }
    }
  }
}

interface AjaxStudentScheduleDTO {
  allUnits: number
  xkxx: [
    {
      [key: string]: {
        attendClassTeacher: string
        courseCategoryCode: string
        courseCategoryName: string
        courseName: string
        coursePropertiesCode: string
        coursePropertiesName: string
        dgFlag: string
        examTypeCode: string
        examTypeName: string
        flag: string
        id: {
          coureNumber: string
          coureSequenceNumber: string
          executiveEducationPlanNumber: string
          studentNumber: string
        }
        programPlanName: string
        programPlanNumber: string
        restrictedCondition: string
        rlFlag: string
        selectCourseStatusCode: string
        selectCourseStatusName: string
        studyModeCode: string
        studyModeName: string
        timeAndPlaceList?: Array<{
          campusName: string
          classDay: number
          classSessions: number
          classWeek: string
          classroomName: string
          continuingSession: number
          coureName: string
          coureNumber: string
          coureSequenceNumber: string
          coursePropertiesName: string
          courseTeacher: string
          executiveEducationPlanNumber: string
          id: string
          kcm: string
          sksj: string
          studentNumber: string
          teachingBuildingName: string
          time: string
          weekDescription: string
          xf: string
        }>
        unit: number
        ywdgFlag: string
      }
    }
  ]
  dateList: Array<{
    programPlanCode: string
    programPlanName: string
    totalUnits: number
    selectCourseList: Array<{
      id: {
        coureNumber: string
        coureSequenceNumber: string
        executiveEducationPlanNumber: string
        studentNumber: string
      }
      programPlanNumber: string
      courseName: string
      unit: number
      programPlanName: string
      attendClassTeacher: string
      studyModeCode: string
      studyModeName: string
      coursePropertiesCode: string
      coursePropertiesName: string
      examTypeCode?: string
      examTypeName?: string
      courseCategoryCode?: string
      courseCategoryName?: string
      restrictedCondition: string
      timeAndPlaceList?: Array<{
        id: string
        executiveEducationPlanNumber: string
        coureNumber: string
        coureSequenceNumber: string
        studentNumber: string
        classWeek: string
        classDay: number
        classSessions: number
        campusName: string
        teachingBuildingName: string
        classroomName: string
        weekDescription: string
        continuingSession: number
        coursePropertiesName: string
        coureName: string
        courseTeacher?: unknown
        sksj?: unknown
        time?: unknown
        xf?: unknown
        kcm?: unknown
      }>
      flag?: unknown
      dgFlag: string
      ywdgFlag: string
      rlFlag: string
      selectCourseStatusName: string
      selectCourseStatusCode: string
    }>
    courseCalendarList?: unknown
  }>
}

interface CourseScheduleInfoDTO {
  pfcx: number
  list?: {
    pageSize: number
    pageNum: number
    pageContext: {
      totalCount: number
    }
    records: Array<{
      id: string
      zxjxjhh: string
      kch: string
      kxh: string
      kcm: string
      xf: number
      xs: number
      kkxsh: string
      kkxsjc: string
      kslxdm: string
      kslxmc: string
      skjs: string
      bkskrl: number
      bkskyl: number
      xkmsdm: string
      xkmssm: string
      xkkzdm: string
      xkkzsm: string
      xkkzh?: unknown
      xkxzsm: string
      kkxqh: string
      kkxqm: string
      sfxzxslx?: unknown
      sfxzxsnj?: unknown
      sfxzxsxs?: string
      sfxzxxkc?: unknown
      sfxzxdlx: string
      xqh: string
      jxlh: string
      jash: string
      jclxdm: string
      skzc: string
      skxq: number
      skjc: number
      cxjc: number
      xqlxdm: string
      xqdm: string
      xss: number
      zcsm: string
      kclbdm: string
      kclbmc: string
      xkbz?: unknown
      xqm: string
      jxlm: string
      jasm: string
    }>
  }
}

interface CourseScheduleInfo {
  courseName: string
  courseNumber: string
  courseSequenceNumber: string
  courseDeptNumber: string
  courseDeptName: string
  credit: number
  courseCategoryCode: string
  courseCategoryName: string
  examTypeCode: string
  examTypeName: string
  courseTeacher: string
  courseTime: string
  campusName: string
  classCapacityRemaining: string
  courseRegNote: string
  [key: string]: unknown
}

interface TrainingSchemeCourseInfo {
  courseName: string
  courseNumber: string
  coursePropertyName: string
  courseAttributes: string[]
  courseMajor: string
  [key: string]: unknown
}

export interface TrainingScheme {
  majorId: number
  majorName: string
  grade: string
  department: string
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

interface InstructionalTeachingPlanDTO {
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

interface TrainingSchemeDTO {
  title: string
  jhFajhb: TrainingSchemeBaseInfo
  treeList: TrainingSchemeNodeDTO[]
}

interface TrainingSchemeNodeDTO {
  id: string
  pId: string
  name: string
  title?: unknown
  urlPath: string
  parent?: TrainingSchemeNodeDTO
  isDir: boolean
  coursePropertyName: string
  courseName: string
}

interface CourseScoreCoreInfo {
  courseName: string
  englishCourseName: string
  courseNumber: string
  executiveEducationPlanNumber: string
  executiveEducationPlanName: string
  credit: number
  examTime: string
  examTypeName?: string
  studyHour: number
}

interface CourseScorePublicInfo extends CourseScoreCoreInfo {
  maxScore: number
  avgScore: number
  minScore: number
}

interface CourseScoreInfo extends CourseScoreCoreInfo {
  courseSequenceNumber: string
  courseScore?: number
  gradePoint?: number
  levelCode?: number
  levelName?: string
  inputStatusCode: string
  inputMethodCode: string
  coursePropertyCode: string
  coursePropertyName: string
  maxScore?: number
  avgScore?: number
  minScore?: number
  rank?: number
  unpassedReasonCode?: string
  unpassedReasonExplain?: string
  examTypeCode?: string
}

interface AllTermScoresDTO {
  list: {
    pageSize: number
    pageNum: number
    pageContext: {
      totalCount: number
    }
    records: [
      string,
      string,
      string,
      string,
      string,
      string,
      string | undefined,
      string,
      number | undefined,
      number | undefined,
      string | undefined,
      string,
      string,
      number,
      number,
      string,
      string | undefined,
      string | undefined,
      string | undefined,
      number
    ][]
  }
}

interface CurrentSemesterStudentAcademicInfo {
  courseNumber: number
  currentSemester: string
  gpa: number
  currentSemesterCourseNumber: number
  failedCourseNumber: number
}

interface CourseInfoList {
  courseCategoryCode: string
  courseCategoryName: string
  courseName: string
  coursePropertiesCode: string
  coursePropertiesName: string
  courseTeacherList: Array<{
    teacherNumber: string
    teacherName: string
  }>
  examTypeCode: string
  examTypeName: string
  courseNumber: string
  courseSequenceNumber: string
  executiveEducationPlanNumber: string
  restrictedCondition: string
  timeAndPlaceList: Array<{
    campusName: string
    classDay: number
    classSessions: number
    classWeek: string
    classroomName: string
    continuingSession: number
    teachingBuildingName: string
    weekDescription: string
  }>
}

interface ScuUietpDTO {
  query: string
  number: number
  list: ScuUietpItemDTO[]
}

interface ScuUietpItemDTO {
  projectYear: number
  collegeName: string
  projectName: string
  projectLeaderName: string
  participantNumber: number
  otherMembersName: string[]
  schoolSupervisorName: string
  projectLevel: string
  applicationCategory: string
  projectCategory: string
}

interface BachelorDegreeInfo {
  majorCode: string
  majorName: string
  category: string
  approvalNumber: string
  remark: string
}

export {
  CourseScorePublicInfo,
  CourseScoreInfo,
  AllTermScoresDTO,
  CurrentSemesterStudentAcademicInfo,
  TrainingSchemeYearInfo,
  TrainingSchemeSemesterInfo,
  TrainingSchemeCourseInfo,
  InstructionalTeachingPlanDTO,
  TrainingSchemeDTO,
  TrainingSchemeNodeDTO,
  TrainingSchemeBaseInfo,
  CourseScheduleInfoDTO,
  CourseScheduleInfo,
  AjaxStudentScheduleDTO,
  LocalStore,
  SemesterTeacherTable,
  TeacherTable,
  CourseInfoList,
  ScuUietpDTO,
  ScuUietpItemDTO,
  BachelorDegreeInfo
}
