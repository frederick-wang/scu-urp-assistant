'use strict';

// 修复兼容性插件(旧版教务系统)
var compatibilityLegacy = {
  init: function init() {
    var _this = this;

    this.topFrame.changeLeftMenu = function () {
      if (_this.bottomFrame && _this.menuFrame && _this.menuFrame.menus) {
        _this.menuFrame.menus.index = _this.topFrame.moduleNum;
        _this.menuFrame.menus.show();
        _this.menuFrame.menus.click();
      }
    };
    this.topFrame.changeLeftMenu();
  },
  task: function task() {
    if (!this.mainFrame.showModalDialog) {
      this.mainFrame.showModalDialog = this.showModalDialog;
    }
  },
  showModalDialog: function showModalDialog(arg1, arg2, arg3) {
    var w = void 0;
    var h = void 0;
    var resizable = 'no';
    // 默认窗口需要可以滚动，不然课程表之类的都只能显示一半
    var scroll = 'yes';
    var status = 'no';
    var mdattrs = arg3.split(';');
    for (var i = 0; i < mdattrs.length; i++) {
      var mdattr = mdattrs[i].split(':');
      var n = mdattr[0];
      var v = mdattr[1];
      if (n) {
        n = n.trim().toLowerCase();
      }
      if (v) {
        v = v.trim().toLowerCase();
      }
      if (n === 'dialogheight') {
        h = v.replace('px', '');
      } else if (n === 'dialogwidth') {
        w = v.replace('px', '');
      } else if (n === 'resizable') {
        resizable = v;
      } else if (n === 'scroll') {
        scroll = v;
      } else if (n === 'status') {
        status = v;
      }
    }
    var left = window.screenX + window.outerWidth / 2 - w / 2;
    var top = window.screenY + window.outerHeight / 2 - h / 2;
    var targetWin = window.open(arg1, arg1, 'toolbar=no, location=no, directories=no, status=' + status + ', menubar=no, scrollbars=' + scroll + ', resizable=' + resizable + ', copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    targetWin.focus();
  }
};

module.exports = compatibilityLegacy;