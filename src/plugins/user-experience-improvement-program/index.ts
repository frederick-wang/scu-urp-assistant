// 用户体验改善计划插件
import { actions, Submit, state } from '@/store'
import { CourseScorePublicInfo } from '@/store/types'
import local from '@/store/local'
import { getPluginIcon } from '@/helper/getter'
import { emitDataAnalysisEvent } from '@/plugins/data-analysis'
import { SemesterScoreRecord } from '@/plugins/score/types'
import { Logger } from '@/helper/logger'
import { requestThisTermCourseScoreInfoList } from '@/store/actions/request'

async function sendStudentCourseScorePublicList(
  records: SemesterScoreRecord[]
): Promise<void> {
  if (!state.getData('ueipStudentCourseScorePublicList')) {
    const res = Object.values(records).map(v =>
      v.courses.map(
        ({
          courseName: course_name,
          courseNumber: course_number,
          courseScore: course_score,
          courseSequenceNumber: course_sequence_number,
          // courseTeacherList: course_teacher_list,
          credit: credit,
          englishCourseName: english_course_name,
          examTime: exam_time,
          examTypeName: exam_type_name,
          executiveEducationPlanName: executive_education_plan_name,
          executiveEducationPlanNumber: executive_education_plan_number,
          gradePoint: grade_point,
          levelCode: level_code,
          levelName: level_name,
          studyHour: study_hour,
          unpassedReasonExplain: unpassed_reason_explain
        }) => ({
          course_name,
          course_number,
          course_score,
          course_sequence_number,
          // course_teacher_list: course_teacher_list
          //   .filter(v => !v.teacherNumber.includes('zj'))
          //   .map(v => Object.values(v).join('#'))
          //   .join('|'),
          // course_ta_list: course_teacher_list
          //   .filter(v => v.teacherNumber.includes('zj'))
          //   .map(v => Object.values(v).join('#'))
          //   .join('|'),
          credit,
          english_course_name,
          exam_time,
          exam_type_name,
          executive_education_plan_name,
          executive_education_plan_number,
          grade_point,
          level_code,
          level_name,
          study_hour,
          unpassed_reason_explain,
          user_id: state.user.id
        })
      )
    )
    try {
      for (const v of res) {
        await actions[Submit.STUDENT_COURSE_SCORE_PUBLIC_INFOS](v)
      }
      Logger.log('isSubmittedSuccessfully!')
      state.setData('ueipStudentCourseScorePublicList', true)
      local.saveData(
        {
          key: 'ueipStudentCourseScorePublicList',
          payload: true
        },
        // 7天更新一次
        new Date().getTime() + 7 * 86400 * 1000
      )
      emitDataAnalysisEvent('UEIP-匿名用户课程成绩信息', '上传成功')
    } catch (error) {
      Logger.error('Submit.STUDENT_COURSE_SCORE_PUBLIC_INFOS Failed!', error)
      emitDataAnalysisEvent('UEIP-匿名用户课程成绩信息', '上传失败')
    }
  }
}

async function sendCourseScorePublicList(): Promise<void> {
  if (!state.getData('ueipCourseScorePublicList')) {
    const thisTermCourseScoreInfoList = await requestThisTermCourseScoreInfoList()
    const courseScorePublicList: CourseScorePublicInfo[] = thisTermCourseScoreInfoList.map(
      ({
        courseName,
        englishCourseName,
        courseNumber,
        courseSequenceNumber,
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
        courseName,
        englishCourseName,
        courseNumber,
        courseSequenceNumber,
        executiveEducationPlanNumber,
        executiveEducationPlanName,
        credit,
        examTime,
        examTypeName,
        studyHour,
        maxScore: maxScore as number,
        avgScore: avgScore as number,
        minScore: minScore as number
      })
    )
    try {
      await actions[Submit.COURSE_SCORE_PUBLIC_INFOS](courseScorePublicList)
      state.setData('ueipCourseScorePublicList', true)
      local.saveData(
        {
          key: 'ueipCourseScorePublicList',
          payload: true
        },
        // 7天更新一次
        new Date().getTime() + 7 * 86400 * 1000
      )
      emitDataAnalysisEvent('UEIP-课程成绩信息', '上传成功')
    } catch (error) {
      Logger.error('Submit.COURSE_SCORE_PUBLIC_INFOS Failed!', error)
      emitDataAnalysisEvent('UEIP-课程成绩信息', '上传失败')
    }
  }
}

export default {
  name: 'user-experience-improvement-program',
  displayName: '用户体验改善计划',
  icon: getPluginIcon('user-experience-improvement-program'),
  isNecessary: false,
  defaultEnabledState: true,
  pathname: true,
  brief:
    '统计与课程相关的匿名信息（只包括课程信息，不会泄露个人信息），并将这些信息分析后提供给全体助手用户，以改善全体用户的使用体验。人人为我，我为人人。',
  async init(): Promise<void> {
    sendCourseScorePublicList()
  }
}

export { sendCourseScorePublicList, sendStudentCourseScorePublicList }
