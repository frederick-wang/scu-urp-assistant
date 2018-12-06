'use strict';

// 删除手动评教的时间限制插件
var removeEvaluationTimeLimit = {
  name: 'remove-evaluation-time-limit',
  pathname: '/student/teachingEvaluation/teachingEvaluation/evaluationPage',
  init: function init() {
    window.$('#RemainM').parent().parent().html('<h4 class="green">时间限制已移除</h4>');
    window.flag = true;
  }
};

module.exports = removeEvaluationTimeLimit;