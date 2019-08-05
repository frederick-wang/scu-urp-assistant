// 绩点计算插件
const css = require('./index.scss').toString()

interface allTermScoresData {
  list: {
    pageSize: number
    pageNum: number
    pageContext: {
      totalCount: number
    }
    records: (null | string | number)[][]
  }
}

interface RawRecord {
  semester: string
  courses: (null | string | number)[][]
}

interface Record {
  semester: string
  courses: Course[]
}

interface Course {
  name: string
  score: number
  level: string
  gpa: number
  credit: number
  attribute: string
  selected: boolean
}

let $indexWidget: JQuery<HTMLElement> | null
let $indexWidgetMain: JQuery<HTMLElement> | null
let $indexWidgetMainRow: JQuery<HTMLElement> | null
let records: Record[] | null

export default {
  name: 'gpa',
  pathname: ['/', '/index.jsp'],
  style: css,
  init() {
    this.initDOM()
    // 第一次请求只是为了获得课程总数 totalCount
    window.$.post('/student/integratedQuery/scoreQuery/allTermScores/data', {
      zxjxjhh: '',
      kch: '',
      kcm: '',
      pageNum: 1,
      pageSize: 1
    })
      .then(({ list: { pageContext: { totalCount } } }: allTermScoresData) => {
        // 用拿到的课程总数再次请求，获得全部课程成绩列表
        return window.$.post(
          '/student/integratedQuery/scoreQuery/allTermScores/data',
          {
            zxjxjhh: '',
            kch: '',
            kcm: '',
            pageNum: 1,
            pageSize: totalCount
          }
        )
      })
      .then((data: allTermScoresData) =>
        // 将获取的全部课程成绩列表按照学期分组
        data.list.records.reduce(
          (acc, cur) => {
            // 如果没有挂科，那么 cur[18] ≡ null
            // 如果挂科了，检查是否是因为「缓考」才在系统中记录为「未通过」，如果是缓考，则跳过这条记录
            const failReason = cur[18] ? (cur[18] as string) : null
            if (!failReason || failReason.indexOf('缓考') === -1) {
              const s = acc.filter(v => v.semester === cur[0])
              if (s.length) {
                s[0].courses.push(cur)
              } else {
                acc.push({
                  semester: cur[0] as string,
                  courses: [cur]
                })
              }
            }
            return acc
          },
          [] as RawRecord[]
        )
      )
      .then(list => {
        records = convertRecords(list)
        this.renderSemesterTranscript()
        this.renderTotalTranscript()
        this.initEvent()
      })
  },

  /**
   * 初始化最初的界面
   */
  initDOM() {
    $indexWidget = window.$(templates.indexWidget)
    window
      .$('.page-content')
      .children('.row')
      .append($indexWidget)
    $indexWidgetMain = $indexWidget.find('.widget-main')
    $indexWidgetMainRow = $indexWidget.find('.widget-main .row')
  },

  /**
   * 初始化按钮与「课程块」的鼠标事件
   */
  initEvent() {
    const that = this

    window.$('.gpa-st-item').click(function() {
      that.toggleTranscriptItemStatus(this)
      that.renderTagSelected()
    })

    window.$('#gpa-toolbar-detail').click(() => {
      const menu = document.getElementById('125803405')
      if (menu) {
        window.toSelect(menu)
        window.location.href =
          '/student/integratedQuery/scoreQuery/allTermScores/index'
      }
    })

    window.$('#gpa-toolbar-reset').click(() => {
      this.reset()
    })

    window.$('.gpa-st-select-all-btn').click(function() {
      if (!records) {
        return
      }
      const { semester } = this.dataset
      getSemesterCourses(records, semester as string).forEach(item => {
        item.selected = true
      })
      window.$('.gpa-st-item').each(function() {
        if (this.dataset.semester === semester) {
          window.$(this).addClass('selected')
        }
      })
      that.renderTagSelected()
    })

    window.$('.gpa-st-cancel-btn').click(function() {
      if (!records) {
        return
      }
      const { semester } = this.dataset
      getSemesterCourses(records, semester as string).forEach(item => {
        item.selected = false
      })
      window.$('.gpa-st-item').each(function() {
        if (this.dataset.semester === semester) {
          window.$(this).removeClass('selected')
        }
      })
      that.renderTagSelected()
    })

    window.$('.gpa-tt-select-all-btn').click(function() {
      if (!records) {
        return
      }
      records.forEach(list =>
        list.courses.forEach(item => {
          item.selected = true
        })
      )
      window.$('.gpa-st-item').each(function() {
        window.$(this).addClass('selected')
      })
      that.renderTagSelected()
    })

    window.$('.gpa-tt-cancel-btn').click(function() {
      if (!records) {
        return
      }
      records.forEach(list =>
        list.courses.forEach(item => {
          item.selected = false
        })
      )
      window.$('.gpa-st-item').each(function() {
        window.$(this).removeClass('selected')
      })
      that.renderTagSelected()
    })
  },

  /**
   * 渲染与「选择」有关的元素
   */
  renderTagSelected() {
    this.renderSemesterTagSelected()
    this.renderTotalTagSelected()
  },

  /**
   * 渲染与「选择」有关的「分学期」元素
   */
  renderSemesterTagSelected() {
    if (!records) {
      return
    }
    records.forEach(({ semester, courses }) => {
      const selectedCourses = courses.filter(v => v.selected)
      const getSemester$Element = (className: string) =>
        window.$(
          Array.from(document.getElementsByClassName(className)).filter(
            v => window.$.data(v, 'semester') === semester
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
  },

  /**
   * 渲染与「选择」有关的「全部成绩」元素
   */
  renderTotalTagSelected() {
    if (!records) {
      return
    }
    const selectedCourses = records
      .reduce((acc, cur) => acc.concat(cur.courses), [] as Course[])
      .filter(v => v.selected)
    const $selectedCourseQuantityBadge = window.$(
      '.gpa-info-badge-tt-selected-course-quantity'
    )
    const $selectedCourseCreditsBadge = window.$(
      '.gpa-info-badge-tt-selected-course-credits'
    )
    const $scoreTag = window.$('.gpa-tt-tag-selected-score')
    const $gpaTag = window.$('.gpa-tt-tag-selected-gpa')
    const $selectAllBtn = window.$('.gpa-tt-select-all-btn')
    const $cancelBtn = window.$('.gpa-tt-cancel-btn')
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
  },

  /**
   * 当「课程块」被点击时，做出相应的反应
   */
  toggleTranscriptItemStatus(dom: HTMLElement) {
    if (!records) {
      return
    }
    window.$(dom).toggleClass('selected')
    const status = window.$(dom).hasClass('selected')
    const { name, attribute, semester } = dom.dataset
    const score = Number(dom.dataset.score)
    const gpa = Number(dom.dataset.gpa)
    const credit = Number(dom.dataset.credit)
    getSemesterCourses(records, semester as string).filter(
      v =>
        v.name === name &&
        v.attribute === attribute &&
        v.score === score &&
        v.gpa === gpa &&
        v.credit === credit
    )[0].selected = status
  },

  /**
   * 渲染「总成绩」部分的界面
   */
  renderTotalTranscript() {
    if (!$indexWidgetMain || !records) {
      return
    }
    const semestersQuantity = records.length
    const allCourses = records.reduce(
      (acc, cur) => acc.concat(cur.courses),
      [] as Course[]
    )
    const labels = templates.totalTranscript(semestersQuantity, allCourses)
    $indexWidgetMain.prepend(labels)
  },

  /**
   * 渲染「学期成绩」部分的界面
   */
  renderSemesterTranscript() {
    if (!records) {
      return
    }
    records.forEach(({ semester, courses }) => {
      if (!$indexWidgetMainRow) {
        return
      }
      const header = templates.semesterTranscriptHeader(semester, courses)
      const labels = templates.semesterTranscriptLabels(semester, courses)
      const content = templates.semesterTranscriptContent(semester, courses)
      $indexWidgetMainRow.append(
        templates.semesterTranscriptWrapper(header, labels, content)
      )
    })
  },

  /**
   * 销毁页面元素
   */
  destroy() {
    if ($indexWidgetMainRow) {
      $indexWidgetMainRow.remove()
      $indexWidgetMainRow = null
    }
    if ($indexWidgetMain) {
      $indexWidgetMain.remove()
      $indexWidgetMain = null
    }
    if ($indexWidget) {
      $indexWidget.remove()
      $indexWidget = null
    }

    records = null
  },
  /**
   * 重置页面，销毁页面元素，重新获取数据并渲染界面
   */
  reset() {
    this.destroy()
    this.init()
  }
}

/**
 * 将元素数据列表映射为需要的数据列表
 *
 * @param {*} rawList 原始数据
 * @returns 处理后的数据
 */
function convertRecords(rawList: RawRecord[]) {
  return (
    rawList
      .map(s => ({
        semester: s.semester
          .replace(/^(\d+-\d+)-(.+)$/, '$1学年 $2学期')
          .replace('1-1学期', '秋季学期')
          .replace('2-1学期', '春季学期'),
        courses: s.courses
          // 根据 http://jwc.scu.edu.cn/detail/122/6891.htm 《网上登录成绩的通知》 的说明
          // 教师「暂存」的成绩学生不应看到
          // 因此为了和教务处成绩显示保持一致，这里只显示「已提交」的成绩
          // TODO: 考虑做开关，让用户决定看不看
          .filter(v => v[4] === '05')
          .map(
            v =>
              ({
                name: v[11],
                score: v[8],
                level: v[17],
                gpa: getPointByScore(v[8] as number, s.semester),
                credit: v[13],
                attribute: v[15],
                selected: false
              } as Course)
          )
          // 分数可能为null
          .filter(v => v.score)
      }))
      // 不显示还没有课程成绩的学期
      .filter(v => v.courses && v.courses.length)
  )
  // .reverse()
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
    .reduce((valueSum, weightSum) => valueSum / weightSum)
}

/**
 * 从一个课程数组里筛选出所有的必修课程
 *
 * @param {Course[]} arr 一个课程数组
 * @returns 筛选出的只包括必修课程的数组
 */
function getCompulsoryCourse(arr: Course[]) {
  return arr.filter(v => v.attribute === '必修')
}

/**
 * 将课程数组映射为只包含gpa作为数值，学分作为权值的对象数组，用于加权平均数计算
 *
 * @param {Course[]} arr 一个课程数组
 * @returns 一个只包含gpa作为数值，学分作为权值的对象数组
 */
function mapGPA(arr: Course[]) {
  return arr.map(v => ({ value: v.gpa, weight: v.credit }))
}

/**
 * 将课程数组映射为只包含分数作为数值，学分作为权值的对象数组，用于加权平均数计算
 *
 * @param {Course[]} arr 一个课程数组
 * @returns 一个只包含分数作为数值，学分作为权值的对象数组
 */
function mapScore(arr: Course[]) {
  return arr.map(v => ({ value: v.score, weight: v.credit }))
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
 * @param {Course[]} 课程数组
 * @returns 必修加权平均绩点
 */
function getCompulsoryCoursesGPA(arr: Course[]) {
  return reserveDigits(getWeightedAverage(mapGPA(getCompulsoryCourse(arr))))
}

/**
 * 输入课程数组，得到必修加权平均分
 *
 * @param {Course[]} arr 课程数组
 * @returns 必修加权平均分
 */
function getCompulsoryCoursesScore(arr: Course[]) {
  return reserveDigits(getWeightedAverage(mapScore(getCompulsoryCourse(arr))))
}

/**
 * 输入课程数组，得到全部课程加权平均绩点
 *
 * @param {Course[]} arr 课程数组
 * @returns 全部课程加权平均绩点
 */
function getAllCoursesGPA(arr: Course[]) {
  return reserveDigits(getWeightedAverage(mapGPA(arr)))
}

/**
 * 输入课程数组，得到全部课程加权平均分
 *
 * @param {Course[]} arr 课程数组
 * @returns 全部课程加权平均分
 */
function getAllCoursesScore(arr: Course[]) {
  return reserveDigits(getWeightedAverage(mapScore(arr)))
}

/**
 * 一次性获得必修加权平均分、必修加权平均绩点、全部课程加权平均分、全部课程加权平均绩点4个值
 *
 * @param {Course[]} arr 一个由课程对象组成的数组
 * @returns 必修加权平均分、必修加权平均绩点、全部课程加权平均分、全部课程加权平均绩点4个值
 */
function getFourTypesValue(arr: Course[]) {
  return {
    compulsoryCoursesGPA: getCompulsoryCoursesGPA(arr),
    compulsoryCoursesScore: getCompulsoryCoursesScore(arr),
    allCoursesGPA: getAllCoursesGPA(arr),
    allCoursesScore: getAllCoursesScore(arr)
  }
}

/**
 * 根据分数返回对应的绩点
 *
 * @param {number} score 分数
 * @param {string} semester 学期
 * @returns 绩点
 */
function getPointByScore(score: number, semester: string) {
  // 2017年起，川大修改了绩点政策，因此要检测学期的年份
  const r = semester.match(/^\d+/)
  if (!r) {
    return 0
  }
  const enrollmentYear = Number(r[0])
  if (enrollmentYear >= 2017) {
    // 2017-2018秋季学期起使用如下标准（Fall Term 2017-2018~Present）
    if (score >= 90) {
      return 4
    } else if (score >= 85) {
      return 3.7
    } else if (score >= 80) {
      return 3.3
    } else if (score >= 76) {
      return 3
    } else if (score >= 73) {
      return 2.7
    } else if (score >= 70) {
      return 2.3
    } else if (score >= 66) {
      return 2
    } else if (score >= 63) {
      return 1.7
    } else if (score >= 61) {
      return 1.3
    } else if (score >= 60) {
      return 1
    } else {
      return 0
    }
  } else {
    // 2017-2018秋季学期以前使用如下标准（Before Fall Term 2017-2018）
    if (score >= 95) {
      return 4
    } else if (score >= 90) {
      return 3.8
    } else if (score >= 85) {
      return 3.6
    } else if (score >= 80) {
      return 3.2
    } else if (score >= 75) {
      return 2.7
    } else if (score >= 70) {
      return 2.2
    } else if (score >= 65) {
      return 1.7
    } else if (score >= 60) {
      return 1
    } else {
      return 0
    }
  }
}

const templates = {
  indexWidget: `
    <div class="col-sm-12 widget-container-col">
      <div class="widget-box">
        <div class="widget-header">
          <h5 class="widget-title">
            我的成绩
            <span class="badge badge-primary" style="padding-top:3px;position:relative;top:-3px;">SCU URP 助手</span>
          </h5>
          <div class="widget-toolbar">
            <div class="widget-menu">
                <a id="gpa-toolbar-detail" data-action="settings" data-toggle="dropdown">
                    <i class="ace-icon fa fa-bars"></i>
                </a>
                <a id="gpa-toolbar-reset" data-action="reload"">
                    <i class="ace-icon fa fa-refresh"></i>
                </a>
            </div>
          </div>
        </div>
        <div class="widget-body">
          <div class="widget-main">
            <div class="row"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  totalTranscript(semestersQuantity: number, courses: Course[]) {
    const {
      allCoursesGPA,
      allCoursesScore,
      compulsoryCoursesGPA,
      compulsoryCoursesScore
    } = getFourTypesValue(courses)
    const compulsoryCourses = getCompulsoryCourse(courses)
    const coursesQuantity = courses.length
    const totalCourseCredits = courses.reduce((acc, cur) => acc + cur.credit, 0)
    const compulsoryCoursesQuantity = compulsoryCourses.length
    return `
      <div class="gpa-tt row" style="margin-bottom: 20px;">
        <div class="col-sm-12">
          <h4 class="header smaller lighter grey" style="margin-top: 0;">
            <i class="menu-icon fa fa-calendar"></i> 全部成绩
            <span
              class="gpa-info-badge badge badge-yellow"
              title="在 ${semestersQuantity} 个学期中，您一共修读了 ${coursesQuantity} 门课程"
            >
              ${coursesQuantity} 门
            </span>
            <span
              class="gpa-info-badge badge badge-yellow"
              title="在 ${semestersQuantity} 个学期中，您一共修读了 ${totalCourseCredits} 学分"
            >
              ${totalCourseCredits} 学分
            </span>
            <span
              class="gpa-info-badge gpa-info-badge-tt-selected-course-quantity badge badge-pink"
              title="在 ${semestersQuantity} 个学期中，您当前一共选中了 0 门课程"
            >
              0 门
            </span>
            <span
              class="gpa-info-badge gpa-info-badge-tt-selected-course-credits badge badge-pink"
              title="在 ${semestersQuantity} 个学期中，您当前选中的全部课程总学分为 0"
            >
              0 学分
            </span>
            <button class="btn btn-white btn-minier gpa-tt-select-all-btn">
              <i class="ace-icon fa fa-check green"></i>
              全选
            </button>
            <button class="btn btn-white btn-minier gpa-tt-cancel-btn">
              <i class="ace-icon fa fa-times red2"></i>
              全不选
            </button>
          </h4>
          <span
            class="gpa-tt-tag label label-success"
            title="在 ${semestersQuantity} 个学期中，您一共修读了 ${compulsoryCoursesQuantity} 门必修课程，必修加权平均分为 ${compulsoryCoursesScore}"
          >
            必修平均分：${compulsoryCoursesScore}
          </span>
          <span
            class="gpa-tt-tag label label-success"
            title="在 ${semestersQuantity} 个学期中，您一共修读了 ${compulsoryCoursesQuantity} 门必修课程，必修加权平均绩点为 ${compulsoryCoursesGPA}"
          >
            必修绩点：${compulsoryCoursesGPA}
          </span>
          <span
            class="gpa-tt-tag label label-purple"
            title="在 ${semestersQuantity} 个学期中，您一共修读了 ${coursesQuantity} 门课程，全部加权平均分为 ${allCoursesScore}"
          >
            全部平均分：${allCoursesScore}
          </span>
          <span
            class="gpa-st-tag label label-purple"
            title="在 ${semestersQuantity} 个学期中，您一共修读了 ${coursesQuantity} 门课程，全部加权平均绩点为 ${allCoursesGPA}"
          >
            全部绩点：${allCoursesGPA}
          </span>
          <span class="gpa-tt-tag gpa-tt-tag-selected-score label label-pink">
            所有选中课程平均分：0
          </span>
          <span class="gpa-tt-tag gpa-tt-tag-selected-gpa label label-pink">
            所有选中课程绩点：0
          </span>
        </div>
      </div>
    `
  },
  semesterTranscriptHeader(semester: string, courses: Course[]) {
    const coursesQuantity = courses.length
    const totalCourseCredits = courses.reduce((acc, cur) => acc + cur.credit, 0)
    return `
      <h4 class="header smaller lighter grey">
        <i class="menu-icon fa fa-calendar"></i> ${semester}
        <span class="gpa-info-badge badge badge-yellow" title="在${semester}，您一共修读了 ${coursesQuantity} 门课程">${coursesQuantity} 门</span>
        <span class="gpa-info-badge badge badge-yellow" title="在${semester}，您一共修读了 ${totalCourseCredits} 学分">${totalCourseCredits} 学分</span>
        <span
          class="gpa-info-badge gpa-info-badge-st-selected-course-quantity badge badge-pink"
          title="在${semester}，您当前选中了 0 门课程"
          data-semester="${semester}"
        >
          0 门
        </span>
        <span
          class="gpa-info-badge gpa-info-badge-st-selected-course-credits badge badge-pink"
          title="在${semester}，您当前选中的课程总学分为 0"
          data-semester="${semester}"
        >
          0 学分
        </span>
        <button class="btn btn-white btn-minier gpa-st-select-all-btn" data-semester="${semester}">
          <i class="ace-icon fa fa-check green"></i>
          全选
        </button>
        <button class="btn btn-white btn-minier gpa-st-cancel-btn" data-semester="${semester}">
          <i class="ace-icon fa fa-times red2"></i>
          全不选
        </button>
      </h4>
    `
  },
  semesterTranscriptLabels(semester: string, courses: Course[]) {
    const {
      allCoursesGPA,
      allCoursesScore,
      compulsoryCoursesGPA,
      compulsoryCoursesScore
    } = getFourTypesValue(courses)
    const compulsoryCourses = getCompulsoryCourse(courses)
    const coursesQuantity = courses.length
    const compulsoryCoursesQuantity = compulsoryCourses.length
    return `
      <p>
        <span
          class="gpa-st-tag label label-success"
          title="在${semester}，您一共修读了 ${compulsoryCoursesQuantity} 门必修课程，必修加权平均分为 ${compulsoryCoursesScore}"
        >
          必修平均分：${compulsoryCoursesScore}
        </span>
        <span
          class="gpa-st-tag label label-success"
          title="在${semester}，您一共修读了 ${compulsoryCoursesQuantity} 门必修课程，必修加权平均绩点为 ${compulsoryCoursesGPA}"
        >
          必修绩点：${compulsoryCoursesGPA}
        </span>
        <span
          class="gpa-st-tag label label-purple"
          title="在${semester}，您一共修读了 ${coursesQuantity} 门课程，加权平均分为 ${allCoursesScore}"
        >
          全部平均分：${allCoursesScore}
        </span>
        <span
          class="gpa-st-tag label label-purple"
          title="在${semester}，您一共修读了 ${coursesQuantity} 门课程，加权平均绩点为 ${allCoursesGPA}"
        >
          全部绩点：${allCoursesGPA}
        </span>
      </p>
      <p>
        <span class="gpa-st-tag gpa-st-tag-selected-score label label-pink" data-semester="${semester}">
        选中课程平均分：0
        </span>
        <span class="gpa-st-tag gpa-st-tag-selected-gpa label label-pink" data-semester="${semester}">
          选中课程绩点：0
        </span>
      </p>
    `
  },
  semesterTranscriptContent(semester: string, courses: Course[]) {
    const courseList = () =>
      courses
        .map(
          v => `
            <tr
              class="gpa-st-item"
              data-semester="${semester}"
              data-name="${v.name}"
              data-score="${v.score}"
              data-level="${v.level}"
              data-gpa="${v.gpa}"
              data-credit="${v.credit}"
              data-attribute="${v.attribute}"
            >
              <td>${v.name}</td>
              <td class="center">${v.score}</td>
              <td class="center">${v.level}</td>
              <td class="center">${v.gpa}</td>
              <td class="center">${v.credit}</td>
              <td class="center">${v.attribute}</td>
            </tr>
          `
        )
        .join('')
    return `
      <table class="gpa-st-table table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>课程名</th>
            <th class="center">分数</th>
            <th class="center">等级</th>
            <th class="center">绩点</th>
            <th class="center">学分</th>
            <th class="center">属性</th>
          </tr>
        </thead>
        <tbody>
        ${courseList()}
        </tbody>
      </table>
    `
  },
  semesterTranscriptWrapper(header: string, labels: string, content: string) {
    return `<div class="gpa-st col-sm-6">${header + labels + content}</div>`
  }
}
