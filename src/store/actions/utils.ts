import { notifyError } from '@/helper/util'

export function getPageHTML(url: string): Promise<string> {
  return $.get({
    url,
    beforeSend: (xhr) =>
      xhr.setRequestHeader('X-Requested-With', {
        toString() {
          return ''
        }
      } as string)
  }) as unknown as Promise<string>
}

export async function LoadHTMLToDealWithError(
  url: string
): Promise<{ title: string; message: string; html: string }> {
  const html = await getPageHTML(url)
  const title = $('title', html).text()
  const message = $('.main-content .page-content', html)
    .text()
    .replace(/×/g, '')
    .trim()
  return { title, message, html }
}

export async function getAllTermScoresDataURL(): Promise<string> {
  const referralUrl = '/student/integratedQuery/scoreQuery/allTermScores/index'
  const referralPageHTML = await getPageHTML(referralUrl)
  const r = /scoreQuery\/(.+?)\/allTermScores\/data/.exec(referralPageHTML)
  if (!r) {
    const msg = '无法获取 allTermScores 接口的完整地址。'
    notifyError(msg, '[均分绩点计算器] 获取数据接口地址失败')
    throw new Error(msg)
  } else {
    return `/student/integratedQuery/scoreQuery/${r[1]}/allTermScores/index`
  }
}

export async function getThisTermScoresDataURL(): Promise<string> {
  const referralUrl = '/student/integratedQuery/scoreQuery/thisTermScores/index'
  const referralPageHTML = await getPageHTML(referralUrl)
  const r = /scoreQuery\/(.+?)\/thisTermScores\/data/.exec(referralPageHTML)
  if (!r) {
    const msg = '无法获取 thisTermScores 接口的完整地址。'
    notifyError(msg, '[成绩信息查询] 获取数据接口地址失败')
    throw new Error(msg)
  } else {
    return `/student/integratedQuery/scoreQuery/${r[1]}/thisTermScores/data`
  }
}

export async function getAllPassingScoresURL(): Promise<string> {
  const referralUrl = 'student/integratedQuery/scoreQuery/allPassingScores/index'
  const referralPageHTML = await getPageHTML(referralUrl)
  const r = /scoreQuery\/(.+?)\/allPassingScores/.exec(referralPageHTML)
  if (!r) {
    const msg = '无法获取 allPassingScores 接口的完整地址。'
    notifyError(msg, '[均分绩点计算器] 获取数据接口地址失败')
    throw new Error(msg)
  } else {
    return `/student/integratedQuery/scoreQuery/${r[1]}/allPassingScores/callback`
  }
}

export function getExamTypeNameByCode(
  examTypeCode: string | undefined
): string | undefined {
  if (!examTypeCode) {
    return undefined
  }
  switch (examTypeCode) {
    case '01':
      return '考试'
    case '02':
      return '考查'
    default:
      return undefined
  }
}
