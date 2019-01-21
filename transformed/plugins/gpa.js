'use strict';

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 绩点计算插件
var fs = require('fs');

var gpa = {
  name: 'gpa',
  pathname: ['/', '/index.jsp'],
  style: fs.readFileSync('src/plugins/gpa.css', 'utf8'),
  templates: {
    indexWidget: '\n      <div class="col-sm-12 widget-container-col">\n        <div class="widget-box">\n          <div class="widget-header">\n            <h5 class="widget-title">\n              \u6211\u7684\u6210\u7EE9\n              <span class="badge badge-primary" style="padding-top:3px;position:relative;top:-3px;">SCU URP \u52A9\u624B</span>\n            </h5>\n          </div>\n          <div class="widget-body">\n            <div class="widget-main">\n              <div class="row"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    '
  },
  $indexWidget: void 0,
  $indexWidgetMain: void 0,
  indexWidgetMainRow: void 0,
  historicalList: void 0,
  init: function init() {
    var _this = this;

    this.initDOM();
    window.$.get('/student/integratedQuery/scoreQuery/allPassingScores/callback').then(function (_ref) {
      var lnList = _ref.lnList;

      // lnList -> 历年数据
      _this.historicalList = convertHistoricalList(lnList);
      _this.renderSemesterTranscript();
      _this.renderTotalTranscript();

      var that = _this;
      window.$('.gpa-st-item').click(function () {
        that.toggleTranscriptItemStatus(this);
        that.renderTagSelected();
      });
    });
  },
  renderTagSelected: function renderTagSelected() {
    this.historicalList.forEach(function (_ref2) {
      var semester = _ref2.semester,
          courses = _ref2.courses;

      var selectedCourses = courses.filter(function (v) {
        return v.selected;
      });
      var $scoreTag = window.$((0, _from2.default)(document.getElementsByClassName('gpa-st-tag-selected-score')).filter(function (v) {
        return v.dataset.semester === semester;
      })[0]);
      var $gpaTag = window.$((0, _from2.default)(document.getElementsByClassName('gpa-st-tag-selected-gpa')).filter(function (v) {
        return v.dataset.semester === semester;
      })[0]);
      if (selectedCourses.length) {
        $scoreTag.show();
        $scoreTag.text('\u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A' + getAllCoursesScore(selectedCourses));
        $gpaTag.show();
        $gpaTag.text('\u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A' + getAllCoursesGPA(selectedCourses));
      } else {
        $scoreTag.hide();
        $gpaTag.hide();
      }
    });
    var selectedCourses = this.historicalList.reduce(function (acc, cur) {
      return acc.concat(cur.courses);
    }, []).filter(function (v) {
      return v.selected;
    });
    var $scoreTag = window.$('.gpa-tt-tag-selected-score');
    var $gpaTag = window.$('.gpa-tt-tag-selected-gpa');
    if (selectedCourses.length) {
      $scoreTag.show();
      $scoreTag.text('\u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A' + getAllCoursesScore(selectedCourses));
      $gpaTag.show();
      $gpaTag.text('\u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A' + getAllCoursesGPA(selectedCourses));
    } else {
      $scoreTag.hide();
      $gpaTag.hide();
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
  initDOM: function initDOM() {
    this.$indexWidget = window.$(this.templates.indexWidget);
    window.$('.page-content').children('.row').append(this.$indexWidget);
    this.$indexWidgetMain = this.$indexWidget.find('.widget-main');
    this.$indexWidgetMainRow = this.$indexWidget.find('.widget-main .row');
  },
  renderTotalTranscript: function renderTotalTranscript() {
    var allCourses = this.historicalList.reduce(function (acc, cur) {
      return acc.concat(cur.courses);
    }, []);

    var _getFourTypesValue = getFourTypesValue(allCourses),
        allCoursesGPA = _getFourTypesValue.allCoursesGPA,
        allCoursesScore = _getFourTypesValue.allCoursesScore,
        compulsoryCoursesGPA = _getFourTypesValue.compulsoryCoursesGPA,
        compulsoryCoursesScore = _getFourTypesValue.compulsoryCoursesScore;

    var labels = '\n      <div class="gpa-tt row" style="margin-bottom: 20px;">\n        <div class="col-sm-12">\n          <h4 class="header smaller lighter grey" style="margin-top: 0;">\n            <i class="menu-icon fa fa-calendar"></i> \u5168\u90E8\u6210\u7EE9\n          </h4>\n          <span class="label label-success">\n            \u5FC5\u4FEE\u5E73\u5747\u5206\uFF1A' + compulsoryCoursesScore + '\n          </span>\n          <span class="label label-success">\n            \u5FC5\u4FEE\u7EE9\u70B9\uFF1A' + compulsoryCoursesGPA + '\n          </span>\n          <span class="label label-purple">\n            \u5168\u90E8\u5E73\u5747\u5206\uFF1A' + allCoursesScore + '\n          </span>\n          <span class="label label-purple">\n            \u5168\u90E8\u7EE9\u70B9\uFF1A' + allCoursesGPA + '\n          </span>\n          <span class="label label-pink gpa-tt-tag-selected-score">\n            \u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A0\n          </span>\n          <span class="label label-pink gpa-tt-tag-selected-gpa">\n            \u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A0\n          </span>\n        </div>\n      </div>\n    ';
    this.$indexWidgetMain.prepend(labels);
  },
  renderSemesterTranscript: function renderSemesterTranscript() {
    var _this2 = this;

    this.historicalList.forEach(function (item) {
      var semester = item.semester,
          courses = item.courses;

      var _getFourTypesValue2 = getFourTypesValue(courses),
          allCoursesGPA = _getFourTypesValue2.allCoursesGPA,
          allCoursesScore = _getFourTypesValue2.allCoursesScore,
          compulsoryCoursesGPA = _getFourTypesValue2.compulsoryCoursesGPA,
          compulsoryCoursesScore = _getFourTypesValue2.compulsoryCoursesScore;

      var header = '\n        <h4 class="header smaller lighter grey">\n          <i class="menu-icon fa fa-calendar"></i> ' + semester + '\n        </h4>\n      ';
      var labels = '\n        <p>\n          <span class="label label-success">\n            \u5FC5\u4FEE\u5E73\u5747\u5206\uFF1A' + compulsoryCoursesScore + '\n          </span>\n          <span class="label label-success">\n            \u5FC5\u4FEE\u7EE9\u70B9\uFF1A' + compulsoryCoursesGPA + '\n          </span>\n          <span class="label label-purple">\n            \u5168\u90E8\u5E73\u5747\u5206\uFF1A' + allCoursesScore + '\n          </span>\n          <span class="label label-purple">\n            \u5168\u90E8\u7EE9\u70B9\uFF1A' + allCoursesGPA + '\n          </span>\n        </p>\n        <p>\n          <span class="label label-pink gpa-st-tag-selected-score" data-semester="' + semester + '">\n          \u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A0\n          </span>\n          <span class="label label-pink gpa-st-tag-selected-gpa" data-semester="' + semester + '">\n            \u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A0\n          </span>\n        </p>\n      ';
      var content = '\n        <table class="gpa-st-table table table-striped table-bordered table-hover">\n          <thead>\n            <tr>\n              <th>\u8BFE\u7A0B\u540D</th>\n              <th>\u5206\u6570</th>\n              <th>\u7EE9\u70B9</th>\n              <th>\u5B66\u5206</th>\n              <th>\u5C5E\u6027</th>\n            </tr>\n          </thead>\n          <tbody>\n          ' + courses.map(function (v) {
        return '\n            <tr\n              class="gpa-st-item"\n              data-semester="' + semester + '"\n              data-name="' + v.name + '"\n              data-score="' + v.score + '"\n              data-gpa="' + v.gpa + '"\n              data-credit="' + v.credit + '"\n              data-attribute="' + v.attribute + '"\n            >\n              <td>' + v.name + '</td>\n              <td>' + v.score + '</td>\n              <td>' + v.gpa + '</td>\n              <td>' + v.credit + '</td>\n              <td>' + v.attribute + '</td>\n            </tr>\n          ';
      }).join('') + '\n          </tbody>\n        </table>\n      ';
      _this2.$indexWidgetMainRow.append('<div class="gpa-st col-sm-6">' + (header + labels + content) + '</div>');
    });
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