import { messageSuccess, messageWarning, notifyError } from '@/helper/util'
import { TeachingAssessmentEvaluationRecord } from '@/store/actions/result.interface'
import comments from './comments.json'

const getRecordText = ({
  teacherName,
  courseName,
  courseNumber,
  courseSequenceNumber
}: TeachingAssessmentEvaluationRecord): string =>
  `${teacherName}（${courseName} [${courseNumber}-${courseSequenceNumber}]）`

type EvaluationStatus = 'pending' | 'evaluating' | 'evaluated' | 'error'

type EvaluationItem = {
  key: string
  courseId: string
  teacherName: string
  courseName: string
  courseNumber: string
  courseSequenceNumber: string
  status: EvaluationStatus
}

const getEvaluationItem = (
  rec: TeachingAssessmentEvaluationRecord
): EvaluationItem => ({
  key: getRecordText(rec),
  courseId: rec.courseId,
  teacherName: rec.teacherName,
  courseName: rec.courseName,
  courseNumber: rec.courseNumber,
  courseSequenceNumber: rec.courseSequenceNumber,
  status: 'pending'
})

const getRandomComment = (): string =>
  comments[Math.floor(Math.random() * comments.length)]

type EvaluationResult = {
  error: 0 | 1
  msg: string
}

const evaluate = async (
  html: string,
  text: string
): Promise<EvaluationResult> => {
  const $html = $(html)
  const tokenValue = $('#tokenValue', $html).val()
  $('#saveEvaluation [data-name=szt]', $html).val(100)
  $('#saveEvaluation input[type=radio][value*=A]', $html).attr(
    'checked',
    'checked'
  )
  $('#saveEvaluation input[type=checkbox]:not([value*=无])', $html).attr(
    'checked',
    'checked'
  )
  const comment = getRandomComment()
  $('#saveEvaluation textarea', $html).val(comment)
  const $form = $('#saveEvaluation', $html)[0] as HTMLFormElement
  const form = new FormData($form)
  const url = `/student/teachingAssessment/baseInformation/questionsAdd/doSave?tokenValue=${tokenValue}`
  try {
    const data = await $.ajax({
      url,
      type: 'post',
      data: form,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    console.log(data)
    if (data.result.includes('/')) {
      const msg =
        '因登录持续时间过长，当前暂时无法评教。请点击右上角头像注销，并在重新登录后再次尝试。如果还是无法评教，您可以更换浏览器或电脑后再尝试。'
      notifyError(msg, '[快捷评教] 无法评教')
      return {
        error: 1,
        msg
      }
    } else {
      if (data.result == 'ok') {
        const msg = `${text} 评教成功！`
        messageSuccess(msg)
        return {
          error: 0,
          msg
        }
      } else if (data.result == 'no') {
        const msg = '评教失败，请刷新页面重新尝试！'
        notifyError(msg, '[快捷评教] 评教失败')
        return {
          error: 1,
          msg
        }
      } else if (data.result == 'error') {
        const msg = '附件保存失败，请刷新页面后重新尝试！'
        notifyError(msg, '[快捷评教] 附件保存失败')
        return {
          error: 1,
          msg
        }
      } else if (data.result == 'typeerr') {
        const msg = '附件只能上传jpg/jpeg/png格式的图片，请确认！'
        notifyError(msg, '[快捷评教] 附件格式错误')
        return {
          error: 1,
          msg
        }
      } else if (data.result == 'timeout') {
        const msg = '超出了问卷所规定的的评估期限，评教失败，请联系管理员！'
        notifyError(msg, '[快捷评教] 评估期限超时')
        return {
          error: 1,
          msg
        }
      } else {
        const msg = JSON.stringify(data.result)
        messageWarning(msg)
        return {
          error: 1,
          msg
        }
      }
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    notifyError(msg, '[快捷评教] 评教失败')
    return {
      error: 1,
      msg
    }
  }
}

export {
  getRecordText,
  getRandomComment,
  getEvaluationItem,
  EvaluationItem,
  EvaluationStatus,
  evaluate
}
