// 样式美化插件

const typoCSS = require('./typo.scss').toString()

export default {
  name: 'beautify',
  pathname: true,
  init() {
    // 加载Typo.css样式
    $('head').append(`
      <style type="text/css">
        ${typoCSS}
      </style>
    `)
  }
} as SUAPlugin
