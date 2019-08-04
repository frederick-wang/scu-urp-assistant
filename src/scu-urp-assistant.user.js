import sua from './sua-core'

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
