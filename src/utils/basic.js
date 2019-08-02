const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

function getChineseNumber (num) {
  return chineseNumbers[num] || ''
}

module.exports = { getChineseNumber }
