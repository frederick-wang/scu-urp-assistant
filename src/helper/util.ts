import minimatch from 'minimatch'
import { state } from '@/store'
import { isError, isLoginPage } from './judger'
import { API_PATH_V2 } from './info'
import axios, { AxiosInstance } from 'axios'
import { getCurrentRoutePath } from '@/core/router'
import Vue from 'vue'

export const sleep = (time: number): Promise<void> =>
  new Promise(resolve => setTimeout(() => resolve(), time))

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
    timeout: 10000,
    headers: {
      ...(state.user.accessToken
        ? {
            Authorization: `Bearer ${state.user.accessToken}`
          }
        : {})
    }
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
  console.error(isError(error) ? error : new Error(message))
}

export function notifyWarning(message: string, title?: string): void {
  if (!title) {
    title = '警告'
  }
  Vue.prototype.$notify.error({
    title,
    message
  })
  console.warn(message)
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
