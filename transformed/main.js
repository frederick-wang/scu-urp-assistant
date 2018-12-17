'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var data = require('../data/data.json');

fs.writeFileSync('data/fajhh.json', (0, _stringify2.default)(data.map(function (v) {
  return v['方案计划号'];
}).sort(function (a, b) {
  return a - b;
})));