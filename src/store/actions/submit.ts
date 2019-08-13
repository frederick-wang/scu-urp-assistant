import { API_PATH, logger } from '@/utils'

import { CourseScorePublicInfo } from '@/store/types'

async function submitCourseScorePublicInfo(item: CourseScorePublicInfo) {
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
    res = await $.post(url, req)
    if (res.error) {
      throw new Error(`Submit.COURSE_SCORE_PUBLIC_INFO Failed: ${res.msg}`)
    }
    logger.info('Submit.COURSE_SCORE_PUBLIC_INFO Successfully:', res.data)
  } catch (error) {
    logger.error(error)
  }
  return res
}

async function submitCourseScorePublicInfos(items: CourseScorePublicInfo[]) {
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
  let res
  res = await $.post(url, req)
  if (res.error) {
    throw new Error(`Submit.COURSE_SCORE_PUBLIC_INFOS Failed: ${res.msg}`)
  }
  logger.info('Submit.COURSE_SCORE_PUBLIC_INFOS Successfully:', res.data)
  return res
}

async function submitStudentCourseScorePublicInfos(items: any[]) {
  const url = `${API_PATH}/student/course_score_infos`
  const req = {
    api: {
      client: 'web'
    },
    data: {
      student_course_score_infos: items
    }
  }
  let res
  res = await $.post(url, req)
  if (res.error) {
    throw new Error(
      `Submit.STUDENT_COURSE_SCORE_PUBLIC_INFOS Failed: ${res.msg}`
    )
  }
  logger.info(
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
