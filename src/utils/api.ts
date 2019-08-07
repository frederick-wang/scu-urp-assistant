interface CourseScoreData {
  courseName: string
  courseNumber: string
  coureSequenceNumber: string
  credit: number
  coursePropertyCode: string
  coursePropertyName: string
  maxScore: number
  avgScore: number
  minScore: number
  courseScore: number
  levleCode: string
  levelName: string
  gradePoint: number
  rank: number
  examtime: string
  unpassedReasonCode: string
  unpassedReasonExplain: string
  executiveEducationPlanNumber: string
}

async function getThisTermScoresList() {
  const url = '/student/integratedQuery/scoreQuery/thisTermScores/data'
  const [{ state, list }]: [{ state: string; list: any[] }] = await $.get(url)
  console.log(`state: ${state}`)
  const res = list
    .map(
      v =>
        ({
          courseName: v.courseName,
          courseNumber: v.id.courseNumber,
          coureSequenceNumber: v.coureSequenceNumber,
          credit: Number(v.credit),
          coursePropertyCode: v.coursePropertyCode,
          coursePropertyName: v.coursePropertyName,
          maxScore: Number(v.maxcj),
          avgScore: Number(v.avgcj),
          minScore: Number(v.mincj),
          courseScore: Number(v.courseScore),
          levleCode: v.levlePoint,
          levelName: v.levelName,
          gradePoint: Number(v.gradePoint),
          rank: Number(v.rank),
          examtime: v.id.examtime,
          unpassedReasonCode: '',
          unpassedReasonExplain: '',
          executiveEducationPlanNumber: v.id.executiveEducationPlanNumber
        } as CourseScoreData)
    )
    .sort((a, b) => {
      const weights = new Map([['必修', 100], ['选修', 75], ['任选', 50]])
      return (
        (weights.get(b.coursePropertyName) || 0) +
        b.credit -
        (weights.get(a.coursePropertyName) || 0) -
        a.credit
      )
    })
  return res
}

export { getThisTermScoresList }
