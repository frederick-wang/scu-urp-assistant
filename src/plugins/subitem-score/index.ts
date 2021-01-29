import App from './SubitemScore.vue'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'
import { emitDataAnalysisEvent } from '../data-analysis'
import { RouteHookNextFunction } from '@/core/router'

export const SubitemScore: SUAPlugin = {
  name: 'subitem-score',
  displayName: '分项成绩查询',
  icon: getPluginIcon('subitem-score'),
  isNecessary: false,
  defaultEnabledState: true,
  brief:
    '不了解自己成绩的构成？该插件可以帮助您查询到课程成绩各分项的得分与占比，以便反省自己在课程学习中的哪一部分做得还不够好。',
  route: {
    path: 'advanced_query/subitem_score',
    component: App,
    beforeEnter(next: RouteHookNextFunction): void {
      window.urp.confirm(
        `<p style="font-weight: 700; color: red;">警告：</p>
        <p style="text-indent: 2em;">该页面展示的部分敏感数据（分项成绩）调用了综合教务系统<span style="color: red;">【未公开】的接口</span>，如果综合教务系统关闭了该接口，那么这个功能就报废了，我们将无法再获取到这些教务系统屏蔽的数据！</p>
        <p style="text-indent: 2em;">事实上，在目前的综合教务系统刚启用时，分项成绩查询功能是完全开放的。<span style="color: red;">但之后这个功能被删除了。</span></p>
        <p style="text-indent: 2em;">该功能的主要目的还是帮助大家处理一些<span style="color: red;">有必要的事情</span>，比如根据分项成绩思考自己在课程学习中什么部分做得不足，什么部分做得不错。再比如检查登分出错的意外情况，以及时和老师联系。</p>
        <p style="text-indent: 2em;">总之，如果您要用本页面展示的这些敏感数据和您的任课老师沟通，我希望您可以<span style="color: red;">不要透露该插件的存在</span>，只是说这些敏感数据是您自己感觉、估计的情况！</p>
        <p style="text-indent: 2em;">否则，老师一旦和教务处反映，这个数据获取接口就有<span style="color: red;">被关闭</span>的风险！</p>`,
        async (res: boolean) => {
          if (res) {
            next()
          } else {
            next(
              new Error(
                '很抱歉，因为您拒绝了使用协议，SCU URP 助手 无法显示您希望看到的数据。'
              )
            )
            emitDataAnalysisEvent('分项成绩查询', '拒绝使用协议')
          }
        }
      )
    }
  }
}
