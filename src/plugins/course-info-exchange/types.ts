import { XOR } from '@/helper/util'

export type CourseInfoExchange = {
  basic: {
    courseName: string
    courseNumber: string
    courseSequenceNumber: string
    coursePropertyName: string
    courseTeacherList: {
      teacherNumber: string
      teacherName: string
    }[]
  }
} & XOR<
  {
    hasEvaluated: false
  },
  {
    hasEvaluated: true
    evaluation: {
      courseValue: number
      teachingAttitude: number
      teachingOrganization: number
      teacherStudentRelationship: number
      homeworkDifficulty: number
      comment: string
    }
  }
>

export type SemesterInfoExchange = {
  semester: string
  courses: CourseInfoExchange[]
}
