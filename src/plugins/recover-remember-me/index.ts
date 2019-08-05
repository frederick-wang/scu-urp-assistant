// 恢复登录页面的「两周之内不必登录」选项插件
export default {
  name: 'recover-remember-me',
  pathname: '/login',
  init() {
    const $rememberMe = $(require('./rememberMe.pug')())
    $('#loginButton').before($rememberMe)
  }
}
