import { CourseScoreData } from '@/utils/api'

interface CourseScoreRecord extends CourseScoreData {
  selected: boolean
}

interface SemesterScoreRecord {
  semester: string
  courses: CourseScoreRecord[]
}

export { CourseScoreRecord, SemesterScoreRecord }
