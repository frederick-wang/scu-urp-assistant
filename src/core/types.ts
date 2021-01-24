import { RouteConfig, Router } from './router'

export interface SUAObject {
  plugins: SUAPlugin[]
  pluginsInitQueue: (() => void | Promise<void>)[]
  pluginsTaskQueue: (() => void | Promise<void>)[]
  pluginsStyleQueue: string[]
  pluginsRouteConfigQueue: RouteConfig[]
  pluginsMenuQueue: SUAPluginMenu[]
  readonly router: Router
  start(): Promise<void>
}

// pathname和route至少要有一个
export interface SUAPlugin {
  name: string
  displayName: string
  icon: string
  isNecessary: boolean
  defaultEnabledState: boolean
  brief: string
  pathname?:
    | string
    | string[]
    | boolean
    | (() => boolean)
    | { [key: string]: string }
  route?: RouteConfig | RouteConfig[]
  style?: string
  menu?: SUAPluginMenu | SUAPluginMenu[]
  init?: () => Promise<void> | void
  task?: () => Promise<void> | void
}

export interface SUAPluginMenu {
  rootMenuId: string
  rootMenuName: string
  id: string
  name: string
  item: SUAPluginMenuItem | SUAPluginMenuItem[]
}

export interface SUAPluginMenuItem {
  name: string
  route: string
  breadcrumbs: string[]
}
