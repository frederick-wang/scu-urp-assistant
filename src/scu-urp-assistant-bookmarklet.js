// ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    http://zhaoji.wang/
// @version      0.6
// @description  四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个Bookmarklet在点击后运行。目前包括的功能有：1. 修复 SCU URP 在 Firefox、Chrome等现代化浏览器下无法正常使用的问题；2. 增加一键评教的功能。
// @author       Zhaoji Wang
// @include      http://202.115.47.141/loginAction.do
// @include      http://zhjw.scu.edu.cn/loginAction.do
// @grant        none
// ==/UserScript==

(function () {
  var href = window.location.href
  if (href === 'http://202.115.47.141/loginAction.do' || href === 'http://zhjw.scu.edu.cn/loginAction.do') {
    // 修复兼容性插件
    let compatibility = {
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
    // 一键评教插件
    let fastEvaluation = {
      list: [],
      btn: void 0,
      span: void 0,
      evaluationInterval: 500,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Cache-Control': 'max-age=0',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Upgrade-Insecure-Requests': '1'
      },
      task () {
        if (this.mainFrame.location.pathname.indexOf('jxpgXsAction') !== -1) {
          if (this.mainFrame.document.getElementsByTagName('body').length) {
            if (this.isListPage() && !this.mainFrame.evaluationHacked) {
              this.btn = document.createElement('button')
              let node = document.createTextNode('给本页所有老师好评！')
              this.span = document.createElement('span')
              let td = document.createElement('td')
              this.btn.appendChild(node)
              td.appendChild(this.btn)
              td.appendChild(this.span)
              let tblHead = this.mainFrame.document.getElementById('tblHead')
              tblHead.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].appendChild(td)
              this.mainFrame.evaluationHacked = true
              this.btn.onclick = this.onClickBtn.bind(this)
            }
          }
        }
      },
      onClickBtn (e) {
        e.preventDefault()
        this.changePromopt('正在收集本页问卷数据……')
        let names = Array.from(this.mainFrame.document.getElementsByTagName('img'))
          .filter(item => item.getAttribute('title') === '评估')
          .map(item => item.name)
          .filter(item => (item && item !== 'goto'))
        if (!names.length) {
          window.alert('本页上的所有教师都已经评教过了，您可以换一页再使用。')
          this.changePromopt('本页上的所有教师都已经评教过了，您可以换一页再使用。')
          return
        }
        this.list = names.map(item => this.parseName(item))
        this.evaluate(0)
      },
      parseName (data) {
        data = data.split('#@')
        let [wjbm, bpr, bprm, wjmc, pgnrm, pgnr] = data
        let oper
        switch (wjmc) {
          case '研究生助教评价':
          case '学生评教（体育教学）':
          case '学生评教（课堂教学）':
          case '学生评教（实践教学）':
          case '学生评教（实验教学）':
            oper = 'wjShow'
            break
          default:
            console.log('无效的问卷名称：' + wjmc)
            return
        }
        let result = { wjbm, bpr, bprm, wjmc, pgnrm, pgnr, oper }
        return result
      },
      getComment () {
        let comments = [
          '%C0%CF%CA%A6%CA%C7%BA%DC%BA%C3%B5%C4%A3%AC%C6%BD%CA%B1%BF%CE%CC%C3%C9%CF%BD%B2%BF%CE%B7%E7%C8%A4%D3%D6%B2%BB%CA%A7%D1%CF%BD%F7%A3%AC%BF%CE%CF%C2%D2%B2%B6%D4%CD%AC%D1%A7%C3%C7%B5%C4%CE%CA%CC%E2%D3%D0%C7%F3%B1%D8%D3%A6%A3%AC%B0%EF%D6%FA%C1%CB%CE%D2%BA%DC%B6%E0%A1%A3',
          '%C0%CF%CA%A6%CD%A6%B2%BB%B4%ED%B5%C4%A3%AC%B6%D4%CE%CA%CC%E2%B7%D6%CE%F6%B5%C4%CD%B8%B3%B9%A3%AC%BD%B2%BF%CE%C4%DC%C7%D0%D6%D0%D2%AA%BA%A6%A3%AC%BA%DC%CF%B2%BB%B6%C0%CF%CA%A6%B5%C4%BD%B2%BF%CE%B7%E7%B8%F1%A1%A3',
          '%C0%CF%CA%A6%BD%B2%BF%CE%BA%DC%D3%C3%D0%C4%A3%AC%B8%F8%CE%D2%C3%C7%BB%AE%B6%A8%C1%CB%D1%A7%CF%B0%C4%BF%B1%EA%A3%AC%B0%E0%C0%EF%CD%AC%D1%A7%B6%BC%D1%A7%B5%C3%B2%BB%B4%ED%A3%AC%B8%F8%B7%D6%D2%B2%BA%C3%A1%A3',
          '%C0%CF%CA%A6%BE%AD%D1%E9%BA%DC%B7%E1%B8%BB%A3%AC%C6%BD%CA%B1%D2%AA%C7%F3%CA%CA%D6%D0%A3%AC%D7%A2%D6%D8%D3%EB%CE%D2%C3%C7%B9%B5%CD%A8%BD%BB%C1%F7%A3%AC%B0%D1%D6%AA%CA%B6%D5%E6%D5%FD%B5%C4%B4%AB%B5%DD%B8%F8%C1%CB%CE%D2%C3%C7%A1%A3',
          '%C0%CF%CA%A6%BD%B2%B5%C4%C4%DA%C8%DD%BD%F4%D7%B7%CA%B1%B4%FA%B2%BD%B7%A5%A3%AC%B2%BB%B9%FD%CA%B1%A3%AC%BD%B2%BF%CE%B7%E7%B8%F1%CF%EA%CA%B5%C9%FA%B6%AF%A3%AC%B4%F3%BC%D2%B6%BC%BA%DC%CF%B2%BB%B6%A1%A3',
          '%C0%CF%CA%A6%B5%C4%BD%B2%BF%CE%BD%DA%D7%E0%B0%B2%C5%C5%B5%C4%B2%BB%B4%ED%A3%AC%D7%EE%BA%F3%B4%F3%BC%D2%B6%D4%D6%AA%CA%B6%D5%C6%CE%D5%B5%C4%B6%BC%B1%C8%BD%CF%BA%C3%A3%AC%B8%B4%CF%B0%D2%B2%B1%C8%BD%CF%B3%E4%B7%D6%A3%AC%BF%BC%CA%D4%C7%E9%BF%F6%B2%BB%B4%ED%A1%A3'
        ]
        return comments[Math.floor(Math.random() * comments.length)]
      },
      changePromopt (str) {
        this.span.innerText = str
      },
      isListPage () {
        if (this.mainFrame.location.pathname.indexOf('jxpgXsAction') === -1) {
          return false
        }
        let text = ''
        if (this.mainFrame.document.getElementsByTagName('body').length) {
          text = this.mainFrame.document.getElementsByTagName('body')[0].innerHTML
        }
        if (text.indexOf('每页显示的记录数') !== -1) {
          return true
        }
        return false
      },
      evaluate (index) {
        let origin = window.location.origin
        if (index >= this.list.length) {
          let page = '1'
          if (this.mainFrame.location.search.indexOf('page=') !== -1) {
            page = this.mainFrame.location.search.match(/page=(\d+)/)[1]
          }
          this.changePromopt(`第${page}页上的老师已经全部评价完毕！正在刷新……`)
          this.mainFrame.location.href = `${origin}/jxpgXsAction.do?oper=listWj&page=${page}`
          return
        }
        let item = this.list[index]
        let teacher = item.bpr
        let teacherName = item.bprm
        let subject = item.pgnr
        let subjectName = item.pgnrm
        let questionnaire = item.wjbm
        let questionnaireName = item.wjmc
        let oper = item.oper
        this.changePromopt(`正在评价${subjectName}课程的${teacherName}老师（${index + 1}/${this.list.length}）`)
        let begin = void 0
        let end = void 0
        switch (questionnaireName) {
          case '研究生助教评价':
            begin = 28
            end = 33
            break
          case '学生评教（课堂教学）':
            begin = 36
            end = 42
            break
          case '学生评教（实验教学）':
            begin = 82
            end = 88
            break
          case '学生评教（实践教学）':
            begin = 89
            end = 95
            break
          case '学生评教（体育教学）':
            begin = 96
            end = 102
            break
          default:
            console.log('无效的问卷名称：' + questionnaireName)
            return
        }
        let bodyStr = `wjbm=${questionnaire}&bpr=${teacher}&pgnr=${subject}`
        for (let i = begin; i <= end; i++) {
          let num = ('0000000000' + i).substr(-10)
          bodyStr += `&${num}=10_1`
        }
        bodyStr += `&zgpj=${this.getComment()}`
        window.fetch(`${origin}/jxpgXsAction.do`, {
          'credentials': 'include',
          'headers': this.headers,
          'referrer': origin + '/jxpgXsAction.do?totalrows=25&page=1&pageSize=20',
          'referrerPolicy': 'no-referrer-when-downgrade',
          'body': `wjbm=${questionnaire}&bpr=${teacher}&pgnr=${subject}&oper=${oper}&pageSize=20&page=1&currentPage=1&pageNo=`,
          'method': 'POST',
          'mode': 'cors'
        }).then(response => {
          window.fetch(`${origin}/jxpgXsAction.do?oper=wjpg`, {
            'credentials': 'include',
            'headers': this.headers,
            'referrer': `${origin}/jxpgXsAction.do`,
            'referrerPolicy': 'no-referrer-when-downgrade',
            'body': bodyStr,
            'method': 'POST',
            'mode': 'cors'
          }).then(response => {
            response.text().then(text => {
              if (text.indexOf('location.href=') !== -1) {
                this.changePromopt(`${teacherName}（${subjectName}）评价成功，进度：${index + 1}/${this.list.length}`)
              } else if (text.indexOf('history.back(-1);') !== -1) {
                this.changePromopt(`${teacherName}（${subjectName}）评价失败 QAQ，进度：${index + 1}/${this.list.length}`)
              }
              setTimeout(() => {
                this.evaluate(++index)
              }, this.evaluationInterval)
            })
          })
        })
      }
    }
    // 挂载到 window 上的全局对象
    let $sua = {
      // 属性值的存放处
      data: {
        timeInterval: 100,
        topFrame: window.frames.topFrame,
        bottomFrame: window.frames.bottomFrame,
        menuFrame: window.frames.bottomFrame.frames.menuFrame,
        mainFrame: window.frames.bottomFrame.frames.mainFrame
      },
      // 初始化任务的队列
      initQueue: [],
      // 定时执行的任务的队列
      taskQueue: [],
      // 插件
      plugins: [],
      init () {
        window.$sua = Object.assign($sua, $sua.data)
        for (let plugin of this.plugins) {
          plugin.$sua = $sua
          plugin = Object.assign(plugin, $sua.data)
          if (plugin.init) {
            this.initQueue.push(plugin.init.bind(plugin))
          }
          if (plugin.task) {
            this.taskQueue.push(plugin.task.bind(plugin))
          }
        }
        for (let i of this.initQueue) {
          i()
        }
        setInterval(() => {
          for (let t of this.taskQueue) {
            t()
          }
        }, this.timeInterval)
      }
    }
    $sua.plugins = [compatibility, fastEvaluation]
    $sua.init()
    window.alert('恭喜！修复成功！')
  } else {
    window.alert('抱歉，您当前不处于四川大学 URP 登陆后的页面。请登陆后再使用哦。')
  }
})()
