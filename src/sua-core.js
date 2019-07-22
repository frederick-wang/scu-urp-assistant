const minimatch = require('minimatch')
const fastEvaluation = require('./plugins/fast-evaluation')
const tooltip = require('./plugins/tooltip')
const compatibilityLegacy = require('./plugins/compatibility-legacy')
const fastEvaluationLegacy = require('./plugins/fast-evaluation-legacy')
const recoverRememberMe = require('./plugins/recover-remember-me')
const gpa = require('./plugins/gpa')
const trainingScheme = require('./plugins/training-scheme')
/**
 * 2019-5-27 23:43:26
 * TODO: 加入更友好的查看培养方案（分学期）的功能，以及查询全校所有专业的培养方案的功能。
 * 使用接口：http://zhjw.scu.edu.cn/student/rollManagement/project/3623/1/detail
 */
// 挂载到 window 上的全局对象
const $sua = {
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
  plugins: [
    tooltip,
    fastEvaluation,
    recoverRememberMe,
    gpa,
    trainingScheme
  ],
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
   * 存储菜单的对象
   */
  menuItems: [],
  /**
   * 初始化 SCU URP 助手
   */
  init () {
    // 旧版教务系统兼容
    if (window.location.host === 'zhjwwx.scu.edu.cn:8080') {
      if (window.location.pathname !== '/loginAction.do') {
        return
      }
      const dataLegacy = {
        topFrame: window.frames.topFrame,
        bottomFrame: window.frames.bottomFrame,
        menuFrame: window.frames.bottomFrame.frames.menuFrame,
        mainFrame: window.frames.bottomFrame.frames.mainFrame
      }

      const pluginsLegacy = [compatibilityLegacy, fastEvaluationLegacy]

      window.$sua = Object.assign($sua, dataLegacy)
      for (let plugin of pluginsLegacy) {
        plugin.$sua = $sua
        plugin = Object.assign(plugin, dataLegacy)
        if (plugin.init) {
          this.initQueue.push(plugin.init.bind(plugin))
        }
        if (plugin.task) {
          this.taskQueue.push(plugin.task.bind(plugin))
        }
      }
      for (const i of this.initQueue) {
        i()
      }
      setInterval(() => {
        for (const t of this.taskQueue) {
          t()
        }
      }, this.timeInterval)

      return
    }

    // 将data中的属性注入$sua对象中，使其内部可以用this直接访问
    window.$sua = Object.assign($sua, $sua.data)
    // 加载插件
    for (let plugin of this.plugins) {
      plugin.$sua = $sua
      // 将data中的属性注入plugin对象中，使其内部可以用this直接访问
      plugin = Object.assign(plugin, $sua.data)
      if (urlTrigger(plugin)) {
        // 将样式推入队列中
        if (plugin.style) {
          this.styleQueue.push(plugin.style)
        }
        // 将菜单推入队列中
        if (plugin.menu) {
          this.menuQueue = this.menuQueue.concat(plugin.menu)
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
    }
    // 加载样式
    window.$('head').append(`
      <style type="text/css">
        body, h1, h2, h3, h4, h5, h6 {
          font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        }
      </style>
    `)
    for (const s of this.styleQueue) {
      window.$('head').append(`
        <style type="text/css">
          ${s}
        </style>
      `)
    }
    // 加载菜单
    for (const m of this.menuQueue) {
      const { rootMenuId, rootMenuName, id: menuId, name: menuName, items } = m
      const $rootMenuList = window.$('#menus')
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
      items.forEach(({ name, breadcrumbs, render }) => {
        $menu.append(`
          <li class="sua-menu-item" id="menu-item-${name}" onclick="$sua.menuItems[${this.menuItems.length}].clickHandler()">
            <a href="#">&nbsp;&nbsp; ${name}</a>
            <b class="arrow"></b>
          </li>
        `)
        this.menuItems.push({
          element: $menu.children(`#menu-item-${name}`)[0],
          id: `menu-item-${name}`,
          name,
          clickHandler () {
            window.$sua.menuItems.forEach(v => {
              if (v.id === this.element.id) {
                window.$(v.element).addClass('active')
              } else {
                window.$(v.element).removeClass('active')
              }
            })
            const $breadcrumbs = window.$('.main-content>.breadcrumbs>ul.breadcrumb')
            $breadcrumbs
              .empty()
              .append(`
              <li onclick="javascript:window.location.href='/'" style="cursor:pointer;">
                <i class="ace-icon fa fa-home home-icon"></i>
                首页
              </li>
              <li class="active" onclick="ckickTopMenu(this);return false;" id="firmenu" menuid="${rootMenuId}">${rootMenuName}</li>
              <li class="active" onclick="ckickTopMenu(this);return false;" id="secmenu" menuid="${menuId}">${menuName}</li>
              <li class="active" onclick="ckickTopMenu(this);return false;" id="lastmenu" menuid="${this.element.id}">${this.name}</li>
            `)
            const $pageContent = window.$('.main-content>.page-content')
            $pageContent.empty()
            render(window.$('.main-content>.page-content')[0], window.$)
          }
        })
      })
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
    }, this.taskTimeInterval)

    /**
     * 检测当前的location.pathname是否满足插件触发要求
     *
     * @param {*} plugin 插件对象，pathname 属性可以是 Boolean、String、Array、Object、Function等类型。
     * 如果 pathname 属性不存在，则默认对全体 url 均生效
     * @returns 检测的结果
     */
    function urlTrigger (plugin) {
      const { pathname } = plugin
      // 如果pathname不存在，默认对全部url生效
      if (!pathname) {
        return true
      } else if (typeof pathname === 'boolean') {
        return pathname
      } else if (typeof pathname === 'string') {
        return minimatch(window.location.pathname, pathname)
      } else if (Array.isArray(pathname)) {
        for (const item of pathname) {
          if (minimatch(window.location.pathname, item)) {
            return true
          }
        }
        return false
      } else if (typeof pathname === 'object') {
        for (const item of Object.values(pathname)) {
          if (minimatch(window.location.pathname, item)) {
            return true
          }
        }
        return false
      } else if (typeof pathname === 'function') {
        return pathname.bind(plugin)()
      }
      return false
    }
  }
}

module.exports = $sua
