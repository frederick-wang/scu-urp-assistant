'use strict';

// 恢复登录页面的「两周之内不必登录」选项插件
var recoverRememberMe = {
  name: 'recover-remember-me',
  pathname: '/login',
  $rememberMe: void 0,
  init: function init() {
    this.$rememberMe = window.$('\n      <div style="margin: 5px 0;">\n        <input\n          type="checkbox"\n          name="_spring_security_remember_me"\n          class="fadeIn third"\n          style="margin-bottom: 5px;text-align: left;"\n        >\n        &nbsp;\u4E24\u5468\u4E4B\u5185\u4E0D\u5FC5\u767B\u5F55\n      </div>');
    window.$('#loginButton').before(this.$rememberMe);
  }
};

module.exports = recoverRememberMe;