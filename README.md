# 四川大学综合教务系统助手

![GitHub package.json version](https://img.shields.io/github/package-json/v/frederick-wang/scu-urp-assistant)
![GitHub language count](https://img.shields.io/github/languages/count/frederick-wang/scu-urp-assistant)
![GitHub top language](https://img.shields.io/github/languages/top/frederick-wang/scu-urp-assistant)
![GitHub](https://img.shields.io/github/license/frederick-wang/scu-urp-assistant)

## Description

四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个 Bookmarklet 在点击后运行。

介绍主页为：https://zhaoji.wang/sichuan-university-urp-assistant/

## 目录说明

src 目录下是源代码，dist 目录下是打包好的 Userscript 与 Bookmarklet。

## 安装依赖

编译前，别忘了先安装依赖：

```
npm install
```

## 开发调试

开发时运行 `npm start` 或者 `npm run dev` 均可，编译出的是带调试信息的 Userscript，以 `inline-source-map` 模式输出源码，方便开发调试。此外，也可以自动监视文件变化、增量编译，并自动刷新页面。

编译出的 `dev模式脚本` 的路径是 `http://localhost:8080/scu-urp-assistant.user.js`，但是请不要在 Tampermonkey 中直接加载，或者用 `@require` 引入，否则会遭遇缓存问题。建议在 Tampermonkey 中新建一个脚本，例如命名为 `SCU URP Assistant (dev)`，内容为：

```js
// ==UserScript==
// @name         SCU URP Assistant (dev)
// @namespace    http://zhaoji.wang/
// @include      http://202.115.47.141/*
// @include      http://zhjw.scu.edu.cn/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

var remoteScript = document.createElement('script');
remoteScript.src = 'http://localhost:8080/scu-urp-assistant.user.js?ts='+(+new Date());
document.head.appendChild(remoteScript);
```

启动该脚本后，就会自动加载 `dev模式脚本` 了。之后如果本地文件有修改，也会自动监测到文件变化并重新编译，然后自动刷新页面。

## 打包编译

编译命令为：

```
npm run build
```

编译并分析 Package 所占大小命令为：

```
npm run analyze
```
