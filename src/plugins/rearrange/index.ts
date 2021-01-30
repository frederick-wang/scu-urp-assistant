import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'
import { getBrowser } from '@/helper/util'

// 重新布局插件
export const Rearrange: SUAPlugin = {
  name: 'rearrange',
  displayName: '界面重排',
  icon: getPluginIcon('rearrange'),
  isNecessary: false,
  defaultEnabledState: true,
  brief: '重组教务系统中部分页面中功能的位置。',
  pathname: ['/', '/index.jsp'],
  init() {
    if (getBrowser().type !== 'IE' || getBrowser().version > 11) {
      // 将上端三个挂件的容器设置为Flex布局
      $('#page-content-template .col-xs-12 > .row')
        .css('display', 'flex')
        .css('flex-wrap', 'wrap')
      // 乾坤大挪移
      $('#page-content-template .col-sm-6')
        .eq(1)
        .after($('#page-content-template .col-sm-6').eq(2))
      $('#page-content-template .col-sm-6')
        .eq(0)
        .before($('#page-content-template .col-sm-6').eq(1))
      // 通知
      $('#page-content-template .col-sm-6')
        .eq(0)
        .css('flex', '2')
        .css('min-width', '500px')
        .css('padding-right', '0')
        .css('margin-bottom', '15px')
        .children('.widget-box')
        .css('height', '100%')
      $('#notices a')
        .css('display', 'flex')
        .css('align-items', 'center')
        .each((index, $element) => {
          $element.style.setProperty('padding-left', '0', 'important')
          $element.style.setProperty('padding-right', '0', 'important')
          const title = $($element).attr('title')
          const nodeValue = $($element).prop('firstChild').nodeValue
          $($element).prop('firstChild').nodeValue = ''
          $($element).prepend(
            `<span class="notice-title" style="flex: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding-left: 15px;">${title ||
              nodeValue}</span>`
          )
        })
      $('#notices h3')
        .css('display', 'flex')
        .css('align-items', 'center')
        .css('height', 'auto')
      $('#notices label')
        .css('width', '100px')
        .css('text-align', 'right')
      // 学业信息
      $('#page-content-template .col-sm-6')
        .eq(1)
        .css('flex', '1')
        .css('min-width', '250px')
        .css('margin-bottom', '15px')
        .children('.widget-box')
        .css('margin', '0')
        .find('.widget-main')
        .css('padding', '0')
        .find('.infobox')
        .css('width', '100%')
        .css('border', 'none')
        .css('margin', '0')
      // 待办任务
      $('#page-content-template .col-sm-6')
        .eq(2)
        .css('flex', '1')
        .css('min-width', '250px')
        .css('padding-right', '12px')
        .css('margin-bottom', '15px')
        .children('.widget-box')
        .css('height', '100%')
    }
  }
}
