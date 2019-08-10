import { CourseScoreInfo } from '@/utils/api/types'

interface CourseScoreRecord extends CourseScoreInfo {
  courseTeacherList: Array<{
    teacherNumber: string
    teacherName: string
  }>
  selected: boolean
}

interface SemesterScoreRecord {
  semester: string
  courses: CourseScoreRecord[]
}

export { CourseScoreRecord, SemesterScoreRecord }
