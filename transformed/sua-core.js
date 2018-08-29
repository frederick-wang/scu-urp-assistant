'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fastEvaluation = require('./plugins/fast-evaluation');

// 挂载到 window 上的全局对象
var $sua = {
  // 属性值的存放处
  data: {
    timeInterval: 100
  },
  // 初始化任务的队列
  initQueue: [],
  // 定时执行的任务的队列
  taskQueue: [],
  // 插件
  plugins: [fastEvaluation],
  init: function init() {
    var _this = this;

    // 将data中的属性注入$sua对象中，使其内部可以用this直接访问
    window.$sua = (0, _assign2.default)($sua, $sua.data);
    // 加载插件
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(this.plugins), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var plugin = _step.value;

        plugin.$sua = $sua;
        // 将data中的属性注入plugin对象中，使其内部可以用this直接访问
        plugin = (0, _assign2.default)(plugin, $sua.data);
        // 将初始化方法推入队列中
        if (plugin.init) {
          this.initQueue.push(plugin.init.bind(plugin));
        }
        // 将需要定时执行的任务推入队列中
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
  }
};

module.exports = $sua;