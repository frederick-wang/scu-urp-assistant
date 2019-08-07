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

const API_PATH = 'https://sua.zhaoji.wang/api/v1'

function getChineseNumber(num: number) {
  return chineseNumbers[num] || ''
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

export { getChineseNumber, API_PATH, urlTrigger }
