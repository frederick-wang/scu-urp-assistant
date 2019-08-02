// 培养方案查询插件
// TODO: 1. 将弹出框的方向修改为自适应的上下左右4种，且大小在加载出来数据后也可以自适应
// TODO: 2. 美化表格样式
// TODO: 3. 将课程中时间和地点的对应关系体现的更清晰，分成两行
import { trainingSchemeList } from './training-scheme/common'
import { initCourseInfoPopover } from './training-scheme/popover'
import { getChineseNumber } from '../utils/basic'
const fs = require('fs')

const trainingScheme = {
  initCourseInfoPopover,
  async query () {
    const $ = window.$
    const number = $('#major').val()
    if (number !== '无') {
      showLoadingAnimation('.training-scheme-wrapper')
      const { info, list } = await getTrainingSchemeData(number, $)
      hideLoadingAnimation()
      $('.training-scheme-wrapper').append(this.genInfoHTML(info))
      $('.training-scheme-wrapper').append(this.genSchemeHTML(list))
      this.initCourseInfoPopover()
    }
  },
  updateMajorList () {
    const $ = window.$
    const grade = $('#grade').val()
    const department = $('#department').val()
    const res = trainingSchemeList
      .filter(v => v[1] === grade && v[2] === department)
      .map(v => `<option value="${v[0]}">${v[3]}</option>`)
      .join('')
    $('#major').empty().append(res || `<option value="无">无</option>`)
  },
  render (root, $) {
    this.initFunc()
    this.initDOM(root, $)
    this.selectSelfMajorAndQuery($)
  },
  initFunc () {
    window.__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__ = this.updateMajorList.bind(this)
    window.__$SUA_TRAINING_SCHEME_QUERY__ = this.query.bind(this)
  },
  initDOM (root, $) {
    const template = `
      <div class="training-scheme-wrapper">
        ${this.genQueryHTML(trainingSchemeList)}
      </div>
    `
    $(root).append(template)
  },
  async selectSelfMajorAndQuery ($) {
    const selfMajorNumber = await getSelfMajorNumber($)
    const selfSchemeInfo = trainingSchemeList.filter(v => v[0] === selfMajorNumber)[0]
    $('#grade').val(selfSchemeInfo[1])
    $('#department').val(selfSchemeInfo[2])
    this.updateMajorList()
    $('#major').val(selfSchemeInfo[0])
    this.query()
  },
  genQueryHTML (trainingSchemeList) {
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
  },
  genInfoHTML (info) {
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
              <i class="fa fa-graduation-cap"></i> ${info.zym}方案计划信息
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
                  <td>开始学年</td>
                  <td>${info.xnmc}</td>
                </tr>
                <tr>
                  <td>学期类型</td>
                  <td>${info.xqlxm}</td>
                </tr>
                <tr>
                  <td>开始学期</td>
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
  },
  genSchemeHTML (list) {
    const courseItemTemplate = (course, number) => `
      <div class="course-item-wrapper">
        <div class="course-item" data-course-number="${course.courseNumber}" data-course-name="${course.courseName}">
          <div class="course-item-info">
            <div class="info-primary">
              <div class="course-name">
                <div>${number}. <span>${course.courseName}</span></div>
              </div>
            </div>
            <div class="info-secondary">
              <div class="info-tag course-number">课程号：${course.courseNumber}</div>
              ${course.coursePropertyName ? `<div class="info-tag course-property-name${course.coursePropertyName === '必修' || course.coursePropertyName.includes('中华文化') ? ' required' : ''}">${course.coursePropertyName}</div>` : ''}
              ${course.courseAttributes.map(v => `<div class="info-tag course-attribute">${v}</div>`).join('&nbsp;')}
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

    const yearItemTemplate = (year, grade) => `
    <div class="year-item">
      <div class="year-item-title"><i class="fa fa-cubes" aria-hidden="true"></i> ${year.name}（${getChineseNumber(grade)}年级）</div>
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
              ${list.map((v, i) => yearItemTemplate(v, i + 1)).join('')}
            </div>
          </div>
        </div>
      </div>
    `
  }
}

const compareTrainingScheme = {
  render (root, $) {
    this.initFunc()
    this.initDOM(root, $)
    this.selectSelfMajorAndQuery($)
  },
  initFunc () {
    window.__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__ = this.updateMajorList.bind(this)
    window.__$SUA_TRAINING_SCHEME_QUERY__ = this.query.bind(this)
  },
  initDOM (root, $) {
    const template = `
      <div class="compare-training-scheme-wrapper">
        ${this.genQueryHTML(trainingSchemeList)}
      </div>
    `
    $(root).append(template)
  },
  genQueryHTML (trainingSchemeList) {
    const { gradeList, departmentList } = trainingSchemeList.reduce((acc, cur) => ({
      gradeList: acc.gradeList.includes(cur[1]) ? acc.gradeList : acc.gradeList.concat(cur[1]),
      departmentList: acc.departmentList.includes(cur[2]) ? acc.departmentList : acc.departmentList.concat(cur[2])
    }), { gradeList: [], departmentList: [] })
    return `
      <div class="query-container">
        <div id="query-major-1" class="row query-major">
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
                <div class="profile-info-value">专业-1</div>
                <div class="profile-info-name">年级</div>
                <div class="profile-info-value">
                  <select name="grade" id="grade" class="select form-control value_element" onchange="__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__('#query-major-1')">
                    <option value="请选择年级">请选择年级</option>
                    ${gradeList.sort((a, b) => Number(b.replace('级', '')) - Number(a.replace('级', ''))).map(v => `<option value="${v}">${v}</option>`).join('')}
                  </select>
                </div>
                <div class="profile-info-name">院系</div>
                <div class="profile-info-value">
                  <select name="department" id="department" class="select form-control value_element" onchange="__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__('#query-major-1')">
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
        <div id="query-major-2" class="row query-major">
          <div class="col-xs-12 self-margin">
            <div class="profile-user-info profile-user-info-striped self">
              <div class="profile-info-row">
                <div class="profile-info-value">专业-2</div>
                <div class="profile-info-name">年级</div>
                <div class="profile-info-value">
                  <select name="grade" id="grade" class="select form-control value_element" onchange="__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__('#query-major-2')">
                    <option value="请选择年级">请选择年级</option>
                    ${gradeList.sort((a, b) => Number(b.replace('级', '')) - Number(a.replace('级', ''))).map(v => `<option value="${v}">${v}</option>`).join('')}
                  </select>
                </div>
                <div class="profile-info-name">院系</div>
                <div class="profile-info-value">
                  <select name="department" id="department" class="select form-control value_element" onchange="__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__('#query-major-2')">
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
  },
  async selectSelfMajorAndQuery ($) {
    const selfMajorNumber = await getSelfMajorNumber($)
    const selfSchemeInfo = trainingSchemeList.filter(v => v[0] === selfMajorNumber)[0]
    $('#query-major-1 #grade').val(selfSchemeInfo[1])
    $('#query-major-2 #grade').val(selfSchemeInfo[1])
    $('#query-major-1 #department').val(selfSchemeInfo[2])
    $('#query-major-2 #department').val(selfSchemeInfo[2])
    this.updateMajorList('#query-major-1')
    this.updateMajorList('#query-major-2')
    $('#query-major-1 #major').val(selfSchemeInfo[0])
    $('#query-major-2 #major').val(selfSchemeInfo[0])
    // this.query()
  },
  updateMajorList (containerSelector) {
    const $ = window.$
    const grade = $(`${containerSelector} #grade`).val()
    const department = $(`${containerSelector} #department`).val()
    const res = trainingSchemeList
      .filter(v => v[1] === grade && v[2] === department)
      .map(v => `<option value="${v[0]}">${v[3]}</option>`)
      .join('')
    $(`${containerSelector} #major`)
      .empty()
      .append(res || `<option value="无">无</option>`)
  },
  async query () {
    const $ = window.$
    const number1 = $('#query-major-1 #major').val()
    const number2 = $('#query-major-2 #major').val()
    if (number1 !== '无' && number2 !== '无') {
      showLoadingAnimation('.compare-training-scheme-wrapper')
      const [
        { info: info1, list: list1 },
        { info: info2, list: list2 }
      ] = await Promise.all([
        getTrainingSchemeData(number1, $),
        getTrainingSchemeData(number2, $)
      ])
      hideLoadingAnimation()
      $('.compare-training-scheme-wrapper').append(this.genInfoHTML(info1, info2))
      $('.compare-training-scheme-wrapper').append(this.genSchemeHTML(list1, list2))
    }
  },
  genInfoHTML (info1, info2) {
    const preprocess = (info) => {
      for (const key of Object.keys(info)) {
        if (!info[key]) {
          info[key] = '-'
        }
      }
    }
    [info1, info2].forEach(v => preprocess(v))
    const genItemHTML = (info1, info2, key) =>
      info1[key] === info2[key]
        ? `<span class="item-value-same">${info1[key]}</span>`
        : `
          <div class="item-value-1">${info1.zym}（${info1.njmc}）：${info1[key]}</div>
          <div class="item-value-2">${info2.zym}（${info2.njmc}）：${info2[key]}</div>
        `
    return `
      <div class="info-container">
        <div class="info-header row">
          <div class="col-xs-12">
            <h4 class="header smaller lighter grey">
              <i class="fa fa-graduation-cap"></i> 方案计划信息比较
            </h4>
          </div>
        </div>
        <div class="info-header row">
          <div class="col-xs-12">
            <div class="info-tip">提示：在方案计划信息比较结果中，<span class="item-value-same">绿色</span>表示该项两个专业的值相同，<span class="item-value-1">红色</span>表示 <span class="item-value-1">专业-1</span> 的值，<span class="item-value-2">蓝色</span>表示 <span class="item-value-2">专业-2</span> 的值</div>
          </div>
        </div>
        <div class="info-content row">
          <div class="col-xs-12 col-md-4">
            <table class="table table-bordered table-hover">
              <tbody>
                <tr>
                  <td>方案名称</td>
                  <td>${genItemHTML(info1, info2, 'famc')}</td>
                </tr>
                <tr>
                  <td>计划名称</td>
                  <td>${genItemHTML(info1, info2, 'jhmc')}</td>
                </tr>
                <tr>
                  <td>年级</td>
                  <td>${genItemHTML(info1, info2, 'njmc')}</td>
                </tr>
                <tr>
                  <td>院系名称</td>
                  <td>${genItemHTML(info1, info2, 'xsm')}</td>
                </tr>
                <tr>
                  <td>专业名称</td>
                  <td>${genItemHTML(info1, info2, 'zym')}</td>
                </tr>
                <tr>
                  <td>专业方向名称</td>
                  <td>${genItemHTML(info1, info2, 'zyfxm')}</td>
                </tr>
                <tr>
                  <td>学位</td>
                  <td>${genItemHTML(info1, info2, 'xwm')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-xs-12 col-md-4">
            <table class="table table-bordered table-hover">
              <tbody>
                <tr>
                  <td>毕业类型</td>
                  <td>${genItemHTML(info1, info2, 'bylxmc')}</td>
                </tr>
                <tr>
                  <td>学制类型</td>
                  <td>${genItemHTML(info1, info2, 'xzlxmc')}</td>
                </tr>
                <tr>
                  <td>修读类型</td>
                  <td>${genItemHTML(info1, info2, 'xdlxmc')}</td>
                </tr>
                <tr>
                  <td>方案计划类型</td>
                  <td>${genItemHTML(info1, info2, 'fajhlx')}</td>
                </tr>
                <tr>
                  <td>开始学年</td>
                  <td>${genItemHTML(info1, info2, 'xnmc')}</td>
                </tr>
                <tr>
                  <td>学期类型</td>
                  <td>${genItemHTML(info1, info2, 'xqlxm')}</td>
                </tr>
                <tr>
                  <td>开始学期</td>
                  <td>${genItemHTML(info1, info2, 'xqm')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-xs-12 col-md-4">
            <table class="table table-bordered table-hover">
              <tbody>
                <tr>
                  <td>要求总学分</td>
                  <td>${genItemHTML(info1, info2, 'yqzxf')}</td>
                </tr>
                <tr>
                  <td>课程总学分</td>
                  <td>${genItemHTML(info1, info2, 'kczxf')}</td>
                </tr>
                <tr>
                  <td>课程总门数</td>
                  <td>${genItemHTML(info1, info2, 'kczms')}</td>
                </tr>
                <tr>
                  <td>课程总学时</td>
                  <td>${genItemHTML(info1, info2, 'kczxs')}</td>
                </tr>
                <tr>
                  <td>学制类型</td>
                  <td>${genItemHTML(info1, info2, 'xzlxmc')}</td>
                </tr>
                <tr>
                  <td>培养目标</td>
                  <td>${genItemHTML(info1, info2, 'pymb')}</td>
                </tr>
                <tr>
                  <td>修读要求</td>
                  <td>${genItemHTML(info1, info2, 'xdyq')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-xs-12">
            <table class="table table-bordered table-hover">
              <tbody>
                <tr>
                  <td>备注</td>
                  <td>${genItemHTML(info1, info2, 'bz')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `
  },
  genSchemeHTML (list1, list2) {
    const preprocess = (list1, list2) => {
      const totalYear = Math.max(list1.length, list2.length)
      const result = []
      for (let i = 0; i < totalYear; i++) {
        // 第一层循环，处理每个学年数据的合并
        const yearItem1 = list1[i] || { name: '', children: [] }
        const yearItem2 = list2[i] || { name: '', children: [] }
        const yearItem = {
          name: yearItem1.name === yearItem2.name
            ? yearItem1.name
            : [yearItem1.name, yearItem2.name].filter(v => v).join(' / '),
          children: []
        }
        const totalSemester = Math.max(yearItem1.children.length, yearItem2.children.length)
        for (let j = 0; j < totalSemester; j++) {
          // 第二层循环，处理每个学期数据的合并
          const semesterItem1 = yearItem1.children[j] || { name: '', children: [] }
          const semesterItem2 = yearItem2.children[j] || { name: '', children: [] }
          const semesterItem = {
            name: semesterItem1.name === semesterItem2.name
              ? semesterItem1.name
              : [semesterItem1.name, semesterItem2.name].filter(v => v).join(' / '),
            children: []
          }
          // 所有Key对应的值都一样
          // const hasAllSameValues = (objs, keys) => {
          //   for (const key of keys) {
          //     if (!objs.reduce((acc, cur, i, src) => acc ? cur[key] === src[0][key] : acc, true)) {
          //       return false
          //     }
          //   }
          //   return true
          // }
          // 存在一个Key对应的值一样
          const hasASameValue = (objs, keys) => {
            for (const key of keys) {
              if (objs.reduce((acc, cur, i, src) => acc ? cur[key] === src[0][key] : acc, true)) {
                return true
              }
            }
            return false
          }
          const sameCourses = []
          const coursesOnly1 = []
          while (semesterItem1.children.length) {
            const courseItem1 = semesterItem1.children.shift()
            let hasSameCourse = false
            for (let m = 0; m < semesterItem2.children.length; m++) {
              const courseItem2 = semesterItem2.children[m]
              if (hasASameValue([courseItem1, courseItem2], ['courseName', 'courseNumber'])) {
                sameCourses.push({
                  courseNumber1: courseItem1.courseNumber,
                  courseNumber2: courseItem2.courseNumber,
                  courseName1: courseItem1.courseName,
                  courseName2: courseItem2.courseName,
                  coursePropertyName1: courseItem1.coursePropertyName,
                  coursePropertyName2: courseItem2.coursePropertyName,
                  courseAttributes1: courseItem1.courseAttributes,
                  courseAttributes2: courseItem2.courseAttributes,
                  courseMajor1: courseItem1.courseMajor,
                  courseMajor2: courseItem2.courseMajor,
                  comparedResult: 0
                })
                semesterItem2.children.splice(m, 1)
                hasSameCourse = true
                break
              }
            }
            if (!hasSameCourse) {
              coursesOnly1.push(Object.assign(courseItem1, { comparedResult: 1 }))
            }
          }
          const coursesOnly2 = semesterItem2.children.map(v => Object.assign(v, { comparedResult: 2 }))
          semesterItem.children = sameCourses.concat(coursesOnly1, coursesOnly2)
          yearItem.children.push(semesterItem)
        }
        result.push(yearItem)
      }
      return result
    }

    const courseItemTemplate = (course, number) => {
      const getCourseItemClass = (course) => ({
        0: 'item-value-same',
        1: 'item-value-1',
        2: 'item-value-2'
      }[course.comparedResult])
      const courseItemInfoSecondary = (course) => {
        let courseNumberTemplate = ''
        const getCoursePropertyNameClass = (coursePropertyName) => `info-tag course-property-name${coursePropertyName === '必修' ? ' required' : ''}`
        let coursePropertyNameTemplate = ''
        let courseAttributesTemplate = ''
        switch (course.comparedResult) {
          case 0:
            if (course.courseNumber1 === course.courseNumber2) {
              courseNumberTemplate = `<div class="info-tag course-number">${course.courseNumber1}</div>`
            } else {
              courseNumberTemplate = `
                <div class="info-tag course-number"><span class="item-value-1">${course.courseMajor1}：</span>${course.courseNumber1}</div>
                <div class="info-tag course-number"><span class="item-value-2">${course.courseMajor2}：</span>${course.courseNumber2}</div>
               `
            }
            if (course.coursePropertyName1 === course.coursePropertyName2) {
              coursePropertyNameTemplate = course.coursePropertyName1 ? `<div class="${getCoursePropertyNameClass(course.coursePropertyName1)}">${course.coursePropertyName1}</div>` : ''
            } else {
              coursePropertyNameTemplate = `
                ${course.coursePropertyName1 ? `<div class="${getCoursePropertyNameClass(course.coursePropertyName1)}"><span class="item-value-1">${course.courseMajor1}：</span>${course.coursePropertyName1}</div>` : ''}
                ${course.coursePropertyName2 ? `<div class="${getCoursePropertyNameClass(course.coursePropertyName2)}"><span class="item-value-2">${course.courseMajor2}：</span>${course.coursePropertyName2}</div>` : ''}
              `
            }
            const sameAttributes = []
            const attributesOnly1 = []
            while (course.courseAttributes1.length) {
              const attr = course.courseAttributes1.shift()
              if (course.courseAttributes2.includes(attr)) {
                course.courseAttributes2.splice(course.courseAttributes2.indexOf(attr), 1)
                sameAttributes.push(attr)
              } else {
                attributesOnly1.push(`<span class="item-value-1">${course.courseMajor1}：</span>${attr}`)
              }
            }
            const attributesOnly2 = course.courseAttributes2.map(v => `<span class="item-value-2">${course.courseMajor2}：</span>${v}`)
            courseAttributesTemplate = sameAttributes.concat(attributesOnly1, attributesOnly2).map(v => `<div class="info-tag course-attribute">${v}</div>`).join('&nbsp;')
            break
          case 1:
          case 2:
            courseNumberTemplate = `<div class="info-tag course-number">${course.courseNumber}</div>`
            coursePropertyNameTemplate = course.coursePropertyName ? `<div class="${getCoursePropertyNameClass(course.coursePropertyName)}">${course.coursePropertyName}</div>` : ''
            courseAttributesTemplate = course.courseAttributes.map(v => `<div class="info-tag course-attribute">${v}</div>`).join('&nbsp;')
            break
        }
        return `
          <div class="info-secondary">
            ${courseNumberTemplate}
            ${coursePropertyNameTemplate}
            ${courseAttributesTemplate}
          </div>
        `
      }
      const getCourseName = (course) => {
        switch (course.comparedResult) {
          case 0:
            if (course.courseName1 === course.courseName2) {
              return `<span class="item-value-same">${course.courseName1}</span>`
            } else {
              return `
                <span class="item-value-1">${course.courseName1}</span>
                <span>/</span>
                <span class="item-value-2">${course.courseName2}</span>
              `
            }
          case 1:
            return `<span class="item-value-1">${course.courseName}</span>`
          case 2:
            return `<span class="item-value-2">${course.courseName}</span>`
        }
      }
      return `
        <div class="course-item-wrapper">
          <div class="course-item ${getCourseItemClass(course)}">
            <div class="course-item-info">
              <div class="info-primary">
                <div class="course-name">
                  <div>${number}. ${getCourseName(course)}</div>
                </div>
              </div>
              ${courseItemInfoSecondary(course)}
            </div>
          </div>
        </div>
      `
    }
    const semesterItemTemplate = (semester) => `
      <div class="semester-item">
        <div class="semester-item-title">${semester.name}</div>
        <div class="semester-item-content">
          ${semester.children.map((v, i) => courseItemTemplate(v, i + 1)).join('')}
        </div>
      </div>
    `

    const yearItemTemplate = (year, grade) => {
      const yearNames = year.name.split(' / ')
      let yearName
      if (yearNames.length > 1) {
        yearName = `<span class="item-value-1">${yearNames[0]}</span> / <span class="item-value-2">${yearNames[1]}</span>`
      } else {
        yearName = `<span class="item-value-same">${yearNames[0]}</span>`
      }
      return `
        <div class="year-item">
          <div class="year-item-title"><i class="fa fa-cubes" aria-hidden="true"></i> ${yearName}（${getChineseNumber(grade)}年级）</div>
          <div class="year-item-content">
            ${year.children.map(v => semesterItemTemplate(v)).join('<div class="semester-divider"></div>')}
          </div>
        </div>
      `
    }
    return `
      <div class="scheme-container">
        <div class="row">
          <div class="col-xs-12">
            <h4 class="header smaller lighter grey">
              <i class="fa fa-book"></i> 培养方案与指导性教学计划比较
            </h4>
          </div>
        </div>
        <div class="info-header row">
          <div class="col-xs-12">
            <div class="info-tip">提示：在培养方案与指导性教学计划比较结果中，<span class="item-value-same">绿色</span>表示该课程在两个专业中的课程名或课程号相同，<span class="item-value-1">红色</span>表示 <span class="item-value-1">专业-1</span> 独有的课程，<span class="item-value-2">蓝色</span>表示 <span class="item-value-2">专业-2</span> 独有的课程</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <div class="scheme-wrapper">
              ${preprocess(list1, list2).map((v, i) => yearItemTemplate(v, i + 1)).join('')}
            </div>
          </div>
        </div>
      </div>
    `
  }
}

const trainingSchemePlugin = {
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
          path: 'advancedQuery/queryTrainingScheme',
          breadcrumbs: ['SCU URP 助手', '高级查询', '培养方案查询'],
          render: trainingScheme.render.bind(trainingScheme)
        },
        {
          name: '培养方案比较',
          path: 'advancedQuery/compareTrainingScheme',
          breadcrumbs: ['SCU URP 助手', '高级查询', '培养方案比较'],
          render: compareTrainingScheme.render.bind(compareTrainingScheme)
        }
      ]
    }
  ]
}

function showLoadingAnimation (containerSelector) {
  const $ = window.$
  const template = `
      <div class="loading-container">
        <div class="lds-dual-ring"></div>
        <div class="lds-title">( º﹃º ) 兆基祈祷中……</div>
      </div>
    `
  $('.info-container').remove()
  $('.scheme-container').remove()
  $(containerSelector).append(template)
}

function hideLoadingAnimation () {
  const $ = window.$
  $('.loading-container').remove()
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

function getTrainingSchemeData (number, $) {
  $.ajaxSetup({
    beforeSend: xhr => xhr.setRequestHeader('X-Requested-With', {
      toString () {
        return ''
      }
    })
  })
  const coursePropertyNameList = ['必修', '选修']
  const res = Promise.all([
    $.get(`/student/rollManagement/project/${number}/2/detail`)
      .then(({ jhFajhb, treeList }) =>
        ({
          info: jhFajhb,
          list: treeList
            .reduce(
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
            .sort((a, b) => {
              const regexpResultA = a.name.match(/^(\d+)-(\d+)学年$/)
              const regexpResultB = b.name.match(/^(\d+)-(\d+)学年$/)
              const resultA = Number(regexpResultA[1]) + Number(regexpResultA[2])
              const resultB = Number(regexpResultB[1]) + Number(regexpResultB[2])
              return resultA - resultB
            })
        })),
    $.get(`/student/rollManagement/project/${number}/1/detail`)
      .then(({ treeList }) =>
        Object.values(treeList.reduce((acc, cur) => {
          acc[cur.id] = cur
          if (!acc[cur.pId]) {
            acc[cur.pId] = { id: cur.pId }
          }
          cur.parent = acc[cur.pId]
          cur.isDir = cur.name.includes('fa-kz')
          if (cur.name.includes('必修')) {
            cur.coursePropertyName = '必修'
          } else if (cur.name.includes('选修')) {
            cur.coursePropertyName = '选修'
          } else {
            cur.coursePropertyName = ''
          }
          cur.courseName = cur.name.match(/<\/i>(.+)$/)[1].replace(' 必修', '').replace(' 选修', '')
          return acc
        }, {})).reduce((acc, { urlPath, isDir, parent, courseName, coursePropertyName }) => {
          if (urlPath) {
            const courseNumber = urlPath.match(/@(.+)$/)[1]
            if (!isDir) {
              const courseAttributes = []
              let p = parent
              while (p.courseName) {
                if (!coursePropertyNameList.includes(p.courseName)) {
                  courseAttributes.unshift(p.courseName)
                }
                p = p.parent
              }
              acc[courseNumber] = {
                courseName, courseNumber, coursePropertyName, courseAttributes
              }
            }
          }
          return acc
        }, {})
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
                      table[v.courseNumber],
                      { courseMajor: `${info.zym}（${info.njmc}）` }
                    ))
                  .sort((a, b) => {
                    const propertyWeight = {
                      必修: 100,
                      '中华文化（春）': 75,
                      '中华文化（秋）': 75,
                      选修: 50
                    }
                    const attributeWeight = {
                      公共基础课: 10,
                      公共课: 10,
                      '中华文化（春）_kz': 9,
                      '中华文化（秋）_kz': 9,
                      学科基础课: 8,
                      专业基础课: 8,
                      专业课: 6,
                      实践环节: 4
                    }
                    const getAttributesWeight = (attributes) => (attributes || []).reduce((acc, cur) => acc + (attributeWeight[cur] || 0), 0)
                    const weightA = (propertyWeight[a.coursePropertyName] || 0) + getAttributesWeight(a.courseAttributes)
                    const weightB = (propertyWeight[b.coursePropertyName] || 0) + getAttributesWeight(b.courseAttributes)
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

module.exports = trainingSchemePlugin
