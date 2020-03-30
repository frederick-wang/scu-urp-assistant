import { getPluginIcon } from "@/utils"

// 恢复登录页面的「两周之内不必登录」选项插件
export default {
  name: 'recover-remember-me',
  displayName: '自动登录',
  icon: getPluginIcon('recover-remember-me'),
  isNecessary: false,
  pathname: '/login',
  init() {
    const $rememberMe = $(require('./rememberMe.pug')())
    $('#loginButton').before($rememberMe)
  }
} as SUAPlugin
