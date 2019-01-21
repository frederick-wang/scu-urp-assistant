// 绩点计算插件
const gpa = {
  name: 'gpa',
  pathname: ['/', '/index.jsp'],
  templates: {
    indexWidget: `
      <div class="col-sm-12 widget-container-col">
        <div class="widget-box">
          <div class="widget-header">
            <h5 class="widget-title">
              我的成绩
              <span class="badge badge-primary" style="padding-top:3px;position:relative;top:-3px;">SCU URP 助手</span>
            </h5>
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
  $indexWidget: void 0,
  $indexWidgetMain: void 0,
  indexWidgetMainRow: void 0,
  init () {
    this.initDOM()
    window.$.get('/student/integratedQuery/scoreQuery/allPassingScores/callback')
      .then(({ lnList }) => {
        // lnList -> 历年数据
        const data = convertHistoricalList(lnList)
        this.renderSemesterTranscript(data)
        this.renderTotalTranscript(data)
      })
  },
  initDOM () {
    this.$indexWidget = window.$(this.templates.indexWidget)
    window.$('.page-content').children('.row').append(this.$indexWidget)
    this.$indexWidgetMain = this.$indexWidget.find('.widget-main')
    this.$indexWidgetMainRow = this.$indexWidget.find('.widget-main .row')
  },
  renderTotalTranscript (data) {
    const allCourses = data.reduce((acc, cur) => acc.concat(cur.courses), [])
    const {
      allCoursesGPA,
      allCoursesScore,
      compulsoryCoursesGPA,
      compulsoryCoursesScore
    } = getFourTypesValue(allCourses)
    const labels = `
      <div class="row" style="margin-bottom: 20px;">
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
        </div>
      </div>
    `
    this.$indexWidgetMain.prepend(labels)
  },
  renderSemesterTranscript (data) {
    data.forEach(item => {
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
      `
      const content = `
        <table class="table table-striped table-bordered table-hover">
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
            <tr>
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
      this.$indexWidgetMainRow.append(`<div class="col-sm-6">${header + labels + content}</div>`)
    })
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
        attribute: v.courseAttributeName
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
