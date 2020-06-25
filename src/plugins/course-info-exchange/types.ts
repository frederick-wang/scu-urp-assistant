import { SemesterScoreRecord, CourseScoreRecord } from '../score/types'

export interface SemesterScoreRecordWithInfoExchange
  extends SemesterScoreRecord {
  courses: CourseScoreRecordWithInfoExchange[]
}

export interface CourseScoreRecordWithInfoExchange extends CourseScoreRecord {
  courseValue: number
  teachingAttitude: number
  teachingOrganization: number
  teacherStudentRelationship: number
  homeworkDifficulty: number
  comment: string
}
