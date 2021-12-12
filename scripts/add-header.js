const fs = require('fs')
const { version, description, author, license } = require('../package.json')

const banner = `// ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    https://zhaoji.wang/
// @version      ${version}
// @description  ${description}
// @author       ${author}
// @license      ${license}
// @include      http://202.115.47.141/*
// @include      http://zhjw.scu.edu.cn/*
// @grant        none
// @run-at       document-end
// @icon         https://gitee.com/frederick-wang/scu-urp-assistant/raw/master/icon.png
// @icon64       https://gitee.com/frederick-wang/scu-urp-assistant/raw/master/icon64.png
// ==/UserScript==

`

const resetNumberScript = `/**
* 教务系统引入的 r-slider.js 会重写 Number 函数，需要将其复原。
*/
function setNumber() {
 var NumberConstructor = Object.getPrototypeOf ? Object.getPrototypeOf(0).constructor : (0).__proto__.constructor;
 if (Number != NumberConstructor) {
   Number = NumberConstructor;
 } else {
   setTimeout(setNumber, 10);
 }
}

setNumber();

`

const scriptPaths = [
  './dist/scu-urp-assistant.user.js',
  './dist/scu-urp-assistant.bookmarklet.js'
]
scriptPaths.forEach(scriptPath => {
  const originalScript = fs.readFileSync(scriptPath).toString()
  const script = banner + resetNumberScript + originalScript
  fs.writeFileSync(scriptPath, script)
})
