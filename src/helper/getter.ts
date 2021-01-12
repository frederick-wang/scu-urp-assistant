import hmacSHA256 from 'crypto-js/hmac-sha256'
import encHex from 'crypto-js/enc-hex'

export const getChineseNumber = (num: number): string =>
  ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][num] || ''

export const getPluginIcon = (name: string): string =>
  `https://gitee.com/frederick-wang/scu-urp-assistant/raw/master/src/plugins/${name}/icon.png`

const getLevenshteinDistance = (a: string, b: string): number => {
  const distanceMatrix: number[][] = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null))

  for (let i = 0; i <= a.length; i += 1) {
    distanceMatrix[0][i] = i
  }

  for (let j = 0; j <= b.length; j += 1) {
    distanceMatrix[j][0] = j
  }

  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1
      distanceMatrix[j][i] = Math.min(
        distanceMatrix[j][i - 1] + 1, // deletion
        distanceMatrix[j - 1][i] + 1, // insertion
        distanceMatrix[j - 1][i - 1] + indicator // substitution
      )
    }
  }

  return distanceMatrix[b.length][a.length]
}

export const getTextSimilarity = (str1: string, str2: string): number =>
  1 - getLevenshteinDistance(str1, str2) / Math.max(str1.length, str2.length)

export const getUserId = (studentInfos: Map<string, string>): string => {
  const name = studentInfos.get('姓名')
  const studentNumber = studentInfos.get('学号')
  const identificationNumber = studentInfos.get('证件号码')
  const enrollDate = studentInfos.get('入学日期')
  const birthday = studentInfos.get('出生日期')
  const secret = [
    name,
    studentNumber,
    identificationNumber,
    enrollDate,
    birthday
  ].join('')
  const hmac = hmacSHA256('scu-urp-assistant', secret).toString(encHex)
  return hmac
}
