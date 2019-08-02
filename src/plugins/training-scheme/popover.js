import { getChineseNumber } from '../../utils/basic'

let currentQueryCourse = null

function initCourseInfoPopover () {
  const $ = window.$
  const { academicInfo: { currentSemester } } = window.__$SUA_SHARED_DATA__
  // 教务系统课程信息频繁查询的阈值
  const initDOM = function (courseName, courseNumber) {
    if ($('.course-info-popover').length) {
      $('.course-info-popover').remove()
    }
    const loadingTips = `( º﹃º ) 兆基祈祷中……`
    $(this).append(`
      <div class="course-info-popover">
        <div class="ci-popover-title">${courseName}（${courseNumber}）</div>
        <div class="ci-popover-content">${loadingTips}</div>
        <div class="ci-popover-arrow"></div>
      </div>
    `)
    const $pop = $('.course-info-popover')
    if ($pop.offset().left + $pop.width() > $('body').width()) {
      $pop.offset({ left: $('body').width() - $pop.width() - 80 })
    } else if ($pop.offset().left < 0) {
      $pop.offset({ left: 50 })
    }
  }
  $('.course-item').hover(async function (e) {
    const $courseInfo = $(this)
    const courseName = $courseInfo.data('course-name')
    const courseNumber = $courseInfo.data('course-number')
    currentQueryCourse = this
    initDOM.bind(this)(courseName, courseNumber)
    getCourseInfoData(currentSemester, courseName, courseNumber, this)
  }, function (e) {
    currentQueryCourse = null
    $(this).children('.course-info-popover').remove()
  })
}

async function getCourseInfoData (currentSemester, courseName, courseNumber, element) {
  const $ = window.$
  if (currentQueryCourse === element) {
    const res = await $.post('/student/integratedQuery/course/courseSchdule/courseInfo', {
      zxjxjhh: currentSemester,
      kcm: courseName,
      kch: courseNumber,
      pageNum: 1,
      pageSize: 1000
    })
    if (currentQueryCourse !== element) {
      return {
        semester: currentSemester,
        number: courseNumber,
        name: courseName,
        records: []
      }
    }
    // pfcx 是「频繁查询的意思」
    if (!res.pfcx) {
      const records = res.list.records
        .map(({
          kcm,
          kch,
          kxh,
          kkxsh,
          kkxsjc,
          xf,
          kclbdm,
          kclbmc,
          kslxdm,
          kslxmc,
          skjs,
          zcsm,
          skxq,
          skjc,
          xqm,
          jxlm,
          jasm,
          bkskrl,
          bkskyl,
          xkxzsm
        }) => ({
          courseName: kcm || '',
          courseNumber: kch || '',
          courseSequenceNumber: kxh || '',
          departmentCode: kkxsh || '',
          departmentName: kkxsjc || '',
          credit: (!xf && xf !== 0) ? '' : xf,
          courseTypeCode: kclbdm || '',
          courseTypeName: kclbmc || '',
          examTypeCode: kslxdm || '',
          examTypeName: kslxmc || '',
          teacherName: skjs || '',
          courseTime: `${zcsm}星期${getChineseNumber(skxq)}${skjc}节`,
          courseSite: `${xqm}校区${jxlm}${jasm}`,
          availibleCapacity: `${bkskyl} / ${bkskrl}`,
          note: (xkxzsm && xkxzsm !== ';') ? xkxzsm : ''
        }))
        .reduce((acc, cur) => {
          let index = -1
          for (let i = 0; i < acc.length; i++) {
            if (acc[i].courseSequenceNumber === cur.courseSequenceNumber) {
              index = i
              break
            }
          }
          const merge = (obj1, obj2) => {
            const result = {}
            for (const key in obj1) {
              result[key] = obj1[key] === obj2[key] ? obj1[key] : `${obj1[key]}，${obj2[key]}`
            }
            return result
          }
          if (index === -1) {
            return acc.concat(cur)
          }
          acc[index] = merge(acc[index], cur)
          return acc
        }, [])
        .sort((a, b) => Number(a.courseSequenceNumber) - Number(b.courseSequenceNumber))
      const data = {
        semester: currentSemester,
        number: courseNumber,
        name: courseName,
        records
      }
      const $pop = $('.course-info-popover')
      const $popTitle = $pop.children('.ci-popover-title')
      const $popContent = $pop.children('.ci-popover-content')
      let titleText
      let templateHTML
      if (records.length) {
        titleText = `${courseName}（${courseNumber}）- 共${records.length}个课序号`
        const genRowsHTML = (records) =>
          records
            .map(
              ({ courseSequenceNumber, departmentName, credit, courseTypeName, examTypeName, teacherName, courseTime, courseSite, availibleCapacity, note }) =>
                `<tr>
                <td>${courseSequenceNumber}</td>
                <td>${departmentName}</td>
                <td>${credit}</td>
                <td>${courseTypeName}</td>
                <td>${examTypeName}</td>
                <td>${teacherName}</td>
                <td>${courseTime}</td>
                <td>${courseSite}</td>
                <td>${availibleCapacity}</td>
                <td>${note}</td>
              </tr>`
            )
            .join('')
        templateHTML = `
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>课序号</th>
                <th>开课院系</th>
                <th>学分</th>
                <th>课程类别</th>
                <th>考试类型</th>
                <th>教师</th>
                <th>时间</th>
                <th>地点</th>
                <th>课余量</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              ${genRowsHTML(records)}
            </tbody>
          </table>
        `
      } else {
        titleText = `${courseName}（${courseNumber}）`
        templateHTML = `<p style="color: #CB1B45;">${courseName}（${courseNumber}）并未在本学期开课</p>`
      }
      $popTitle.text(titleText)
      $popContent.html(templateHTML)
      return data
    }
    return new Promise(resolve =>
      setTimeout(
        () => resolve(getCourseInfoData(currentSemester, courseName, courseNumber, element)),
        1000
      )
    )
  }
  return {
    semester: currentSemester,
    number: courseNumber,
    name: courseName,
    records: []
  }
}

module.exports = { initCourseInfoPopover, getCourseInfoData }
