'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 一键评教插件
var fastEvaluation = {
  name: 'fast-evaluation',
  pathname: '/student/teachingEvaluation/evaluation/index',
  $btn: undefined,
  $prompt: undefined,
  list: [],
  evaluationInterval: 500,
  comments: ['老师是很好的，平时课堂上讲课风趣又不失严谨，课下也对同学们的问题有求必应，帮助了我很多。', '老师挺不错的，对问题分析的透彻，讲课能切中要害，很喜欢老师的讲课风格。', '老师讲课很用心，给我们划定了学习目标，班里同学都学得不错，给分也好。', '老师经验很丰富，平时要求适中，注重与我们沟通交流，把知识真正的传递给了我们。', '老师讲的内容紧追时代步伐，不过时，讲课风格详实生动，大家都很喜欢。', '老师的讲课节奏安排的不错，最后大家对知识掌握的都比较好，复习也比较充分，考试情况不错。', '该节课教学目标目标清楚明白、具体，易激发兴趣，引导自主探究、合作交流、练习设计体现知识的综合运用，形式多样，分量与难度适中，学法指导得当，是一节很不错的课', '该节课教学重难点把握准确，教学内容主次分明，抓住关键；结构合理，衔接自然紧凑，情感态度与价值观三个维度，符合学段教学要求、教材特点与学生实际，是一节成熟的课', '该节课能以旧引新，寻找新旧知识的关联和生长点，注重知识的发生发展过程，能找到教材特点及本课的疑点，并恰当处理，在课堂上设疑问难，引导点拨，是一节很有个性特点的课', '本节课各种学习活动设计具体、充分注意学生学习习惯的培养，因材施教，调动学生自主学习的积极性，遵循常规但不拘泥，根据学生的差异和特点，从具体到抽象对教材进行处理，是一节很成功的课', '该节课教学过程设计完整有序，既体现知识结构，知识点，又注意突出学生活动设计，体现教学民主、培养学生良好的学习品质，课堂结构完整，密度恰当。', '该节课教学程序设计巧妙，在教学过程中能运用上新颖独特教学方法、言简意胲，引导点拨学生，学生动口、动手、动脑，主动参与教学过程，使学生做出的作品图文并貌，有美感，整节课很完美。', '该节课很有艺术，教学安排清晰有序，科学规范。在教材处理上从具体到抽象，化难为易，以简驾繁突破难点。各环节有详细的练习，科学合理有效地培养学生自主，探究，创新能力的发展。', '本节课非常成功，设计突出了以学生为本的理念、全面培养学生素养、自主合作探究学习的理念。教师配以亲切活泼的教态，能较为恰当地运用丰富的表扬手段，让学生在学习中感受到成功的快乐。', '该节课教学重难点把握准确，教学内容主次分明，抓住关键；结构合理，衔接自然紧凑，组织严密，采用有效的教学手段，引导自主探究、合作交流，成功地教学生“会学”。', '该节课堂结构层次清楚、运用恰当的教学方法和手段启迪学生思维、解决重点、突出难点。精心设计练习，并在整个教学过程中注重学生能力的培养，是一节优秀的课。', '该节课很有创意，对教材把握透彻、挖掘深入、处理新颖，针对学生基础和学生发展性目标，设计各种教学活动，引导学生自主学习，有条理地将旧知识综合进行运用。', '本节课教学目标包括思想教育要求和知识要求两部分，在课堂教学中注重后进生的补辅，尖子生的拔尖工作，做到对学生动之以情，爱之以诚，使网页比赛取得完美的成果。', '该节课教学设计非常巧妙，结合教材特点，学生、教师实际，一法为主，多法配合，优化组合。练习提供了学生喜闻乐见的资料，课堂练习紧扣重点，并注意在“趣”字上下功夫。', '该节课教学环节清晰、完整具体，能活化教学内容，使之生活化，课堂教学的开放性、师生关系的民主性、教学模式的多样性，培养学生良好的学习品质，体显出该教师教学能力非常强。', '该节课很有特色，创设情景，通过建站，让学生亲自体验、实践、感悟，收集、整理、筛选资料，突出体现了以人为本、以学生发展为本的教育理念。是一节很成功的课。', '本节课很有艺术，在教材内容的基础上作了适当的必要的扩展，精心安排学生自主学习、质疑、操作实践等活动以启发式、讨论式为主。学生在完成任务的过和程中学会合作。', '该节课重点突出，目标全面、准确、具体，整体现知识与能力、方法与过程、情感态度与价值观三个维度，布局合理，设计各种教学活动，引导学生自主学习，有条理地将旧知识综合进行运用。', '该节课堂结构清晰、运用恰当的教学方法和手段启迪学生思维、解决重点、突出难点。根据班级实际情况，精心设计练习，并在整个教学过程中注重因材施教，是一节优秀的课。', '该节课十分有创意，教学目的明确，方法得当、语言清晰，具有感染力，习题典型，题量适当，激发学生兴趣，引导自主探究、合作交流完成任务，整个课堂效率非常高。', '本节课对教学内容把握透彻、挖掘深入、处理新颖，在课堂教学中，对重难点言简意赅，分析透彻。对练习以思维训练为核心，落实双基，是一节非常成功的课'],
  init: function init() {
    this.$btn = window.$('<button class="btn btn-xs btn-round btn-light" id="fast_evaluation_btn" style="margin-left: 5px;">点此给本页所有老师好评！</button>');
    this.$prompt = window.$('<span id="fast_evaluation_prompt" style="margin-left: 10px;"></span>');

    window.$('#close > h4').append(this.$btn, this.$prompt);

    this.$btn.click(this.onClickBtn.bind(this));
  },
  onClickBtn: function onClickBtn(e) {
    var _this = this;

    e.preventDefault();
    window.urp.alert('正在收集本页问卷数据……');
    var items = (0, _from2.default)(document.getElementById('jxpgtbody').getElementsByTagName('button')).filter(function (item) {
      return item.innerText === '评估';
    })
    // 2018-8-31 20:21:20
    // 今天发现 urp 代码有修改，把 evaluationContentContent 从 onClick 函数调用里删除了。
    // 临时这样补上，尽量不做大修改，防止出错。
    .map(function (item) {
      return item.getAttribute('onClick').replace(/evaluationResult\("|evaluation\("|"\);return false;/ig, '') + ('","' + item.parentElement.parentElement.children[3].innerText);
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
    data = data.split('","');

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