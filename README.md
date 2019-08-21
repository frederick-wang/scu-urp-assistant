# 四川大学综合教务系统助手

![GitHub package.json version](https://img.shields.io/github/package-json/v/frederick-wang/scu-urp-assistant)
![GitHub language count](https://img.shields.io/github/languages/count/frederick-wang/scu-urp-assistant)
![GitHub top language](https://img.shields.io/github/languages/top/frederick-wang/scu-urp-assistant)
![GitHub](https://img.shields.io/github/license/frederick-wang/scu-urp-assistant)

## Description

四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个 Bookmarklet 在点击后运行。

介绍主页为：https://zhaoji.wang/sichuan-university-urp-assistant/

src 目录下是源代码，dist 目录下是打包好的 Userscript 与 Bookmarklet。

编译前，别忘了先用 npm install 安装依赖

开发时运行 npm start 或者 npm run dev 均可，编译出的是带调试信息的 Userscript，而且可以自动监视文件变化并增量编译，不过应用新的 Userscript 仍然需要手动刷新浏览器页面。

编译命令为：npm run build
