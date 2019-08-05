// 提示信息插件
export default {
  name: 'tooltip',
  pathname: '/**',
  version: require('../../package.json').version as string,
  init() {
    if (window.location.pathname === '/login') {
      const $loginTooltip = window.$(`
        <span class="sua-tooltip" style="
          position: absolute;
          font-size: 12px;
          top: 10px;
          right: 15px;
          color: #909399;
        ">
          SCU URP 助手 ${this.version}
        </span>`)
      window.$('#formContent').prepend($loginTooltip)
    } else {
      const $navTooltip = window.$(`
        <li class="light-orange" style="text-align: center">
            <a href="#"
              onclick="javascript:window.open('https://zhaoji.wang/sichuan-university-urp-assistant/');
            ">
              <i class="ace-icon fa fa-gavel"></i> SCU URP 助手 ${this.version}
            </a>
        </li>`)
      window
        .$(
          '#navbar-container > div.navbar-buttons.navbar-header.pull-right > ul'
        )
        .children('li')
        .eq(1)
        .before($navTooltip)
    }
  }
}
