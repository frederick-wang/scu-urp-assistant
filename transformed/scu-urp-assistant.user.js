'use strict';

// ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    http://zhaoji.wang/
// @version      0.7.12
// @description  四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个Bookmarklet在点击后运行。目前包括的功能有：1. 一键评教的功能。2. 为手动评教页面「去除 2 分钟时间限制」
// @author       Zhaoji Wang
// @include      http://202.115.47.141/*
// @include      http://zhjw.scu.edu.cn/*
// @include      http://zhjwwx.scu.edu.cn:8080/*
// @grant        none
// ==/UserScript==

var sua = require('./sua-core');

(function () {
  var HEAD = document.getElementsByTagName('head')[0] || document.documentElement;
  var src = 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js';
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.onreadystatechange = function () {
    if (this.readyState === 'loaded' || this.readyState === 'complete') {
      // 必须等页面加载完之后再初始化，否则此时页面结构还没加载出来，document里面内容不全
      window.$(function () {
        sua.init();
      });
    }
  };
  script.setAttribute('src', src);
  HEAD.appendChild(script);
})();