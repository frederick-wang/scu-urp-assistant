import 'core-js/stable'
import 'regenerator-runtime/runtime'
import fastEvaluation from '@/plugins/fast-evaluation'
import tooltip from '@/plugins/tooltip'
import recoverRememberMe from '@/plugins/recover-remember-me'
import gpa from '@/plugins/gpa'
import trainingScheme from '@/plugins/training-scheme'
import scoresInformation from '@/plugins/scores-information'
import submitData from '@/plugins/user-experience-improvement-program'
import dataAnalysis from '@/plugins/data-analysis'
import { urlTrigger } from '@/utils'
import { init as initStore, state } from './store'
import { logger } from '@/utils'

declare global {
  interface Window {
    $sua: {
      [key: string]: any
    }
    TDAPP: {
      onEvent: (EventId: string, Label?: string, MapKv?: Object) => void
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

const plugins: SUAPlugin[] =
  window.location.pathname === '/login'
    ? [dataAnalysis, tooltip, recoverRememberMe]
    : [
        dataAnalysis,
        tooltip,
        fastEvaluation,
        gpa,
        trainingScheme,
        scoresInformation,
        submitData
      ]

/**
 * 定时任务的执行间隔
 */
const taskTimeInterval = 100

// 挂载到 window 上的全局对象
export default {
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
  menuQueue: [] as SUAPluginMenu[],
  /**
   * 初始化 SCU URP 助手
   */
  async init() {
    logger.info('程序初始化')
    window.$sua = this
    if (window.location.pathname !== '/login') {
      // 初始化Store
      await initStore()
    }
    // 加载插件
    for (let plugin of this.plugins) {
      if (urlTrigger(plugin)) {
        // 将样式推入队列中
        if (plugin.style) {
          this.styleQueue.push(plugin.style)
        }
        // 将初始化方法推入队列中
        if (plugin.init) {
          this.initQueue.push(plugin.init.bind(plugin))
        }
        // 将需要定时执行的任务推入队列中
        if (plugin.task) {
          this.taskQueue.push(plugin.task.bind(plugin))
        }
      }
      // 将菜单推入队列中
      if (plugin.menu) {
        this.menuQueue = this.menuQueue.concat(plugin.menu)
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
    }, taskTimeInterval)
    // 加载菜单
    for (const m of this.menuQueue) {
      let {
        rootMenuId,
        rootMenuName,
        id: menuId,
        name: menuName,
        item: items
      } = m
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
      if (!Array.isArray(items)) {
        items = [items]
      }
      items.forEach(({ name, style, route, breadcrumbs, render }) => {
        const id = `menu-item-${name}`
        $menu.append(`
          <li class="sua-menu-item" id="${id}">
            <a href="#">&nbsp;&nbsp; ${name}</a>
            <b class="arrow"></b>
          </li>
        `)
        const $menuItem = $menu.children(`#${id}`)
        $menuItem.click(() => {
          $menu.children('.sua-menu-item').removeClass('active')
          $menuItem.addClass('active')
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
            <li class="active" onclick="ckickTopMenu(this);return false;" id="lastmenu" menuid="${id}">${
            breadcrumbs[2]
          }</li>
          `)
          const $pageContent = $('.main-content>.page-content')
          $pageContent.empty()
          const hash = `#sua_route=${route}`
          // NOTE: 如果不这么写，hash就会被莫名其妙的清除掉。。。
          setTimeout(() => {
            window.location.hash = hash
          }, 0)
          if (style) {
            $('head').append(`
              <style type="text/css">
                ${style}
              </style>
            `)
          }
          render($('.main-content>.page-content')[0])
        })
        if (state.core.route === route) {
          $menuItem.click()
        }
      })
    }
  }
}
