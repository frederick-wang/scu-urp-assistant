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

export { CourseScoreBaseInfo, CourseScoreInfo, AllTermScoresAPIData }
