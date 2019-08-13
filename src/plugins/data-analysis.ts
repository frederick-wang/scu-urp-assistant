// 数据统计插件
import { version } from '@/../package.json'
import { logger } from '@/utils'

export default {
  name: 'data-analysis',
  pathname: true,
  init() {
    const APP_ID = '36482C98B3E94A4D93A0C66E43702C77'
    const script = document.createElement('script')
    const src = `https://jic.talkingdata.com/app/h5/v1?appid=${APP_ID}&vc=${version}`
    script.setAttribute('src', src)
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onload = () => {
      logger.info(
        `Data Analysis Plugin Loaded Successfully: ${version}`
      )
    }
  }
} as SUAPlugin
