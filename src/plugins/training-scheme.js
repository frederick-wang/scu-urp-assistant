// 培养方案查询插件
const fs = require('fs')

const trainingScheme = {
  name: 'training-scheme',
  pathname: '/**',
  style: fs.readFileSync('transformed/plugins/training-scheme.css', 'utf8'),
  menu: [
    {
      rootMenuId: 'sua-menu-list',
      rootMenuName: 'SCU URP 助手',
      id: 'menu-advanced-query',
      name: '高级查询',
      items: [
        {
          name: '培养方案查询',
          breadcrumbs: ['SCU URP 助手', '高级查询', '培养方案查询'],
          render: renderPageContent
        },
        {
          name: '培养方案查询222',
          breadcrumbs: ['SCU URP 助手', '高级查询', '培养方案查询222'],
          render: renderPageContent2
        }
      ]
    }
  ]
}

function renderPageContent (root) {
  console.log(root)
  console.log('培养方案查询插件调用111！')
}

function renderPageContent2 (root) {
  console.log(root)
  console.log('培养方案查询插件调用222！')
}

module.exports = trainingScheme
