import sua from './sua-core'
import { isSCU } from './utils'
;((): void => {
  if (isSCU()) {
    sua.init()
    window.alert('恭喜！启动成功！如果刷新页面，需要再启动一下哦~')
  } else {
    window.alert(
      '抱歉，您当前不处于四川大学 URP 登陆后的页面。请登陆后再使用哦。'
    )
  }
})()
