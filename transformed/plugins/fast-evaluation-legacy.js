'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 一键评教插件(旧版教务系统)
var fastEvaluationLegacy = {
  list: [],
  btn: void 0,
  span: void 0,
  evaluationInterval: 500,
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Cache-Control': 'max-age=0',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Upgrade-Insecure-Requests': '1'
  },
  task: function task() {
    if (this.mainFrame.location.pathname.indexOf('jxpgXsAction') !== -1) {
      if (this.mainFrame.document.getElementsByTagName('body').length) {
        if (this.isListPage() && !this.mainFrame.evaluationHacked) {
          this.btn = document.createElement('button');
          var node = document.createTextNode('给本页所有老师好评！');
          this.span = document.createElement('span');
          var td = document.createElement('td');
          this.btn.appendChild(node);
          td.appendChild(this.btn);
          td.appendChild(this.span);
          var tblHead = this.mainFrame.document.getElementById('tblHead');
          tblHead.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].appendChild(td);
          this.mainFrame.evaluationHacked = true;
          this.btn.onclick = this.onClickBtn.bind(this);
        }
      }
    }
  },
  onClickBtn: function onClickBtn(e) {
    var _this = this;

    e.preventDefault();
    this.changePrompt('正在收集本页问卷数据……');
    var names = (0, _from2.default)(this.mainFrame.document.getElementsByTagName('img')).filter(function (item) {
      return item.getAttribute('title') === '评估';
    }).map(function (item) {
      return item.name;
    }).filter(function (item) {
      return item && item !== 'goto';
    });
    if (!names.length) {
      window.alert('本页上的所有教师都已经评教过了，您可以换一页再使用。');
      this.changePrompt('本页上的所有教师都已经评教过了，您可以换一页再使用。');
      return;
    }
    this.list = names.map(function (item) {
      return _this.parseName(item);
    });
    this.evaluate(0);
  },
  parseName: function parseName(data) {
    data = data.split('#@');

    var _data = data,
        _data2 = (0, _slicedToArray3.default)(_data, 6),
        wjbm = _data2[0],
        bpr = _data2[1],
        bprm = _data2[2],
        wjmc = _data2[3],
        pgnrm = _data2[4],
        pgnr = _data2[5];

    var oper = void 0;
    switch (wjmc) {
      case '研究生助教评价':
      case '学生评教（体育教学）':
      case '学生评教（课堂教学）':
      case '学生评教（实践教学）':
      case '学生评教（实验教学）':
        oper = 'wjShow';
        break;
      default:
        console.log('无效的问卷名称：' + wjmc);
        return;
    }
    var result = { wjbm: wjbm, bpr: bpr, bprm: bprm, wjmc: wjmc, pgnrm: pgnrm, pgnr: pgnr, oper: oper };
    return result;
  },
  getComment: function getComment() {
    var comments = ['%C0%CF%CA%A6%CA%C7%BA%DC%BA%C3%B5%C4%A3%AC%C6%BD%CA%B1%BF%CE%CC%C3%C9%CF%BD%B2%BF%CE%B7%E7%C8%A4%D3%D6%B2%BB%CA%A7%D1%CF%BD%F7%A3%AC%BF%CE%CF%C2%D2%B2%B6%D4%CD%AC%D1%A7%C3%C7%B5%C4%CE%CA%CC%E2%D3%D0%C7%F3%B1%D8%D3%A6%A3%AC%B0%EF%D6%FA%C1%CB%CE%D2%BA%DC%B6%E0%A1%A3', '%C0%CF%CA%A6%CD%A6%B2%BB%B4%ED%B5%C4%A3%AC%B6%D4%CE%CA%CC%E2%B7%D6%CE%F6%B5%C4%CD%B8%B3%B9%A3%AC%BD%B2%BF%CE%C4%DC%C7%D0%D6%D0%D2%AA%BA%A6%A3%AC%BA%DC%CF%B2%BB%B6%C0%CF%CA%A6%B5%C4%BD%B2%BF%CE%B7%E7%B8%F1%A1%A3', '%C0%CF%CA%A6%BD%B2%BF%CE%BA%DC%D3%C3%D0%C4%A3%AC%B8%F8%CE%D2%C3%C7%BB%AE%B6%A8%C1%CB%D1%A7%CF%B0%C4%BF%B1%EA%A3%AC%B0%E0%C0%EF%CD%AC%D1%A7%B6%BC%D1%A7%B5%C3%B2%BB%B4%ED%A3%AC%B8%F8%B7%D6%D2%B2%BA%C3%A1%A3', '%C0%CF%CA%A6%BE%AD%D1%E9%BA%DC%B7%E1%B8%BB%A3%AC%C6%BD%CA%B1%D2%AA%C7%F3%CA%CA%D6%D0%A3%AC%D7%A2%D6%D8%D3%EB%CE%D2%C3%C7%B9%B5%CD%A8%BD%BB%C1%F7%A3%AC%B0%D1%D6%AA%CA%B6%D5%E6%D5%FD%B5%C4%B4%AB%B5%DD%B8%F8%C1%CB%CE%D2%C3%C7%A1%A3', '%C0%CF%CA%A6%BD%B2%B5%C4%C4%DA%C8%DD%BD%F4%D7%B7%CA%B1%B4%FA%B2%BD%B7%A5%A3%AC%B2%BB%B9%FD%CA%B1%A3%AC%BD%B2%BF%CE%B7%E7%B8%F1%CF%EA%CA%B5%C9%FA%B6%AF%A3%AC%B4%F3%BC%D2%B6%BC%BA%DC%CF%B2%BB%B6%A1%A3', '%C0%CF%CA%A6%B5%C4%BD%B2%BF%CE%BD%DA%D7%E0%B0%B2%C5%C5%B5%C4%B2%BB%B4%ED%A3%AC%D7%EE%BA%F3%B4%F3%BC%D2%B6%D4%D6%AA%CA%B6%D5%C6%CE%D5%B5%C4%B6%BC%B1%C8%BD%CF%BA%C3%A3%AC%B8%B4%CF%B0%D2%B2%B1%C8%BD%CF%B3%E4%B7%D6%A3%AC%BF%BC%CA%D4%C7%E9%BF%F6%B2%BB%B4%ED%A1%A3'];
    return comments[Math.floor(Math.random() * comments.length)];
  },
  changePrompt: function changePrompt(str) {
    this.span.innerText = str;
  },
  isListPage: function isListPage() {
    if (this.mainFrame.location.pathname.indexOf('jxpgXsAction') === -1) {
      return false;
    }
    var text = '';
    if (this.mainFrame.document.getElementsByTagName('body').length) {
      text = this.mainFrame.document.getElementsByTagName('body')[0].innerHTML;
    }
    if (text.indexOf('每页显示的记录数') !== -1) {
      return true;
    }
    return false;
  },
  evaluate: function evaluate(index) {
    var _this2 = this;

    var origin = window.location.origin;
    if (index >= this.list.length) {
      var page = '1';
      if (this.mainFrame.location.search.indexOf('page=') !== -1) {
        page = this.mainFrame.location.search.match(/page=(\d+)/)[1];
      }
      this.changePrompt('\u7B2C' + page + '\u9875\u4E0A\u7684\u8001\u5E08\u5DF2\u7ECF\u5168\u90E8\u8BC4\u4EF7\u5B8C\u6BD5\uFF01\u6B63\u5728\u5237\u65B0\u2026\u2026');
      this.mainFrame.location.href = origin + '/jxpgXsAction.do?oper=listWj&page=' + page;
      return;
    }
    var item = this.list[index];
    var teacher = item.bpr;
    var teacherName = item.bprm;
    var subject = item.pgnr;
    var subjectName = item.pgnrm;
    var questionnaire = item.wjbm;
    var questionnaireName = item.wjmc;
    var oper = item.oper;
    this.changePrompt('\u6B63\u5728\u8BC4\u4EF7' + subjectName + '\u8BFE\u7A0B\u7684' + teacherName + '\u8001\u5E08\uFF08' + (index + 1) + '/' + this.list.length + '\uFF09');
    window.$.ajax({
      type: 'POST',
      url: origin + '/jxpgXsAction.do',
      headers: this.headers,
      data: encodeURI('wjbm=' + questionnaire + '&bpr=' + teacher + '&pgnr=' + subject + '&oper=' + oper + '&pageSize=20&page=1&currentPage=1&pageNo='),
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader('X-Requested-With', {
          toString: function toString() {
            return '';
          }
        });
      },
      error: function error(xhr) {
        window.alert('\u9519\u8BEF\u4EE3\u7801[' + xhr.readyState + '-' + xhr.status + ']:\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01');
      },
      success: function success() {
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
        var bodyStr = 'wjbm=' + questionnaire + '&bpr=' + teacher + '&pgnr=' + subject;
        for (var i = begin; i <= end; i++) {
          var num = ('0000000000' + i).substr(-10);
          bodyStr += '&' + num + '=10_1';
        }
        bodyStr += '&zgpj=' + _this2.getComment();
        window.$.ajax({
          type: 'POST',
          url: origin + '/jxpgXsAction.do?oper=wjpg',
          headers: _this2.headers,
          data: bodyStr,
          error: function error(xhr) {
            window.urp.alert('\u9519\u8BEF\u4EE3\u7801[' + xhr.readyState + '-' + xhr.status + ']:\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01');
            _this2.changePrompt(teacherName + '\uFF08' + subjectName + '\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this2.list.length);
          },
          success: function success(res) {
            if (res.indexOf('location.href=') !== -1) {
              _this2.changePrompt(teacherName + '\uFF08' + subjectName + '\uFF09\u8BC4\u4EF7\u6210\u529F\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this2.list.length);
            } else if (res.indexOf('history.back(-1);') !== -1) {
              _this2.changePrompt(teacherName + '\uFF08' + subjectName + '\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this2.list.length);
            }
            setTimeout(function () {
              _this2.evaluate(++index);
            }, _this2.evaluationInterval);
          }
        });
      }
    });
  }
};

module.exports = fastEvaluationLegacy;