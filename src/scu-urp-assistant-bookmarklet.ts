import sua from './sua-core'
;(function() {
  if (!window.jQuery) {
    var HEAD =
      document.getElementsByTagName('head')[0] || document.documentElement
    var src = 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js'
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.onload = function() {
      var href = window.location.href
      if (
        href.indexOf('202.115.47.141') !== -1 ||
        href.indexOf('zhjw.scu.edu.cn') !== -1 ||
        href.indexOf('zhjwwx.scu.edu.cn') !== -1
      ) {
        sua.init()
        window.alert('恭喜！启动成功！如果刷新页面，需要再启动一下哦~')
      } else {
        window.alert(
          '抱歉，您当前不处于四川大学 URP 登陆后的页面。请登陆后再使用哦。'
        )
      }
    }
    script.setAttribute('src', src)
    HEAD.appendChild(script)
  } else {
    var href = window.location.href
    if (
      href.indexOf('202.115.47.141') !== -1 ||
      href.indexOf('zhjw.scu.edu.cn') !== -1 ||
      href.indexOf('zhjwwx.scu.edu.cn') !== -1
    ) {
      sua.init()
      window.alert('恭喜！启动成功！如果刷新页面，需要再启动一下哦~')
    } else {
      window.alert(
        '抱歉，您当前不处于四川大学 URP 登陆后的页面。请登陆后再使用哦。'
      )
    }
  }
})()
