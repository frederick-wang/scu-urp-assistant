// ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    http://zhaoji.wang/
// @version      0.8.5
// @description  四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个Bookmarklet在点击后运行。目前包括的功能有：1. 一键评教的功能。2. 为手动评教页面「去除 2 分钟时间限制」。3. 恢复登陆页面的「两周之内不必登录」选项。4. 增强绩点与均分的计算功能。
// @author       Zhaoji Wang
// @include      http://202.115.47.141/*
// @include      http://zhjw.scu.edu.cn/*
// @include      http://zhjwwx.scu.edu.cn:8080/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

const sua = require('./sua-core');

(function () {
  if (!window.jQuery) {
    var HEAD = document.getElementsByTagName('head')[0] || document.documentElement
    var src = 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js'
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.onload = function () {
      var href = window.location.href
      if (href.indexOf('202.115.47.141') !== -1 || href.indexOf('zhjw.scu.edu.cn') !== -1 || href.indexOf('zhjwwx.scu.edu.cn') !== -1) {
        sua.init()
        window.alert('恭喜！启动成功！如果刷新页面，需要再启动一下哦~')
      } else {
        window.alert('抱歉，您当前不处于四川大学 URP 登陆后的页面。请登陆后再使用哦。')
      }
    }
    script.setAttribute('src', src)
    HEAD.appendChild(script)
  } else {
    var href = window.location.href
    if (href.indexOf('202.115.47.141') !== -1 || href.indexOf('zhjw.scu.edu.cn') !== -1 || href.indexOf('zhjwwx.scu.edu.cn') !== -1) {
      sua.init()
      window.alert('恭喜！启动成功！如果刷新页面，需要再启动一下哦~')
    } else {
      window.alert('抱歉，您当前不处于四川大学 URP 登陆后的页面。请登陆后再使用哦。')
    }
  }
})()
