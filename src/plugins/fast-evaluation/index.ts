// 一键评教插件
import comments from './comments.json'
import checkboxWrapperSelectorsData from './checkboxWrapperSelectors.json'
import questionsNumberRangeData from './questionsNumberRange.json'

const checkboxWrapperSelectors = new Map(
  Object.entries(checkboxWrapperSelectorsData)
)
const questionsNumberRange = new Map(Object.entries(questionsNumberRangeData))

const evaluationInterval = 1000 * 61

const templates = {
  btn: require('./btn.pug')(),
  prompt: require('./prompt.pug')(),
  selectionModal: require('./selectionModal.pug')()
}

let $btn: JQuery<HTMLElement>
let $prompt: JQuery<HTMLElement>
let list: any[]

function parseName(raw: string) {
  const data = raw.split(`","`)
  const [
    questionnaireCode,
    questionnaireName,
    evaluatedPeopleNumber,
    evaluatedPeople,
    evaluationContentNumber,
    evaluationContentContent
  ] = data
  const result = {
    questionnaireCode,
    questionnaireName,
    evaluatedPeopleNumber,
    evaluatedPeople,
    evaluationContentNumber,
    evaluationContentContent
  }
  return result
}

function getComment() {
  return encodeURIComponent(
    comments[Math.floor(Math.random() * comments.length)]
  )
}

function collectData() {
  const collectingMsgIndex = window.layer.msg('正在收集本页问卷数据……')
  const jxpgtbody = document.getElementById('jxpgtbody')
  if (jxpgtbody !== null) {
    const items = Array.from(jxpgtbody.getElementsByTagName('button'))
      .filter(item => item.innerText === '评估')
      // 2018-8-31 20:21:20
      // 今天发现 urp 代码有修改，把 evaluationContentContent 从 onClick 函数调用里删除了。
      // 临时这样补上，尽量不做大修改，防止出错。
      .map(
        (item: any) =>
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
    list = items.map(item => parseName(item))
    window.layer.close(collectingMsgIndex)
    return true
  }
  return false
}

function onClickBtn(e: any) {
  e.preventDefault()
  const hasUnevaluatedQuestionnaire = collectData()
  if (hasUnevaluatedQuestionnaire) {
    showSelectionModal()
  } else {
    window.urp.confirm(
      '本页上的所有教师都已经评教过了，您可以换一页再使用。',
      () => {}
    )
  }
}

function showSelectionModal() {
  window.layer.open({
    type: 1,
    area: '90%',
    title: '请选择需要「一键好评」的老师',
    shadeClose: true,
    offset: '50px',
    btn: ['开始一键评教!'],
    content: templates.selectionModal,
    success: () => {
      list.forEach(
        (
          {
            evaluatedPeople: name,
            evaluationContentContent: curriculum,
            questionnaireName: type
          }: {
            evaluatedPeople: string
            evaluationContentContent: string
            questionnaireName: string
          },
          index
        ) => {
          const selector = checkboxWrapperSelectors.get(type)
          if (selector) {
            $(selector).append(
              require('./checkbox.pug')({ name, index, curriculum })
            )
          } else {
            const msg = `无效的问卷名称：${type}`
            window.urp.alert(msg)
            console.error(new Error(msg))
          }
        }
      )
      for (const key in checkboxWrapperSelectors) {
        const selector = checkboxWrapperSelectors.get(key)
        if (!selector) {
          continue
        }
        if (!$(selector).children().length) {
          $(selector)
            .prev()
            .remove()
          $(selector).remove()
        }
      }
    },
    yes: (layerIndex: number) => {
      list = $('#selection-form')
        .serializeArray()
        .map(v => list[Number(v.name.replace('selection-checkbox-', ''))])
      window.layer.close(layerIndex)
      if (list.length) {
        $btn.remove()
        const { evaluatedPeople, evaluationContentContent } = list[0]
        changePrompt(
          `即将在1分钟后开始评价${evaluatedPeople}（${evaluationContentContent}），请耐心等待，评教过程中您可以去做些其他事情，只要不关闭此网页就可以~`
        )
        evaluate(0)
      }
    }
  })
}

function changePrompt(str: string) {
  $prompt.text(str)
}

function evaluate(index: number) {
  const origin = window.location.origin
  if (index >= list.length) {
    changePrompt(`本页上的老师已经全部评价完毕！正在刷新……`)
    window.location.href = `${origin}/student/teachingEvaluation/evaluation/index`
    return
  }
  const {
    evaluatedPeopleNumber,
    evaluatedPeople,
    evaluationContentNumber,
    evaluationContentContent,
    questionnaireCode,
    questionnaireName
  } = list[index]
  let tokenValue: string
  let count: string

  $.ajax({
    type: 'POST',
    url: '/student/teachingEvaluation/teachingEvaluation/evaluationPage',
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Cache-Control': 'max-age=0',
      'Upgrade-Insecure-Requests': '1'
    },
    data: encodeURI(
      `evaluatedPeople=${evaluatedPeople}&evaluatedPeopleNumber=${evaluatedPeopleNumber}&questionnaireCode=${questionnaireCode}&questionnaireName=${questionnaireName}&evaluationContentNumber=${evaluationContentNumber}&evaluationContentContent=${evaluationContentContent}`
    ),
    beforeSend: xhr => {
      xhr.setRequestHeader('X-Requested-With', {
        toString: () => ''
      } as any)
    },
    error: xhr => {
      window.urp.alert(
        `错误代码[${xhr.readyState}-${xhr.status}]:获取数据失败！`
      )
    },
    success: data => {
      tokenValue = data.match(
        /<input.+tokenValue(?:(?:.|\r|\n)+?)value="(.*?)" \/>/i
      )[1]
      count = data.match(/<input.+count.+value="(.*?)">/i)[1]

      if (!tokenValue || !count) {
        window.urp.confirm(
          `因教务系统不稳定，当前暂时无法评教，请稍等一段时间后，刷新网页再尝试。如果还是无法评教，您可以更换浏览器或电脑后再尝试。`,
          function() {}
        )
        return
      }

      const range = questionsNumberRange.get(questionnaireName)
      if (range) {
        let bodyStr = `questionnaireCode=${questionnaireCode}&evaluationContentNumber=${evaluationContentNumber}&evaluatedPeopleNumber=${evaluatedPeopleNumber}&count=${count}`
        for (const number of range) {
          const numberString = ('0000000000' + number).substr(-10)
          bodyStr += `&${numberString}=10_1`
        }
        bodyStr += `&zgpj=${getComment()}`
        evaluate2ndStage(
          index,
          bodyStr,
          evaluatedPeople,
          evaluationContentContent,
          tokenValue
        )
      } else {
        const msg = `无效的问卷名称：${questionnaireName}`
        window.urp.alert(msg)
        console.error(new Error(msg))
      }
    }
  })
}

function evaluate2ndStage(
  index: number,
  bodyStr: string,
  evaluatedPeople: string,
  evaluationContentContent: string,
  tokenValue: string
) {
  $.ajax({
    cache: true,
    type: 'POST',
    async: true,
    url: '/student/teachingEvaluation/teachingEvaluation/evaluation',
    data: `tokenValue=${tokenValue}&${bodyStr}`,
    error: xhr => {
      window.urp.alert(
        `错误代码[${xhr.readyState}-${xhr.status}]:获取数据失败！`
      )
      changePrompt(
        `${evaluatedPeople}（${evaluationContentContent}）评价失败 QAQ，进度：${index +
          1}/${list.length}`
      )
    },
    success: data => {
      if (data['result'].indexOf('/') !== -1) {
        window.urp.alert('登陆过期，将在3秒后自动刷新页面')
        changePrompt(
          `${evaluatedPeople}（${evaluationContentContent}）登陆过期 QAQ，进度：${index +
            1}/${list.length}，将在3秒后自动刷新页面~`
        )
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } else if (data['result'] === 'success') {
        changePrompt(
          `${evaluatedPeople}（${evaluationContentContent}）评价成功，进度：${index +
            1}/${
            list.length
          }，将在1分钟后自动开始评价下一位老师，评教过程中您可以去做些其他事情，只要不关闭此网页就可以~`
        )
        evaluate(++index)
        // setTimeout(() => {
        // }, evaluationInterval)
      } else {
        if (data['token'] !== tokenValue) {
          tokenValue = data['token']
          setTimeout(() => {
            evaluate2ndStage(
              index,
              bodyStr,
              evaluatedPeople,
              evaluationContentContent,
              tokenValue
            )
          }, evaluationInterval)
        } else {
          window.urp.alert('保存失败')
          changePrompt(
            `${evaluatedPeople}（${evaluationContentContent}）遭遇未知错误 QAQ，进度：${index +
              1}/${
              list.length
            }，将在1分钟后自动重新评价这位老师，评教过程中您可以去做些其他事情，只要不关闭此网页就可以~`
          )
          setTimeout(() => {
            evaluate(index)
          }, evaluationInterval)
        }
      }
    }
  })
}

export default {
  name: 'fast-evaluation',
  pathname: '/student/teachingEvaluation/evaluation/index',
  style: require('./index.scss').toString(),
  init() {
    $btn = $(templates.btn)
    $prompt = $(templates.prompt)

    $('#close > h4').append($btn, $prompt)

    $btn.click(onClickBtn.bind(this))
  }
}
