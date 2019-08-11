declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// pathname和route至少要有一个
interface SUAPlugin {
  name: string
  pathname?:
    | string
    | string[]
    | boolean
    | (() => boolean)
    | { [key: string]: string }
  route?:
    | string
    | string[]
    | boolean
    | (() => boolean)
    | { [key: string]: string }
  style?: string
  menu?: SUAPluginMenu | SUAPluginMenu[]
  init?: () => any
  task?: () => any
}

interface SUAPluginMenu {
  rootMenuId: string
  rootMenuName: string
  id: string
  name: string
  item: SUAPluginMenuItem | SUAPluginMenuItem[]
}

interface SUAPluginMenuItem {
  name: string
  style?: string
  route: string
  breadcrumbs: string[]
  render: ((root: HTMLElement) => Promise<void>) | ((root: HTMLElement) => void)
}
