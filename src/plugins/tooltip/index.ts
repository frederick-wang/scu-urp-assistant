// 提示信息插件
import { version } from '@/../package.json'
import { logger } from '@/utils'

export default {
  name: 'tooltip',
  pathname: true,
  init() {
    const versionName = `${version} (${
      process.env.NODE_ENV === 'development' ? 'dev' : 'stable'
    })`
    if (window.location.pathname === '/login') {
      const $loginTooltip = $(require('./loginTooltip.pug')({ version: versionName }))
      $('#formContent').prepend($loginTooltip)
    } else {
      const $navTooltip = $(require('./navTooltip.pug')({ version: versionName }))
      $('#navbar-container > div.navbar-buttons.navbar-header.pull-right > ul')
        .children('li')
        .eq(1)
        .before($navTooltip)
    }
  }
} as SUAPlugin
