import sua from './sua-core'
import { isSCU } from './helper/judger'
;((): void => {
  // 必须等页面加载完之后再初始化，否则此时页面结构还没加载出来，document里面内容不全
  $(() => {
    if (!isSCU()) {
      window.alert(
        '您好！当前激活脚本的网站并不是四川大学综合教务系统，部分功能将被禁用哦。'
      )
    }
    sua.init()
  })
})()
