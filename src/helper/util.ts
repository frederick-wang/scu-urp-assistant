import minimatch from 'minimatch'
import { state } from '@/store'
import { isLoginPage } from './judger'
import { API_PATH_V2 } from './info'
import axios, { AxiosInstance } from 'axios'

export const sleep = (time: number): Promise<number> =>
  new Promise(resolve => setTimeout(() => resolve(), time))

export const matchTrigger = (
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
      : !state.core.route && matchTrigger(window.location.pathname, pathname)
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
  const result = !isLoginPage() && matchTrigger(state.core.route, route)
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

export type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never
}

export type XOR<T, U> = T | U extends Record<string, unknown>
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U
