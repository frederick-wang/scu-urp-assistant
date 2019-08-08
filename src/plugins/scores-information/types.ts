import { CourseScoreInfo } from '@/utils/api'

interface CourseScoreRecord extends CourseScoreInfo {
  selected: boolean
}

interface SemesterScoreRecord {
  semester: string
  courses: CourseScoreRecord[]
}

export { CourseScoreRecord, SemesterScoreRecord }
