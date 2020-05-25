// 快捷评教插件
import Vue from 'vue'
import { emitDataAnalysisEvent } from '@/plugins/data-analysis'
import { getPluginIcon } from '@/utils'
import { SUAPlugin } from '@/types'
import { getComment } from './comment'

const evaluationInterval = 1000 * (10 + 1)

const templates = {
  btn: require('./btn.pug') as () => string,
  prompt: require('./prompt.pug') as () => string,
  selectionModal: require('./selectionModal.pug') as (payload: {
    checkboxWrappers: [string, string][]
  }) => string
}

let $btn: JQuery<HTMLElement>
let $prompt: JQuery<HTMLElement>
let list: Array<{
  questionnaireCode: string
  questionnaireName: string
  evaluatedPeopleNumber: string
  evaluatedPeople: string
  evaluationContentNumber: string
  evaluationContentContent: string
}>

function parseName(
  raw: string
): {
  questionnaireCode: string
  questionnaireName: string
  evaluatedPeopleNumber: string
  evaluatedPeople: string
  evaluationContentNumber: string
  evaluationContentContent: string
} {
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

function collectData(): boolean {
  const collectingMsgIndex = window.layer.msg('正在收集本页问卷数据……')
  const jxpgtbody = document.getElementById('jxpgtbody')
  if (jxpgtbody !== null) {
    const items = Array.from(jxpgtbody.getElementsByTagName('button'))
      .filter(item => item.innerText === '评估')
      // 2018-8-31 20:21:20
      // 今天发现 urp 代码有修改，把 evaluationContentContent 从 onClick 函数调用里删除了。
      // 临时这样补上，尽量不做大修改，防止出错。
      .map(item => {
        const attr = item.getAttribute('onClick') as string
        const itemParentElement = item.parentElement as HTMLElement
        const item2ndOrderParentElement = itemParentElement.parentElement as HTMLElement
        const evaluationContentContentElement = item2ndOrderParentElement
          .children[3] as HTMLElement
        return (
          attr.replace(
            /evaluationResult\("|evaluation\("|"\);return false;/gi,
            ''
          ) + `","${evaluationContentContentElement.innerText}`
        )
      })
    if (!items.length) {
      return false
    }
    list = items.map(item => parseName(item))
    window.layer.close(collectingMsgIndex)
    return true
  }
  return false
}

function changePrompt(str: string): void {
  $prompt.text(str)
}

function evaluate(index: number): void {
  const origin = window.location.origin
  if (index >= list.length) {
    emitDataAnalysisEvent('快捷评教', '全部老师评教成功')
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
      } as string)
    },
    error: xhr => {
      emitDataAnalysisEvent('快捷评教', '获取数据失败')
      Vue.prototype.$notify.error({
        title: '[快捷评教] 获取数据失败',
        message: `错误代码[${xhr.readyState}-${xhr.status}]:获取数据失败！`
      })
    },
    success: rawHTML => {
      tokenValue = $('input[name=tokenValue]', rawHTML).attr('value') || ''
      count = $('input[name=count]', rawHTML).attr('value') || ''

      if (!tokenValue || !count) {
        emitDataAnalysisEvent('快捷评教', '教务系统不稳定')
        Vue.prototype.$confirm(
          '[快捷评教] 教务系统不稳定',
          `因教务系统不稳定，当前暂时无法评教，请点击右上角头像注销，并在重新登录后再次尝试。如果还是无法评教，您可以更换浏览器或电脑后再尝试。`
        )
        return
      }
      const range = [
        ...new Set(
          Array.from($('input.ace[type=radio]', rawHTML))
            .map(v => $(v).attr('name') || '')
            .filter(v => v)
        )
      ]
      if (range) {
        const params = [
          ['questionnaireCode', questionnaireCode],
          ['evaluationContentNumber', evaluationContentNumber],
          ['evaluatedPeopleNumber', evaluatedPeopleNumber],
          ['count', count],
          ...range.map(numberString => [numberString, '10_1']),
          ['zgpj', getComment()]
        ]
        evaluate2ndStage(
          index,
          params.map(v => `${v[0]}=${v[1]}`).join('&'),
          evaluatedPeople,
          evaluationContentContent,
          tokenValue
        )
      } else {
        const message = `读取问题编号失败：${questionnaireName}`
        Vue.prototype.$notify.error({
          title: '[快捷评教] 读取问题编号失败',
          message
        })
        emitDataAnalysisEvent('快捷评教', '读取问题编号失败', {
          questionnaireName
        })
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
): void {
  $.ajax({
    cache: true,
    type: 'POST',
    async: true,
    url: '/student/teachingEvaluation/teachingEvaluation/evaluation',
    data: `tokenValue=${tokenValue}&${bodyStr}`,
    error: xhr => {
      emitDataAnalysisEvent('快捷评教', '获取数据失败')
      Vue.prototype.$notify.error({
        title: '[快捷评教] 获取数据失败',
        message: `错误代码[${xhr.readyState}-${xhr.status}]:获取数据失败！`
      })
      changePrompt(
        `${evaluatedPeople}（${evaluationContentContent}）评价失败 QAQ，进度：${index +
          1}/${list.length}`
      )
    },
    success: data => {
      if (data['result'].indexOf('/') !== -1) {
        emitDataAnalysisEvent('快捷评教', '登陆过期')
        Vue.prototype.$notify.error({
          title: '[快捷评教] 登陆过期',
          message: '登陆过期，将在3秒后自动刷新页面'
        })
        changePrompt(
          `${evaluatedPeople}（${evaluationContentContent}）登陆过期 QAQ，进度：${index +
            1}/${list.length}，将在3秒后自动刷新页面~`
        )
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } else if (data['result'] === 'success') {
        emitDataAnalysisEvent('快捷评教', '单位老师评教成功')
        Vue.prototype.$message({
          message: `${evaluatedPeople}（${evaluationContentContent}）评价成功`,
          type: 'success'
        })
        changePrompt(
          `${evaluatedPeople}（${evaluationContentContent}）评价成功，进度：${index +
            1}/${
            list.length
          }，将在10秒后自动开始评价下一位老师，评教过程中您可以去做些其他事情，只要不关闭此网页就可以~`
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
          emitDataAnalysisEvent('快捷评教', '未知错误')
          Vue.prototype.$message.error(
            `${evaluatedPeople}（${evaluationContentContent}）遭遇未知错误 QAQ`
          )
          changePrompt(
            `${evaluatedPeople}（${evaluationContentContent}）遭遇未知错误 QAQ，进度：${index +
              1}/${
              list.length
            }，将在10秒后自动重新评价这位老师，评教过程中您可以去做些其他事情，只要不关闭此网页就可以~`
          )
          setTimeout(() => {
            evaluate(index)
          }, evaluationInterval)
        }
      }
    }
  })
}

function showSelectionModal(): void {
  const checkboxWrapperIds = new Map(
    [...new Set(list.map(v => v.questionnaireName))].map(v => [
      v,
      `${v}-checkbox-wrapper`
    ])
  )
  window.layer.open({
    type: 1,
    area: '90%',
    title: '请选择需要「一键好评」的老师',
    shadeClose: true,
    offset: '50px',
    btn: ['开始一键评教!'],
    content: templates.selectionModal({
      checkboxWrappers: Array.from(checkboxWrapperIds)
    }),
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
          const selector = `#${checkboxWrapperIds.get(type)}`
          $(selector).append(
            require('./checkbox.pug')({ name, index, curriculum })
          )
        }
      )
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
          `即将在10秒后开始评价${evaluatedPeople}（${evaluationContentContent}），请耐心等待，评教过程中您可以去做些其他事情，只要不关闭此网页就可以~`
        )
        evaluate(0)
      }
    }
  })
}

function onClickBtn(e: MouseEvent): void {
  e.preventDefault()
  const hasUnevaluatedQuestionnaire = collectData()
  if (hasUnevaluatedQuestionnaire) {
    showSelectionModal()
  } else {
    window.urp.confirm(
      '本页上的所有教师都已经评教过了，您可以换一页再使用。',
      () => null
    )
  }
}

export default {
  name: 'fast-evaluation',
  displayName: '快捷评教',
  icon: getPluginIcon('fast-evaluation'),
  isNecessary: false,
  brief:
    '嫌评教系统交互太不方便？该插件可以让您快捷地在系统中完成问卷，给老师填上正确的评价与合适的分数。',
  pathname: '/student/teachingEvaluation/evaluation/index',
  style: require('./index.scss').toString(),
  init() {
    $btn = $(templates.btn())
    $prompt = $(templates.prompt())

    $('#close > h4').append($btn, $prompt)

    $btn.click(onClickBtn.bind(this) as () => void)
  }
} as SUAPlugin
