// 一键评教插件
const fastEvaluation = {
  name: 'fast-evaluation',
  pathname: '/student/teachingEvaluation/evaluation/index',
  $btn: undefined,
  $prompt: undefined,
  list: [],
  evaluationInterval: 1000 * 121,
  checkboxWrapperSelectors: {
    '学生评教（课堂教学）': '#ktjx-checkbox-wrapper',
    '学生评教（实验教学）': '#syjx-checkbox-wrapper',
    '学生评教（实践教学）': '#sjjx-checkbox-wrapper',
    '学生评教（实验实践）': '#sysj-checkbox-wrapper',
    '学生评教（体育教学）': '#tyjx-checkbox-wrapper',
    '研究生助教评价': '#yjs-checkbox-wrapper'
  },
  questionsNumberRange: {
    '学生评教（课堂教学）': [107, 108, 123, 127, 128, 129, 131],
    '学生评教（实验教学）': [82, 83, 84, 85, 86, 87, 88],
    '学生评教（实践教学）': [89, 90, 91, 92, 93, 94, 95],
    '学生评教（实验实践）': [132, 133, 134, 135, 136, 137, 138],
    '学生评教（体育教学）': [96, 97, 98, 99, 100, 101, 102],
    '研究生助教评价': [28, 29, 30, 31, 32, 33]
  },
  templates: {
    btn:
      '<button class="btn btn-xs btn-round btn-light" id="fast_evaluation_btn" style="margin-left: 5px;">点此开始一键评教!</button>',
    prompt:
      '<span id="fast_evaluation_prompt" style="margin-left: 10px;"></span>',
    selectionModal: `
      <div id="selection-modal">
        <style>
          #selection-modal {
            padding: 10px 20px;
          }

          .selection-modal-introduction>p {
            font-size: 14px;
            margin-bottom: 10px;
          }

          .selection-modal-introduction>p:last-child {
            margin-bottom: 0;
          }

          .checkbox-wrapper {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
          }

          .checkbox-wrapper:last-child {
            margin-bottom: 0;
          }

          #selection-checkbox-wrapper>.checkbox {
            padding-bottom: 7px;
          }

        </style>
        <form id="selection-form" class="form-horizontal" role="form">
          <div class="row">
            <div class="col-xs-12">
              <div class="selection-modal-introduction">
                <p>所有选中的老师都将被一键满分好评，主观评价会从25条语句库里随机抽取。</p>
                <p>默认所有老师都是选中状态，您只需要取消勾选您想手动评价的老师即可。</p>
              </div>
              <hr>
              <h4 class="lighter blue">学生评教（课堂教学）</h4>
              <div id="ktjx-checkbox-wrapper" class="checkbox-wrapper"></div>
              <h4 class="lighter blue">学生评教（实验教学）</h4>
              <div id="syjx-checkbox-wrapper" class="checkbox-wrapper"></div>
              <h4 class="lighter blue">学生评教（实践教学）</h4>
              <div id="sjjx-checkbox-wrapper" class="checkbox-wrapper"></div>
              <h4 class="lighter blue">学生评教（实验实践）</h4>
              <div id="sysj-checkbox-wrapper" class="checkbox-wrapper"></div>
              <h4 class="lighter blue">学生评教（体育教学）</h4>
              <div id="tyjx-checkbox-wrapper" class="checkbox-wrapper"></div>
              <h4 class="lighter blue">研究生助教评价</h4>
              <div id="yjs-checkbox-wrapper" class="checkbox-wrapper"></div>
            </div>
          </div>
        </form>
      </div>
    `
  },
  comments: [
    '老师是很好的，平时课堂上讲课风趣又不失严谨，课下也对同学们的问题有求必应，帮助了我很多。',
    '老师挺不错的，对问题分析的透彻，讲课能切中要害，很喜欢老师的讲课风格。',
    '老师讲课很用心，给我们划定了学习目标，班里同学都学得不错，给分也好。',
    '老师经验很丰富，平时要求适中，注重与我们沟通交流，把知识真正的传递给了我们。',
    '老师讲的内容紧追时代步伐，不过时，讲课风格详实生动，大家都很喜欢。',
    '老师的讲课节奏安排的不错，最后大家对知识掌握的都比较好，复习也比较充分，考试情况不错。',
    '该课程教学目标目标清楚明白、具体，易激发兴趣，引导自主探究、合作交流、练习设计体现知识的综合运用，形式多样，分量与难度适中，学法指导得当，是一门很不错的课',
    '该课程教学重难点把握准确，教学内容主次分明，抓住关键；结构合理，衔接自然紧凑，从情感、态度与价值观三个维度出发，符合学段教学要求、教材特点与我们实际，是一门成熟的课',
    '该课程能以旧引新，寻找新旧知识的关联和生长点，注重知识的发生发展过程，能找到教材特点及本课的疑点，并恰当处理，在课堂上设疑问难，引导点拨，是一门很有个性特点的课',
    '本门课程各种学习活动设计具体、充分注意我们学习习惯的培养，因材施教，调动我们自主学习的积极性，遵循常规但不拘泥，根据我们的差异和特点，从具体到抽象对教材进行处理，是一门很成功的课',
    '该课程教学过程设计完整有序，既体现知识结构，知识点，又注意突出我们活动设计，体现教学民主、培养我们良好的学习品质，课堂结构完整，密度恰当。',
    '该课程教学程序设计巧妙，在教学过程中能运用上新颖独特教学方法、言简意胲，引导点拨我们，我们动口、动手、动脑，主动参与教学过程，使我们的作业完善而有美感，让大家学到了很多东西。',
    '该课程很有艺术，教学安排清晰有序，科学规范。在教材处理上从具体到抽象，化难为易，以简驾繁突破难点。各环节有详细的练习，科学合理有效地培养我们自主，探究，创新能力的发展。',
    '本门课程非常成功，设计突出了以我们为本的理念、全面培养我们素养、自主合作探究学习的理念。老师配以亲切活泼的教态，能较为恰当地运用丰富的表扬手段，让我们在学习中感受到成功的快乐。',
    '该课程教学重难点把握准确，教学内容主次分明，抓住关键；结构合理，衔接自然紧凑，组织严密，采用有效的教学手段，引导自主探究、合作交流，成功地教我们“会学”。',
    '该课程结构层次清楚、运用恰当的教学方法和手段启迪我们思维、解决重点、突出难点。精心设计练习，并在整个教学过程中注重我们能力的培养，是一门优秀的课。',
    '该课程很有创意，对教材把握透彻、挖掘深入、处理新颖，针对我们基础和我们发展性目标，设计各种教学活动，引导我们自主学习，有条理地将旧知识综合进行运用。',
    '老师在教学过程中，不仅重视知识要求，也注重思想教育，在课堂教学中孜孜不倦的帮助我们学习，做到对我们动之以情，爱之以诚，使我们的学习取得完美的成果。',
    '该课程教学设计非常巧妙，结合教材特点，我们、老师实际，一法为主，多法配合，优化组合。练习提供了我们喜闻乐见的资料，课堂练习紧扣重点，并注意在“趣”字上下功夫。',
    '该课程教学环节清晰、完整具体，能活化教学内容，使之生活化，课堂教学的开放性、师生关系的民主性、教学模式的多样性，培养我们良好的学习品质，体显出该老师教学能力非常强。',
    '该课程很有特色，创设情景，让我们在学习中、体验实践、感悟，收集、整理、筛选资料，突出体现了以人为本、以我们发展为本的教育理念。是一门很成功的课。',
    '本门课程很有艺术，在教材内容的基础上作了适当的必要的扩展，精心安排我们自主学习、质疑、操作实践等活动以启发式、讨论式为主。我们在完成任务的过和程中学会合作。',
    '该课程重点突出，目标全面、准确、具体，整体现知识与能力、方法与过程、情感态度与价值观三个维度，布局合理，设计各种教学活动，引导我们自主学习，有条理地将旧知识综合进行运用。',
    '该课程结构清晰、运用恰当的教学方法和手段启迪我们思维、解决重点、突出难点。根据班级实际情况，精心设计练习，并在整个教学过程中注重因材施教，是一门优秀的课。',
    '该课程十分有创意，教学目的明确，方法得当、语言清晰，具有感染力，习题典型，题量适当，激发我们兴趣，引导自主探究、合作交流完成任务，整个课堂效率非常高。',
    '本门课程对教学内容把握透彻、挖掘深入、处理新颖，在课堂教学中，对重难点言简意赅，分析透彻。对练习以思维训练为核心，落实双基，是一门非常成功的课'
  ],
  init () {
    this.$btn = window.$(this.templates.btn)
    this.$prompt = window.$(this.templates.prompt)

    window.$('#close > h4').append(this.$btn, this.$prompt)

    this.$btn.click(this.onClickBtn.bind(this))
  },
  onClickBtn (e) {
    e.preventDefault()
    let hasUnevaluatedQuestionnaire = this.collectData()
    if (hasUnevaluatedQuestionnaire) {
      this.showSelectionModal()
    } else {
      window.urp.confirm(
        '本页上的所有教师都已经评教过了，您可以换一页再使用。',
        () => { }
      )
    }
  },
  showSelectionModal () {
    window.layer.open({
      type: 1,
      area: '90%',
      title: '请选择需要「一键好评」的老师',
      shadeClose: true,
      offset: '50px',
      btn: ['开始一键评教!'],
      content: this.templates.selectionModal,
      success: () => {
        this.list.forEach(
          (
            {
              evaluatedPeople: name,
              evaluationContentContent: curriculum,
              questionnaireName: type
            },
            index
          ) => {
            if (this.checkboxWrapperSelectors[type]) {
              let selector = this.checkboxWrapperSelectors[type]
              window.$(selector).append(`
              <div class="checkbox">
                <label>
                  <input name="selection-checkbox-${index}" type="checkbox" class="ace ace-checkbox-2 selection-checkbox" checked>
                  <span class="lbl">${name}-${curriculum}</span>
                </label>
              </div>
            `)
            } else {
              console.log('无效的问卷名称：' + type)
            }
          }
        )
        for (let key in this.checkboxWrapperSelectors) {
          let selector = this.checkboxWrapperSelectors[key]
          if (!window.$(selector).children().length) {
            window
              .$(selector)
              .prev()
              .remove()
            window.$(selector).remove()
          }
        }
      },
      yes: layerIndex => {
        this.list = window
          .$('#selection-form')
          .serializeArray()
          .map(
            v => this.list[Number(v.name.replace('selection-checkbox-', ''))]
          )
        window.layer.close(layerIndex)
        if (this.list.length) {
          this.$btn.remove()
          this.evaluate(0)
        }
      }
    })
  },
  collectData () {
    let collectingMsgIndex = window.layer.msg('正在收集本页问卷数据……')
    let items = Array.from(
      document.getElementById('jxpgtbody').getElementsByTagName('button')
    )
      .filter(item => item.innerText === '评估')
      // 2018-8-31 20:21:20
      // 今天发现 urp 代码有修改，把 evaluationContentContent 从 onClick 函数调用里删除了。
      // 临时这样补上，尽量不做大修改，防止出错。
      .map(
        item =>
          item
            .getAttribute('onClick')
            .replace(
              /evaluationResult\("|evaluation\("|"\);return false;/gi,
              ''
            ) + `","${item.parentElement.parentElement.children[3].innerText}`
      )
    if (!items.length) {
      return false
    }
    this.list = items.map(item => this.parseName(item))
    window.layer.close(collectingMsgIndex)
    return true
  },
  changePrompt (str) {
    this.$prompt.text(str)
  },
  parseName (data) {
    data = data.split(`","`)
    let [
      questionnaireCode,
      questionnaireName,
      evaluatedPeopleNumber,
      evaluatedPeople,
      evaluationContentNumber,
      evaluationContentContent
    ] = data
    let result = {
      questionnaireCode,
      questionnaireName,
      evaluatedPeopleNumber,
      evaluatedPeople,
      evaluationContentNumber,
      evaluationContentContent
    }
    return result
  },
  getComment () {
    return encodeURIComponent(
      this.comments[Math.floor(Math.random() * this.comments.length)]
    )
  },
  evaluate (index) {
    let origin = window.location.origin
    if (index >= this.list.length) {
      this.changePrompt(`本页上的老师已经全部评价完毕！正在刷新……`)
      window.location.href = `${origin}/student/teachingEvaluation/evaluation/index`
      return
    }
    let {
      evaluatedPeopleNumber,
      evaluatedPeople,
      evaluationContentNumber,
      evaluationContentContent,
      questionnaireCode,
      questionnaireName
    } = this.list[index]
    let tokenValue
    let count

    this.changePrompt(
      `正在评价${evaluationContentContent}课程的${evaluatedPeople}老师（${index +
      1}/${this.list.length}）`
    )

    window.$.ajax({
      type: 'POST',
      url: '/student/teachingEvaluation/teachingEvaluation/evaluationPage',
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': 1
      },
      data: encodeURI(
        `evaluatedPeople=${evaluatedPeople}&evaluatedPeopleNumber=${evaluatedPeopleNumber}&questionnaireCode=${questionnaireCode}&questionnaireName=${questionnaireName}&evaluationContentNumber=${evaluationContentNumber}&evaluationContentContent=${evaluationContentContent}`
      ),
      beforeSend: xhr => {
        xhr.setRequestHeader('X-Requested-With', {
          toString: function () {
            return ''
          }
        })
      },
      error: xhr => {
        window.urp.alert(
          `错误代码[${xhr.readyState}-${xhr.status}]:获取数据失败！`
        )
      },
      success: data => {
        tokenValue = data.match(/<input.+tokenValue(?:(?:.|\r|\n)+?)value="(.+?)" \/>/i)[1]
        count = data.match(/<input.+count.+value="(.+?)">/i)[1]

        if (this.questionsNumberRange[questionnaireName]) {
          let range = this.questionsNumberRange[questionnaireName]

          let bodyStr = `tokenValue=${tokenValue}&questionnaireCode=${questionnaireCode}&evaluationContentNumber=${evaluationContentNumber}&evaluatedPeopleNumber=${evaluatedPeopleNumber}&count=${count}`
          for (let number of range) {
            let numberString = ('0000000000' + number).substr(-10)
            bodyStr += `&${numberString}=10_1`
          }
          bodyStr += `&zgpj=${this.getComment()}`

          window.$.ajax({
            cache: true,
            type: 'POST',
            async: true,
            url: '/student/teachingEvaluation/teachingEvaluation/evaluation',
            data: bodyStr,
            error: xhr => {
              window.urp.alert(
                `错误代码[${xhr.readyState}-${xhr.status}]:获取数据失败！`
              )
              this.changePrompt(
                `${evaluatedPeople}（${evaluationContentContent}）评价失败 QAQ，进度：${index +
                1}/${this.list.length}`
              )
            },
            success: data => {
              if (data['result'].indexOf('/') !== -1) {
                console.log(data)
              } else if (data['result'] === 'success') {
                this.changePrompt(
                  `${evaluatedPeople}（${evaluationContentContent}）评价成功，进度：${index +
                  1}/${this.list.length}，将在2分钟后自动开始评价下一位老师，评教过程中您可以去做些其他事情，只要不关闭此网页就可以~`
                )
                setTimeout(() => {
                  this.evaluate(++index)
                }, this.evaluationInterval)
              } else if (data['result'] === 'notEnoughTime') {
                tokenValue = data['token']
                this.changePrompt(
                  `${evaluatedPeople}（${evaluationContentContent} 距离上一次提交未到2分钟 QAQ，进度：${index +
                  1}/${this.list.length}，将在2分钟后自动重新评价这位老师，评教过程中您可以去做些其他事情，只要不关闭此网页就可以~`
                )
                setTimeout(() => {
                  this.evaluate(index)
                }, this.evaluationInterval)
              } else {
                window.urp.alert('保存失败')
                this.changePrompt(
                  `${evaluatedPeople}（${evaluationContentContent}）评价失败 QAQ，进度：${index +
                  1}/${this.list.length}`
                )
              }
            }
          })
        } else {
          console.log('无效的问卷名称：' + questionnaireName)
        }
      }
    })
  }
}

module.exports = fastEvaluation
