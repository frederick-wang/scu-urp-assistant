'use strict';

var fs = require('fs');
var data = require('../data/fajhh.json');

// fs.writeFileSync('data/fajhh.json', JSON.stringify(data.map(v => v['方案计划号']).sort(function (a, b) {
//   return a - b
// })))
console.log(data[710], data[711]);