const fs = require('fs')
const data = require('../data/data.json')

fs.writeFileSync('data/fajhh.json', JSON.stringify(data.map(v => v['方案计划号']).sort(function (a, b) {
  return a - b
})))
