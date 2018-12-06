// 删除手动评教的时间限制插件
const removeEvaluationTimeLimit = {
  name: 'remove-evaluation-time-limit',
  pathname: '/student/teachingEvaluation/teachingEvaluation/evaluationPage',
  init () {
    window.$('#RemainM').parent().parent().html('<h4 class="green">时间限制已移除</h4>')
    window.flag = true
  }
}

module.exports = removeEvaluationTimeLimit
