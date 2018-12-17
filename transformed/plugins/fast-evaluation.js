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
  evaluationInterval: 1000 * 121,
  checkboxWrapperSelectors: {
    '研究生助教评价': '#yjs-checkbox-wrapper',
    '学生评教（课堂教学）': '#ktjx-checkbox-wrapper',
    '学生评教（实验教学）': '#syjx-checkbox-wrapper',
    '学生评教（实践教学）': '#sjjx-checkbox-wrapper',
    '学生评教（体育教学）': '#tyjx-checkbox-wrapper'
  },
  questionsNumberRange: {
    '研究生助教评价': {
      begin: 28,
      end: 33
    },
    '学生评教（课堂教学）': {
      begin: 36,
      end: 42
    },
    '学生评教（实验教学）': {
      begin: 82,
      end: 88
    },
    '学生评教（实践教学）': {
      begin: 89,
      end: 95
    },
    '学生评教（体育教学）': {
      begin: 96,
      end: 102
    }
  },
  templates: {
    btn: '<button class="btn btn-xs btn-round btn-light" id="fast_evaluation_btn" style="margin-left: 5px;">点此开始一键评教!</button>',
    prompt: '<span id="fast_evaluation_prompt" style="margin-left: 10px;"></span>',
    selectionModal: '\n      <div id="selection-modal">\n        <style>\n          #selection-modal {\n            padding: 10px 20px;\n          }\n\n          .selection-modal-introduction>p {\n            font-size: 14px;\n            margin-bottom: 10px;\n          }\n\n          .selection-modal-introduction>p:last-child {\n            margin-bottom: 0;\n          }\n\n          .checkbox-wrapper {\n            display: flex;\n            flex-wrap: wrap;\n            margin-bottom: 10px;\n          }\n\n          .checkbox-wrapper:last-child {\n            margin-bottom: 0;\n          }\n\n          #selection-checkbox-wrapper>.checkbox {\n            padding-bottom: 7px;\n          }\n\n        </style>\n        <form id="selection-form" class="form-horizontal" role="form">\n          <div class="row">\n            <div class="col-xs-12">\n              <div class="selection-modal-introduction">\n                <p>\u6240\u6709\u9009\u4E2D\u7684\u8001\u5E08\u90FD\u5C06\u88AB\u4E00\u952E\u6EE1\u5206\u597D\u8BC4\uFF0C\u4E3B\u89C2\u8BC4\u4EF7\u4F1A\u4ECE25\u6761\u8BED\u53E5\u5E93\u91CC\u968F\u673A\u62BD\u53D6\u3002</p>\n                <p>\u9ED8\u8BA4\u6240\u6709\u8001\u5E08\u90FD\u662F\u9009\u4E2D\u72B6\u6001\uFF0C\u60A8\u53EA\u9700\u8981\u53D6\u6D88\u52FE\u9009\u60A8\u60F3\u624B\u52A8\u8BC4\u4EF7\u7684\u8001\u5E08\u5373\u53EF\u3002</p>\n              </div>\n              <hr>\n              <h4 class="lighter blue">\u5B66\u751F\u8BC4\u6559\uFF08\u8BFE\u5802\u6559\u5B66\uFF09</h4>\n              <div id="ktjx-checkbox-wrapper" class="checkbox-wrapper"></div>\n              <h4 class="lighter blue">\u5B66\u751F\u8BC4\u6559\uFF08\u5B9E\u9A8C\u6559\u5B66\uFF09</h4>\n              <div id="syjx-checkbox-wrapper" class="checkbox-wrapper"></div>\n              <h4 class="lighter blue">\u5B66\u751F\u8BC4\u6559\uFF08\u5B9E\u8DF5\u6559\u5B66\uFF09</h4>\n              <div id="sjjx-checkbox-wrapper" class="checkbox-wrapper"></div>\n              <h4 class="lighter blue">\u5B66\u751F\u8BC4\u6559\uFF08\u4F53\u80B2\u6559\u5B66\uFF09</h4>\n              <div id="tyjx-checkbox-wrapper" class="checkbox-wrapper"></div>\n              <h4 class="lighter blue">\u7814\u7A76\u751F\u52A9\u6559\u8BC4\u4EF7</h4>\n              <div id="yjs-checkbox-wrapper" class="checkbox-wrapper"></div>\n            </div>\n          </div>\n        </form>\n      </div>\n    '
  },
  comments: ['老师是很好的，平时课堂上讲课风趣又不失严谨，课下也对同学们的问题有求必应，帮助了我很多。', '老师挺不错的，对问题分析的透彻，讲课能切中要害，很喜欢老师的讲课风格。', '老师讲课很用心，给我们划定了学习目标，班里同学都学得不错，给分也好。', '老师经验很丰富，平时要求适中，注重与我们沟通交流，把知识真正的传递给了我们。', '老师讲的内容紧追时代步伐，不过时，讲课风格详实生动，大家都很喜欢。', '老师的讲课节奏安排的不错，最后大家对知识掌握的都比较好，复习也比较充分，考试情况不错。', '该课程教学目标目标清楚明白、具体，易激发兴趣，引导自主探究、合作交流、练习设计体现知识的综合运用，形式多样，分量与难度适中，学法指导得当，是一门很不错的课', '该课程教学重难点把握准确，教学内容主次分明，抓住关键；结构合理，衔接自然紧凑，从情感、态度与价值观三个维度出发，符合学段教学要求、教材特点与我们实际，是一门成熟的课', '该课程能以旧引新，寻找新旧知识的关联和生长点，注重知识的发生发展过程，能找到教材特点及本课的疑点，并恰当处理，在课堂上设疑问难，引导点拨，是一门很有个性特点的课', '本门课程各种学习活动设计具体、充分注意我们学习习惯的培养，因材施教，调动我们自主学习的积极性，遵循常规但不拘泥，根据我们的差异和特点，从具体到抽象对教材进行处理，是一门很成功的课', '该课程教学过程设计完整有序，既体现知识结构，知识点，又注意突出我们活动设计，体现教学民主、培养我们良好的学习品质，课堂结构完整，密度恰当。', '该课程教学程序设计巧妙，在教学过程中能运用上新颖独特教学方法、言简意胲，引导点拨我们，我们动口、动手、动脑，主动参与教学过程，使我们的作业完善而有美感，让大家学到了很多东西。', '该课程很有艺术，教学安排清晰有序，科学规范。在教材处理上从具体到抽象，化难为易，以简驾繁突破难点。各环节有详细的练习，科学合理有效地培养我们自主，探究，创新能力的发展。', '本门课程非常成功，设计突出了以我们为本的理念、全面培养我们素养、自主合作探究学习的理念。老师配以亲切活泼的教态，能较为恰当地运用丰富的表扬手段，让我们在学习中感受到成功的快乐。', '该课程教学重难点把握准确，教学内容主次分明，抓住关键；结构合理，衔接自然紧凑，组织严密，采用有效的教学手段，引导自主探究、合作交流，成功地教我们“会学”。', '该课程结构层次清楚、运用恰当的教学方法和手段启迪我们思维、解决重点、突出难点。精心设计练习，并在整个教学过程中注重我们能力的培养，是一门优秀的课。', '该课程很有创意，对教材把握透彻、挖掘深入、处理新颖，针对我们基础和我们发展性目标，设计各种教学活动，引导我们自主学习，有条理地将旧知识综合进行运用。', '老师在教学过程中，不仅重视知识要求，也注重思想教育，在课堂教学中孜孜不倦的帮助我们学习，做到对我们动之以情，爱之以诚，使我们的学习取得完美的成果。', '该课程教学设计非常巧妙，结合教材特点，我们、老师实际，一法为主，多法配合，优化组合。练习提供了我们喜闻乐见的资料，课堂练习紧扣重点，并注意在“趣”字上下功夫。', '该课程教学环节清晰、完整具体，能活化教学内容，使之生活化，课堂教学的开放性、师生关系的民主性、教学模式的多样性，培养我们良好的学习品质，体显出该老师教学能力非常强。', '该课程很有特色，创设情景，让我们在学习中、体验实践、感悟，收集、整理、筛选资料，突出体现了以人为本、以我们发展为本的教育理念。是一门很成功的课。', '本门课程很有艺术，在教材内容的基础上作了适当的必要的扩展，精心安排我们自主学习、质疑、操作实践等活动以启发式、讨论式为主。我们在完成任务的过和程中学会合作。', '该课程重点突出，目标全面、准确、具体，整体现知识与能力、方法与过程、情感态度与价值观三个维度，布局合理，设计各种教学活动，引导我们自主学习，有条理地将旧知识综合进行运用。', '该课程结构清晰、运用恰当的教学方法和手段启迪我们思维、解决重点、突出难点。根据班级实际情况，精心设计练习，并在整个教学过程中注重因材施教，是一门优秀的课。', '该课程十分有创意，教学目的明确，方法得当、语言清晰，具有感染力，习题典型，题量适当，激发我们兴趣，引导自主探究、合作交流完成任务，整个课堂效率非常高。', '本门课程对教学内容把握透彻、挖掘深入、处理新颖，在课堂教学中，对重难点言简意赅，分析透彻。对练习以思维训练为核心，落实双基，是一门非常成功的课'],
  init: function init() {
    this.$btn = window.$(this.templates.btn);
    this.$prompt = window.$(this.templates.prompt);

    window.$('#close > h4').append(this.$btn, this.$prompt);

    this.$btn.click(this.onClickBtn.bind(this));
  },
  onClickBtn: function onClickBtn(e) {
    e.preventDefault();
    var hasUnevaluatedQuestionnaire = this.collectData();
    if (hasUnevaluatedQuestionnaire) {
      this.showSelectionModal();
    } else {
      window.urp.confirm('本页上的所有教师都已经评教过了，您可以换一页再使用。', function () {});
    }
  },
  showSelectionModal: function showSelectionModal() {
    var _this = this;

    window.layer.open({
      type: 1,
      area: '90%',
      title: '请选择需要「一键好评」的老师',
      shadeClose: true,
      offset: '50px',
      btn: ['开始一键评教!'],
      content: this.templates.selectionModal,
      success: function success() {
        _this.list.forEach(function (_ref, index) {
          var name = _ref.evaluatedPeople,
              curriculum = _ref.evaluationContentContent,
              type = _ref.questionnaireName;

          if (_this.checkboxWrapperSelectors[type]) {
            var selector = _this.checkboxWrapperSelectors[type];
            window.$(selector).append('\n              <div class="checkbox">\n                <label>\n                  <input name="selection-checkbox-' + index + '" type="checkbox" class="ace ace-checkbox-2 selection-checkbox" checked>\n                  <span class="lbl">' + name + '-' + curriculum + '</span>\n                </label>\n              </div>\n            ');
          } else {
            console.log('无效的问卷名称：' + type);
          }
        });
        for (var key in _this.checkboxWrapperSelectors) {
          var selector = _this.checkboxWrapperSelectors[key];
          if (!window.$(selector).children().length) {
            window.$(selector).prev().remove();
            window.$(selector).remove();
          }
        }
      },
      yes: function yes(layerIndex) {
        _this.list = window.$('#selection-form').serializeArray().map(function (v) {
          return _this.list[Number(v.name.replace('selection-checkbox-', ''))];
        });
        window.layer.close(layerIndex);
        if (_this.list.length) {
          _this.$btn.remove();
          _this.evaluate(0);
        }
      }
    });
  },
  collectData: function collectData() {
    var _this2 = this;

    var collectingMsgIndex = window.layer.msg('正在收集本页问卷数据……');
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
      return false;
    }
    this.list = items.map(function (item) {
      return _this2.parseName(item);
    });
    window.layer.close(collectingMsgIndex);
    return true;
  },
  changePrompt: function changePrompt(str) {
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
    return encodeURIComponent(this.comments[Math.floor(Math.random() * this.comments.length)]);
  },
  evaluate: function evaluate(index) {
    var _this3 = this;

    var origin = window.location.origin;
    if (index >= this.list.length) {
      this.changePrompt('\u672C\u9875\u4E0A\u7684\u8001\u5E08\u5DF2\u7ECF\u5168\u90E8\u8BC4\u4EF7\u5B8C\u6BD5\uFF01\u6B63\u5728\u5237\u65B0\u2026\u2026');
      window.location.href = origin + '/student/teachingEvaluation/evaluation/index';
      return;
    }
    var _list$index = this.list[index],
        evaluatedPeopleNumber = _list$index.evaluatedPeopleNumber,
        evaluatedPeople = _list$index.evaluatedPeople,
        evaluationContentNumber = _list$index.evaluationContentNumber,
        evaluationContentContent = _list$index.evaluationContentContent,
        questionnaireCode = _list$index.questionnaireCode,
        questionnaireName = _list$index.questionnaireName;

    var tokenValue = void 0;

    this.changePrompt('\u6B63\u5728\u8BC4\u4EF7' + evaluationContentContent + '\u8BFE\u7A0B\u7684' + evaluatedPeople + '\u8001\u5E08\uFF08' + (index + 1) + '/' + this.list.length + '\uFF09');

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
        tokenValue = data.match(/<input.+tokenValue.+value="(.+)"\/>/i)[1];

        if (_this3.questionsNumberRange[questionnaireName]) {
          var _questionsNumberRange = _this3.questionsNumberRange[questionnaireName],
              begin = _questionsNumberRange.begin,
              end = _questionsNumberRange.end;


          var bodyStr = 'tokenValue=' + tokenValue + '&questionnaireCode=' + questionnaireCode + '&evaluationContentNumber=' + evaluationContentNumber + '&evaluatedPeopleNumber=' + evaluatedPeopleNumber;
          for (var i = begin; i <= end; i++) {
            var num = ('0000000000' + i).substr(-10);
            bodyStr += '&' + num + '=10_1';
          }
          bodyStr += '&zgpj=' + _this3.getComment();

          window.$.ajax({
            cache: true,
            type: 'POST',
            async: true,
            url: '/student/teachingEvaluation/teachingEvaluation/evaluation',
            data: bodyStr,
            error: function error(xhr) {
              window.urp.alert('\u9519\u8BEF\u4EE3\u7801[' + xhr.readyState + '-' + xhr.status + ']:\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01');
              _this3.changePrompt(evaluatedPeople + '\uFF08' + evaluationContentContent + '\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this3.list.length);
            },
            success: function success(data) {
              if (data['result'].indexOf('/') !== -1) {
                console.log(data);
              } else if (data['result'] === 'success') {
                _this3.changePrompt(evaluatedPeople + '\uFF08' + evaluationContentContent + '\uFF09\u8BC4\u4EF7\u6210\u529F\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this3.list.length + '\uFF0C\u5C06\u57282\u5206\u949F\u540E\u81EA\u52A8\u5F00\u59CB\u8BC4\u4EF7\u4E0B\u4E00\u4F4D\u8001\u5E08\uFF0C\u8BC4\u6559\u8FC7\u7A0B\u4E2D\u60A8\u53EF\u4EE5\u53BB\u505A\u4E9B\u5176\u4ED6\u4E8B\u60C5\uFF0C\u53EA\u8981\u4E0D\u5173\u95ED\u6B64\u7F51\u9875\u5C31\u53EF\u4EE5~');
                setTimeout(function () {
                  _this3.evaluate(++index);
                }, _this3.evaluationInterval);
              } else if (data['result'] === 'notEnoughTime') {
                tokenValue = data['token'];
                _this3.changePrompt(evaluatedPeople + '\uFF08' + evaluationContentContent + ' \u8DDD\u79BB\u4E0A\u4E00\u6B21\u63D0\u4EA4\u672A\u52302\u5206\u949F QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this3.list.length);
                _this3.evaluate(index);
              } else {
                window.urp.alert('保存失败');
                _this3.changePrompt(evaluatedPeople + '\uFF08' + evaluationContentContent + '\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this3.list.length);
              }
            }
          });
        } else {
          console.log('无效的问卷名称：' + questionnaireName);
        }
      }
    });
  }
};

module.exports = fastEvaluation;