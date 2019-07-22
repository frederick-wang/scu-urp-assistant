// 培养方案查询插件
const fs = require('fs')
const trainingSchemeList = JSON.parse(fs.readFileSync('src/plugins/training-scheme-list.json', 'utf8'))

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
        }
      ]
    }
  ]
}

async function query () {
  const $ = window.$
  const number = $('#major').val()
  if (number !== '无') {
    const { info, list } = await getTrainingSchemeData(number, $)
    $('.info-container').remove()
    $('.scheme-container').remove()
    $('.training-scheme-wrapper').append(genInfoHTML(info))
    $('.training-scheme-wrapper').append(genSchemeHTML(list))
  }
}

function updateMajorList () {
  const $ = window.$
  const grade = $('#grade').val()
  const department = $('#department').val()
  const res = trainingSchemeList
    .filter(v => v[1] === grade && v[2] === department)
    .map(v => `<option value="${v[0]}">${v[3]}</option>`)
    .join('')
  $('#major').empty().append(res || `<option value="无">无</option>`)
}

function getSelfMajorNumber ($) {
  $.ajaxSetup({
    beforeSend: xhr => xhr.setRequestHeader('X-Requested-With', {
      toString () {
        return ''
      }
    })
  })
  const res = $.get('/student/rollManagement/rollInfo/index').then(res => res.match(/name="zx" value="(\d+)"/)[1])
  // 还原Ajax配置
  $.ajaxSetup({
    beforeSend: null
  })
  return res
}

async function renderPageContent (root, $) {
  const selfMajorNumber = await getSelfMajorNumber($)
  const { info, list } = await getTrainingSchemeData(selfMajorNumber, $)
  window.__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__ = updateMajorList
  window.__$SUA_TRAINING_SCHEME_QUERY__ = query
  const template = `
    <div class="training-scheme-wrapper">
      ${genQueryHTML(trainingSchemeList)}
      ${genInfoHTML(info)}
      ${genSchemeHTML(list)}
    </div>
  `
  $(root).append(template)
  const selfSchemeInfo = trainingSchemeList.filter(v => v[0] === selfMajorNumber)[0]
  $('#grade').val(selfSchemeInfo[1])
  $('#department').val(selfSchemeInfo[2])
  updateMajorList()
  $('#major').val(selfSchemeInfo[0])
}

function genQueryHTML (trainingSchemeList) {
  const { gradeList, departmentList } = trainingSchemeList.reduce((acc, cur) => ({
    gradeList: acc.gradeList.includes(cur[1]) ? acc.gradeList : acc.gradeList.concat(cur[1]),
    departmentList: acc.departmentList.includes(cur[2]) ? acc.departmentList : acc.departmentList.concat(cur[2])
  }), { gradeList: [], departmentList: [] })
  return `
    <div class="query-container">
      <div class="row">
        <div class="col-xs-12 self-margin">
          <h4 class="header smaller lighter grey">
            <i class="ace-icon fa fa-search"></i>查询条件
            <span class="right_top_oper">
              <button id="queryButton" title="查询" class="btn btn-info btn-xs btn-round" onclick="__$SUA_TRAINING_SCHEME_QUERY__()">
                <i class="ace-con fa fa-search white bigger-120"></i>查询
              </button>
            </span>
          </h4>
          <div class="profile-user-info profile-user-info-striped self">
            <div class="profile-info-row">
              <div class="profile-info-name">年级</div>
              <div class="profile-info-value">
                <select name="grade" id="grade" class="select form-control value_element" onchange="__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__()">
                  <option value="请选择年级">请选择年级</option>
                  ${gradeList.sort((a, b) => Number(b.replace('级', '')) - Number(a.replace('级', ''))).map(v => `<option value="${v}">${v}</option>`).join('')}
                </select>
              </div>
              <div class="profile-info-name">院系</div>
              <div class="profile-info-value">
                <select name="department" id="department" class="select form-control value_element" onchange="__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__()">
                  <option value="请选择学院">请选择学院</option>
                  ${departmentList.map(v => `<option value="${v}">${v}</option>`).join('')}
                </select>
              </div>
              <div class="profile-info-name">专业</div>
              <div class="profile-info-value">
                <select name="major" id="major" class="form-control value_element">
                  <option value="无">无</option>
                </select>
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
      <div class="info-header row">
        <div class="col-xs-12">
          <h4 class="header smaller lighter grey">
            <i class="glyphicon glyphicon-list"></i> ${info.zym}方案计划信息
          </h4>
        </div>
      </div>
      <div class="info-content row">
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
  const courseItemTemplate = (course, number) => `
    <div class="course-item-wrapper">
      <div class="course-item">
        <div class="course-item-info">
          <div class="info-primary">
            <div class="course-name">
              <div>${number}. ${course.courseName}</div>
            </div>
          </div>
          <div class="info-secondary">
            <div class="info-tag course-number">${course.courseNumber}</div>
            <div class="info-tag course-type">${course.courseType}</div>
            <div class="info-tag course-property-name${course.coursePropertyName === '必修' || course.coursePropertyName.includes('中华文化') ? ' required' : ''}">${course.coursePropertyName}</div>
          </div>
        </div>
      </div>
    </div>
  `
  const semesterItemTemplate = (semester) => `
    <div class="semester-item">
      <div class="semester-item-title">${semester.name}</div>
      <div class="semester-item-content">
        ${semester.children.map((v, i) => courseItemTemplate(v, i + 1)).join('')}
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
            <i class="fa fa-book"></i> 培养方案与指导性教学计划
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

function getTrainingSchemeData (number, $) {
  $.ajaxSetup({
    beforeSend: xhr => xhr.setRequestHeader('X-Requested-With', {
      toString () {
        return ''
      }
    })
  })
  const res = Promise.all([
    $.get(`/student/rollManagement/project/${number}/2/detail`)
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
    $.get(`/student/rollManagement/project/${number}/1/detail`)
      .then(({ treeList }) =>
        treeList
          .map(v => ({ name: v.name.match(/<\/i>(.+)$/)[1], id: v.urlPath.match(/@(.+)$/)[1] }))
          .reduce(
            (acc, cur) => {
              if (cur.name.match(/^公共课|公共基础课|专业基础课|学科基础课|专业课|实践环节|跨专业选修课_kz|中华文化（春）_kz|中华文化（秋）_kz$/)) {
                acc.push({
                  name: cur.name,
                  children: []
                })
              } else if (cur.name === '必修' || cur.name === '选修' || cur.name === '跨专业选修课' || cur.name === '中华文化（春）' || cur.name === '中华文化（秋）') {
                acc[acc.length - 1]
                  .children.push({
                    name: cur.name,
                    children: []
                  })
              } else {
                acc[acc.length - 1]
                  .children[acc[acc.length - 1].children.length - 1]
                  .children.push({
                    courseName: cur.name.replace(/\s+(必修|选修)/g, ''),
                    courseNumber: cur.id,
                    courseType: acc[acc.length - 1].name,
                    coursePropertyName: acc[acc.length - 1].children[acc[acc.length - 1].children.length - 1].name
                  })
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
      ),
    number
  ])
    .then(([{ info, list, selfMajorNumber }, table]) =>
      ({
        selfMajorNumber,
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
                      公共基础课: 10,
                      公共课: 10,
                      '中华文化（春）_kz': 9,
                      '中华文化（秋）_kz': 9,
                      学科基础课: 8,
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

module.exports = trainingScheme
