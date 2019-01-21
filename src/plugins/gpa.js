// 绩点计算插件
const fs = require('fs')

const gpa = {
  name: 'gpa',
  pathname: ['/', '/index.jsp'],
  style: fs.readFileSync('src/plugins/gpa.css', 'utf8'),
  templates: {
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
    `
  },
  $indexWidget: null,
  $indexWidgetMain: null,
  $indexWidgetMainRow: null,
  $toolbarDetail: null,
  $toolbarReset: null,
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
    this.$indexWidget = window.$(this.templates.indexWidget)
    window.$('.page-content').children('.row').append(this.$indexWidget)
    this.$indexWidgetMain = this.$indexWidget.find('.widget-main')
    this.$indexWidgetMainRow = this.$indexWidget.find('.widget-main .row')
    this.$toolbarDetail = window.$('#gpa-toolbar-detail')
    this.$toolbarReset = window.$('#gpa-toolbar-reset')
  },
  initEvent () {
    const that = this
    window.$('.gpa-st-item').click(function () {
      that.toggleTranscriptItemStatus(this)
      that.renderTagSelected()
    })
    this.$toolbarDetail.click(() => {
      window.toSelect(document.getElementById('1379870'))
      window.location = '/student/integratedQuery/scoreQuery/allPassingScores/index'
    })
    this.$toolbarReset.click(() => {
      this.reset()
    })
  },
  renderTagSelected () {
    this.historicalList
      .forEach(({ semester, courses }) => {
        const selectedCourses = courses.filter(v => v.selected)
        const $scoreTag = window.$(Array.from(document.getElementsByClassName('gpa-st-tag-selected-score'))
          .filter(v => v.dataset.semester === semester)[0])
        const $gpaTag = window.$(Array.from(document.getElementsByClassName('gpa-st-tag-selected-gpa'))
          .filter(v => v.dataset.semester === semester)[0])
        if (selectedCourses.length) {
          $scoreTag.show()
          $scoreTag.text(`选中课程平均分：${getAllCoursesScore(selectedCourses)}`)
          $gpaTag.show()
          $gpaTag.text(`选中课程绩点：${getAllCoursesGPA(selectedCourses)}`)
        } else {
          $scoreTag.hide()
          $gpaTag.hide()
        }
      })
    const selectedCourses = this.historicalList
      .reduce((acc, cur) => acc.concat(cur.courses), [])
      .filter(v => v.selected)
    const $scoreTag = window.$('.gpa-tt-tag-selected-score')
    const $gpaTag = window.$('.gpa-tt-tag-selected-gpa')
    if (selectedCourses.length) {
      $scoreTag.show()
      $scoreTag.text(`所有选中课程平均分：${getAllCoursesScore(selectedCourses)}`)
      $gpaTag.show()
      $gpaTag.text(`所有选中课程绩点：${getAllCoursesGPA(selectedCourses)}`)
    } else {
      $scoreTag.hide()
      $gpaTag.hide()
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
    const allCourses = this.historicalList.reduce((acc, cur) => acc.concat(cur.courses), [])
    const {
      allCoursesGPA,
      allCoursesScore,
      compulsoryCoursesGPA,
      compulsoryCoursesScore
    } = getFourTypesValue(allCourses)
    const labels = `
      <div class="gpa-tt row" style="margin-bottom: 20px;">
        <div class="col-sm-12">
          <h4 class="header smaller lighter grey" style="margin-top: 0;">
            <i class="menu-icon fa fa-calendar"></i> 全部成绩
          </h4>
          <span class="label label-success">
            必修平均分：${compulsoryCoursesScore}
          </span>
          <span class="label label-success">
            必修绩点：${compulsoryCoursesGPA}
          </span>
          <span class="label label-purple">
            全部平均分：${allCoursesScore}
          </span>
          <span class="label label-purple">
            全部绩点：${allCoursesGPA}
          </span>
          <span class="label label-pink gpa-tt-tag-selected-score">
            所有选中课程平均分：0
          </span>
          <span class="label label-pink gpa-tt-tag-selected-gpa">
            所有选中课程绩点：0
          </span>
        </div>
      </div>
    `
    this.$indexWidgetMain.prepend(labels)
  },
  renderSemesterTranscript () {
    this.historicalList.forEach(item => {
      const { semester, courses } = item
      const {
        allCoursesGPA,
        allCoursesScore,
        compulsoryCoursesGPA,
        compulsoryCoursesScore
      } = getFourTypesValue(courses)

      const header = `
        <h4 class="header smaller lighter grey">
          <i class="menu-icon fa fa-calendar"></i> ${semester}
        </h4>
      `
      const labels = `
        <p>
          <span class="label label-success">
            必修平均分：${compulsoryCoursesScore}
          </span>
          <span class="label label-success">
            必修绩点：${compulsoryCoursesGPA}
          </span>
          <span class="label label-purple">
            全部平均分：${allCoursesScore}
          </span>
          <span class="label label-purple">
            全部绩点：${allCoursesGPA}
          </span>
        </p>
        <p>
          <span class="label label-pink gpa-st-tag-selected-score" data-semester="${semester}">
          选中课程平均分：0
          </span>
          <span class="label label-pink gpa-st-tag-selected-gpa" data-semester="${semester}">
            选中课程绩点：0
          </span>
        </p>
      `
      const content = `
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
      this.$indexWidgetMainRow.append(`<div class="gpa-st col-sm-6">${header + labels + content}</div>`)
    })
  },
  destroy () {
    this.$indexWidgetMainRow.remove()
    this.$indexWidgetMain.remove()
    this.$toolbarDetail.remove()
    this.$toolbarReset.remove()
    this.$indexWidget.remove()

    this.$indexWidget = null
    this.$toolbarReset = null
    this.$toolbarDetail = null
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
