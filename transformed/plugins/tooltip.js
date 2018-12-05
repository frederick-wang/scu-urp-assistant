'use strict';

// 提示信息插件
var tooltip = {
  name: 'tooltip',
  pathname: '/**',
  $loginTooltip: undefined,
  $navTooltip: undefined,
  version: '0.7.7',
  init: function init() {
    if (window.location.pathname === '/login') {
      this.$loginTooltip = window.$('\n        <span class="sua-tooltip" style="\n          position: absolute;\n          font-size: 12px;\n          top: 10px;\n          right: 15px;\n          color: #909399;\n        ">\n          SCU URP \u52A9\u624B ' + this.version + '\n        </span>');
      window.$('#formContent').prepend(this.$loginTooltip);
    } else {
      this.$navTooltip = window.$('\n        <li class="light-orange" style="text-align: center">\n            <a href="#"\n              onclick="javascript:window.open(\'https://zhaoji.wang/sichuan-university-urp-assistant/\');\n            ">\n              <i class="ace-icon fa fa-gavel"></i> SCU URP \u52A9\u624B ' + this.version + '\n            </a>\n        </li>');
      window.$('#navbar-container > div.navbar-buttons.navbar-header.pull-right > ul').prepend(this.$navTooltip);
    }
  }
};

module.exports = tooltip;