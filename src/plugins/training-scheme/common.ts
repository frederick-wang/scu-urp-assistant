import { version } from '@/../package.json'
import { description } from '@/../package.json'
import { isDev } from '@/utils'

function showLoadingAnimation(containerSelector: string): void {
  const template = `
      <div class="loading-container">
        <div class="lds-dual-ring"></div>
        <div class="lds-title">( º﹃º ) 兆基祈祷中……</div>
      </div>
    `
  $(containerSelector).append(template)
}

function hideLoadingAnimation(): void {
  $('.loading-container').remove()
}

function genFooterHTML(): string {
  const SUA_QRCODE_URL =
    'https://cdn.jsdelivr.net/gh/frederick-wang/scu-urp-assistant@master/src/plugins/training-scheme/assets/scu-urp-assistant-qrcode.png'
  const versionName = `${version} (${isDev() ? 'dev' : 'stable'})`
  const parseDescription = (): {
    intro: string
    featureList: string[][]
  } => {
    const introR = description.match(
      /^(.+)该脚本可以为综合教务系统增加以下功能：/
    )
    const featureListR = description.match(
      /该脚本可以为综合教务系统增加以下功能：(.+)$/
    )
    if (introR && featureListR) {
      return {
        intro: introR[1],
        featureList: featureListR[1]
          .trim()
          .split(/\d+\./)
          .map(v => v.trim())
          .filter(v => v)
          .map(v => v.split(/：|\:/).filter(w => w))
      }
    }
    return {
      intro: '',
      featureList: []
    }
  }
  const { intro, featureList } = parseDescription()
  return `
    <div class="footer-container">
      <div class="row">
        <div class="col-xs-12">
          <div class="wrapper">
            <div class="footer-qrcode">
              <img src="${SUA_QRCODE_URL}" class="qrcode-image" alt="四川大学综合教务系统助手二维码">
            </div>
            <div class="footer-explanation typo">
              <div class="explanation-title h3">长图由【四川大学综合教务系统助手 ${versionName}】生成</div>
              <div class="explanation-content">
                <p>${intro}</p>
                <p>该脚本可以为综合教务系统增加以下功能：</p>
                <ol class="feature-list">
                  ${featureList
                    .map(v => `<li><strong>${v[0]}：</strong>${v[1]}</li>`)
                    .join('')}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

export { showLoadingAnimation, hideLoadingAnimation, genFooterHTML }
