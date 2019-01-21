'use strict';

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minimatch = require('minimatch');
var fastEvaluation = require('./plugins/fast-evaluation');
var tooltip = require('./plugins/tooltip');
var removeEvaluationTimeLimit = require('./plugins/remove-evaluation-time-limit');
var compatibilityLegacy = require('./plugins/compatibility-legacy');
var fastEvaluationLegacy = require('./plugins/fast-evaluation-legacy');
var recoverRememberMe = require('./plugins/recover-remember-me');
var gpa = require('./plugins/gpa');

// 挂载到 window 上的全局对象
var $sua = {
  // 属性值的存放处
  data: {
    /**
     * 定时任务的执行间隔
     */
    taskTimeInterval: 100
  },
  /**
   * 插件
   */
  plugins: [tooltip, fastEvaluation, removeEvaluationTimeLimit, recoverRememberMe, gpa],
  /**
   * 初始化任务的队列
   */
  initQueue: [],
  /**
   * 定时执行的任务的队列
   */
  taskQueue: [],
  /**
   * 加载样式的队列
   */
  styleQueue: [],
  /**
   * 初始化 SCU URP 助手
   */
  init: function init() {
    var _this = this;

    // 旧版教务系统兼容
    if (window.location.host === 'zhjwwx.scu.edu.cn:8080') {
      if (window.location.pathname !== '/loginAction.do') {
        return;
      }
      var dataLegacy = {
        topFrame: window.frames.topFrame,
        bottomFrame: window.frames.bottomFrame,
        menuFrame: window.frames.bottomFrame.frames.menuFrame,
        mainFrame: window.frames.bottomFrame.frames.mainFrame
      };

      var pluginsLegacy = [compatibilityLegacy, fastEvaluationLegacy];

      window.$sua = (0, _assign2.default)($sua, dataLegacy);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(pluginsLegacy), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;

          plugin.$sua = $sua;
          plugin = (0, _assign2.default)(plugin, dataLegacy);
          if (plugin.init) {
            this.initQueue.push(plugin.init.bind(plugin));
          }
          if (plugin.task) {
            this.taskQueue.push(plugin.task.bind(plugin));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(this.initQueue), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var i = _step2.value;

          i();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      setInterval(function () {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, _getIterator3.default)(_this.taskQueue), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var t = _step3.value;

            t();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }, this.timeInterval);

      return;
    }

    // 将data中的属性注入$sua对象中，使其内部可以用this直接访问
    window.$sua = (0, _assign2.default)($sua, $sua.data);
    // 加载插件
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = (0, _getIterator3.default)(this.plugins), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _plugin = _step4.value;

        _plugin.$sua = $sua;
        // 将data中的属性注入plugin对象中，使其内部可以用this直接访问
        _plugin = (0, _assign2.default)(_plugin, $sua.data);
        if (urlTrigger(_plugin)) {
          // 将样式推入队列中
          if (_plugin.style) {
            this.styleQueue.push(_plugin.style);
          }
          // 将初始化方法推入队列中
          if (_plugin.init) {
            this.initQueue.push(_plugin.init.bind(_plugin));
          }
          // 将需要定时执行的任务推入队列中
          if (_plugin.task) {
            this.taskQueue.push(_plugin.task.bind(_plugin));
          }
        }
      }
      // 加载样式
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = (0, _getIterator3.default)(this.styleQueue), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var s = _step5.value;

        window.$('head').append('\n        <style type="text/css">\n          ' + s + '\n        </style>\n      ');
      }
      // 初始化方法
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = (0, _getIterator3.default)(this.initQueue), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var _i = _step6.value;

        _i();
      }
      // 定时任务
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    setInterval(function () {
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = (0, _getIterator3.default)(_this.taskQueue), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var t = _step7.value;

          t();
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }, this.taskTimeInterval);

    /**
     * 检测当前的location.pathname是否满足插件触发要求
     *
     * @param {*} plugin 插件对象，pathname 属性可以是 Boolean、String、Array、Object、Function等类型。
     * 如果 pathname 属性不存在，则默认对全体 url 均生效
     * @returns 检测的结果
     */
    function urlTrigger(plugin) {
      var pathname = plugin.pathname;
      // 如果pathname不存在，默认对全部url生效

      if (!pathname) {
        return true;
      } else if (typeof pathname === 'boolean') {
        return pathname;
      } else if (typeof pathname === 'string') {
        return minimatch(window.location.pathname, pathname);
      } else if (Array.isArray(pathname)) {
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = (0, _getIterator3.default)(pathname), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var item = _step8.value;

            if (minimatch(window.location.pathname, item)) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
              _iterator8.return();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }

        return false;
      } else if ((typeof pathname === 'undefined' ? 'undefined' : (0, _typeof3.default)(pathname)) === 'object') {
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = (0, _getIterator3.default)((0, _values2.default)(pathname)), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var _item = _step9.value;

            if (minimatch(window.location.pathname, _item)) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
              _iterator9.return();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }

        return false;
      } else if (typeof pathname === 'function') {
        return pathname.bind(plugin)();
      }
      return false;
    }
  }
};

module.exports = $sua;