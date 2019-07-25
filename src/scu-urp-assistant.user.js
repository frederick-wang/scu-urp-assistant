// ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    http://zhaoji.wang/
// @version      0.9.3
// @description  四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个Bookmarklet在点击后运行。目前包括的功能有：1. 一键评教的功能。2. 恢复登陆页面的「两周之内不必登录」选项。3. 增强绩点与均分的计算功能。4. 增加查询全校专业的培养方案与指导性教学计划的功能
// @author       Zhaoji Wang
// @include      http://202.115.47.141/*
// @include      http://zhjw.scu.edu.cn/*
// @include      http://zhjwwx.scu.edu.cn:8080/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

const sua = require('./sua-core')

;(function() {
  if (!window.jQuery) {
    var HEAD =
      document.getElementsByTagName('head')[0] || document.documentElement
    var src = 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js'
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.onload = function() {
      // 必须等页面加载完之后再初始化，否则此时页面结构还没加载出来，document里面内容不全
      window.$(() => {
        sua.init()
      })
    }
    script.setAttribute('src', src)
    HEAD.appendChild(script)
  } else {
    // 必须等页面加载完之后再初始化，否则此时页面结构还没加载出来，document里面内容不全
    window.$(() => {
      sua.init()
    })
  }
})()
