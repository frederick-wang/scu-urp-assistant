import minimatch from 'minimatch'

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

const API_PATH =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost/scu-urp-assistant-server/public'
    : 'https://sua.zhaoji.wang/api/v1'

function convertSemesterNumberToName(semesterNumber: string) {
  const r = semesterNumber.match(/(\d+)-(\d+)-(\d)/)
  if (!r) {
    return semesterNumber
  }
  return `${r[1]}-${r[2]}学年 ${r[3] === '1' ? '秋' : '春'}季学期`
}

function convertSemesterNameToNumber(semesterName: string) {
  const r = semesterName.match(/^(\d+)-(\d+)学年\s(.)季学期$/)
  if (!r) {
    return semesterName
  }
  return `${r[1]}-${r[2]}-${r[3] === '秋' ? 1 : 2}-1`
}

function getChineseNumber(num: number) {
  return chineseNumbers[num] || ''
}

function sleep(time: number) {
  return new Promise(resolve => setTimeout(() => resolve(), time))
}

/**
 * 检测当前的location.pathname是否满足插件触发要求
 *
 * @param {*} plugin 插件对象，pathname 属性可以是 Boolean、String、Array、Object、Function等类型。
 * 如果 pathname 属性不存在，则默认对全体 url 均生效
 * @returns 检测的结果
 */
function urlTrigger(plugin: any) {
  const { pathname } = plugin
  // 如果pathname不存在，默认对全部url生效
  if (!pathname) {
    return true
  } else if (typeof pathname === 'boolean') {
    return pathname
  } else if (typeof pathname === 'string') {
    return minimatch(window.location.pathname, pathname)
  } else if (Array.isArray(pathname)) {
    for (const item of pathname) {
      if (minimatch(window.location.pathname, item)) {
        return true
      }
    }
    return false
  } else if (typeof pathname === 'object') {
    for (const item of Object.values(pathname)) {
      if (minimatch(window.location.pathname, item as string)) {
        return true
      }
    }
    return false
  } else if (typeof pathname === 'function') {
    return pathname.bind(plugin)()
  }
  return false
}

export {
  getChineseNumber,
  API_PATH,
  urlTrigger,
  sleep,
  convertSemesterNumberToName,
  convertSemesterNameToNumber
}
