import { getChineseNumber } from '../../utils/basic'

interface CourseInfoAPIData {
  pfcx: number
  list: {
    pageSize: number
    pageNum: number
    pageContext: {
      totalCount: number
    }
    records: RawRecord[]
  }
}

interface RawRecord {
  id: string
  zxjxjhh: string
  kch: string
  kxh: string
  kcm: string
  xf: number
  xs: number
  kkxsh: string
  kkxsjc: string
  kslxdm: string
  kslxmc: string
  skjs: string
  bkskrl: number
  bkskyl: number
  xkmsdm: string
  xkmssm: string
  xkkzdm: string
  xkkzsm: string
  xkkzh?: any
  xkxzsm: string
  kkxqh: string
  kkxqm: string
  sfxzxslx?: any
  sfxzxsnj?: any
  sfxzxsxs?: string
  sfxzxxkc?: any
  sfxzxdlx: string
  xqh: string
  jxlh: string
  jash: string
  jclxdm: string
  skzc: string
  skxq: number
  skjc: number
  cxjc: number
  xqlxdm: string
  xqdm: string
  xss: number
  zcsm: string
  kclbdm: string
  kclbmc: string
  xkbz?: any
  xqm: string
  jxlm: string
  jasm: string
}

interface CourseInfoRecord {
  courseName: string
  courseNumber: string
  courseSequenceNumber: string
  departmentCode: string
  departmentName: string
  credit: number
  courseTypeCode: string
  courseTypeName: string
  examTypeCode: string
  examTypeName: string
  teacherName: string
  courseTime: string
  courseSite: string
  availibleCapacity: string
  note: string
  [key: string]: any
}

interface CourseInfo {
  semester: string
  number: string
  name: string
  records: CourseInfoRecord[]
}

let currentQueryCourse: HTMLElement | null = null

export function initCourseInfoPopover() {
  if (!window.__$SUA_SHARED_DATA__) {
    return
  }
  const {
    academicInfo: { currentSemester }
  } = window.__$SUA_SHARED_DATA__
  // 教务系统课程信息频繁查询的阈值
  const initDOM = function(
    element: HTMLElement,
    courseName: string,
    courseNumber: string
  ) {
    if ($('.course-info-popover').length) {
      $('.course-info-popover').remove()
    }
    const loadingTips = `( º﹃º ) 兆基祈祷中……`
    $(element).append(`
      <div class="course-info-popover">
        <div class="ci-popover-title">${courseName}（${courseNumber}）</div>
        <div class="ci-popover-content">${loadingTips}</div>
        <div class="ci-popover-arrow"></div>
      </div>
    `)
    const $pop = $('.course-info-popover')
    const { left } = $pop.offset() || { left: 0 }
    const popWidth = $pop.width() || 0
    const bodyWidth = $('body').width() || 0
    if (left + popWidth > bodyWidth) {
      $pop.offset({ left: bodyWidth - popWidth - 80 })
    } else if (left < 0) {
      $pop.offset({ left: 50 })
    }
  }
  $('.course-item').hover(
    async function() {
      const $courseInfo = $(this)
      const courseName = $courseInfo.data('course-name')
      const courseNumber = $courseInfo.data('course-number')
      currentQueryCourse = this
      initDOM(this, courseName, courseNumber)
      getCourseInfoData(currentSemester, courseName, courseNumber, this)
    },
    function(e) {
      currentQueryCourse = null
      $(this)
        .children('.course-info-popover')
        .remove()
    }
  )
}

async function getCourseInfoData(
  currentSemester: string,
  courseName: string,
  courseNumber: string,
  element: Element
): Promise<CourseInfo> {
  if (currentQueryCourse === element) {
    const res: CourseInfoAPIData = await $.post(
      '/student/integratedQuery/course/courseSchdule/courseInfo',
      {
        zxjxjhh: currentSemester,
        kcm: courseName,
        kch: courseNumber,
        pageNum: 1,
        pageSize: 1000
      }
    )
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
        .map(
          ({
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
            credit: xf || 0,
            courseTypeCode: kclbdm || '',
            courseTypeName: kclbmc || '',
            examTypeCode: kslxdm || '',
            examTypeName: kslxmc || '',
            teacherName: skjs || '',
            courseTime: `${zcsm}星期${getChineseNumber(skxq)}${skjc}节`,
            courseSite: `${xqm}校区${jxlm}${jasm}`,
            availibleCapacity: `${bkskyl} / ${bkskrl}`,
            note: xkxzsm && xkxzsm !== ';' ? xkxzsm : ''
          })
        )
        .reduce(
          (acc, cur) => {
            let index = -1
            for (let i = 0; i < acc.length; i++) {
              if (acc[i].courseSequenceNumber === cur.courseSequenceNumber) {
                index = i
                break
              }
            }
            const merge = (obj1: CourseInfoRecord, obj2: CourseInfoRecord) => {
              const result = {} as CourseInfoRecord
              for (const key in obj1) {
                result[key] =
                  obj1[key] === obj2[key]
                    ? obj1[key]
                    : `${obj1[key]}，${obj2[key]}`
              }
              return result
            }
            if (index === -1) {
              return acc.concat(cur)
            }
            acc[index] = merge(acc[index], cur)
            return acc
          },
          [] as CourseInfoRecord[]
        )
        .sort(
          (a, b) =>
            Number(a.courseSequenceNumber) - Number(b.courseSequenceNumber)
        )
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
        titleText = `${courseName}（${courseNumber}）- 共${
          records.length
        }个课序号`
        const genRowsHTML = (records: CourseInfoRecord[]) =>
          records
            .map(
              ({
                courseSequenceNumber,
                departmentName,
                credit,
                courseTypeName,
                examTypeName,
                teacherName,
                courseTime,
                courseSite,
                availibleCapacity,
                note
              }) =>
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
        () =>
          resolve(
            getCourseInfoData(
              currentSemester,
              courseName,
              courseNumber,
              element
            )
          ),
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
