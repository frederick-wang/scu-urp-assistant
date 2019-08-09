import {
  AllTermScoresAPIData,
  CourseScoreBaseInfo,
  CourseScoreInfo,
  CurrentSemesterStudentAcademicInfo
} from './types'

async function requestCurrentSemesterStudentAcademicInfo(): Promise<
  CurrentSemesterStudentAcademicInfo
> {
  // 加载本学期基本信息
  const [
    {
      zxjxjhh: currentSemester,
      gpa,
      courseNum: courseNumber,
      courseNum_bxqyxd: currentSemesterCourseNumber,
      coursePas: failedCourseNumber
    }
  ] = JSON.parse(await $.post('/main/academicInfo'))
  return {
    courseNumber,
    currentSemester,
    gpa,
    currentSemesterCourseNumber,
    failedCourseNumber
  }
}

function convertSemesterNumberToText(number: string) {
  const r = number.match(/(\d+)-(\d+)-(.+)/)
  if (r) {
    const begin = r[1]
    const end = r[2]
    const season = r[3] === '1-1' ? '秋' : '春'
    return `${begin}-${end}学年 ${season}季学期`
  }
  return number
}

/**
 * 根据分数返回对应的绩点
 *
 * @param {number} score 分数
 * @param {string} semester 学期
 * @returns 绩点
 */
function getPointByScore(score: number, semester: string) {
  // 2017年起，川大修改了绩点政策，因此要检测学期的年份
  const r = semester.match(/^\d+/)
  if (!r) {
    return 0
  }
  const enrollmentYear = Number(r[0])
  if (enrollmentYear >= 2017) {
    // 2017-2018秋季学期起使用如下标准（Fall Term 2017-2018~Present）
    if (score >= 90) {
      return 4
    } else if (score >= 85) {
      return 3.7
    } else if (score >= 80) {
      return 3.3
    } else if (score >= 76) {
      return 3
    } else if (score >= 73) {
      return 2.7
    } else if (score >= 70) {
      return 2.3
    } else if (score >= 66) {
      return 2
    } else if (score >= 63) {
      return 1.7
    } else if (score >= 61) {
      return 1.3
    } else if (score >= 60) {
      return 1
    } else {
      return 0
    }
  } else {
    // 2017-2018秋季学期以前使用如下标准（Before Fall Term 2017-2018）
    if (score >= 95) {
      return 4
    } else if (score >= 90) {
      return 3.8
    } else if (score >= 85) {
      return 3.6
    } else if (score >= 80) {
      return 3.2
    } else if (score >= 75) {
      return 2.7
    } else if (score >= 70) {
      return 2.2
    } else if (score >= 65) {
      return 1.7
    } else if (score >= 60) {
      return 1
    } else {
      return 0
    }
  }
}

function filterCourseScoreInfoList(list: CourseScoreBaseInfo[]) {
  return (
    list
      // 根据 http://jwc.scu.edu.cn/detail/122/6891.htm 《网上登录成绩的通知》 的说明
      // 教师「暂存」的成绩学生不应看到
      // 因此为了和教务处成绩显示保持一致，这里只显示「已提交」的成绩
      // TODO: 考虑做开关，让用户决定看不看
      .filter(v => v.inputStatusCode === '05')
      // 分数可能为null，必须分数不为null才显示
      .filter(v => v.courseScore)
  )
}

async function requestAllTermsCourseScoreInfoList(): Promise<
  CourseScoreBaseInfo[]
> {
  const url = '/student/integratedQuery/scoreQuery/allTermScores/data'
  const {
    list: {
      pageContext: { totalCount }
    }
  } = (await $.post(url, {
    zxjxjhh: '',
    kch: '',
    kcm: '',
    pageNum: 1,
    pageSize: 1
  })) as AllTermScoresAPIData

  const {
    list: { records }
  } = (await $.post('/student/integratedQuery/scoreQuery/allTermScores/data', {
    zxjxjhh: '',
    kch: '',
    kcm: '',
    pageNum: 1,
    pageSize: totalCount
  })) as AllTermScoresAPIData

  return filterCourseScoreInfoList(
    records.map(v => ({
      executiveEducationPlanNumber: v[0] as string,
      executiveEducationPlanName: convertSemesterNumberToText(v[0] as string),
      courseNumber: v[1] as string,
      courseSequenceNumber: v[2] as string,
      examtime: v[3] as string,
      inputStatusCode: v[4] as string,
      coursePropertyCode: v[5] as string,
      inputMethodCode: v[7] as string,
      courseScore: Number(v[8]),
      levelCode: v[9] as string,
      courseName: v[11] as string,
      englishCourseName: v[12] as string,
      credit: Number(v[13]),
      studyHour: Number(v[14]),
      coursePropertyName: v[15] as string,
      examTypeName: v[16] as string,
      levelName: v[17] as string,
      unpassedReasonExplain: v[18] as string,
      gradePoint: getPointByScore(v[8] as number, v[0] as string)
    }))
  )
}

async function requestThisTermCourseScoreInfoList(): Promise<
  CourseScoreInfo[]
> {
  const url = '/student/integratedQuery/scoreQuery/thisTermScores/data'
  const [{ state, list }]: [{ state: string; list: any[] }] = await $.get(url)
  // console.log(`state: ${state}`)
  const res = filterCourseScoreInfoList(
    list.map(
      v =>
        ({
          courseName: v.courseName,
          englishCourseName: v.englishCourseName,
          courseNumber: v.id.courseNumber,
          // 对，你没看错，这个地方教务处接口是错别字，把course打成了coure
          courseSequenceNumber: v.coureSequenceNumber,
          credit: Number(v.credit),
          coursePropertyCode: v.coursePropertyCode,
          coursePropertyName: v.coursePropertyName,
          maxScore: Number(v.maxcj),
          avgScore: Number(v.avgcj),
          minScore: Number(v.mincj),
          courseScore: Number(v.courseScore),
          // 对，你没看错，这个地方教务处接口是错别字，把level打成了levle
          levelCode: v.levlePoint,
          levelName: v.levelName,
          gradePoint: Number(v.gradePoint),
          rank: Number(v.rank),
          examtime: v.id.examtime,
          unpassedReasonCode: v.unpassedReasonCode,
          unpassedReasonExplain: v.unpassedReasonExplain,
          executiveEducationPlanNumber: v.id.executiveEducationPlanNumber,
          executiveEducationPlanName: convertSemesterNumberToText(
            v.id.executiveEducationPlanNumber
          ),
          inputStatusCode: v.inputStatusCode,
          inputMethodCode: v.inputMethodCode,
          studyHour: Number(v.studyHour),
          examTypeName: v.examTypeName
        } as CourseScoreInfo)
    )
  ).sort((a, b) => {
    const weights = new Map([['必修', 100], ['选修', 75], ['任选', 50]])
    return (
      (weights.get(b.coursePropertyName) || 0) +
      b.credit -
      (weights.get(a.coursePropertyName) || 0) -
      a.credit
    )
  })
  return res as CourseScoreInfo[]
}

export {
  requestThisTermCourseScoreInfoList,
  requestAllTermsCourseScoreInfoList,
  requestCurrentSemesterStudentAcademicInfo
}
