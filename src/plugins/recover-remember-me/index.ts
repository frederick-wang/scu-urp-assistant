import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

// 恢复登录页面的「两周之内不必登录」选项插件
export default {
  name: 'recover-remember-me',
  displayName: '自动登录',
  icon: getPluginIcon('recover-remember-me'),
  isNecessary: true,
  defaultEnabledState: true,
  brief:
    '嫌每次访问教务系统都要重新登录太麻烦？该插件可恢复「两周之内不必登录」选项，免除重复登录的劳累。',
  pathname: '/login',
  init() {
    const $rememberMe = $(require('./rememberMe.pug')())
    $('#loginButton').before($rememberMe)
  }
} as SUAPlugin
