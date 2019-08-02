let trainingSchemeList = null

/**
 * 从 Gitee 上获取爬取好的培养方案列表
 *
 * @returns {string[][]} 培养方案列表
 */
async function getTrainingSchemeList () {
  if (!trainingSchemeList) {
    try {
      const res = await window.$.get('https://gitee.com/frederick-wang/scu-urp-assistant/raw/master/dist/data/training-scheme-list.json')
      trainingSchemeList = JSON.parse(res)
    } catch (error) {
      window.layer.confirm(error.message, {
        btn: ['确定'],
        closeBtn: 0,
        title: '[SCU URP 助手] 错误 - 培养方案列表加载失败'
      }, () => {
        window.layer.closeAll('dialog')
      })
      console.error(error)
    }
  }
  return trainingSchemeList || []
}

module.exports = { getTrainingSchemeList }
