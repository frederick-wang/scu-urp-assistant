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
    window.$.get('/student/integratedQuery/scoreQuery/allPassingScores/callback')
      .then(({ lnList }) => {
        // lnList -> 历年数据
        this.historicalList = convertHistoricalList(lnList)
        this.renderSemesterTranscript()
        this.renderTotalTranscript()
        this.initEvent()
      })
  },
  initDOM () {
    this.$indexWidget = window.$(templates.indexWidget)
    window.$('.page-content').children('.row').append(this.$indexWidget)
    this.$indexWidgetMain = this.$indexWidget.find('.widget-main')
    this.$indexWidgetMainRow = this.$indexWidget.find('.widget-main .row')
  },
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

    window.$('.gpa-st-cancel-btn').click(function () {
      const semester = this.dataset.semester
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
  renderTagSelected () {
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
          $cancelBtn.show()
        } else {
          $selectedCourseQuantityBadge.hide()
          $selectedCourseCreditsBadge.hide()
          $scoreTag.hide()
          $gpaTag.hide()
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
      $cancelBtn.show()
    } else {
      $selectedCourseQuantityBadge.hide()
      $selectedCourseCreditsBadge.hide()
      $scoreTag.hide()
      $gpaTag.hide()
      $cancelBtn.hide()
    }
  },
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
  renderTotalTranscript () {
    const semestersQuantity = this.historicalList.length
    const allCourses = this.historicalList.reduce((acc, cur) => acc.concat(cur.courses), [])
    const labels = templates.totalTranscript(semestersQuantity, allCourses)
    this.$indexWidgetMain.prepend(labels)
  },
  renderSemesterTranscript () {
    this.historicalList.forEach(({ semester, courses }) => {
      const header = templates.semesterTranscriptHeader(semester, courses)
      const labels = templates.semesterTranscriptLabels(semester, courses)
      const content = templates.semesterTranscriptContent(semester, courses)
      this.$indexWidgetMainRow.append(templates.semesterTranscriptWrapper(header, labels, content))
    })
  },
  destroy () {
    this.$indexWidgetMainRow.remove()
    this.$indexWidgetMain.remove()
    this.$indexWidget.remove()

    this.$indexWidget = null
    this.$indexWidgetMain = null
    this.$indexWidgetMainRow = null

    this.historicalList = null
  },
  reset () {
    this.destroy()
    this.init()
  }
}

function convertHistoricalList (historicalList) {
  return historicalList
    .map(v => ({
      semester: v.cjbh.replace('秋(两学期)', ' 秋季学期').replace('春(两学期)', ' 春季学期'),
      courses: v.cjList.map(v => ({
        name: v.courseName,
        score: v.courseScore,
        gpa: v.gradePointScore,
        credit: Number(v.credit),
        attribute: v.courseAttributeName,
        selected: false
      }))
    }))
    .reverse()
}

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

function getCompulsoryCourse (arr) {
  return arr.filter(v => v.attribute === '必修')
}

function mapGPA (arr) {
  return arr.map(v => ({ value: v.gpa, weight: v.credit }))
}

function mapScore (arr) {
  return arr.map(v => ({ value: v.score, weight: v.credit }))
}

function reserveDigits (num, fractionDigits = 3) {
  return Number(num.toFixed(fractionDigits))
}

function getCompulsoryCoursesGPA (arr) {
  return reserveDigits(getWeightedAverage(mapGPA(getCompulsoryCourse(arr))))
}

function getCompulsoryCoursesScore (arr) {
  return reserveDigits(getWeightedAverage(mapScore(getCompulsoryCourse(arr))))
}

function getAllCoursesGPA (arr) {
  return reserveDigits(getWeightedAverage(mapGPA(arr)))
}

function getAllCoursesScore (arr) {
  return reserveDigits(getWeightedAverage(mapScore(arr)))
}

function getFourTypesValue (arr) {
  return {
    compulsoryCoursesGPA: getCompulsoryCoursesGPA(arr),
    compulsoryCoursesScore: getCompulsoryCoursesScore(arr),
    allCoursesGPA: getAllCoursesGPA(arr),
    allCoursesScore: getAllCoursesScore(arr)
  }
}

module.exports = gpa
