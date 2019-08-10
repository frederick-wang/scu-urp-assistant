import { API_PATH } from '@/utils'

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
  const res = await $.post(url, req)
  if (process.env.NODE_ENV === 'development') {
    console.log('Submit.COURSE_SCORE_PUBLIC_INFO:', res)
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
  const res = await $.post(url, req)
  if (process.env.NODE_ENV === 'development') {
    console.log('Submit.COURSE_SCORE_PUBLIC_INFOS:', res)
  }
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
  const res = await $.post(url, req)
  if (process.env.NODE_ENV === 'development') {
    console.log('Submit.STUDENT_COURSE_SCORE_PUBLIC_INFOS:', res)
  }
  return res
}

export {
  submitCourseScorePublicInfo,
  submitCourseScorePublicInfos,
  submitStudentCourseScorePublicInfos
}
