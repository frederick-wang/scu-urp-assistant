import sua from './sua-core'
;((): void => {
  const href = window.location.href
  if (
    href.indexOf('202.115.47.141') !== -1 ||
    href.indexOf('zhjw.scu.edu.cn') !== -1
  ) {
    sua.init()
    window.alert('恭喜！启动成功！如果刷新页面，需要再启动一下哦~')
  } else {
    window.alert(
      '抱歉，您当前不处于四川大学 URP 登陆后的页面。请登陆后再使用哦。'
    )
  }
})()
