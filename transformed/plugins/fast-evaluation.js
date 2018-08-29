'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 一键评教插件
var fastEvaluation = {
  $btn: undefined,
  $prompt: undefined,
  list: [],
  evaluationInterval: 500,
  comments: ['老师是很好的，平时课堂上讲课风趣又不失严谨，课下也对同学们的问题有求必应，帮助了我很多。', '老师挺不错的，对问题分析的透彻，讲课能切中要害，很喜欢老师的讲课风格。', '老师讲课很用心，给我们划定了学习目标，班里同学都学得不错，给分也好。', '老师经验很丰富，平时要求适中，注重与我们沟通交流，把知识真正的传递给了我们。', '老师讲的内容紧追时代步伐，不过时，讲课风格详实生动，大家都很喜欢。', '老师的讲课节奏安排的不错，最后大家对知识掌握的都比较好，复习也比较充分，考试情况不错。'],
  init: function init() {
    if (window.location.pathname === '/student/teachingEvaluation/evaluation/index') {
      this.$btn = window.$('<button class="btn btn-xs btn-round btn-light" id="fast_evaluation_btn" style="margin-left: 5px;">点此给本页所有老师好评！</button>');
      this.$prompt = window.$('<span id="fast_evaluation_prompt" style="margin-left: 10px;"></span>');

      window.$('#close > h4').append(this.$btn, this.$prompt);

      this.$btn.click(this.onClickBtn.bind(this));
    }
  },
  onClickBtn: function onClickBtn(e) {
    var _this = this;

    e.preventDefault();
    window.urp.alert('正在收集本页问卷数据……');
    var items = (0, _from2.default)(document.getElementById('jxpgtbody').getElementsByTagName('button')).filter(function (item) {
      return item.innerText === '评估';
    }).map(function (item) {
      return item.getAttribute('onClick');
    });
    if (!items.length) {
      window.urp.confirm('本页上的所有教师都已经评教过了，您可以换一页再使用。', function () {});
      return false;
    }
    this.list = items.map(function (item) {
      return _this.parseName(item);
    });
    this.evaluate(0);
  },
  changePromopt: function changePromopt(str) {
    this.$prompt.text(str);
  },
  parseName: function parseName(data) {
    data = data.replace(/evaluation\("|"\);return false;/ig, '').split('","');

    var _data = data,
        _data2 = (0, _slicedToArray3.default)(_data, 6),
        questionnaireCode = _data2[0],
        questionnaireName = _data2[1],
        evaluatedPeopleNumber = _data2[2],
        evaluatedPeople = _data2[3],
        evaluationContentNumber = _data2[4],
        evaluationContentContent = _data2[5];

    var result = { questionnaireCode: questionnaireCode, questionnaireName: questionnaireName, evaluatedPeopleNumber: evaluatedPeopleNumber, evaluatedPeople: evaluatedPeople, evaluationContentNumber: evaluationContentNumber, evaluationContentContent: evaluationContentContent };
    return result;
  },
  getComment: function getComment() {
    return encodeURI(this.comments[Math.floor(Math.random() * this.comments.length)]);
  },
  evaluate: function evaluate(index) {
    var _this2 = this;

    var origin = window.location.origin;
    if (index >= this.list.length) {
      this.changePromopt('\u672C\u9875\u4E0A\u7684\u8001\u5E08\u5DF2\u7ECF\u5168\u90E8\u8BC4\u4EF7\u5B8C\u6BD5\uFF01\u6B63\u5728\u5237\u65B0\u2026\u2026');
      window.location.href = origin + '/student/teachingEvaluation/evaluation/index';
      return;
    }
    var item = this.list[index];
    var evaluatedPeopleNumber = item.evaluatedPeopleNumber;
    var evaluatedPeople = item.evaluatedPeople;
    var evaluationContentNumber = item.evaluationContentNumber;
    var evaluationContentContent = item.evaluationContentContent;
    var questionnaireCode = item.questionnaireCode;
    var questionnaireName = item.questionnaireName;
    var tokenValue = void 0;

    this.changePromopt('\u6B63\u5728\u8BC4\u4EF7' + evaluationContentContent + '\u8BFE\u7A0B\u7684' + evaluatedPeople + '\u8001\u5E08\uFF08' + (index + 1) + '/' + this.list.length + '\uFF09');

    window.$.ajax({
      type: 'POST',
      url: '/student/teachingEvaluation/teachingEvaluation/evaluationPage',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': 1
      },
      data: encodeURI('evaluatedPeople=' + evaluatedPeople + '&evaluatedPeopleNumber=' + evaluatedPeopleNumber + '&questionnaireCode=' + questionnaireCode + '&questionnaireName=' + questionnaireName + '&evaluationContentNumber=' + evaluationContentNumber + '&evaluationContentContent=' + evaluationContentContent),
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader('X-Requested-With', {
          toString: function toString() {
            return '';
          }
        });
      },
      error: function error(xhr) {
        window.urp.alert('\u9519\u8BEF\u4EE3\u7801[' + xhr.readyState + '-' + xhr.status + ']:\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01');
      },
      success: function success(data) {
        tokenValue = data.match(/<input type="hidden" name="tokenValue" value="(.+)"\/>/i)[1];

        var begin = void 0;
        var end = void 0;
        switch (questionnaireName) {
          case '研究生助教评价':
            begin = 28;
            end = 33;
            break;
          case '学生评教（课堂教学）':
            begin = 36;
            end = 42;
            break;
          case '学生评教（实验教学）':
            begin = 82;
            end = 88;
            break;
          case '学生评教（实践教学）':
            begin = 89;
            end = 95;
            break;
          case '学生评教（体育教学）':
            begin = 96;
            end = 102;
            break;
          default:
            console.log('无效的问卷名称：' + questionnaireName);
            return;
        }

        var bodyStr = 'tokenValue=' + tokenValue + '&questionnaireCode=' + questionnaireCode + '&evaluationContentNumber=' + evaluationContentNumber + '&evaluatedPeopleNumber=' + evaluatedPeopleNumber;
        for (var i = begin; i <= end; i++) {
          var num = ('0000000000' + i).substr(-10);
          bodyStr += '&' + num + '=10_1';
        }
        bodyStr += '&zgpj=' + _this2.getComment();

        window.$.ajax({
          cache: true,
          type: 'POST',
          async: true,
          url: '/student/teachingEvaluation/teachingEvaluation/evaluation',
          data: bodyStr,
          error: function error(xhr) {
            window.urp.alert('\u9519\u8BEF\u4EE3\u7801[' + xhr.readyState + '-' + xhr.status + ']:\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01');
            _this2.changePromopt(evaluatedPeople + '\uFF08' + evaluationContentContent + '\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this2.list.length);
          },
          success: function success(data) {
            if (data.includes('/')) {
              console.log(data);
            } else if (data === 'success') {
              _this2.changePromopt(evaluatedPeople + '\uFF08' + evaluationContentContent + '\uFF09\u8BC4\u4EF7\u6210\u529F\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this2.list.length);
              setTimeout(function () {
                _this2.evaluate(++index);
              }, _this2.evaluationInterval);
            } else {
              window.urp.alert('保存失败');
              _this2.changePromopt(evaluatedPeople + '\uFF08' + evaluationContentContent + '\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this2.list.length);
            }
          }
        });
      }
    });
  }
};

module.exports = fastEvaluation;