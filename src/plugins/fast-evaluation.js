// 一键评教插件
const fastEvaluation = {
  name: 'fast-evaluation',
  pathname: '/student/teachingEvaluation/evaluation/index',
  $btn: undefined,
  $prompt: undefined,
  list: [],
  evaluationInterval: 500,
  comments: [
    '老师是很好的，平时课堂上讲课风趣又不失严谨，课下也对同学们的问题有求必应，帮助了我很多。',
    '老师挺不错的，对问题分析的透彻，讲课能切中要害，很喜欢老师的讲课风格。',
    '老师讲课很用心，给我们划定了学习目标，班里同学都学得不错，给分也好。',
    '老师经验很丰富，平时要求适中，注重与我们沟通交流，把知识真正的传递给了我们。',
    '老师讲的内容紧追时代步伐，不过时，讲课风格详实生动，大家都很喜欢。',
    '老师的讲课节奏安排的不错，最后大家对知识掌握的都比较好，复习也比较充分，考试情况不错。'
  ],
  init () {
    this.$btn = window.$('<button class="btn btn-xs btn-round btn-light" id="fast_evaluation_btn" style="margin-left: 5px;">点此给本页所有老师好评！</button>')
    this.$prompt = window.$('<span id="fast_evaluation_prompt" style="margin-left: 10px;"></span>')

    window.$('#close > h4').append(this.$btn, this.$prompt)

    this.$btn.click(this.onClickBtn.bind(this))
  },
  onClickBtn (e) {
    e.preventDefault()
    window.urp.alert('正在收集本页问卷数据……')
    let items = Array.from(document.getElementById('jxpgtbody').getElementsByTagName('button'))
      .filter(item => item.innerText === '评估')
      // 2018-8-31 20:21:20
      // 今天发现 urp 代码有修改，把 evaluationContentContent 从 onClick 函数调用里删除了。
      // 临时这样补上，尽量不做大修改，防止出错。
      .map(item => item.getAttribute('onClick').replace(/evaluationResult\("|evaluation\("|"\);return false;/ig, '') + `","${item.parentElement.parentElement.children[3].innerText}`)
    if (!items.length) {
      window.urp.confirm('本页上的所有教师都已经评教过了，您可以换一页再使用。', () => { })
      return false
    }
    this.list = items.map(item => this.parseName(item))
    this.evaluate(0)
  },
  changePromopt (str) {
    this.$prompt.text(str)
  },
  parseName (data) {
    data = data.split(`","`)
    let [questionnaireCode, questionnaireName, evaluatedPeopleNumber, evaluatedPeople, evaluationContentNumber, evaluationContentContent] = data
    let result = { questionnaireCode, questionnaireName, evaluatedPeopleNumber, evaluatedPeople, evaluationContentNumber, evaluationContentContent }
    return result
  },
  getComment () {
    return encodeURI(this.comments[Math.floor(Math.random() * this.comments.length)])
  },
  evaluate (index) {
    let origin = window.location.origin
    if (index >= this.list.length) {
      this.changePromopt(`本页上的老师已经全部评价完毕！正在刷新……`)
      window.location.href = `${origin}/student/teachingEvaluation/evaluation/index`
      return
    }
    let item = this.list[index]
    let evaluatedPeopleNumber = item.evaluatedPeopleNumber
    let evaluatedPeople = item.evaluatedPeople
    let evaluationContentNumber = item.evaluationContentNumber
    let evaluationContentContent = item.evaluationContentContent
    let questionnaireCode = item.questionnaireCode
    let questionnaireName = item.questionnaireName
    let tokenValue

    this.changePromopt(`正在评价${evaluationContentContent}课程的${evaluatedPeople}老师（${index + 1}/${this.list.length}）`)

    window.$.ajax({
      type: 'POST',
      url: '/student/teachingEvaluation/teachingEvaluation/evaluationPage',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': 1
      },
      data: encodeURI(`evaluatedPeople=${evaluatedPeople}&evaluatedPeopleNumber=${evaluatedPeopleNumber}&questionnaireCode=${questionnaireCode}&questionnaireName=${questionnaireName}&evaluationContentNumber=${evaluationContentNumber}&evaluationContentContent=${evaluationContentContent}`),
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-Requested-With', {
          toString: function () {
            return ''
          }
        })
      },
      error: (xhr) => {
        window.urp.alert(`错误代码[${xhr.readyState}-${xhr.status}]:获取数据失败！`)
      },
      success: (data) => {
        tokenValue = data.match(/<input type="hidden" name="tokenValue" value="(.+)"\/>/i)[1]

        let begin
        let end
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

        let bodyStr = `tokenValue=${tokenValue}&questionnaireCode=${questionnaireCode}&evaluationContentNumber=${evaluationContentNumber}&evaluatedPeopleNumber=${evaluatedPeopleNumber}`
        for (let i = begin; i <= end; i++) {
          let num = ('0000000000' + i).substr(-10)
          bodyStr += `&${num}=10_1`
        }
        bodyStr += `&zgpj=${this.getComment()}`

        window.$.ajax({
          cache: true,
          type: 'POST',
          async: true,
          url: '/student/teachingEvaluation/teachingEvaluation/evaluation',
          data: bodyStr,
          error: (xhr) => {
            window.urp.alert(`错误代码[${xhr.readyState}-${xhr.status}]:获取数据失败！`)
            this.changePromopt(`${evaluatedPeople}（${evaluationContentContent}）评价失败 QAQ，进度：${index + 1}/${this.list.length}`)
          },
          success: (data) => {
            if (data.includes('/')) {
              console.log(data)
            } else if (data === 'success') {
              this.changePromopt(`${evaluatedPeople}（${evaluationContentContent}）评价成功，进度：${index + 1}/${this.list.length}`)
              setTimeout(() => {
                this.evaluate(++index)
              }, this.evaluationInterval)
            } else {
              window.urp.alert('保存失败')
              this.changePromopt(`${evaluatedPeople}（${evaluationContentContent}）评价失败 QAQ，进度：${index + 1}/${this.list.length}`)
            }
          }
        })
      }
    })
  }
}

module.exports = fastEvaluation
