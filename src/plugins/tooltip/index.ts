// 提示信息插件
import { version } from '../../../package.json'

export default {
  name: 'tooltip',
  pathname: '/**',
  init() {
    if (window.location.pathname === '/login') {
      const $loginTooltip = window.$(require('./loginTooltip.pug')({ version }))
      window.$('#formContent').prepend($loginTooltip)
    } else {
      const $navTooltip = window.$(require('./navTooltip.pug')({ version }))
      window
        .$(
          '#navbar-container > div.navbar-buttons.navbar-header.pull-right > ul'
        )
        .children('li')
        .eq(1)
        .before($navTooltip)
    }
  }
}
