import { parse as parseQS, stringify as stringifyQS } from 'qs'
import { isLoginPage } from '@/helper/judger'
import { RequireOnlyOne } from '@/helper/util'
import Vue, { VNode, VNodeData, VueConstructor } from 'vue'
import { emitDataAnalysisEvent } from '@/plugins/data-analysis'

export interface Route {
  path: string
  name?: string
  params?: Record<string, unknown>
}

export type RouteHookNextFunction = (
  param?:
    | boolean
    | string
    | (RequireOnlyOne<
        {
          path: string
          name: string
        },
        'name' | 'path'
      > & {
        params?: Record<string, unknown>
      })
    | Error
    | null
) => void

export interface RouteConfig {
  path: string
  name?: string
  component: VueConstructor<Vue>
  componentOptions?: VNodeData
  beforeEnter?: (next: RouteHookNextFunction, to: Route, from?: Route) => void
}

const routes: RouteConfig[] = []

const history: Route[] = []

let currentRoute: Route | undefined = undefined

export const addRoute = (r: RouteConfig): number => {
  const hasDuplicationOfPath = (routes: RouteConfig[], path: string) =>
    routes.map(({ path }) => path).includes(path)

  const hasDuplicationOfName = (routes: RouteConfig[], name: string) =>
    routes.map(({ name }) => name).includes(name)

  const routeIndexOf = (routes: RouteConfig[], { name, path }: RouteConfig) =>
    routes
      .map(({ name, path }) => `${name}(${path})`)
      .indexOf(`${name}(${path})`)

  const hasDuplicationOfRoute = (routes: RouteConfig[], route: RouteConfig) =>
    routeIndexOf(routes, route) !== -1

  if (hasDuplicationOfRoute(routes, r)) {
    Vue.prototype.$notify({
      type: 'warning',
      title: '[添加路由] 路由重复',
      message: `路由 ${r.name}(${r.path}) 已被注册，无法重复注册`
    })
    return routeIndexOf(routes, r)
  }

  if (hasDuplicationOfPath(routes, r.path)) {
    Vue.prototype.$notify({
      type: 'warning',
      title: '[添加路由] 路由路径重复',
      message: `路由路径 ${r.path} 已被注册，可能导致路由跳转出错`
    })
  }

  if (r.name && hasDuplicationOfName(routes, r.name)) {
    Vue.prototype.$notify({
      type: 'warning',
      title: '[添加路由] 路由名称重复',
      message: `路由名称 ${r.name} 已被注册，可能导致路由跳转出错`
    })
  }

  const newLength = routes.push(r)
  return newLength - 1
}

export const removeRoute = ({
  name,
  path,
  index
}: RequireOnlyOne<
  {
    name: string
    path: string
    index: number
  },
  'name' | 'path' | 'index'
>): void => {
  let i = -1
  let type = ''

  if (index) {
    i = index
    type = '路由索引'
  } else if (path) {
    i = routes.map(({ path }) => path).indexOf(path)
    type = '路由路径'
  } else if (name) {
    i = routes.map(({ name }) => name).indexOf(name)
    type = '路由名称'
  }

  if (i >= 0 && i < routes.length) {
    routes.splice(i, 1)
  } else {
    Vue.prototype.$notify({
      type: 'warning',
      title: '[删除路由] 路由删除失败',
      message: `传入${type}参数有误，路由删除失败`
    })
  }
}

export const getAllRoutesConfig = (): RouteConfig[] => routes

export const getHistory = (): Route[] => history

export const getCurrentRoutePath = (): string => {
  if (!isLoginPage()) {
    const { sua_route: suaRoute } = parseQS(
      window.location.hash.replace(/^#/, '')
    )
    return (suaRoute ?? '').toString()
  }
  return ''
}

export const getCurrentRoute = (): Route | undefined => currentRoute

export const getCurrentRouteParams = ():
  | Record<string, unknown>
  | undefined => {
  if (getCurrentRoute()?.params) {
    return getCurrentRoute()?.params
  }
  const { sua_route_params: params } = parseQS(window.location.hash)
  if (typeof params === 'string') {
    return undefined
  } else if (Array.isArray(params)) {
    return undefined
  }
  return params as Record<string, unknown> | undefined
}

export const getCurrentRouteConfigByRoutePath = (): RouteConfig =>
  routes.filter(({ path }) => getCurrentRoutePath() === path)[0]

export const getRouteConfigByName = (name: string): RouteConfig | null => {
  const result = routes.filter(v => name === v.name)
  if (result.length) {
    return result[0]
  }
  return null
}

export const getRouteConfigByPath = (path: string): RouteConfig | null => {
  const result = routes.filter(v => path === v.path)
  if (result.length) {
    return result[0]
  }
  return null
}

/**
 * 生成 Vue 单文件组件渲染函数
 *
 * @param name 组件名称
 * @param component 组件对象
 * @param componentOptions 组件对象选项
 */
export const createComponentRender = (
  name: string,
  component: VueConstructor<Vue>,
  componentOptions?: VNodeData
) => (root: HTMLElement): void => {
  const className = `sua-container-${name}`
  $(root).append(`<div class="${className}"></div>`)
  if (componentOptions) {
    new Vue({
      render: (h): VNode => h(component, componentOptions)
    }).$mount(`.${className}`)
  } else {
    new Vue({
      render: (h): VNode => h(component)
    }).$mount(`.${className}`)
  }
  emitDataAnalysisEvent(name, '显示成功')
}

const convertRoutePathToName = (path: string): string =>
  path.replace(/\//g, '--').replace(/_/g, '-')

function replace(
  path: string,
  routeOptions?: {
    params?: Record<string, unknown>
  }
): Route | undefined
function replace(routeOptions: {
  path: string
  params?: Record<string, unknown>
}): Route | undefined
function replace(routeOptions: {
  name: string
  params?: Record<string, unknown>
}): Route | undefined
function replace(
  p:
    | string
    | (RequireOnlyOne<
        {
          path: string
          name: string
        },
        'name' | 'path'
      > & {
        params?: Record<string, unknown>
      }),
  ps?: {
    params?: Record<string, unknown>
  }
): Route | undefined {
  const r: Partial<Route> = {
    path: undefined,
    name: undefined,
    params: undefined
  }

  if (typeof p === 'string') {
    r.path = p
    r.params = ps?.params
  } else {
    // param 的 path 和 name 是二选一的关系，一个存在另一个就一定不存在
    if (p.path) {
      r.path = p.path
    }
    if (p.name) {
      r.name = p.name
    }
    if (p.params) {
      r.params = p.params
    }
  }

  try {
    const result = changeRouter(r)
    if (history.length) {
      history[history.length - 1] = result
    } else {
      history.push(result)
    }
    return result
  } catch (error) {
    console.error(error)
    return undefined
  }
}

function push(
  path: string,
  routeOptions?: {
    params?: Record<string, unknown>
  }
): Route | undefined
function push(routeOptions: {
  path: string
  params?: Record<string, unknown>
}): Route | undefined
function push(routeOptions: {
  name: string
  params?: Record<string, unknown>
}): Route | undefined
function push(
  p:
    | string
    | (RequireOnlyOne<
        {
          path: string
          name: string
        },
        'name' | 'path'
      > & {
        params?: Record<string, unknown>
      }),
  ps?: {
    params?: Record<string, unknown>
  }
): Route | undefined {
  const r: Partial<Route> = {
    path: undefined,
    name: undefined,
    params: undefined
  }

  if (typeof p === 'string') {
    r.path = p
    r.params = ps?.params
  } else {
    // param 的 path 和 name 是二选一的关系，一个存在另一个就一定不存在
    if (p.path) {
      r.path = p.path
    }
    if (p.name) {
      r.name = p.name
    }
    if (p.params) {
      r.params = p.params
    }
  }

  try {
    const result = changeRouter(r)
    if (history.length) {
      if (history[history.length - 1].path !== result.path) {
        history.push(result)
      }
    } else {
      history.push(result)
    }
    return result
  } catch (error) {
    console.error(error)
    return undefined
  }
}

function isError(arg: unknown): arg is Error {
  return Object.prototype.toString.call(arg).includes('Error')
}

function changeRouter(r: Partial<Route>) {
  let path: string | undefined = undefined
  let name: string | undefined = undefined
  let routeConfig: RouteConfig | null = null
  let params: Record<string, unknown> | undefined = undefined

  if (r.path) {
    routeConfig = getRouteConfigByPath(r.path)
    if (routeConfig) {
      path = routeConfig.path
      name = routeConfig.name
    } else {
      if (r.name) {
        routeConfig = getRouteConfigByName(r.name)
        if (routeConfig) {
          path = routeConfig.path
          name = r.name
        }
      }
    }
  }

  if (r.params) {
    params = r.params
  }

  if (!path || !routeConfig) {
    Vue.prototype.$notify({
      type: 'warning',
      title: '[路由跳转] 路由跳转失败',
      message: `传入参数 ${JSON.stringify(r)} 有误，路由跳转失败`
    })
    throw new Error(`路由跳转失败: 传入参数 ${JSON.stringify(r)} 有误`)
  }

  const routeToBeEnter: Route = { path, name, params }

  const { component, componentOptions, beforeEnter } = routeConfig
  const render = createComponentRender(
    name ?? convertRoutePathToName(path),
    component,
    componentOptions
  )
  const createRouteHookNextFunction = (): RouteHookNextFunction => (
    param?:
      | string
      | boolean
      | (RequireOnlyOne<
          {
            path: string
            name: string
          },
          'name' | 'path'
        > & {
          params?: Record<string, unknown>
        })
      | Error
      | null
  ): void => {
    if (param === undefined || param === null) {
      param = true
    }
    if (param === false) {
      return
    }
    if (typeof param === 'boolean') {
      const $pageContent = $('.main-content>.page-content')
      $pageContent.empty()
      // 因为需要兼容书签版，只有修改 hashtag 不会触发页面的刷新
      const hashObject: Record<string, unknown> = parseQS(
        window.location.hash.replace(/^#/, '')
      )
      if (r.path) {
        hashObject.sua_route = r.path
      }
      if (r.params) {
        hashObject.sua_route_params = r.params
      } else {
        delete hashObject.sua_route_params
      }
      // NOTE: 如果不这么写，hash就会被莫名其妙的清除掉。。。
      setTimeout(() => {
        window.location.hash = `#${stringifyQS(hashObject)}`
      }, 0)
      currentRoute = routeToBeEnter
      render($('.main-content>.page-content')[0])
    } else if (typeof param === 'string') {
      replace(param)
    } else if (isError(param)) {
      console.error(param)
      Vue.prototype.$notify.error({
        title: `[路由跳转] ${param.name}`,
        message: param.message
      })
    } else {
      if (param.path) {
        replace({
          path: param.path,
          params: param.params
        })
      } else if (param.name) {
        replace({
          name: param.name,
          params: param.params
        })
      }
    }
  }
  const routeHookNextFunction = createRouteHookNextFunction()
  if (beforeEnter) {
    beforeEnter(routeHookNextFunction, routeToBeEnter, currentRoute)
  } else {
    routeHookNextFunction()
  }
  return routeToBeEnter
}

export const router = {
  get allRoutesConfig(): RouteConfig[] {
    return getAllRoutesConfig()
  },
  get currentRoute(): Route | undefined {
    return getCurrentRoute()
  },
  get currentRoutePath(): string {
    return getCurrentRoutePath()
  },
  get currentRouteParams(): Record<string, unknown> | undefined {
    return getCurrentRouteParams()
  },
  get currentRouteConfig(): RouteConfig {
    return getCurrentRouteConfigByRoutePath()
  },
  get history(): Route[] {
    return getHistory()
  },
  push,
  replace
}

export type Router = typeof router
