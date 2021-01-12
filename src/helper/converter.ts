import { CourseScoreInfo } from '@/store/types'
import { SemesterScoreRecord } from '@/plugins/score/types'

export const convertSemesterNumberToName = (semesterNumber: string): string => {
  const r = semesterNumber.match(/(\d+)-(\d+)-(\d)/)
  if (!r) {
    return semesterNumber
  }
  return `${r[1]}-${r[2]}学年 ${r[3] === '1' ? '秋' : '春'}季学期`
}

export const convertSemesterNameToNumber = (semesterName: string): string => {
  const r = semesterName.match(/^(\d+)-(\d+)学年\s(.)季学期$/)
  if (!r) {
    return semesterName
  }
  return `${r[1]}-${r[2]}-${r[3] === '秋' ? 1 : 2}-1`
}

export const convertCourseScoreInfoListToScoreRecords = (
  list: CourseScoreInfo[]
): SemesterScoreRecord[] =>
  list
    .sort((a, b) => {
      const weights = new Map([
        ['必修', 100],
        ['选修', 75],
        ['任选', 50]
      ])
      return (
        (weights.get(b.coursePropertyName) || 0) +
        b.credit -
        (weights.get(a.coursePropertyName) || 0) -
        a.credit
      )
    })
    .reduce((acc, cur) => {
      // 如果没有挂科，那么 unpassedReasonExplain ≡ null
      // 如果挂科了，检查是否是因为「缓考」才在系统中记录为「未通过」，如果是缓考，则跳过这条记录
      const failReason = cur.unpassedReasonExplain
        ? (cur.unpassedReasonExplain as string)
        : null
      if (failReason && failReason.includes('缓考')) {
        return acc
      }
      const currentSemesterRecords = acc.filter(
        v => v.semester === cur.executiveEducationPlanName
      )
      const record = {
        ...cur,
        selected: false
      }
      if (currentSemesterRecords.length) {
        currentSemesterRecords[0].courses.push(record)
      } else {
        acc.push({
          semester: record.executiveEducationPlanName,
          courses: [record]
        })
      }
      return acc
    }, [] as SemesterScoreRecord[])
    // 不显示还没有课程成绩的学期
    .filter(v => v.courses && v.courses.length)
    // 如果一门课程在同一学期内出现了两次成绩记录，取最新的一次
    .map(({ semester, courses }) => ({
      semester,
      courses: courses.filter(
        ({ courseName, courseNumber, courseSequenceNumber, examTime }) =>
          !courses.some(
            v =>
              v.courseName === courseName &&
              v.courseNumber === courseNumber &&
              v.courseSequenceNumber === courseSequenceNumber &&
              Number(v.examTime) > Number(examTime)
          )
      )
    }))
    .sort((a, b) => {
      const getWeightSum = ({ semester }: SemesterScoreRecord): number => {
        const r = semester.match(/^(\d+)-(\d+)学年\s(.)季学期$/)
        return r ? Number(r[1]) + Number(r[2]) + (r[3] === '秋' ? 0 : 1) : 0
      }
      // 从大到小排
      return getWeightSum(b) - getWeightSum(a)
    })
