// 绩点计算插件
import { CourseScoreBaseInfo } from '@/utils/api/types'
import { requestData, Request } from '@/utils/api'

interface Record {
  semester: string
  courses: CourseScoreBaseRecord[]
}

interface CourseScoreBaseRecord extends CourseScoreBaseInfo {
  selected: boolean
}

let $indexWidget: JQuery<HTMLElement> | null
let $gpaContent: JQuery<HTMLElement> | null
let $gpaStContainer: JQuery<HTMLElement> | null
let records: Record[] | null

/**
 * 初始化最初的界面
 */
function initDOM() {
  $indexWidget = $(templates.indexWidget())
  $('.page-content')
    .children('.row')
    .append($indexWidget)
  $gpaContent = $indexWidget.find('.gpa-content')
  $gpaStContainer = $indexWidget.find('.gpa-st-container')
}

/**
 * 渲染「总成绩」部分的界面
 */
function renderTotalTranscript() {
  if (!$gpaContent || !records) {
    return
  }
  const semestersQuantity = records.length
  const allCourses = records.reduce(
    (acc, cur) => acc.concat(cur.courses),
    [] as CourseScoreBaseRecord[]
  )
  const labels = templates.totalTranscript(semestersQuantity, allCourses)
  $gpaContent.prepend(labels)
}

/**
 * 渲染「学期成绩」部分的界面
 */
function renderSemesterTranscript() {
  if (!records) {
    return
  }
  records.forEach(({ semester, courses }) => {
    if (!$gpaStContainer) {
      return
    }
    $gpaStContainer.append(templates.semesterTranscript(semester, courses))
  })
}

/**
 * 销毁页面元素
 */
function destroy() {
  if ($gpaStContainer) {
    $gpaStContainer.remove()
    $gpaStContainer = null
  }
  if ($gpaContent) {
    $gpaContent.remove()
    $gpaContent = null
  }
  if ($indexWidget) {
    $indexWidget.remove()
    $indexWidget = null
  }

  records = null
}

/**
 * 渲染与「选择」有关的元素
 */
function renderTagSelected() {
  renderSemesterTagSelected()
  renderTotalTagSelected()
}

/**
 * 渲染与「选择」有关的「分学期」元素
 */
function renderSemesterTagSelected() {
  if (!records) {
    return
  }
  records.forEach(({ semester, courses }) => {
    const selectedCourses = courses.filter(v => v.selected)
    const getSemester$Element = (className: string) =>
      $(
        Array.from(document.getElementsByClassName(className)).filter(
          v => (v as HTMLElement).dataset.semester === semester
        )[0]
      )
    const $selectedCourseQuantityBadge = getSemester$Element(
      'gpa-info-badge-st-selected-course-quantity'
    )
    const $selectedCourseCreditsBadge = getSemester$Element(
      'gpa-info-badge-st-selected-course-credits'
    )
    const $scoreTag = getSemester$Element('gpa-st-tag-selected-score')
    const $gpaTag = getSemester$Element('gpa-st-tag-selected-gpa')
    const $selectAllBtn = getSemester$Element('gpa-st-select-all-btn')
    const $cancelBtn = getSemester$Element('gpa-st-cancel-btn')
    if (selectedCourses.length) {
      const selectedCoursesQuantity = selectedCourses.length
      const selectedCourseCredits = selectedCourses.reduce(
        (acc, cur) => acc + cur.credit,
        0
      )
      const selectedCoursesScore = getAllCoursesScore(selectedCourses)
      const selectedCoursesGPA = getAllCoursesGPA(selectedCourses)

      $selectedCourseQuantityBadge.show()
      $selectedCourseQuantityBadge.attr(
        'title',
        `在${semester}，您当前选中了 ${selectedCoursesQuantity} 门课程`
      )
      $selectedCourseQuantityBadge.text(`${selectedCoursesQuantity} 门`)
      $selectedCourseCreditsBadge.show()
      $selectedCourseCreditsBadge.attr(
        'title',
        `在${semester}，您当前选中的课程总学分为 ${selectedCourseCredits}`
      )
      $selectedCourseCreditsBadge.text(`${selectedCourseCredits} 学分`)
      $scoreTag.show()
      $scoreTag.attr(
        'title',
        `在${semester}，您当前选出了 ${selectedCoursesQuantity} 门课程进行计算，选中课程的加权平均分为 ${selectedCoursesScore}`
      )
      $scoreTag.text(`选中课程平均分：${selectedCoursesScore}`)
      $gpaTag.show()
      $gpaTag.attr(
        'title',
        `在${semester}，您当前选出了 ${selectedCoursesQuantity} 门课程进行计算，选中课程的加权平均绩点为 ${selectedCoursesGPA}`
      )
      $gpaTag.text(`选中课程绩点：${selectedCoursesGPA}`)
      $selectAllBtn.hide()
      $cancelBtn.show()
    } else {
      $selectedCourseQuantityBadge.hide()
      $selectedCourseCreditsBadge.hide()
      $scoreTag.hide()
      $gpaTag.hide()
      $selectAllBtn.show()
      $cancelBtn.hide()
    }
  })
}

/**
 * 渲染与「选择」有关的「全部成绩」元素
 */
function renderTotalTagSelected() {
  if (!records) {
    return
  }
  const selectedCourses = records
    .reduce(
      (acc, cur) => acc.concat(cur.courses),
      [] as CourseScoreBaseRecord[]
    )
    .filter(v => v.selected)
  const $selectedCourseQuantityBadge = $(
    '.gpa-info-badge-tt-selected-course-quantity'
  )
  const $selectedCourseCreditsBadge = $(
    '.gpa-info-badge-tt-selected-course-credits'
  )
  const $scoreTag = $('.gpa-tt-tag-selected-score')
  const $gpaTag = $('.gpa-tt-tag-selected-gpa')
  const $selectAllBtn = $('.gpa-tt-select-all-btn')
  const $cancelBtn = $('.gpa-tt-cancel-btn')
  if (selectedCourses.length) {
    const semestersQuantity = records.length
    const selectedCoursesQuantity = selectedCourses.length
    const selectedCourseCredits = selectedCourses.reduce(
      (acc, cur) => acc + cur.credit,
      0
    )
    const selectedCoursesScore = getAllCoursesScore(selectedCourses)
    const selectedCoursesGPA = getAllCoursesGPA(selectedCourses)

    $selectedCourseQuantityBadge.show()
    $selectedCourseQuantityBadge.attr(
      'title',
      `在 ${semestersQuantity} 个学期中，您当前一共选中了 ${selectedCoursesQuantity} 门课程`
    )
    $selectedCourseQuantityBadge.text(`${selectedCoursesQuantity} 门`)
    $selectedCourseCreditsBadge.show()
    $selectedCourseCreditsBadge.attr(
      'title',
      `在 ${semestersQuantity} 个学期中，您当前选中的全部课程总学分为 ${selectedCourseCredits}`
    )
    $selectedCourseCreditsBadge.text(`${selectedCourseCredits} 学分`)
    $scoreTag.show()
    $scoreTag.attr(
      'title',
      `在 ${semestersQuantity} 个学期中，您当前一共选出了 ${selectedCoursesQuantity} 门课程进行计算，全部选中课程的加权平均分为 ${selectedCoursesScore}`
    )
    $scoreTag.text(`所有选中课程平均分：${selectedCoursesScore}`)
    $gpaTag.show()
    $gpaTag.attr(
      'title',
      `在 ${semestersQuantity} 个学期中，您当前一共选出了 ${selectedCoursesQuantity} 门课程进行计算，全部选中课程的加权平均绩点为 ${selectedCoursesGPA}`
    )
    $gpaTag.text(`所有选中课程绩点：${selectedCoursesGPA}`)
    $selectAllBtn.hide()
    $cancelBtn.show()
  } else {
    $selectedCourseQuantityBadge.hide()
    $selectedCourseCreditsBadge.hide()
    $scoreTag.hide()
    $gpaTag.hide()
    $selectAllBtn.show()
    $cancelBtn.hide()
  }
}

/**
 * 当「课程块」被点击时，做出相应的反应
 */
function toggleTranscriptItemStatus(dom: HTMLElement) {
  if (!records) {
    return
  }
  $(dom).toggleClass('selected')
  const status = $(dom).hasClass('selected')
  const {
    name: courseName,
    attribute: coursePropertyName,
    semester
  } = dom.dataset
  const courseScore = Number(dom.dataset.score)
  const gradePoint = Number(dom.dataset.gpa)
  const credit = Number(dom.dataset.credit)
  getSemesterCourses(records, semester as string).filter(
    v =>
      v.courseName === courseName &&
      v.coursePropertyName === coursePropertyName &&
      v.courseScore === courseScore &&
      v.gradePoint === gradePoint &&
      v.credit === credit
  )[0].selected = status
}

/**
 * 从总记录中提取出对应学期的课程列表
 *
 * @param {Record[]} records 总记录
 * @param {string} semester 学期名称
 * @returns 课程列表
 */
function getSemesterCourses(records: Record[], semester: string) {
  return records.filter(v => v.semester === semester)[0].courses
}

/**
 * 计算加权平均数
 *
 * @param {Array<{ value: number; weight: number }>} arr 一个数组，每个对象包括数值(value)和权值(weight)
 * @returns 计算好的加权平均数
 */
function getWeightedAverage(arr: Array<{ value: number; weight: number }>) {
  return arr
    .reduce(
      (acc, cur) => [acc[0] + cur.value * cur.weight, acc[1] + cur.weight],
      [0, 0]
    )
    .reduce((valueSum, weightSum) => (weightSum ? valueSum / weightSum : 0))
}

/**
 * 从一个课程数组里筛选出所有的必修课程
 *
 * @param {CourseScoreBaseRecord[]} arr 一个课程数组
 * @returns 筛选出的只包括必修课程的数组
 */
function getCompulsoryCourses(arr: CourseScoreBaseRecord[]) {
  return arr.filter(v => v.coursePropertyName === '必修')
}

/**
 * 将课程数组映射为只包含gpa作为数值，学分作为权值的对象数组，用于加权平均数计算
 *
 * @param {CourseScoreBaseRecord[]} arr 一个课程数组
 * @returns 一个只包含gpa作为数值，学分作为权值的对象数组
 */
function mapGPA(arr: CourseScoreBaseRecord[]) {
  return arr.map(v => ({ value: v.gradePoint, weight: v.credit }))
}

/**
 * 将课程数组映射为只包含分数作为数值，学分作为权值的对象数组，用于加权平均数计算
 *
 * @param {CourseScoreBaseRecord[]} arr 一个课程数组
 * @returns 一个只包含分数作为数值，学分作为权值的对象数组
 */
function mapScore(arr: CourseScoreBaseRecord[]) {
  return arr.map(v => ({ value: v.courseScore, weight: v.credit }))
}

/**
 * 将数值保留3位小数，再作为number返回
 *
 * @param {number} num 待处理的数字
 * @param {number} [fractionDigits=3] 保留小数位数
 * @returns 保留对应位数后的小数
 */
function reserveDigits(num: number, fractionDigits = 3) {
  return Number(num.toFixed(fractionDigits))
}

/**
 * 输入课程数组，得到必修加权平均绩点
 *
 * @param {CourseScoreBaseRecord[]} 课程数组
 * @returns 必修加权平均绩点
 */
function getCompulsoryCoursesGPA(arr: CourseScoreBaseRecord[]) {
  return reserveDigits(getWeightedAverage(mapGPA(getCompulsoryCourses(arr))))
}

/**
 * 输入课程数组，得到必修加权平均分
 *
 * @param {CourseScoreBaseRecord[]} arr 课程数组
 * @returns 必修加权平均分
 */
function getCompulsoryCoursesScore(arr: CourseScoreBaseRecord[]) {
  return reserveDigits(getWeightedAverage(mapScore(getCompulsoryCourses(arr))))
}

/**
 * 输入课程数组，得到全部课程加权平均绩点
 *
 * @param {CourseScoreBaseRecord[]} arr 课程数组
 * @returns 全部课程加权平均绩点
 */
function getAllCoursesGPA(arr: CourseScoreBaseRecord[]) {
  return reserveDigits(getWeightedAverage(mapGPA(arr)))
}

/**
 * 输入课程数组，得到全部课程加权平均分
 *
 * @param {CourseScoreBaseRecord[]} arr 课程数组
 * @returns 全部课程加权平均分
 */
function getAllCoursesScore(arr: CourseScoreBaseRecord[]) {
  return reserveDigits(getWeightedAverage(mapScore(arr)))
}

/**
 * 一次性获得必修加权平均分、必修加权平均绩点、全部课程加权平均分、全部课程加权平均绩点4个值
 *
 * @param {CourseScoreBaseRecord[]} arr 一个由课程对象组成的数组
 * @returns 必修加权平均分、必修加权平均绩点、全部课程加权平均分、全部课程加权平均绩点4个值
 */
function getFourTypesValue(arr: CourseScoreBaseRecord[]) {
  return {
    compulsoryCoursesGPA: getCompulsoryCoursesGPA(arr),
    compulsoryCoursesScore: getCompulsoryCoursesScore(arr),
    allCoursesGPA: getAllCoursesGPA(arr),
    allCoursesScore: getAllCoursesScore(arr)
  }
}

const templates = {
  indexWidget(): string {
    return require('./indexWidget.pug')()
  },
  totalTranscript(semestersQuantity: number, courses: CourseScoreBaseRecord[]) {
    const {
      allCoursesGPA,
      allCoursesScore,
      compulsoryCoursesGPA,
      compulsoryCoursesScore
    } = getFourTypesValue(courses)
    const compulsoryCourses = getCompulsoryCourses(courses)
    const coursesQuantity = courses.length
    const totalCourseCredits = courses.reduce((acc, cur) => acc + cur.credit, 0)
    const compulsoryCoursesQuantity = compulsoryCourses.length
    return require('./totalTranscript.pug')({
      allCoursesGPA,
      allCoursesScore,
      compulsoryCoursesGPA,
      compulsoryCoursesScore,
      semestersQuantity,
      coursesQuantity,
      totalCourseCredits,
      compulsoryCoursesQuantity
    })
  },
  semesterTranscript(semester: string, courses: CourseScoreBaseRecord[]) {
    const {
      allCoursesGPA,
      allCoursesScore,
      compulsoryCoursesGPA,
      compulsoryCoursesScore
    } = getFourTypesValue(courses)
    const coursesQuantity = courses.length
    const totalCourseCredits = courses.reduce((acc, cur) => acc + cur.credit, 0)
    const compulsoryCourses = getCompulsoryCourses(courses)
    const compulsoryCoursesQuantity = compulsoryCourses.length
    return require('./semesterTranscript.pug')({
      allCoursesGPA,
      allCoursesScore,
      compulsoryCoursesGPA,
      compulsoryCoursesScore,
      coursesQuantity,
      totalCourseCredits,
      compulsoryCoursesQuantity,
      semester,
      courses
    })
  }
}

async function getAllTermScoresData(): Promise<Record[]> {
  const rawList = (await requestData(
    Request.ALL_TERMS_COURSE_SCORE_INFO_LIST
  )) as CourseScoreBaseInfo[]
  // 第一次请求只是为了获得课程总数 totalCount
  // 将获取的全部课程成绩列表按照学期分组
  return (
    rawList
      .reduce(
        (acc, cur) => {
          // 如果没有挂科，那么 unpassedReasonExplain ≡ null
          // 如果挂科了，检查是否是因为「缓考」才在系统中记录为「未通过」，如果是缓考，则跳过这条记录
          const failReason = cur.unpassedReasonExplain
            ? (cur.unpassedReasonExplain as string)
            : null
          if (failReason && failReason.includes('缓考')) {
            return acc
          }
          const currentSemesterRecords = acc.filter(
            v => v.semester === cur.executiveEducationPlanName
          )
          const record: CourseScoreBaseRecord = { ...cur, selected: false }
          if (currentSemesterRecords.length) {
            currentSemesterRecords[0].courses.push(record)
          } else {
            acc.push({
              semester: record.executiveEducationPlanName,
              courses: [record]
            })
          }
          return acc
        },
        [] as Record[]
      )
      // 不显示还没有课程成绩的学期
      .filter(v => v.courses && v.courses.length)
      .sort((a, b) => {
        const getWeightSum = ({ semester }: Record) => {
          const r = semester.match(/^(\d+)-(\d+)学年\s(.)季学期$/)
          return r ? Number(r[1]) + Number(r[2]) + (r[3] === '秋' ? 0 : 1) : 0
        }
        // 从大到小排
        return getWeightSum(b) - getWeightSum(a)
      })
  )
}

async function initSequence() {
  initDOM()
  records = await getAllTermScoresData()
  renderSemesterTranscript()
  renderTotalTranscript()
  initEvent()
}

/**
 * 初始化按钮与「课程块」的鼠标事件
 */
function initEvent() {
  $('.gpa-st-item').click(function() {
    toggleTranscriptItemStatus(this)
    renderTagSelected()
  })

  $('#gpa-toolbar-detail').click(() => {
    const menu = document.getElementById('125803405')
    if (menu) {
      window.toSelect(menu)
      window.location.href =
        '/student/integratedQuery/scoreQuery/allTermScores/index'
    }
  })

  $('#gpa-toolbar-reset').click(() => {
    reset()
  })

  $('.gpa-st-select-all-btn').click(function() {
    if (!records) {
      return
    }
    const { semester } = this.dataset
    getSemesterCourses(records, semester as string).forEach(item => {
      item.selected = true
    })
    $('.gpa-st-item').each(function() {
      if (this.dataset.semester === semester) {
        $(this).addClass('selected')
      }
    })
    renderTagSelected()
  })

  $('.gpa-st-cancel-btn').click(function() {
    if (!records) {
      return
    }
    const { semester } = this.dataset
    getSemesterCourses(records, semester as string).forEach(item => {
      item.selected = false
    })
    $('.gpa-st-item').each(function() {
      if (this.dataset.semester === semester) {
        $(this).removeClass('selected')
      }
    })
    renderTagSelected()
  })

  $('.gpa-tt-select-all-btn').click(function() {
    if (!records) {
      return
    }
    records.forEach(list =>
      list.courses.forEach(item => {
        item.selected = true
      })
    )
    $('.gpa-st-item').each(function() {
      $(this).addClass('selected')
    })
    renderTagSelected()
  })

  $('.gpa-tt-cancel-btn').click(function() {
    if (!records) {
      return
    }
    records.forEach(list =>
      list.courses.forEach(item => {
        item.selected = false
      })
    )
    $('.gpa-st-item').each(function() {
      $(this).removeClass('selected')
    })
    renderTagSelected()
  })
}

/**
 * 重置页面，销毁页面元素，重新获取数据并渲染界面
 */
function reset() {
  destroy()
  initSequence()
}

export default {
  name: 'gpa',
  pathname: ['/', '/index.jsp'],
  style: require('./index.scss').toString(),
  init() {
    initSequence()
  }
}

export { getFourTypesValue, getCompulsoryCourses, getSemesterCourses }
