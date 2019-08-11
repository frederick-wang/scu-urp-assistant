import minimatch from 'minimatch'
import crypto from 'crypto'
import * as logger from './logger'
import { state } from '@/store'

function getUserId(studentInfos: Map<string, string>) {
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
  return crypto
    .createHmac('sha256', secret)
    .update('scu-urp-assistant')
    .digest('hex')
}

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
 * 检测当前的url是否满足插件触发要求
 *
 * @param plugin 插件对象，pathname 属性可以是 Boolean、String、Array、Object、Function等类型。
 * @returns 检测的结果
 */
function urlTrigger(plugin: SUAPlugin) {
  const { pathname, route } = plugin
  const match = (
    value:
      | string
      | boolean
      | string[]
      | (() => boolean)
      | {
          [key: string]: string
        }
      | undefined
  ) => {
    if (!value) {
      return false
    } else if (typeof value === 'boolean') {
      return value
    } else if (typeof value === 'string') {
      return minimatch(window.location.pathname, value)
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (minimatch(window.location.pathname, item)) {
          return true
        }
      }
      return false
    } else if (typeof value === 'object') {
      for (const item of Object.values(value)) {
        if (minimatch(window.location.pathname, item)) {
          return true
        }
      }
      return false
    } else if (typeof value === 'function') {
      return value.bind(plugin)()
    }
    return false
  }
  let result: boolean
  if (pathname && !route) {
    result = match(pathname)
  } else if (!pathname && route) {
    result = window.location.pathname !== '/login' && match(route)
  } else {
    result =
      window.location.pathname !== '/login' && match(route) && match(pathname)
  }
  return result
}

export {
  getChineseNumber,
  API_PATH,
  urlTrigger,
  sleep,
  convertSemesterNumberToName,
  convertSemesterNameToNumber,
  getUserId,
  logger
}
