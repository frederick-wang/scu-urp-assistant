// ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    http://zhaoji.wang/
// @version      0.7.0
// @description  四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个Bookmarklet在点击后运行。目前包括的功能有：1. 修复 SCU URP 在 Firefox、Chrome等现代化浏览器下无法正常使用的问题；2. 增加一键评教的功能。
// @author       Zhaoji Wang
// @include      http://202.115.47.141/*
// @include      http://zhjw.scu.edu.cn/*
// @grant        none
// ==/UserScript==

const sua = require('./sua-core');

(function () {
  // 必须等页面加载完之后再初始化，否则此时页面结构还没加载出来，document里面内容不全
  window.onload = () => {
    sua.init()
  }
})()
