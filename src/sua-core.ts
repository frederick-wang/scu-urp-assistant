import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import { Loading, Message, MessageBox, Notification } from 'element-ui'
import { pathnameTrigger, routeTrigger } from '@/utils'
import { init as initStore } from '@/store'
import { init as initPlugins } from '@/plugins'
import { logger } from '@/utils'

const globalStyle = require('@/global.scss').toString()

/**
 * 定时任务的执行间隔
 */
const taskTimeInterval = 100

// 挂载到 window 上的全局对象
const suaObject: SUAObject = {
  /**
   * 插件
   */
  plugins: [],
  /**
   * 初始化任务的队列
   */
  initQueue: [],
  /**
   * 定时执行的任务的队列
   */
  taskQueue: [],
  /**
   * 加载样式的队列
   */
  styleQueue: [],
  /**
   * 加载菜单的队列
   */
  menuQueue: [],
  /**
   * 初始化 SCU URP 助手
   */
  async init() {
    logger.info('程序初始化')
    window.$sua = this
    if (window.location.pathname !== '/login') {
      // 导入 Element-UI 的样式
      $('head').append(
        '<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"></link>'
      )
      // 加载全局样式
      $('head').append(`
        <style type="text/css">
          ${globalStyle}
        </style>
      `)
      // 初始化Store
      await initStore()
    }
    this.plugins = await initPlugins()
    // 导入 Element-UI 的 Loading, Message, Notification 和 MessageBox
    Vue.use(Loading.directive)
    Vue.prototype.$loading = Loading.service
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$notify = Notification
    Vue.prototype.$message = Message
    // 加载插件
    for (const plugin of this.plugins) {
      if (pathnameTrigger(plugin.pathname)) {
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
      const { rootMenuId, rootMenuName, id: menuId, name: menuName } = m
      let { item: items } = m
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
          <li class="hsub sua-menu" id="${menuId}">
            <a href="#" class="dropdown-toggle">
              <i class="menu-icon fa fa-caret-right"></i>${menuName}
              <b class="arrow fa fa-angle-down"></b></a>
            <b class="arrow"></b>
            <ul class="submenu nav-show" style="display: none;">
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
          $('.hsub').removeClass('open')
          $('.submenu').css('display', 'none')
          $('.submenu>li').removeClass('active')
          $('.submenu>li>a>.menu-icon').remove()
          $rootMenu.parent().addClass('open')
          $rootMenu.css('display', 'block')
          $menu.parent().addClass('open')
          $menu.css('display', 'block')
          $menuItem.addClass('active')
          $menuItem
            .find('a')
            .prepend("<i class='menu-icon fa fa-caret-right'></i>")
          const $breadcrumbs = $('.main-content>.breadcrumbs>ul.breadcrumb')
          $breadcrumbs.empty().append(`
            <li onclick="javascript:window.location.href='/'" style="cursor:pointer;">
              <i class="ace-icon fa fa-home home-icon"></i>
              首页
            </li>
            <li class="active" onclick="ckickTopMenu(this);return false;" id="firmenu" menuid="${rootMenuId}">${breadcrumbs[0]}</li>
            <li class="active" onclick="ckickTopMenu(this);return false;" id="secmenu" menuid="${menuId}">${breadcrumbs[1]}</li>
            <li class="active" onclick="ckickTopMenu(this);return false;" id="lastmenu" menuid="${id}">${breadcrumbs[2]}</li>
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
        if (routeTrigger(route)) {
          $menuItem.click()
        }
      })
    }
  }
}
export default suaObject
