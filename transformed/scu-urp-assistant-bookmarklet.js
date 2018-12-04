'use strict';

// ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    http://zhaoji.wang/
// @version      0.7.6
// @description  四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个Bookmarklet在点击后运行。目前包括的功能有：1. 一键评教的功能。
// @author       Zhaoji Wang
// @include      http://202.115.47.141/*
// @include      http://zhjw.scu.edu.cn/*
// @grant        none
// ==/UserScript==

var sua = require('./sua-core');

(function () {
  var href = window.location.href;
  if (href.indexOf('202.115.47.141') !== -1 || href.indexOf('zhjw.scu.edu.cn') !== -1) {
    sua.init();
    window.alert('恭喜！启动成功！如果刷新页面，需要再启动一下哦~');
  } else {
    window.alert('抱歉，您当前不处于四川大学 URP 登陆后的页面。请登陆后再使用哦。');
  }
})();