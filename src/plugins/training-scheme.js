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

async function renderPageContent (root, $) {
  console.log(root)
  const { info, list } = await getTrainingSchemeData($)
  console.log(info, list)
  const template = `
    <div class="training-scheme-wrapper">
      ${genQueryHTML()}
      ${genInfoHTML(info)}
      ${genSchemeHTML(list)}
    </div>
  `
  $(root).append(template)
}

function genQueryHTML () {
  return `
    <div class="query-container">
      <div class="row">
        <div class="col-xs-12 self-margin">
          <h4 class="header smaller lighter grey">
            <i class="ace-icon fa fa-search"></i>查询条件
            <span class="right_top_oper">
              <button id="queryButton" title="查询" class="btn btn-info btn-xs btn-round" onclick="return false;">
                <i class="ace-con fa fa-search white bigger-120"></i>查询
              </button>
            </span>
          </h4>
          <div class="profile-user-info profile-user-info-striped self">
            <div class="profile-info-row">
              <div class="profile-info-name">学年学期</div>
              <div class="profile-info-value">
                <select name="executiveEducationPlanNum" class="select form-control value_element">
                  <option value="全部">全部</option>
                  <option value="2019-2020学年秋">2019-2020学年秋</option>
                  <option value="2018-2019学年春">2018-2019学年春</option>
                  <option value="2018-2019学年秋">2018-2019学年秋</option>
                  <option value="2017-2018学年春">2017-2018学年春</option>
                  <option value="2017-2018学年秋">2017-2018学年秋</option>
                  <option value="2016-2017学年春">2016-2017学年春</option>
                  <option value="2016-2017学年秋">2016-2017学年秋</option>
                  <option value="2015-2016学年春">2015-2016学年春</option>
                  <option value="2015-2016学年秋">2015-2016学年秋</option>
                  <option value="2014-2015学年春">2014-2015学年春</option>
                  <option value="2014-2015学年秋">2014-2015学年秋</option>
                  <option value="2013-2014学年春">2013-2014学年春</option>
                  <option value="2013-2014学年秋">2013-2014学年秋</option>
                  <option value="2012-2013学年春">2012-2013学年春</option>
                  <option value="2012-2013学年秋">2012-2013学年秋</option>
                  <option value="2011-2012学年春">2011-2012学年春</option>
                  <option value="2011-2012学年秋">2011-2012学年秋</option>
                  <option value="2010-2011学年春">2010-2011学年春</option>
                  <option value="2010-2011学年秋">2010-2011学年秋</option>
                  <option value="2009-2010学年春">2009-2010学年春</option>
                  <option value="2009-2010学年秋">2009-2010学年秋</option>
                  <option value="2008-2009学年春">2008-2009学年春</option>
                  <option value="2008-2009学年秋">2008-2009学年秋</option>
                  <option value="2007-2008学年春">2007-2008学年春</option>
                  <option value="2007-2008学年秋">2007-2008学年秋</option>
                  <option value="2006-2007学年春">2006-2007学年春</option>
                  <option value="2006-2007学年秋">2006-2007学年秋</option>
                  <option value="2005-2006学年春">2005-2006学年春</option>
                  <option value="2005-2006学年秋">2005-2006学年秋</option>
                  <option value="2004-2005学年春">2004-2005学年春</option>
                  <option value="2004-2005学年秋">2004-2005学年秋</option>
                  <option value="2003-2004学年春">2003-2004学年春</option>
                  <option value="2003-2004学年秋">2003-2004学年秋</option>
                  <option value="2002-2003学年春">2002-2003学年春</option>
                  <option value="2002-2003学年秋">2002-2003学年秋</option>
                  <option value="2001-2002学年春">2001-2002学年春</option>
                  <option value="2001-2002学年秋">2001-2002学年秋</option>
                  <option value="2000-2001学年春">2000-2001学年春</option>
                  <option value="2000-2001学年秋">2000-2001学年秋</option>
                </select>
              </div>
              <div class="profile-info-name">年级</div>
              <div class="profile-info-value">
                <select name="yearNum" id="yearNum" class="select form-control value_element">
                  <option value="全部">全部</option>
                  <option value="2020级">2020级</option>
                  <option value="2019级">2019级</option>
                  <option value="2018级">2018级</option>
                  <option value="2017级">2017级</option>
                  <option value="2016级">2016级</option>
                  <option value="2015级">2015级</option>
                  <option value="2014级">2014级</option>
                  <option value="2013级">2013级</option>
                  <option value="2012级">2012级</option>
                  <option value="2011级">2011级</option>
                  <option value="2010级">2010级</option>
                  <option value="2009级">2009级</option>
                  <option value="2008级">2008级</option>
                  <option value="2007级">2007级</option>
                  <option value="2006级">2006级</option>
                  <option value="2005级">2005级</option>
                  <option value="2004级">2004级</option>
                  <option value="2003级">2003级</option>
                  <option value="2002级">2002级</option>
                  <option value="2001级">2001级</option>
                  <option value="2000级">2000级</option>
                </select>
              </div>
              <div class="profile-info-name">院系</div>
              <div class="profile-info-value">
                <select name="departmentNum" id="departmentNum" class="select form-control value_element">
                  <option value="全部">全部</option>
                  <option value="艺术学院">艺术学院</option>
                  <option value="经济学院">经济学院</option>
                  <option value="法学院">法学院</option>
                  <option value="文学与新闻学院">文学与新闻学院</option>
                  <option value="外国语学院">外国语学院</option>
                  <option value="历史文化学院（旅游学院）">历史文化学院（旅游学院）</option>
                  <option value="马克思主义学院">马克思主义学院</option>
                  <option value="国际关系学院">国际关系学院</option>
                  <option value="数学学院">数学学院</option>
                  <option value="物理科学与技术学院">物理科学与技术学院</option>
                  <option value="化学学院">化学学院</option>
                  <option value="生命科学学院">生命科学学院</option>
                  <option value="电子信息学院">电子信息学院</option>
                  <option value="高分子科学与工程学院">高分子科学与工程学院</option>
                  <option value="材料科学与工程学院">材料科学与工程学院</option>
                  <option value="制造科学与工程学院">制造科学与工程学院</option>
                  <option value="电气信息学院">电气信息学院</option>
                  <option value="计算机学院">计算机学院</option>
                  <option value="建筑与环境学院">建筑与环境学院</option>
                  <option value="水利水电学院">水利水电学院</option>
                  <option value="化学工程学院">化学工程学院</option>
                  <option value="轻纺与食品学院">轻纺与食品学院</option>
                  <option value="软件学院">软件学院</option>
                  <option value="四川大学匹兹堡学院">四川大学匹兹堡学院</option>
                  <option value="空天科学与工程学院">空天科学与工程学院</option>
                  <option value="网络空间安全学院">网络空间安全学院</option>
                  <option value="公共管理学院">公共管理学院</option>
                  <option value="商学院">商学院</option>
                  <option value="灾后重建与管理学院">灾后重建与管理学院</option>
                  <option value="华西基础医学与法医学院">华西基础医学与法医学院</option>
                  <option value="华西临床医学院">华西临床医学院</option>
                  <option value="华西口腔医学院">华西口腔医学院</option>
                  <option value="华西公共卫生学院">华西公共卫生学院</option>
                  <option value="华西药学院">华西药学院</option>
                  <option value="华西动物中心">华西动物中心</option>
                  <option value="联合班">联合班</option>
                  <option value="数学学院与经济学院">数学学院与经济学院</option>
                  <option value="吴玉章学院">吴玉章学院</option>
                  <option value="生物治疗国家重点实验室">生物治疗国家重点实验室</option>
                  <option value="生物医学材料工程技术研究中心">生物医学材料工程技术研究中心</option>
                  <option value="研究生院">研究生院</option>
                  <option value="预科教育">预科教育</option>
                  <option value="体育学院">体育学院</option>
                  <option value="党委武装部（军事教研室）">党委武装部（军事教研室）</option>
                  <option value="网络教育学院">网络教育学院</option>
                  <option value="图书馆">图书馆</option>
                  <option value="分析测试中心">分析测试中心</option>
                  <option value="工程设计中心">工程设计中心</option>
                  <option value="工程训练中心">工程训练中心</option>
                  <option value="电子实习中心">电子实习中心</option>
                  <option value="电工电子中心">电工电子中心</option>
                  <option value="化学基础实验教学中心">化学基础实验教学中心</option>
                  <option value="计算机基础教学实验中心">计算机基础教学实验中心</option>
                  <option value="招生就业处">招生就业处</option>
                  <option value="校团委">校团委</option>
                  <option value="心理健康教育中心">心理健康教育中心</option>
                  <option value="国家大学科技园">国家大学科技园</option>
                  <option value="海外教育学院">海外教育学院</option>
                  <option value="国际合作与交流处">国际合作与交流处</option>
                  <option value="校医院">校医院</option>
                  <option value="成人教育学院">成人教育学院</option>
                  <option value="实验室及设备管理处">实验室及设备管理处</option>
                  <option value="现代教育技术中心">现代教育技术中心</option>
                  <option value="IBM技术中心">IBM技术中心</option>
                  <option value="信息管理中心">信息管理中心</option>
                  <option value="对外联络办公室">对外联络办公室</option>
                  <option value="档案馆">档案馆</option>
                  <option value="文化科技协同创新研发中心">文化科技协同创新研发中心</option>
                  <option value="博物馆">博物馆</option>
                  <option value="校报编辑部">校报编辑部</option>
                  <option value="出国留学预备学院">出国留学预备学院</option>
                  <option value="出国留学人员培训部">出国留学人员培训部</option>
                  <option value="四川大学欧洲研究中心">四川大学欧洲研究中心</option>
                  <option value="中国西部边疆安全与发展协同创新中心">中国西部边疆安全与发展协同创新中心</option>
                  <option value="保卫处">保卫处</option>
                  <option value="后勤集团">后勤集团</option>
                  <option value="党委组织部">党委组织部</option>
                  <option value="纪委监察处">纪委监察处</option>
                  <option value="党委宣传部">党委宣传部</option>
                  <option value="财务处">财务处</option>
                  <option value="港澳台事务办公室">港澳台事务办公室</option>
                  <option value="四川大学出版社">四川大学出版社</option>
                  <option value="人事处">人事处</option>
                  <option value="古籍整理研究所">古籍整理研究所</option>
                  <option value="社会发展与西部开发研究院">社会发展与西部开发研究院</option>
                  <option value="高分子研究所">高分子研究所</option>
                  <option value="新能源与低碳技术研究院">新能源与低碳技术研究院</option>
                  <option value="“双一流”建设与质量评估办公室">“双一流”建设与质量评估办公室</option>
                  <option value="校长办公室">校长办公室</option>
                  <option value="教务处">教务处</option>
                  <option value="国际交流暑期学院">国际交流暑期学院</option>
                  <option value="四川省国家保密局">四川省国家保密局</option>
                  <option value="成都美国留学中心">成都美国留学中心</option>
                  <option value="教育电视台">教育电视台</option>
                  <option value="创新教育">创新教育</option>
                  <option value="党委学生工作部（处）">党委学生工作部（处）</option>
                  <option value="其它">其它</option>
                </select>
              </div>
              <div class="profile-info-name">专业</div>
              <div class="profile-info-value">
                <select name="subjectNum" id="subjectNum" class="form-control value_element">
                  <option value="">全部</option></select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

function genInfoHTML (info) {
  for (const key of Object.keys(info)) {
    if (!info[key]) {
      info[key] = '-'
    }
  }
  return `
    <div class="info-container">
      <div class="row">
        <div class="col-xs-12">
          <h4 class="header smaller lighter grey">
            <i class="glyphicon glyphicon-list"></i> ${info.zym}方案计划信息
          </h4>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-4">
          <table class="table table-bordered table-hover">
            <tbody>
              <tr>
                <td>方案名称</td>
                <td>${info.famc}</td>
              </tr>
              <tr>
                <td>计划名称</td>
                <td>${info.jhmc}</td>
              </tr>
              <tr>
                <td>年级</td>
                <td>${info.njmc}</td>
              </tr>
              <tr>
                <td>院系名称</td>
                <td>${info.xsm}</td>
              </tr>
              <tr>
                <td>专业名称</td>
                <td>${info.zym}</td>
              </tr>
              <tr>
                <td>专业方向名称</td>
                <td>${info.zyfxm}</td>
              </tr>
              <tr>
                <td>学位</td>
                <td>${info.xwm}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-xs-12 col-md-4">
          <table class="table table-bordered table-hover">
            <tbody>
              <tr>
                <td>毕业类型</td>
                <td>${info.bylxmc}</td>
              </tr>
              <tr>
                <td>学制类型</td>
                <td>${info.xzlxmc}</td>
              </tr>
              <tr>
                <td>修读类型</td>
                <td>${info.xdlxmc}</td>
              </tr>
              <tr>
                <td>方案计划类型</td>
                <td>${info.fajhlx}</td>
              </tr>
              <tr>
                <td>开始学年代码</td>
                <td>${info.xnmc}</td>
              </tr>
              <tr>
                <td>学期类型代码</td>
                <td>${info.xqlxm}</td>
              </tr>
              <tr>
                <td>开始学期代码</td>
                <td>${info.xqm}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-xs-12 col-md-4">
          <table class="table table-bordered table-hover">
            <tbody>
              <tr>
                <td>要求总学分</td>
                <td>${info.yqzxf}</td>
              </tr>
              <tr>
                <td>课程总学分</td>
                <td>${info.kczxf}</td>
              </tr>
              <tr>
                <td>课程总门数</td>
                <td>${info.kczms}</td>
              </tr>
              <tr>
                <td>课程总学时</td>
                <td>${info.kczxs}</td>
              </tr>
              <tr>
                <td>学制类型</td>
                <td>${info.xzlxmc}</td>
              </tr>
              <tr>
                <td>培养目标</td>
                <td>${info.pymb}</td>
              </tr>
              <tr>
                <td>修读要求</td>
                <td>${info.xdyq}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-xs-12">
          <table class="table table-bordered table-hover">
            <tbody>
              <tr>
                <td>备注</td>
                <td>${info.bz}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
}

function genSchemeHTML (list) {
  const courseItemTemplate = (course) => `
    <div class="course-item-wrapper">
      <div class="course-item">
        <div class="course-item-info">
          <div class="info-primary">
            <div class="course-name">
              <div>${course.courseName}</div>
            </div>
          </div>
          <div class="info-secondary">
            <div class="info-tag course-number">${course.courseNumber}</div>
            <div class="info-tag course-type">${course.courseType}</div>
            <div class="info-tag course-property-name${course.coursePropertyName === '必修' || course.coursePropertyName.includes('中华文化') ? ' required' : ''}">${course.coursePropertyName}</div>
          </div>
        </div>
        <!--
        <div class="course-item-score">
          <div class="course-score">${course.courseScore}</div>
          <div class="exam-time">${course.examTime}</div>
        </div>
        -->
      </div>
    </div>
  `
  const semesterItemTemplate = (semester) => `
    <div class="semester-item">
      <div class="semester-item-title">${semester.name}</div>
      <div class="semester-item-content">
        ${semester.children.map(v => courseItemTemplate(v)).join('')}
      </div>
    </div>
  `

  const yearItemTemplate = (year) => `
  <div class="year-item">
    <div class="year-item-title">${year.name}</div>
    <div class="year-item-content">
      ${year.children.map(v => semesterItemTemplate(v)).join('<div class="semester-divider"></div>')}
    </div>
  </div>
  `

  return `
    <div class="scheme-container">
      <div class="row">
        <div class="col-xs-12">
          <h4 class="header smaller lighter grey">
            <i class="glyphicon glyphicon-list"></i> 培养方案与指导性教学计划
          </h4>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="scheme-wrapper">
            ${list.map(v => yearItemTemplate(v)).join('')}
          </div>
        </div>
      </div>
    </div>
  `
}

function getTrainingSchemeData ($) {
  $.ajaxSetup({
    beforeSend: xhr => xhr.setRequestHeader('X-Requested-With', {
      toString () {
        return ''
      }
    })
  })
  const res = Promise.all([
    $.get('http://zhjw.scu.edu.cn/student/rollManagement/project/3623/2/detail')
      .then(({ jhFajhb, treeList }) =>
        ({
          info: jhFajhb,
          list: treeList.reduce(
            (acc, cur) => {
              if (cur.name.match(/^\d{4}-\d{4}学年$/)) {
                acc.push({
                  name: cur.name,
                  children: []
                })
              } else if (cur.name === '春' || cur.name === '秋') {
                acc[acc.length - 1]
                  .children.push({
                    name: cur.name,
                    children: []
                  })
              } else {
                acc[acc.length - 1]
                  .children[acc[acc.length - 1].children.length - 1]
                  .children.push({
                    courseName: cur.name,
                    courseNumber: cur.urlPath.match(/project\/.+\/(\d+)$/)[1]
                  })
              }
              return acc
            },
            [])
        })),
    $.get('http://zhjw.scu.edu.cn/student/integratedQuery/planCompletion/index')
      .then(data => JSON.parse(data.match(/var zNodes = (.+);/)[1]))
      .then(data => data
        .map(v => ({
          type: v.flagType,
          raw: v.name
        }))
        .reduce(
          (acc, cur) => {
            if (cur.type === '001') {
              acc.push({
                name: cur.raw.match(/nbsp;(.+)\(/)[1],
                children: []
              })
            } else if (cur.type === '002') {
              acc[acc.length - 1].children.push({
                name: cur.raw.match(/nbsp;(.+)\(/)[1],
                children: []
              })
            } else {
              const result = cur.raw.match(/nbsp;\[(\d+)\](.+)\[.+,(.+)\((.+)\)\)$/)
              let data = {
                courseType: acc[acc.length - 1].name,
                coursePropertyName: acc[acc.length - 1].children[acc[acc.length - 1].children.length - 1].name
              }
              if (result) {
                data = Object.assign(data, {
                  courseNumber: result[1],
                  courseName: result[2],
                  courseScore: Number(result[3]),
                  examTime: result[4]
                })
              } else {
                const [, courseNumber, courseName] = cur.raw.match(/nbsp;\[(\d+)\](.+)$/)
                data = Object.assign(data, {
                  courseNumber,
                  courseName,
                  courseScore: null,
                  examTime: null
                })
              }
              acc[acc.length - 1].children[acc[acc.length - 1].children.length - 1].children.push(data)
            }
            return acc
          },
          [])
        .reduce(
          (acc, cur) =>
            Object.assign(
              acc,
              cur.children.reduce(
                (ac, cu) =>
                  Object.assign(
                    ac,
                    cu.children.reduce(
                      (a, c) => Object.assign(
                        a,
                        {
                          [c.courseNumber]: c
                        }),
                      {}
                    )
                  ),
                {}
              )
            ),
          {}
        )
      )
  ])
    .then(([{ info, list }, table]) =>
      ({
        info,
        list: list.map(year =>
          ({
            name: year.name,
            children: year.children.map(semester =>
              ({
                name: semester.name,
                children: semester.children
                  .map(v =>
                    Object.assign(
                      v,
                      table[v.courseNumber]
                    ))
                  .sort((a, b) => {
                    const propertyWeight = {
                      必修: 100,
                      '中华文化（春）': 75,
                      '中华文化（秋）': 75,
                      选修: 50
                    }
                    const typeWeight = {
                      公共课: 10,
                      '中华文化（春）_kz': 9,
                      '中华文化（秋）_kz': 9,
                      专业基础课: 8,
                      专业课: 6,
                      实践环节: 4
                    }
                    const weightA = (propertyWeight[a.coursePropertyName] || 0) + (typeWeight[a.courseType] || 0)
                    const weightB = (propertyWeight[b.coursePropertyName] || 0) + (typeWeight[b.courseType] || 0)
                    return weightB - weightA
                  })
              }))
          }))
      })
    )
  // 还原Ajax配置
  $.ajaxSetup({
    beforeSend: null
  })
  return res
}

function renderPageContent2 (root) {
  console.log(root)
  console.log('培养方案查询插件调用222！')
}

module.exports = trainingScheme
