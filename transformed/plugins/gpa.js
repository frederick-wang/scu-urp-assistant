'use strict';

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 绩点计算插件
var fs = require('fs');

var templates = {
  indexWidget: '\n    <div class="col-sm-12 widget-container-col">\n      <div class="widget-box">\n        <div class="widget-header">\n          <h5 class="widget-title">\n            \u6211\u7684\u6210\u7EE9\n            <span class="badge badge-primary" style="padding-top:3px;position:relative;top:-3px;">SCU URP \u52A9\u624B</span>\n          </h5>\n          <div class="widget-toolbar">\n            <div class="widget-menu">\n                <a id="gpa-toolbar-detail" data-action="settings" data-toggle="dropdown">\n                    <i class="ace-icon fa fa-bars"></i>\n                </a>\n                <a id="gpa-toolbar-reset" data-action="reload"">\n                    <i class="ace-icon fa fa-refresh"></i>\n                </a>\n            </div>\n          </div>\n        </div>\n        <div class="widget-body">\n          <div class="widget-main">\n            <div class="row"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ',
  totalTranscript: function totalTranscript(_ref) {
    var allCoursesGPA = _ref.allCoursesGPA,
        allCoursesScore = _ref.allCoursesScore,
        compulsoryCoursesGPA = _ref.compulsoryCoursesGPA,
        compulsoryCoursesScore = _ref.compulsoryCoursesScore;

    return '\n    <div class="gpa-tt row" style="margin-bottom: 20px;">\n      <div class="col-sm-12">\n        <h4 class="header smaller lighter grey" style="margin-top: 0;">\n          <i class="menu-icon fa fa-calendar"></i> \u5168\u90E8\u6210\u7EE9\n          <button class="btn btn-white btn-minier gpa-tt-cancel-btn">\n            <i class="ace-icon fa fa-times red2"></i>\n            \u53D6\u6D88\u9009\u4E2D\u6240\u6709\u8BFE\u7A0B\n          </button>\n        </h4>\n        <span class="label label-success">\n          \u5FC5\u4FEE\u5E73\u5747\u5206\uFF1A' + compulsoryCoursesScore + '\n        </span>\n        <span class="label label-success">\n          \u5FC5\u4FEE\u7EE9\u70B9\uFF1A' + compulsoryCoursesGPA + '\n        </span>\n        <span class="label label-purple">\n          \u5168\u90E8\u5E73\u5747\u5206\uFF1A' + allCoursesScore + '\n        </span>\n        <span class="label label-purple">\n          \u5168\u90E8\u7EE9\u70B9\uFF1A' + allCoursesGPA + '\n        </span>\n        <span class="label label-pink gpa-tt-tag-selected-score">\n          \u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A0\n        </span>\n        <span class="label label-pink gpa-tt-tag-selected-gpa">\n          \u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A0\n        </span>\n      </div>\n    </div>\n  ';
  },
  semesterTranscriptHeader: function semesterTranscriptHeader(semester) {
    return '\n    <h4 class="header smaller lighter grey">\n      <i class="menu-icon fa fa-calendar"></i> ' + semester + '\n      <button class="btn btn-white btn-minier gpa-st-cancel-btn" data-semester="' + semester + '">\n        <i class="ace-icon fa fa-times red2"></i>\n        \u53D6\u6D88\u9009\u4E2D\u672C\u5B66\u671F\u8BFE\u7A0B\n      </button>\n    </h4>\n  ';
  },
  semesterTranscriptLabels: function semesterTranscriptLabels(semester, _ref2) {
    var allCoursesGPA = _ref2.allCoursesGPA,
        allCoursesScore = _ref2.allCoursesScore,
        compulsoryCoursesGPA = _ref2.compulsoryCoursesGPA,
        compulsoryCoursesScore = _ref2.compulsoryCoursesScore;

    return '\n    <p>\n      <span class="label label-success">\n        \u5FC5\u4FEE\u5E73\u5747\u5206\uFF1A' + compulsoryCoursesScore + '\n      </span>\n      <span class="label label-success">\n        \u5FC5\u4FEE\u7EE9\u70B9\uFF1A' + compulsoryCoursesGPA + '\n      </span>\n      <span class="label label-purple">\n        \u5168\u90E8\u5E73\u5747\u5206\uFF1A' + allCoursesScore + '\n      </span>\n      <span class="label label-purple">\n        \u5168\u90E8\u7EE9\u70B9\uFF1A' + allCoursesGPA + '\n      </span>\n    </p>\n    <p>\n      <span class="label label-pink gpa-st-tag-selected-score" data-semester="' + semester + '">\n      \u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A0\n      </span>\n      <span class="label label-pink gpa-st-tag-selected-gpa" data-semester="' + semester + '">\n        \u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A0\n      </span>\n    </p>\n  ';
  },
  semesterTranscriptContent: function semesterTranscriptContent(semester, courses) {
    return '\n    <table class="gpa-st-table table table-striped table-bordered table-hover">\n      <thead>\n        <tr>\n          <th>\u8BFE\u7A0B\u540D</th>\n          <th>\u5206\u6570</th>\n          <th>\u7EE9\u70B9</th>\n          <th>\u5B66\u5206</th>\n          <th>\u5C5E\u6027</th>\n        </tr>\n      </thead>\n      <tbody>\n      ' + courses.map(function (v) {
      return '\n        <tr\n          class="gpa-st-item"\n          data-semester="' + semester + '"\n          data-name="' + v.name + '"\n          data-score="' + v.score + '"\n          data-gpa="' + v.gpa + '"\n          data-credit="' + v.credit + '"\n          data-attribute="' + v.attribute + '"\n        >\n          <td>' + v.name + '</td>\n          <td>' + v.score + '</td>\n          <td>' + v.gpa + '</td>\n          <td>' + v.credit + '</td>\n          <td>' + v.attribute + '</td>\n        </tr>\n      ';
    }).join('') + '\n      </tbody>\n    </table>\n  ';
  },
  semesterTranscriptWrapper: function semesterTranscriptWrapper(header, labels, content) {
    return '<div class="gpa-st col-sm-6">' + (header + labels + content) + '</div>';
  }
};

var gpa = {
  name: 'gpa',
  pathname: ['/', '/index.jsp'],
  style: fs.readFileSync('src/plugins/gpa.css', 'utf8'),
  $indexWidget: null,
  $indexWidgetMain: null,
  $indexWidgetMainRow: null,
  $toolbarDetail: null,
  $toolbarReset: null,
  historicalList: null,
  init: function init() {
    var _this = this;

    this.initDOM();
    window.$.get('/student/integratedQuery/scoreQuery/allPassingScores/callback').then(function (_ref3) {
      var lnList = _ref3.lnList;

      // lnList -> 历年数据
      _this.historicalList = convertHistoricalList(lnList);
      _this.renderSemesterTranscript();
      _this.renderTotalTranscript();
      _this.initEvent();
    });
  },
  initDOM: function initDOM() {
    this.$indexWidget = window.$(templates.indexWidget);
    window.$('.page-content').children('.row').append(this.$indexWidget);
    this.$indexWidgetMain = this.$indexWidget.find('.widget-main');
    this.$indexWidgetMainRow = this.$indexWidget.find('.widget-main .row');
    this.$toolbarDetail = window.$('#gpa-toolbar-detail');
    this.$toolbarReset = window.$('#gpa-toolbar-reset');
  },
  initEvent: function initEvent() {
    var _this2 = this;

    var that = this;

    window.$('.gpa-st-item').click(function () {
      that.toggleTranscriptItemStatus(this);
      that.renderTagSelected();
    });

    this.$toolbarDetail.click(function () {
      window.toSelect(document.getElementById('1379870'));
      window.location = '/student/integratedQuery/scoreQuery/allPassingScores/index';
    });

    this.$toolbarReset.click(function () {
      _this2.reset();
    });

    window.$('.gpa-st-cancel-btn').click(function () {
      var semester = this.dataset.semester;
      that.historicalList.filter(function (v) {
        return v.semester === semester;
      })[0].courses.forEach(function (item) {
        item.selected = false;
      });
      window.$('.gpa-st-item').each(function () {
        if (this.dataset.semester === semester) {
          window.$(this).removeClass('selected');
        }
      });
      that.renderTagSelected();
    });

    window.$('.gpa-tt-cancel-btn').click(function () {
      that.historicalList.forEach(function (list) {
        return list.courses.forEach(function (item) {
          item.selected = false;
        });
      });
      window.$('.gpa-st-item').each(function () {
        window.$(this).removeClass('selected');
      });
      that.renderTagSelected();
    });
  },
  renderTagSelected: function renderTagSelected() {
    this.historicalList.forEach(function (_ref4) {
      var semester = _ref4.semester,
          courses = _ref4.courses;

      var selectedCourses = courses.filter(function (v) {
        return v.selected;
      });
      var getSemester$Element = function getSemester$Element(className) {
        return window.$((0, _from2.default)(document.getElementsByClassName(className)).filter(function (v) {
          return v.dataset.semester === semester;
        })[0]);
      };
      var $scoreTag = getSemester$Element('gpa-st-tag-selected-score');
      var $gpaTag = getSemester$Element('gpa-st-tag-selected-gpa');
      var $cancelBtn = getSemester$Element('gpa-st-cancel-btn');
      if (selectedCourses.length) {
        $scoreTag.show();
        $scoreTag.text('\u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A' + getAllCoursesScore(selectedCourses));
        $gpaTag.show();
        $gpaTag.text('\u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A' + getAllCoursesGPA(selectedCourses));
        $cancelBtn.show();
      } else {
        $scoreTag.hide();
        $gpaTag.hide();
        $cancelBtn.hide();
      }
    });
    var selectedCourses = this.historicalList.reduce(function (acc, cur) {
      return acc.concat(cur.courses);
    }, []).filter(function (v) {
      return v.selected;
    });
    var $scoreTag = window.$('.gpa-tt-tag-selected-score');
    var $gpaTag = window.$('.gpa-tt-tag-selected-gpa');
    var $cancelBtn = window.$('.gpa-tt-cancel-btn');
    if (selectedCourses.length) {
      $scoreTag.show();
      $scoreTag.text('\u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A' + getAllCoursesScore(selectedCourses));
      $gpaTag.show();
      $gpaTag.text('\u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A' + getAllCoursesGPA(selectedCourses));
      $cancelBtn.show();
    } else {
      $scoreTag.hide();
      $gpaTag.hide();
      $cancelBtn.hide();
    }
  },
  toggleTranscriptItemStatus: function toggleTranscriptItemStatus(dom) {
    window.$(dom).toggleClass('selected');
    var status = window.$(dom).hasClass('selected');
    var _dom$dataset = dom.dataset,
        name = _dom$dataset.name,
        attribute = _dom$dataset.attribute,
        semester = _dom$dataset.semester;

    var score = Number(dom.dataset.score);
    var gpa = Number(dom.dataset.gpa);
    var credit = Number(dom.dataset.credit);
    this.historicalList.filter(function (v) {
      return v.semester === semester;
    })[0].courses.filter(function (v) {
      return v.name === name && v.attribute === attribute && v.score === score && v.gpa === gpa && v.credit === credit;
    })[0].selected = status;
  },
  renderTotalTranscript: function renderTotalTranscript() {
    var allCourses = this.historicalList.reduce(function (acc, cur) {
      return acc.concat(cur.courses);
    }, []);
    var labels = templates.totalTranscript(getFourTypesValue(allCourses));
    this.$indexWidgetMain.prepend(labels);
  },
  renderSemesterTranscript: function renderSemesterTranscript() {
    var _this3 = this;

    this.historicalList.forEach(function (_ref5) {
      var semester = _ref5.semester,
          courses = _ref5.courses;

      var header = templates.semesterTranscriptHeader(semester);
      var labels = templates.semesterTranscriptLabels(semester, getFourTypesValue(courses));
      var content = templates.semesterTranscriptContent(semester, courses);
      _this3.$indexWidgetMainRow.append(templates.semesterTranscriptWrapper(header, labels, content));
    });
  },
  destroy: function destroy() {
    this.$indexWidgetMainRow.remove();
    this.$indexWidgetMain.remove();
    this.$toolbarDetail.remove();
    this.$toolbarReset.remove();
    this.$indexWidget.remove();

    this.$indexWidget = null;
    this.$toolbarReset = null;
    this.$toolbarDetail = null;
    this.$indexWidgetMain = null;
    this.$indexWidgetMainRow = null;

    this.historicalList = null;
  },
  reset: function reset() {
    this.destroy();
    this.init();
  }
};

function convertHistoricalList(historicalList) {
  return historicalList.map(function (v) {
    return {
      semester: v.cjbh.replace('秋(两学期)', ' 秋季学期').replace('春(两学期)', ' 春季学期'),
      courses: v.cjList.map(function (v) {
        return {
          name: v.courseName,
          score: v.courseScore,
          gpa: v.gradePointScore,
          credit: Number(v.credit),
          attribute: v.courseAttributeName,
          selected: false
        };
      })
    };
  }).reverse();
}

function getWeightedAverage(arr) {
  return arr.reduce(function (acc, cur) {
    return [acc[0] + cur.value * cur.weight, acc[1] + cur.weight];
  }, [0, 0]).reduce(function (valueSum, weightSum) {
    return valueSum / weightSum;
  });
}

function getCompulsoryCourse(arr) {
  return arr.filter(function (v) {
    return v.attribute === '必修';
  });
}

function mapGPA(arr) {
  return arr.map(function (v) {
    return { value: v.gpa, weight: v.credit };
  });
}

function mapScore(arr) {
  return arr.map(function (v) {
    return { value: v.score, weight: v.credit };
  });
}

function reserveDigits(num) {
  var fractionDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

  return Number(num.toFixed(fractionDigits));
}

function getCompulsoryCoursesGPA(arr) {
  return reserveDigits(getWeightedAverage(mapGPA(getCompulsoryCourse(arr))));
}

function getCompulsoryCoursesScore(arr) {
  return reserveDigits(getWeightedAverage(mapScore(getCompulsoryCourse(arr))));
}

function getAllCoursesGPA(arr) {
  return reserveDigits(getWeightedAverage(mapGPA(arr)));
}

function getAllCoursesScore(arr) {
  return reserveDigits(getWeightedAverage(mapScore(arr)));
}

function getFourTypesValue(arr) {
  return {
    compulsoryCoursesGPA: getCompulsoryCoursesGPA(arr),
    compulsoryCoursesScore: getCompulsoryCoursesScore(arr),
    allCoursesGPA: getAllCoursesGPA(arr),
    allCoursesScore: getAllCoursesScore(arr)
  };
}

module.exports = gpa;