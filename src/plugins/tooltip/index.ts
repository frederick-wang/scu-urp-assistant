// 提示信息插件
import { version } from '../../../package.json'

export default {
  name: 'tooltip',
  pathname: '/**',
  init() {
    if (window.location.pathname === '/login') {
      const $loginTooltip = $(require('./loginTooltip.pug')({ version }))
      $('#formContent').prepend($loginTooltip)
    } else {
      const $navTooltip = $(require('./navTooltip.pug')({ version }))
      $(
          '#navbar-container > div.navbar-buttons.navbar-header.pull-right > ul'
        )
        .children('li')
        .eq(1)
        .before($navTooltip)
    }
  }
}
