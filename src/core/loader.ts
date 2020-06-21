import Vue from 'vue'
import {
  Button,
  Switch,
  Tag,
  Alert,
  Loading,
  Message,
  MessageBox,
  Notification
} from 'element-ui'
import JsonViewer from 'vue-json-viewer'
import { routeTrigger } from '@/helper/util'
import { SUAPluginMenu } from './types'

/**
 * 加载 Vue 组件
 *
 */
export const loadElementUI = (): void => {
  // 导入 Element-UI 的样式
  $('head').append(
    '<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"></link>'
  )
  // 导入 Element-UI 组件
  Vue.use(Button)
  Vue.use(Switch)
  Vue.use(Tag)
  Vue.use(Alert)
  Vue.use(Loading.directive)
  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message
  // 导入其他组件
  Vue.use(JsonViewer)
}

/**
 * 加载全局样式表
 *
 */
export const loadGlobalStyle = (): void => {
  const globalStyle = require('@/core/global.scss').toString()
  $('head').append(`
    <style type="text/css">
      ${globalStyle}
    </style>
  `)
}

/**
 * 初始化插件菜单
 *
 * @param {SUAPluginMenu} menu 插件的菜单配置对象
 */
export const loadMenu = (menu: SUAPluginMenu): void => {
  const { rootMenuId, rootMenuName, id: menuId, name: menuName } = menu
  let { item: items } = menu
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
      $menuItem.find('a').prepend("<i class='menu-icon fa fa-caret-right'></i>")
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
      // 因为需要兼容书签版，只有修改 hashtag 不会触发页面的刷新
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
