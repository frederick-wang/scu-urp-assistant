export { getRandomComment } from './comment'

export type Questionnaire = {
  questionnaireCode: string
  questionnaireName: string
  evaluatedPeopleNumber: string
  evaluatedPeople: string
  evaluationContentNumber: string
  evaluationContentContent: string
}

export const generateChangePrompt = ($prompt: JQuery<HTMLElement>) => (
  str: string
): JQuery<HTMLElement> => $prompt.text(str)

const parseName = (raw: string): Questionnaire => {
  const data = raw.split(`","`)
  const [
    questionnaireCode,
    questionnaireName,
    evaluatedPeopleNumber,
    evaluatedPeople,
    evaluationContentNumber,
    evaluationContentContent
  ] = data
  return {
    questionnaireCode,
    questionnaireName,
    evaluatedPeopleNumber,
    evaluatedPeople,
    evaluationContentNumber,
    evaluationContentContent
  }
}

export const collectData = (): Questionnaire[] => {
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
    const result = items.map(item => parseName(item))
    window.layer.close(collectingMsgIndex)
    return result
  }
  return []
}
