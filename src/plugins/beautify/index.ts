// 样式美化插件

import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

const typoCSS = require('./typo.scss').toString()

export const Beautify: SUAPlugin = {
  name: 'beautify',
  displayName: '界面美化',
  icon: getPluginIcon('beautify'),
  isNecessary: false,
  defaultEnabledState: false,
  brief: '替换教务系统原有的字体与一些样式。',
  pathname: true,
  init() {
    // 加载Typo.css样式
    $('head').append(`
      <style type="text/css">
        ${typoCSS}
      </style>
    `)
  }
}
