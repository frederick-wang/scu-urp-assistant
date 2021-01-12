# 四川大学综合教务系统助手

![GitHub package.json version](https://img.shields.io/github/package-json/v/frederick-wang/scu-urp-assistant)
![GitHub language count](https://img.shields.io/github/languages/count/frederick-wang/scu-urp-assistant)
![GitHub top language](https://img.shields.io/github/languages/top/frederick-wang/scu-urp-assistant)
![GitHub](https://img.shields.io/github/license/frederick-wang/scu-urp-assistant)

## 简介

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

此外，还需要用 `env` 文件配置环境变量。在调试时，程序会加载 `.env.development` 文件，在打包发布的版本中，程序会加载 `.env.production` 文件。这两个文件均会被 `git` 忽略。目前程序会调用的变量共有 2 个，分别为：

- API_PATH
- API_PATH_V2

您可以将 API Server 部署在您自己的服务器上，也可以直接将这两个变量设置到我的服务器上：

```
API_PATH=https://sua.zhaoji.wang/api/v1
API_PATH_V2=https://api.scu.plus/sua/v2
```

功能依赖 `API Server` 的插件包括：

- 专业授位查询
- 培养方案相关
- 历届大创查询
- 课程信息交流
- 用户体验改善计划

## 打包编译

编译命令为：

```
npm run build
```

编译并分析 Package 所占大小命令为：

```
npm run analyze
```

## 打赏作者

自2018年5月20日以来，SCU URP 助手已经更新了91个版本，编写了8000多行代码。在这两年的时间中，作者不断地跟进综合教务系统的升级与变化，保证旧的功能稳定可用；同时也不断地听取同学们的反馈，持续地为助手加入新的有用的功能，从未停止过前进的步伐。

如果您使用过 SCU URP 助手后觉得很好用，确实帮助到了您，可以考虑请作者喝一杯咖啡或者吃一碗泡面哦。

非常感谢您的打赏，SCU URP 助手会因您的帮助而越变越好！作者也会在每个吃泡面的凌晨想起您的！

<img src="https://typora-images.cdn.zhaoji.wang/1590444582.jpg" alt="支付宝收款码" height=360> <img src="https://typora-images.cdn.zhaoji.wang/mm_facetoface_collect_qrcode_1590444571616.png" alt="微信支付收款码" height=360>
