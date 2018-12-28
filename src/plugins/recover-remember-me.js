// 恢复登录页面的「两周之内不必登录」选项插件
const recoverRememberMe = {
  name: 'recover-remember-me',
  pathname: '/login',
  $rememberMe: void 0,
  init () {
    this.$rememberMe = window.$(`
      <div style="margin: 5px 0;">
        <input
          type="checkbox"
          name="_spring_security_remember_me"
          class="fadeIn third"
          style="margin-bottom: 5px;text-align: left;"
        >
        &nbsp;两周之内不必登录
      </div>`)
    window.$('#loginButton').before(this.$rememberMe)
  }
}

module.exports = recoverRememberMe
