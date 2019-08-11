import Vue from 'vue'
import App from './ScoresInformation.vue'

const style = require('@/plugins/gpa/index.scss').toString()

function render(root: HTMLElement) {
  window.urp.confirm(
    `<p style="font-weight: 700; color: red;">警告：</p>
    <p style="text-indent: 2em;">该页面展示的部分敏感数据（最高分、平均分、最低分、名次）调用了综合教务系统<span style="color: red;">【未公开】的接口</span>，如果综合教务系统关闭了该接口，那么这个功能就报废了，我们将无法再获取到这些教务系统屏蔽的数据！</p>
    <p style="text-indent: 2em;">因此，如果您要用本页面展示的这些敏感数据和您的任课老师沟通，我希望您可以<span style="color: red;">不要透露该插件的存在</span>，只是说这些敏感数据是您私下联系同学们询问成绩，从而获得的调查结果！</p>
    <p style="text-indent: 2em;">否则，老师一旦和教务处反映，这个数据获取接口就有<span style="color: red;">被关闭</span>的风险！</p>`,
    async (res: boolean) => {
      if (res) {
        $(root).append(`<div class="sua-container-scores-information"></div>`)
        new Vue({
          render: (h: any) => h(App)
        }).$mount('.sua-container-scores-information')
      } else {
        $(root).append(`
        <div class="sua-container-scores-information">
          <p>很抱歉，因为您拒绝了使用协议，SCU URP 助手 无法显示您希望看到的数据。</p>
        </div>`)
      }
    }
  )
}

export default {
  name: 'scores-information',
  route: 'advanced_query/scores_information',
  menu: {
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-advanced-query',
    name: '高级查询',
    item: {
      name: '成绩信息查询',
      style,
      route: 'advanced_query/scores_information',
      breadcrumbs: ['SCU URP 助手', '高级查询', '成绩信息查询'],
      render
    }
  }
} as SUAPlugin
