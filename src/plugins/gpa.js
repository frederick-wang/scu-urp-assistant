// 绩点计算插件
const fs = require('fs')

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
  totalTranscript (semestersQuantity, courses) {
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
  semesterTranscriptHeader (semester, courses) {
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
  semesterTranscriptLabels (semester, courses) {
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
  semesterTranscriptContent (semester, courses) {
    return `
      <table class="gpa-st-table table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>课程名</th>
            <th>分数</th>
            <th>绩点</th>
            <th>学分</th>
            <th>属性</th>
          </tr>
        </thead>
        <tbody>
        ${courses.map(v => `
          <tr
            class="gpa-st-item"
            data-semester="${semester}"
            data-name="${v.name}"
            data-score="${v.score}"
            data-gpa="${v.gpa}"
            data-credit="${v.credit}"
            data-attribute="${v.attribute}"
          >
            <td>${v.name}</td>
            <td>${v.score}</td>
            <td>${v.gpa}</td>
            <td>${v.credit}</td>
            <td>${v.attribute}</td>
          </tr>
        `).join('')}
        </tbody>
      </table>
    `
  },
  semesterTranscriptWrapper (header, labels, content) {
    return `<div class="gpa-st col-sm-6">${header + labels + content}</div>`
  }
}

const gpa = {
  name: 'gpa',
  pathname: ['/', '/index.jsp'],
  style: fs.readFileSync('src/plugins/gpa.css', 'utf8'),
  $indexWidget: null,
  $indexWidgetMain: null,
  $indexWidgetMainRow: null,
  historicalList: null,
  init () {
    this.initDOM()
    /**
     * 2019-1-29 22:23:22
     * TODO: 这里只考虑了根据全部及格成绩来计算绩点，没有考虑不及格成绩
     * 但是，不及格的成绩会如何计算我并不清楚……
     * 目前只能先假设所有不及格且理由非「申请缓考」的同学都是0绩点均匀到各个学期了……
     * 不及格成绩的接口为：http://zhjw.scu.edu.cn/student/integratedQuery/scoreQuery/unpassedScores/callback
     * 格式与全部及格成绩一致
     */
    window.$.get('/student/integratedQuery/scoreQuery/allPassingScores/callback')
      .then(({ lnList }) => {
        // lnList -> 历年数据
        this.historicalList = convertHistoricalList(lnList)
        this.renderSemesterTranscript()
        this.renderTotalTranscript()
        this.initEvent()
      })
  },

  /**
   * 初始化最初的界面
   */
  initDOM () {
    this.$indexWidget = window.$(templates.indexWidget)
    window.$('.page-content').children('.row').append(this.$indexWidget)
    this.$indexWidgetMain = this.$indexWidget.find('.widget-main')
    this.$indexWidgetMainRow = this.$indexWidget.find('.widget-main .row')
  },

  /**
   * 初始化按钮与「课程块」的鼠标事件
   */
  initEvent () {
    const that = this

    window.$('.gpa-st-item').click(function () {
      that.toggleTranscriptItemStatus(this)
      that.renderTagSelected()
    })

    window.$('#gpa-toolbar-detail').click(() => {
      window.toSelect(document.getElementById('1379870'))
      window.location = '/student/integratedQuery/scoreQuery/allPassingScores/index'
    })

    window.$('#gpa-toolbar-reset').click(() => {
      this.reset()
    })

    window.$('.gpa-st-select-all-btn').click(function () {
      const semester = this.dataset.semester
      that.historicalList.filter(v => v.semester === semester)[0].courses
        .forEach(item => {
          item.selected = true
        })
      window.$('.gpa-st-item').each(function () {
        if (this.dataset.semester === semester) {
          window.$(this).addClass('selected')
        }
      })
      that.renderTagSelected()
    })

    window.$('.gpa-st-cancel-btn').click(function () {
      const semester = this.dataset.semester

      /**
       * 2019-1-28 23:56:37
       * TODO: 这里的过滤很奇怪，需要优化
       */
      that.historicalList.filter(v => v.semester === semester)[0].courses
        .forEach(item => {
          item.selected = false
        })
      window.$('.gpa-st-item').each(function () {
        if (this.dataset.semester === semester) {
          window.$(this).removeClass('selected')
        }
      })
      that.renderTagSelected()
    })

    window.$('.gpa-tt-select-all-btn').click(function () {
      that.historicalList.forEach(list => list.courses.forEach(item => {
        item.selected = true
      }))
      window.$('.gpa-st-item').each(function () {
        window.$(this).addClass('selected')
      })
      that.renderTagSelected()
    })

    window.$('.gpa-tt-cancel-btn').click(function () {
      that.historicalList.forEach(list => list.courses.forEach(item => {
        item.selected = false
      }))
      window.$('.gpa-st-item').each(function () {
        window.$(this).removeClass('selected')
      })
      that.renderTagSelected()
    })
  },
  /**
   * 渲染与「选择」有关的元素
   */
  renderTagSelected () {
    /**
     * 2019-1-27 23:50:57
     * TODO: 这里是先循环渲染学期成绩，再渲染总成绩的，有些丑，之后需要修改
     */
    this.historicalList
      .forEach(({ semester, courses }) => {
        const selectedCourses = courses.filter(v => v.selected)
        const getSemester$Element = className =>
          window.$(Array.from(document.getElementsByClassName(className))
            .filter(v => v.dataset.semester === semester)[0])
        const $selectedCourseQuantityBadge = getSemester$Element('gpa-info-badge-st-selected-course-quantity')
        const $selectedCourseCreditsBadge = getSemester$Element('gpa-info-badge-st-selected-course-credits')
        const $scoreTag = getSemester$Element('gpa-st-tag-selected-score')
        const $gpaTag = getSemester$Element('gpa-st-tag-selected-gpa')
        const $selectAllBtn = getSemester$Element('gpa-st-select-all-btn')
        const $cancelBtn = getSemester$Element('gpa-st-cancel-btn')
        if (selectedCourses.length) {
          const selectedCoursesQuantity = selectedCourses.length
          const selectedCourseCredits = selectedCourses.reduce((acc, cur) => acc + cur.credit, 0)
          const selectedCoursesScore = getAllCoursesScore(selectedCourses)
          const selectedCoursesGPA = getAllCoursesGPA(selectedCourses)

          $selectedCourseQuantityBadge.show()
          $selectedCourseQuantityBadge.attr('title', `在${semester}，您当前选中了 ${selectedCoursesQuantity} 门课程`)
          $selectedCourseQuantityBadge.text(`${selectedCoursesQuantity} 门`)
          $selectedCourseCreditsBadge.show()
          $selectedCourseCreditsBadge.attr('title', `在${semester}，您当前选中的课程总学分为 ${selectedCourseCredits}`)
          $selectedCourseCreditsBadge.text(`${selectedCourseCredits} 学分`)
          $scoreTag.show()
          $scoreTag.attr('title', `在${semester}，您当前选出了 ${selectedCoursesQuantity} 门课程进行计算，选中课程的加权平均分为 ${selectedCoursesScore}`)
          $scoreTag.text(`选中课程平均分：${selectedCoursesScore}`)
          $gpaTag.show()
          $gpaTag.attr('title', `在${semester}，您当前选出了 ${selectedCoursesQuantity} 门课程进行计算，选中课程的加权平均绩点为 ${selectedCoursesGPA}`)
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
    const selectedCourses = this.historicalList
      .reduce((acc, cur) => acc.concat(cur.courses), [])
      .filter(v => v.selected)
    const $selectedCourseQuantityBadge = window.$('.gpa-info-badge-tt-selected-course-quantity')
    const $selectedCourseCreditsBadge = window.$('.gpa-info-badge-tt-selected-course-credits')
    const $scoreTag = window.$('.gpa-tt-tag-selected-score')
    const $gpaTag = window.$('.gpa-tt-tag-selected-gpa')
    const $selectAllBtn = window.$('.gpa-tt-select-all-btn')
    const $cancelBtn = window.$('.gpa-tt-cancel-btn')
    if (selectedCourses.length) {
      const semestersQuantity = this.historicalList.length
      const selectedCoursesQuantity = selectedCourses.length
      const selectedCourseCredits = selectedCourses.reduce((acc, cur) => acc + cur.credit, 0)
      const selectedCoursesScore = getAllCoursesScore(selectedCourses)
      const selectedCoursesGPA = getAllCoursesGPA(selectedCourses)

      $selectedCourseQuantityBadge.show()
      $selectedCourseQuantityBadge.attr('title', `在 ${semestersQuantity} 个学期中，您当前一共选中了 ${selectedCoursesQuantity} 门课程`)
      $selectedCourseQuantityBadge.text(`${selectedCoursesQuantity} 门`)
      $selectedCourseCreditsBadge.show()
      $selectedCourseCreditsBadge.attr('title', `在 ${semestersQuantity} 个学期中，您当前选中的全部课程总学分为 ${selectedCourseCredits}`)
      $selectedCourseCreditsBadge.text(`${selectedCourseCredits} 学分`)
      $scoreTag.show()
      $scoreTag.attr('title', `在 ${semestersQuantity} 个学期中，您当前一共选出了 ${selectedCoursesQuantity} 门课程进行计算，全部选中课程的加权平均分为 ${selectedCoursesScore}`)
      $scoreTag.text(`所有选中课程平均分：${selectedCoursesScore}`)
      $gpaTag.show()
      $gpaTag.attr('title', `在 ${semestersQuantity} 个学期中，您当前一共选出了 ${selectedCoursesQuantity} 门课程进行计算，全部选中课程的加权平均绩点为 ${selectedCoursesGPA}`)
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
  toggleTranscriptItemStatus (dom) {
    window.$(dom).toggleClass('selected')
    const status = window.$(dom).hasClass('selected')
    const {
      name,
      attribute,
      semester
    } = dom.dataset
    const score = Number(dom.dataset.score)
    const gpa = Number(dom.dataset.gpa)
    const credit = Number(dom.dataset.credit)
    this.historicalList
      .filter(v => v.semester === semester)[0].courses
      .filter(v =>
        v.name === name &&
        v.attribute === attribute &&
        v.score === score &&
        v.gpa === gpa &&
        v.credit === credit
      )[0]
      .selected = status
  },

  /**
   * 渲染「总成绩」部分的界面
   */
  renderTotalTranscript () {
    const semestersQuantity = this.historicalList.length
    const allCourses = this.historicalList.reduce((acc, cur) => acc.concat(cur.courses), [])
    const labels = templates.totalTranscript(semestersQuantity, allCourses)
    this.$indexWidgetMain.prepend(labels)
  },

  /**
   * 渲染「学期成绩」部分的界面
   */
  renderSemesterTranscript () {
    this.historicalList.forEach(({ semester, courses }) => {
      const header = templates.semesterTranscriptHeader(semester, courses)
      const labels = templates.semesterTranscriptLabels(semester, courses)
      const content = templates.semesterTranscriptContent(semester, courses)
      this.$indexWidgetMainRow.append(templates.semesterTranscriptWrapper(header, labels, content))
    })
  },

  /**
   * 销毁页面元素
   */
  destroy () {
    this.$indexWidgetMainRow.remove()
    this.$indexWidgetMain.remove()
    this.$indexWidget.remove()

    this.$indexWidget = null
    this.$indexWidgetMain = null
    this.$indexWidgetMainRow = null

    this.historicalList = null
  },
  /**
   * 重置页面，销毁页面元素，重新获取数据并渲染界面
   */
  reset () {
    this.destroy()
    this.init()
  }
}

/**
 * 将元素数据列表映射为需要的数据列表
 *
 * @param {*} historicalList 原始数据
 * @returns 处理后的数据
 */
function convertHistoricalList (historicalList) {
  return historicalList
    .map(v => ({
      semester: v.cjbh.replace('秋(两学期)', ' 秋季学期').replace('春(两学期)', ' 春季学期'),
      courses: v.cjList.map(v => ({
        name: v.courseName,
        score: v.courseScore,
        gpa: v.gradePointScore || getPointByScore(v.courseScore),
        credit: Number(v.credit),
        attribute: v.courseAttributeName,
        selected: false
      }))
    }))
    .reverse()
}

/**
 * 计算加权平均数
 *
 * @param {*} arr 一个数组，每个对象包括数值value和权值weight
 * @returns 计算好的加权平均数
 */
function getWeightedAverage (arr) {
  return arr
    .reduce(
      (acc, cur) => [
        acc[0] + cur.value * cur.weight,
        acc[1] + cur.weight
      ],
      [0, 0]
    )
    .reduce((valueSum, weightSum) => valueSum / weightSum)
}

/**
 * 从一个课程数组里筛选出所有的必修课程
 *
 * @param {*} arr 一个课程数组
 * @returns 筛选出的只包括必修课程的数组
 */
function getCompulsoryCourse (arr) {
  return arr.filter(v => v.attribute === '必修')
}

/**
 * 将课程数组映射为只包含gpa作为数值，学分作为权值的对象数组，用于加权平均数计算
 *
 * @param {*} arr 一个课程数组
 * @returns 一个只包含gpa作为数值，学分作为权值的对象数组
 */
function mapGPA (arr) {
  return arr.map(v => ({ value: v.gpa, weight: v.credit }))
}

/**
 * 将课程数组映射为只包含分数作为数值，学分作为权值的对象数组，用于加权平均数计算
 *
 * @param {*} arr 一个课程数组
 * @returns 一个只包含分数作为数值，学分作为权值的对象数组
 */
function mapScore (arr) {
  return arr.map(v => ({ value: v.score, weight: v.credit }))
}

/**
 * 将数值保留3位小数，再作为number返回
 *
 * @param {*} num 待处理的数字
 * @param {number} [fractionDigits=3] 保留小数位数
 * @returns 保留对应位数后的小数
 */
function reserveDigits (num, fractionDigits = 3) {
  return Number(num.toFixed(fractionDigits))
}

/**
 * 输入课程数组，得到必修加权平均绩点
 *
 * @param {*} arr 课程数组
 * @returns 必修加权平均绩点
 */
function getCompulsoryCoursesGPA (arr) {
  return reserveDigits(getWeightedAverage(mapGPA(getCompulsoryCourse(arr))))
}

/**
 * 输入课程数组，得到必修加权平均分
 *
 * @param {*} arr 课程数组
 * @returns 必修加权平均分
 */
function getCompulsoryCoursesScore (arr) {
  return reserveDigits(getWeightedAverage(mapScore(getCompulsoryCourse(arr))))
}

/**
 * 输入课程数组，得到全部课程加权平均绩点
 *
 * @param {*} arr 课程数组
 * @returns 全部课程加权平均绩点
 */
function getAllCoursesGPA (arr) {
  return reserveDigits(getWeightedAverage(mapGPA(arr)))
}

/**
 * 输入课程数组，得到全部课程加权平均分
 *
 * @param {*} arr 课程数组
 * @returns 全部课程加权平均分
 */
function getAllCoursesScore (arr) {
  return reserveDigits(getWeightedAverage(mapScore(arr)))
}

/**
 * 一次性获得必修加权平均分、必修加权平均绩点、全部课程加权平均分、全部课程加权平均绩点4个值
 *
 * @param {*} arr 一个由课程对象组成的数组
 * @returns 必修加权平均分、必修加权平均绩点、全部课程加权平均分、全部课程加权平均绩点4个值
 */
function getFourTypesValue (arr) {
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
 * @param {*} score 分数
 * @returns 绩点
 */
function getPointByScore (score) {
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
}

module.exports = gpa
