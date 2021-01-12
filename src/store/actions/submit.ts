import { CourseScorePublicInfo } from '@/store/types'
import { API_PATH } from '@/helper/info'
import { Logger } from '@/helper/logger'

async function submitCourseScorePublicInfo(
  item: CourseScorePublicInfo
): Promise<void> {
  const url = `${API_PATH}/course/course_score_info`
  const {
    courseName,
    englishCourseName,
    courseNumber,
    executiveEducationPlanNumber,
    executiveEducationPlanName,
    credit,
    examTime,
    examTypeName,
    studyHour,
    maxScore,
    avgScore,
    minScore
  } = item
  const req = {
    api: {
      client: 'web'
    },
    data: {
      course_score_info: {
        course_name: courseName,
        english_course_name: englishCourseName,
        course_number: courseNumber,
        executive_education_plan_number: executiveEducationPlanNumber,
        executive_education_plan_name: executiveEducationPlanName,
        credit: credit,
        exam_time: examTime,
        exam_type_name: examTypeName,
        study_hour: studyHour,
        max_score: maxScore,
        avg_score: avgScore,
        min_score: minScore
      }
    }
  }
  let res
  try {
    // V1接口已经废弃，屏蔽功能，等待升级
    return
    res = await $.post(url, req)
    if (res.error) {
      throw new Error(`Submit.COURSE_SCORE_PUBLIC_INFO Failed: ${res.msg}`)
    }
    Logger.info('Submit.COURSE_SCORE_PUBLIC_INFO Successfully:', res.data)
  } catch (error) {
    Logger.error(error)
  }
}

async function submitCourseScorePublicInfos(
  items: CourseScorePublicInfo[]
): Promise<void> {
  if (!items || !items.length) {
    return
  }
  const url = `${API_PATH}/course/course_score_infos`
  const req = {
    api: {
      client: 'web'
    },
    data: {
      course_score_infos: items.map(
        ({
          courseName,
          englishCourseName,
          courseNumber,
          executiveEducationPlanNumber,
          executiveEducationPlanName,
          credit,
          examTime,
          examTypeName,
          studyHour,
          maxScore,
          avgScore,
          minScore
        }) => ({
          course_name: courseName,
          english_course_name: englishCourseName,
          course_number: courseNumber,
          executive_education_plan_number: executiveEducationPlanNumber,
          executive_education_plan_name: executiveEducationPlanName,
          credit: credit,
          exam_time: examTime,
          exam_type_name: examTypeName,
          study_hour: studyHour,
          max_score: maxScore,
          avg_score: avgScore,
          min_score: minScore
        })
      )
    }
  }
  // V1接口已经废弃，屏蔽功能，等待升级
  return
  const res = await $.post(url, req)
  if (res.error) {
    throw new Error(`Submit.COURSE_SCORE_PUBLIC_INFOS Failed: ${res.msg}`)
  }
  Logger.info('Submit.COURSE_SCORE_PUBLIC_INFOS Successfully:', res.data)
}

async function submitStudentCourseScorePublicInfos(
  items: any[]
): Promise<void> {
  const url = `${API_PATH}/student/course_score_infos`
  const req = {
    api: {
      client: 'web'
    },
    data: {
      student_course_score_infos: items
    }
  }
  // V1接口已经废弃，屏蔽功能，等待升级
  return
  const res = await $.post(url, req)
  if (res.error) {
    throw new Error(
      `Submit.STUDENT_COURSE_SCORE_PUBLIC_INFOS Failed: ${res.msg}`
    )
  }
  Logger.info(
    'Submit.STUDENT_COURSE_SCORE_PUBLIC_INFOS Successfully:',
    res.data
  )
  return res
}

export {
  submitCourseScorePublicInfo,
  submitCourseScorePublicInfos,
  submitStudentCourseScorePublicInfos
}
