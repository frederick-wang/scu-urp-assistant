import minimatch from 'minimatch'
// import { state } from '@/store'
import { isError, isLoginPage } from './judger'
import { API_PATH_V2 } from './info'
import axios, { AxiosInstance } from 'axios'
import { getCurrentRoutePath } from '@/core/router'
import Vue from 'vue'
import { Logger } from './logger'

/**
 * SCU URP 引入的 JS 文件中，重写了 Number 函数；
 * 本函数是 Number 函数的替代
 */
export const Num: NumberConstructor = Object.getPrototypeOf(0).constructor

export const sleep = (time: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), time))

export const matchPathname = (
  subject: string,
  object:
    | string
    | boolean
    | string[]
    | (() => boolean)
    | {
        [key: string]: string
      }
    | undefined
): boolean => {
  if (!object) {
    return false
  } else if (typeof object === 'boolean') {
    return object
  } else if (typeof object === 'string') {
    return minimatch(subject, object)
  } else if (Array.isArray(object)) {
    for (const item of object) {
      if (minimatch(subject, item)) {
        return true
      }
    }
    return false
  } else if (typeof object === 'object') {
    for (const item of Object.values(object)) {
      if (minimatch(subject, item)) {
        return true
      }
    }
    return false
  } else if (typeof object === 'function') {
    return object.bind(object)()
  }
  return false
}

/**
 * 检测当前的url是否满足插件触发要求
 *
 * @param pathname 可以是 Boolean、String、Array、Object、Function等类型。
 * @returns 检测的结果
 */
export const pathnameTrigger = (
  pathname:
    | string
    | boolean
    | string[]
    | (() => boolean)
    | {
        [key: string]: string
      }
    | undefined
): boolean => {
  const result =
    pathname === true
      ? true
      : !getCurrentRoutePath() &&
        matchPathname(window.location.pathname, pathname)
  return result
}

export const routeTrigger = (
  route:
    | string
    | boolean
    | string[]
    | (() => boolean)
    | {
        [key: string]: string
      }
    | undefined
): boolean => {
  const result = !isLoginPage() && matchPathname(getCurrentRoutePath(), route)
  return result
}

// 确保 http 调用时 state 已经被初始化
export const http = (): AxiosInstance =>
  axios.create({
    baseURL: API_PATH_V2,
    timeout: 10000
    // headers: {
    //   ...(state.user.accessToken
    //     ? {
    //         Authorization: `Bearer ${state.user.accessToken}`
    //       }
    //     : {})
    // }
  })

export function notifyError(message: string, title?: string): void
export function notifyError(error: Error, title?: string): void
export function notifyError(error: string | Error, title?: string): void {
  const message = typeof error === 'string' ? error : error.message
  if (!title) {
    title = isError(error) ? error.name : '错误'
  }
  Vue.prototype.$notify.error({
    title,
    message
  })
  Logger.error(isError(error) ? error : new Error(message))
}

export function notifyWarning(message: string, title?: string): void {
  if (!title) {
    title = '警告'
  }
  Vue.prototype.$notify.error({
    title,
    message
  })
  Logger.warn(message)
}

export function notifySuccess(message: string, title?: string): void {
  if (!title) {
    title = '成功'
  }
  Vue.prototype.$notify.success({
    title,
    message
  })
}

export function notifyInfo(message: string, title?: string): void {
  if (!title) {
    title = '信息'
  }
  Vue.prototype.$notify.info({
    title,
    message
  })
}

export function messageError(message: string): void
export function messageError(error: Error): void
export function messageError(error: string | Error): void {
  const message = typeof error === 'string' ? error : error.message
  Vue.prototype.$message.error(message)
}

export function messageWarning(message: string): void {
  Vue.prototype.$message.warning(message)
}

export function messageSuccess(message: string): void {
  Vue.prototype.$message.success(message)
}

export function messageInfo(message: string): void {
  Vue.prototype.$message.info(message)
}

/**
 * 检查浏览器是否支持 CSS 属性
 */
export const supportsCSS = (attribute: string, value: string): boolean => {
  if (window.CSS && window.CSS.supports) {
    if (typeof value === 'undefined') return window.CSS.supports(attribute)
    return window.CSS.supports(attribute, value)
  }

  const elem = document.createElement('div')
  if (attribute in elem.style) {
    elem.style?.setProperty(attribute, value)
    return elem.style?.getPropertyValue(attribute) === value
  }
  return false
}

export const getBrowser = (): {
  type: 'IE' | 'Edge' | 'Firefox' | 'Chrome' | 'Opera' | 'Safari' | 'Unknown'
  version: number
} => {
  const browser: Record<string, string> = {}
  const userAgent = navigator.userAgent.toLowerCase()
  let s
  ;(s = userAgent.match(/rv:([\d.]+)\) like gecko/))
    ? (browser.ie = s[1])
    : (s = userAgent.match(/msie ([\d\.]+)/))
    ? (browser.ie = s[1])
    : (s = userAgent.match(/edge\/([\d\.]+)/))
    ? (browser.edge = s[1])
    : (s = userAgent.match(/firefox\/([\d\.]+)/))
    ? (browser.firefox = s[1])
    : (s = userAgent.match(/(?:opera|opr).([\d\.]+)/))
    ? (browser.opera = s[1])
    : (s = userAgent.match(/chrome\/([\d\.]+)/))
    ? (browser.chrome = s[1])
    : (s = userAgent.match(/version\/([\d\.]+).*safari/))
    ? (browser.safari = s[1])
    : 0
  // 根据关系进行判断
  if (browser.ie) {
    return {
      type: 'IE',
      version: parseInt(browser.ie)
    }
  }
  if (browser.edge) {
    return {
      type: 'Edge',
      version: parseInt(browser.edge)
    }
  }
  if (browser.firefox) {
    return {
      type: 'Firefox',
      version: parseInt(browser.firefox)
    }
  }
  if (browser.chrome) {
    return {
      type: 'Chrome',
      version: parseInt(browser.chrome)
    }
  }
  if (browser.opera) {
    return {
      type: 'Opera',
      version: parseInt(browser.opera)
    }
  }
  if (browser.safari) {
    return {
      type: 'Safari',
      version: parseInt(browser.safari)
    }
  }
  return {
    type: 'Unknown',
    version: -1
  }
}

export type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never
}

export type XOR<T, U> = T | U extends Record<string, unknown>
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]
