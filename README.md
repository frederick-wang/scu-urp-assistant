# 四川大学综合教务系统助手

#### Description
四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个Bookmarklet在点击后运行。

介绍主页为：https://zhaoji.wang/sichuan-university-urp-assistant/

src目录下是源代码，dist目录下是打包好的Userscript与Bookmarklet。

编译前，别忘了先用 npm install 安装依赖

开发时运行 npm start 或者 npm run dev 均可，编译出的是带调试信息的Userscript，而且可以自动监视文件变化并增量编译，不过应用新的Userscript仍然需要手动刷新浏览器页面。

编译命令为：npm run build
