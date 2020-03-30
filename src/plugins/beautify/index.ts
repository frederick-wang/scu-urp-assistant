// 样式美化插件

import { getPluginIcon } from "@/utils"

const typoCSS = require('./typo.scss').toString()

export default {
  name: 'beautify',
  displayName: '界面美化',
  icon: getPluginIcon('beautify'),
  isNecessary: false,
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
