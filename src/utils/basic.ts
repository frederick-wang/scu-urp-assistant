const chineseNumbers = [
  '零',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十'
]

const API_PATH = 'https://sua.zhaoji.wang/api/v1'

function getChineseNumber(num: number) {
  return chineseNumbers[num] || ''
}

export { getChineseNumber, API_PATH }
