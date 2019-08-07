import 'core-js/stable'
import 'regenerator-runtime/runtime'
import fastEvaluation from './plugins/fast-evaluation'
import sharedData from './plugins/shared-data'
import tooltip from './plugins/tooltip'
import recoverRememberMe from './plugins/recover-remember-me'
import gpa from './plugins/gpa'
import trainingScheme from './plugins/training-scheme'
import scoresInformation from './plugins/scores-information'
import { urlTrigger } from './utils/basic'

const plugins = [
  sharedData,
  tooltip,
  fastEvaluation,
  recoverRememberMe,
  gpa,
  trainingScheme,
  scoresInformation
]

declare global {
  interface Window {
    $sua: {
      menuItems: MenuItem[]
    }
    __$SUA_SHARED_DATA__?: {
      core: {
        suaPath: string
      }
      academicInfo: {
        courseNumber: number
        currentSemester: string
        gpa: number
        currentSemesterCourseNumber: number
        failedCourseNumber: number
      }
    }
    layer: {
      open: (a: any) => number
      close: (a: any) => number
      msg: (a: any, b?: any, c?: any) => void
    }
    urp: {
      alert: (msg: string, callback?: Function) => void
      confirm: (msg: string, callback?: Function) => void
    }
    toSelect: (obj: HTMLElement) => void
    __$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__?: (
      containerSelector: string
    ) => void
    __$SUA_TRAINING_SCHEME_QUERY__?: () => Promise<void>
  }
}

interface Menu {
  rootMenuId: string
  rootMenuName: string
  id: string
  name: string
  items: Array<{
    name: string
    path: string
    breadcrumbs: string[]
    render: (root: any) => void
  }>
}

interface MenuItem {
  element: HTMLElement
  id: string
  name: string
  path: string
  clickHandler: () => void
}

// 挂载到 window 上的全局对象
export default {
  // 属性值的存放处
  data: {
    /**
     * 定时任务的执行间隔
     */
    taskTimeInterval: 100
  },
  /**
   * 插件
   */
  plugins,
  /**
   * 初始化任务的队列
   */
  initQueue: [] as Array<Function>,
  /**
   * 定时执行的任务的队列
   */
  taskQueue: [] as Array<Function>,
  /**
   * 加载样式的队列
   */
  styleQueue: [] as string[],
  /**
   * 加载菜单的队列
   */
  menuQueue: [] as Menu[],
  /**
   * 存储菜单的对象
   */
  menuItems: [] as MenuItem[],
  /**
   * 初始化 SCU URP 助手
   */
  init() {
    // 将data中的属性注入$sua对象中，使其内部可以用this直接访问
    window.$sua = Object.assign(this, this.data)
    // 加载插件
    for (let plugin of this.plugins) {
      if (urlTrigger(plugin)) {
        // 将样式推入队列中
        if ((plugin as any).style) {
          this.styleQueue.push((plugin as any).style)
        }
        // 将菜单推入队列中
        if ((plugin as any).menu) {
          this.menuQueue = this.menuQueue.concat((plugin as any).menu)
        }
        // 将初始化方法推入队列中
        if ((plugin as any).init) {
          this.initQueue.push((plugin as any).init.bind(plugin))
        }
        // 将需要定时执行的任务推入队列中
        if ((plugin as any).task) {
          this.taskQueue.push((plugin as any).task.bind(plugin))
        }
      }
    }
    // 加载样式
    $('head').append(`
      <style type="text/css">
        body, h1, h2, h3, h4, h5, h6 {
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
      </style>
    `)
    for (const s of this.styleQueue) {
      $('head').append(`
        <style type="text/css">
          ${s}
        </style>
      `)
    }
    // 初始化方法
    for (const i of this.initQueue) {
      i()
    }
    // 定时任务
    setInterval(() => {
      for (const t of this.taskQueue) {
        t()
      }
    }, this.data.taskTimeInterval)
    // 加载菜单
    for (const m of this.menuQueue) {
      const { rootMenuId, rootMenuName, id: menuId, name: menuName, items } = m
      const $rootMenuList = $('#menus')
      // 检查根菜单是否存在，如不存在则新建
      if (!$rootMenuList.children(`li#${rootMenuId}`).length) {
        $rootMenuList.append(`
          <li class="hsub sua-menu-list" id="${rootMenuId}" onclick="rootMenuClick(this);">
            <a href="#" class="dropdown-toggle">
              <i class="menu-icon fa fa-gavel"></i>
              <span class="menu-text">${rootMenuName}</span>
              <b class="arrow fa fa-angle-down"></b>
            </a>
            <b class="arrow"></b>
            <ul class="submenu nav-hide" onclick="stopHere();" style="display: none;">
            </ul>
          </li>
        `)
      }
      const $rootMenu = $rootMenuList.find(`li#${rootMenuId}>ul.submenu`)
      // 检查菜单是否存在，如不存在则新建
      if (!$rootMenu.children(`li#${menuId}`).length) {
        $rootMenu.append(`
          <li class="hsub open sua-menu" id="${menuId}">
            <a href="#" class="dropdown-toggle">
              <i class="menu-icon fa fa-caret-right"></i>${menuName}
              <b class="arrow fa fa-angle-down"></b></a>
            <b class="arrow"></b>
            <ul class="submenu nav-show" style="display: block;">
            </ul>
          </li>
        `)
      }
      const $menu = $rootMenu.find(`li#${menuId}>ul.submenu`)
      items.forEach(({ name, path, breadcrumbs, render }) => {
        $menu.append(`
          <li class="sua-menu-item" id="menu-item-${name}" onclick="$sua.menuItems[${
          this.menuItems.length
        }].clickHandler()">
            <a href="#">&nbsp;&nbsp; ${name}</a>
            <b class="arrow"></b>
          </li>
        `)
        const menuItem = {
          element: $menu.children(`#menu-item-${name}`)[0],
          id: `menu-item-${name}`,
          name,
          path,
          clickHandler() {
            window.$sua.menuItems.forEach(v => {
              if (v.id === this.element.id) {
                $(v.element).addClass('active')
              } else {
                $(v.element).removeClass('active')
              }
            })
            const $breadcrumbs = $('.main-content>.breadcrumbs>ul.breadcrumb')
            $breadcrumbs.empty().append(`
              <li onclick="javascript:window.location.href='/'" style="cursor:pointer;">
                <i class="ace-icon fa fa-home home-icon"></i>
                首页
              </li>
              <li class="active" onclick="ckickTopMenu(this);return false;" id="firmenu" menuid="${rootMenuId}">${
              breadcrumbs[0]
            }</li>
              <li class="active" onclick="ckickTopMenu(this);return false;" id="secmenu" menuid="${menuId}">${
              breadcrumbs[1]
            }</li>
              <li class="active" onclick="ckickTopMenu(this);return false;" id="lastmenu" menuid="${
                this.element.id
              }">${breadcrumbs[2]}</li>
            `)
            const $pageContent = $('.main-content>.page-content')
            $pageContent.empty()
            const hash = `#suapath=${this.path}`
            // NOTE: 如果不这么写，hash就会被莫名其妙的清除掉。。。
            setTimeout(() => {
              window.location.hash = hash
            }, 0)
            render($('.main-content>.page-content')[0])
          }
        }
        this.menuItems.push(menuItem)
        if (
          window.__$SUA_SHARED_DATA__ &&
          window.__$SUA_SHARED_DATA__.core.suaPath === path
        ) {
          menuItem.element.click()
        }
      })
    }
  }
}
