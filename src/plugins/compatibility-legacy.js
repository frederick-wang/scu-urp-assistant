// 修复兼容性插件(旧版教务系统)
const compatibilityLegacy = {
  init () {
    this.topFrame.changeLeftMenu = () => {
      if (this.bottomFrame && this.menuFrame && this.menuFrame.menus) {
        this.menuFrame.menus.index = this.topFrame.moduleNum
        this.menuFrame.menus.show()
        this.menuFrame.menus.click()
      }
    }
    this.topFrame.changeLeftMenu()
  },
  task () {
    if (!this.mainFrame.showModalDialog) {
      this.mainFrame.showModalDialog = this.showModalDialog
    }
  },
  showModalDialog (arg1, arg2, arg3) {
    let w
    let h
    let resizable = 'no'
    // 默认窗口需要可以滚动，不然课程表之类的都只能显示一半
    let scroll = 'yes'
    let status = 'no'
    let mdattrs = arg3.split(';')
    for (let i = 0; i < mdattrs.length; i++) {
      let mdattr = mdattrs[i].split(':')
      let n = mdattr[0]
      let v = mdattr[1]
      if (n) {
        n = n.trim().toLowerCase()
      }
      if (v) {
        v = v.trim().toLowerCase()
      }
      if (n === 'dialogheight') {
        h = v.replace('px', '')
      } else if (n === 'dialogwidth') {
        w = v.replace('px', '')
      } else if (n === 'resizable') {
        resizable = v
      } else if (n === 'scroll') {
        scroll = v
      } else if (n === 'status') {
        status = v
      }
    }
    let left = window.screenX + window.outerWidth / 2 - w / 2
    let top = window.screenY + window.outerHeight / 2 - h / 2
    let targetWin = window.open(arg1, arg1, `toolbar=no, location=no, directories=no, status=${status}, menubar=no, scrollbars=${scroll}, resizable=${resizable}, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
    targetWin.focus()
  }
}

module.exports = compatibilityLegacy
