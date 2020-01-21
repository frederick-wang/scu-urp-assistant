import sua from './sua-core'
;((): void => {
  // 必须等页面加载完之后再初始化，否则此时页面结构还没加载出来，document里面内容不全
  $(() => {
    sua.init()
  })
})()
