import {
  showLoadingAnimation,
  hideLoadingAnimation,
  genFooterHTML
} from './common'
import { actions, Request, state } from '@/store'
import {
  TrainingSchemeBaseInfo,
  TrainingSchemeYearInfo,
  TrainingSchemeSemesterInfo,
  TrainingSchemeCourseInfo
} from '@/store/types'
import { initCourseInfoPopover } from './popover'
import { getChineseNumber } from '@/utils'
import { emitDataAnalysisEvent } from '../data-analysis'
import html2canvas from 'html2canvas'

let trainingSchemeList: string[][]

function genInfoHTML(info: TrainingSchemeBaseInfo): string {
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
}

function genSchemeHTML(list: TrainingSchemeYearInfo[]): string {
  const courseItemTemplate = (
    course: TrainingSchemeCourseInfo,
    number: number
  ): string => `
      <div class="course-item-wrapper">
        <div class="course-item" title="点击查看详细开课情况" data-course-number="${
          course.courseNumber
        }" data-course-name="${course.courseName}">
          <div class="course-item-info">
            <div class="info-primary">
              <div class="course-name">
                <div>${number}. <span>${course.courseName}</span></div>
              </div>
            </div>
            <div class="info-secondary">
              <div class="info-tag course-number">课程号：${
                course.courseNumber
              }</div>
              ${
                course.coursePropertyName
                  ? `<div class="info-tag course-property-name${
                      course.coursePropertyName === '必修' ||
                      course.coursePropertyName.includes('中华文化')
                        ? ' required'
                        : ''
                    }">${course.coursePropertyName}</div>`
                  : ''
              }
              ${course.courseAttributes
                .map(v => `<div class="info-tag course-attribute">${v}</div>`)
                .join('&nbsp;')}
            </div>
          </div>
        </div>
      </div>
    `
  const semesterItemTemplate = (
    semester: TrainingSchemeSemesterInfo
  ): string => `
      <div class="semester-item">
        <div class="semester-item-title">${semester.name}</div>
        <div class="semester-item-content">
          ${semester.children
            .map((v, i) => courseItemTemplate(v, i + 1))
            .join('')}
        </div>
      </div>
    `

  const yearItemTemplate = (
    year: TrainingSchemeYearInfo,
    grade: number
  ): string => `
    <div class="year-item">
      <div class="year-item-title"><i class="fa fa-cubes" aria-hidden="true"></i> ${
        year.name
      }（${getChineseNumber(grade)}年级）</div>
      <div class="year-item-content">
        ${year.children
          .map(v => semesterItemTemplate(v))
          .join('<div class="semester-divider"></div>')}
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

async function query(): Promise<void> {
  let majorNumber = $('#major').val()
  if (!majorNumber) {
    emitDataAnalysisEvent('培养方案查询', '查询失败，专业代码为空')
    return
  }
  majorNumber = String(majorNumber)
  if (majorNumber !== '无') {
    $('.program-plan-wrapper').remove()
    showLoadingAnimation('.sua-container-query-training-scheme')
    try {
      const { info, list } = await actions[Request.TRAINING_SCHEME](
        Number(majorNumber)
      )
      hideLoadingAnimation()
      $('.sua-container-query-training-scheme').append(
        `<div class="program-plan-wrapper"></div>`
      )
      $('.program-plan-wrapper').append(genInfoHTML(info))
      $('.program-plan-wrapper').append(genSchemeHTML(list))
      $('.program-plan-wrapper').append(genFooterHTML())
      $('.footer-container').hide()
      initCourseInfoPopover()
      const majorName = trainingSchemeList.filter(
        ([v]) => v === majorNumber
      )[0][3]
      const grade = $('#grade').val()
      emitDataAnalysisEvent('培养方案查询', '查询成功', {
        专业代码: majorNumber,
        专业名称: `${majorName}（${grade}）`
      })
    } catch (error) {
      emitDataAnalysisEvent('培养方案查询', '数据获取失败')
    }
  }
}

function updateMajorList(): void {
  const grade = $('#grade').val()
  const department = $('#department').val()
  const res = trainingSchemeList
    .filter(v => v[1] === grade && v[2] === department)
    .map(v => `<option value="${v[0]}">${v[3]}</option>`)
    .join('')
  $('#major')
    .empty()
    .append(res || `<option value="无">无</option>`)
}

function initDOM(root: HTMLElement): void {
  const template = `
      <div class="sua-container-query-training-scheme">
      </div>
    `
  $(root).append(template)
}

function genQueryHTML(): string {
  const { gradeList, departmentList } = trainingSchemeList.reduce(
    (acc, cur) => ({
      gradeList: acc.gradeList.includes(cur[1] as string)
        ? acc.gradeList
        : acc.gradeList.concat(cur[1] as string),
      departmentList: acc.departmentList.includes(cur[2] as string)
        ? acc.departmentList
        : acc.departmentList.concat(cur[2] as string)
    }),
    { gradeList: [] as string[], departmentList: [] as string[] }
  )
  return `
      <div class="query-container">
        <div class="row">
          <div class="col-xs-12 self-margin">
            <h4 class="header smaller lighter grey">
              <i class="ace-icon fa fa-search"></i>查询条件
              <span class="right_top_oper">
                <button id="queryButton" title="查询" class="btn btn-info btn-xs btn-round">
                  <i class="ace-con fa fa-search white bigger-120"></i> 查询
                </button>
                <button id="saveButton" title="导出长图" class="btn btn-success btn-xs btn-round">
                  <i class="ace-con fa fa-cloud-download white bigger-120"></i> 导出长图
                </button>
              </span>
            </h4>
            <div class="profile-user-info profile-user-info-striped self">
              <div class="profile-info-row">
                <div class="profile-info-name">年级</div>
                <div class="profile-info-value">
                  <select name="grade" id="grade" class="select form-control value_element">
                    <option value="请选择年级">请选择年级</option>
                    ${gradeList
                      .sort(
                        (a, b) =>
                          Number(b.replace('级', '')) -
                          Number(a.replace('级', ''))
                      )
                      .map(v => `<option value="${v}">${v}</option>`)
                      .join('')}
                  </select>
                </div>
                <div class="profile-info-name">院系</div>
                <div class="profile-info-value">
                  <select name="department" id="department" class="select form-control value_element">
                    <option value="请选择学院">请选择学院</option>
                    ${departmentList
                      .map(v => `<option value="${v}">${v}</option>`)
                      .join('')}
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

function initQueryDOM(): void {
  $('.sua-container-query-training-scheme').append(genQueryHTML())
}

function save(): void {
  if ($('.program-plan-wrapper').length) {
    $('.footer-container').show()
    window.urp.alert('正在生成培养方案长图，请稍作等待')
    setTimeout(async () => {
      const canvas = await html2canvas($('.program-plan-wrapper')[0], {
        useCORS: true
      })
      canvas.toBlob(blob => {
        const majorName = trainingSchemeList.filter(
          ([v]) => v === $('#major').val()
        )[0][3]
        const grade = $('#grade').val()
        const department = $('#department').val()
        const e = document.createEvent('MouseEvents')
        const a = document.createElement('a')
        const filename = `${department}-${majorName}（${grade}）培养方案`
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['image/png', a.download, a.href].join(':')
        e.initMouseEvent(
          'click',
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        )
        a.dispatchEvent(e)
        $('.footer-container').hide()
        window.urp.alert('图片文件下载已启动，请注意保存哦')
      })
    }, 0)
  } else {
    window.urp.alert('请先按查询按钮，再保存结果哦')
  }
}

function initEvents(): void {
  $('#grade').change(updateMajorList)
  $('#department').change(updateMajorList)
  $('#queryButton').click(query)
  $('#saveButton').click(save)
}

async function selectSelfMajorAndQuery(): Promise<void> {
  const selfMajorNumber = state.user.programPlanNumber
  const selfSchemeInfo = trainingSchemeList.filter(
    v => Number(v[0]) === selfMajorNumber
  )[0]
  $('#grade').val(selfSchemeInfo[1] as string)
  $('#department').val(selfSchemeInfo[2] as string)
  updateMajorList()
  $('#major').val(selfSchemeInfo[0] as string)
  query()
}

export async function render(root: HTMLElement): Promise<void> {
  initDOM(root)
  showLoadingAnimation('.sua-container-query-training-scheme')
  try {
    trainingSchemeList = await actions[Request.TRAINING_SCHEME_LIST]()
    hideLoadingAnimation()
    initQueryDOM()
    initEvents()
    selectSelfMajorAndQuery()
  } catch (error) {
    emitDataAnalysisEvent('培养方案查询', '培养方案列表数据获取失败')
  }
}
