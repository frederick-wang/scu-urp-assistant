'use strict';

// 绩点计算插件
var gpa = {
  name: 'gpa',
  pathname: '/',
  templates: {
    indexWidget: '\n      <div class="col-sm-12 widget-container-col">\n        <div class="widget-box">\n          <div class="widget-header">\n            <h5 class="widget-title">\n              \u6211\u7684\u6210\u7EE9\n              <span class="badge badge-primary" style="padding-top:3px;position:relative;top:-3px;">SCU URP \u52A9\u624B</span>\n            </h5>\n          </div>\n          <div class="widget-body">\n            <div class="widget-main">\n              <div class="row"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    '
  },
  init: function init() {
    var $indexWidget = window.$(this.templates.indexWidget);
    window.$('.page-content').children('.row').append($indexWidget);
    var $indexWidgetMain = $indexWidget.find('.widget-main');
    var $indexWidgetMainRow = $indexWidget.find('.widget-main .row');

    var getWeightedAverage = function getWeightedAverage(arr) {
      return arr.reduce(function (acc, cur) {
        return [acc[0] + cur.value * cur.weight, acc[1] + cur.weight];
      }, [0, 0]).reduce(function (valueSum, weightSum) {
        return valueSum / weightSum;
      });
    };
    var getCompulsoryCourse = function getCompulsoryCourse(arr) {
      return arr.filter(function (v) {
        return v.attribute === '必修';
      });
    };
    var mapGPA = function mapGPA(arr) {
      return arr.map(function (v) {
        return { value: v.gpa, weight: v.credit };
      });
    };
    var mapScore = function mapScore(arr) {
      return arr.map(function (v) {
        return { value: v.score, weight: v.credit };
      });
    };
    var reserveDigits = function reserveDigits(num) {
      var fractionDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
      return Number(num.toFixed(fractionDigits));
    };

    var getCompulsoryCoursesGPA = function getCompulsoryCoursesGPA(arr) {
      return reserveDigits(getWeightedAverage(mapGPA(getCompulsoryCourse(arr))));
    };
    var getCompulsoryCoursesScore = function getCompulsoryCoursesScore(arr) {
      return reserveDigits(getWeightedAverage(mapScore(getCompulsoryCourse(arr))));
    };
    var getAllCoursesGPA = function getAllCoursesGPA(arr) {
      return reserveDigits(getWeightedAverage(mapGPA(arr)));
    };
    var getAllCoursesScore = function getAllCoursesScore(arr) {
      return reserveDigits(getWeightedAverage(mapScore(arr)));
    };

    window.$.get('http://zhjw.scu.edu.cn/student/integratedQuery/scoreQuery/allPassingScores/callback').then(function (_ref) {
      var lnList = _ref.lnList;

      // 这里的实现不优雅……原生方法在这里无法实现直接把处理后的数组本身作为参数……只能加了一个中间变量
      var allCourses = lnList.map(function (v) {
        return {
          semester: v.cjbh.replace('秋(两学期)', ' 秋季学期').replace('春(两学期)', ' 春季学期'),
          courses: v.cjList.map(function (v) {
            return {
              name: v.courseName,
              score: v.courseScore,
              gpa: v.gradePointScore,
              credit: Number(v.credit),
              attribute: v.courseAttributeName
            };
          })
        };
      }).reverse().filter(function (item) {
        var semester = item.semester,
            courses = item.courses;

        var header = '\n            <h4 class="header smaller lighter grey">\n              <i class="menu-icon fa fa-calendar"></i> ' + semester + '\n            </h4>\n          ';
        var labels = '\n            <p>\n              <span class="label label-success">\n                \u5FC5\u4FEE\u5E73\u5747\u5206\uFF1A' + getCompulsoryCoursesScore(courses) + '\n              </span>\n              <span class="label label-success">\n                \u5FC5\u4FEE\u7EE9\u70B9\uFF1A' + getCompulsoryCoursesGPA(courses) + '\n              </span>\n              <span class="label label-purple">\n                \u5168\u90E8\u5E73\u5747\u5206\uFF1A' + getAllCoursesScore(courses) + '\n              </span>\n              <span class="label label-purple">\n                \u5168\u90E8\u7EE9\u70B9\uFF1A' + getAllCoursesGPA(courses) + '\n              </span>\n            </p>\n          ';
        var content = '\n            <table class="table table-striped table-bordered table-hover">\n              <thead>\n                <tr>\n                  <th>\u8BFE\u7A0B\u540D</th>\n                  <th>\u5206\u6570</th>\n                  <th>\u7EE9\u70B9</th>\n                  <th>\u5B66\u5206</th>\n                  <th>\u5C5E\u6027</th>\n                </tr>\n              </thead>\n              <tbody>\n              ' + courses.map(function (v) {
          return '\n                <tr>\n                  <td>' + v.name + '</td>\n                  <td>' + v.score + '</td>\n                  <td>' + v.gpa + '</td>\n                  <td>' + v.credit + '</td>\n                  <td>' + v.attribute + '</td>\n                </tr>\n              ';
        }).join('') + '\n              </tbody>\n            </table>\n          ';
        $indexWidgetMainRow.append('<div class="col-sm-6">' + (header + labels + content) + '</div>');
        return true;
      }).reduce(function (acc, cur) {
        return acc.concat(cur.courses);
      }, []);
      var compulsoryCoursesGPA = getCompulsoryCoursesScore(allCourses);
      var compulsoryCoursesScore = getCompulsoryCoursesGPA(allCourses);
      var allCoursesGPA = getAllCoursesGPA(allCourses);
      var allCoursesScore = getAllCoursesScore(allCourses);
      var labels = '\n          <div class="row" style="margin-bottom: 20px;">\n            <div class="col-sm-12">\n              <h4 class="header smaller lighter grey" style="margin-top: 0;">\n                <i class="menu-icon fa fa-calendar"></i> \u5168\u90E8\u6210\u7EE9\n              </h4>\n              <span class="label label-success">\n                \u5FC5\u4FEE\u5E73\u5747\u5206\uFF1A' + compulsoryCoursesScore + '\n              </span>\n              <span class="label label-success">\n                \u5FC5\u4FEE\u7EE9\u70B9\uFF1A' + compulsoryCoursesGPA + '\n              </span>\n              <span class="label label-purple">\n                \u5168\u90E8\u5E73\u5747\u5206\uFF1A' + allCoursesScore + '\n              </span>\n              <span class="label label-purple">\n                \u5168\u90E8\u7EE9\u70B9\uFF1A' + allCoursesGPA + '\n              </span>\n            </div>\n          </div>\n        ';
      $indexWidgetMain.prepend(labels);
    });
  }
};

module.exports = gpa;