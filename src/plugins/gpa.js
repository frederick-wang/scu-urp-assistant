// 绩点计算插件
const gpa = {
  name: 'gpa',
  pathname: '/',
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
  init () {
    let $indexWidget = window.$(this.templates.indexWidget)
    window.$('.page-content').children('.row').append($indexWidget)
    let $indexWidgetMain = $indexWidget.find('.widget-main')
    let $indexWidgetMainRow = $indexWidget.find('.widget-main .row')

    const getWeightedAverage = arr => arr
      .reduce(
        (acc, cur) => [
          acc[0] + cur.value * cur.weight,
          acc[1] + cur.weight
        ],
        [0, 0]
      )
      .reduce((valueSum, weightSum) => valueSum / weightSum)
    const getCompulsoryCourse = arr => arr.filter(v => v.attribute === '必修')
    const mapGPA = arr => arr.map(v => ({ value: v.gpa, weight: v.credit }))
    const mapScore = arr => arr.map(v => ({ value: v.score, weight: v.credit }))
    const reserveDigits = (num, fractionDigits = 3) => Number(num.toFixed(fractionDigits))

    const getCompulsoryCoursesGPA = arr => reserveDigits(getWeightedAverage(mapGPA(getCompulsoryCourse(arr))))
    const getCompulsoryCoursesScore = arr => reserveDigits(getWeightedAverage(mapScore(getCompulsoryCourse(arr))))
    const getAllCoursesGPA = arr => reserveDigits(getWeightedAverage(mapGPA(arr)))
    const getAllCoursesScore = arr => reserveDigits(getWeightedAverage(mapScore(arr)))

    window.$.get('http://zhjw.scu.edu.cn/student/integratedQuery/scoreQuery/allPassingScores/callback')
      .then(({ lnList }) => {
        let allCourses = lnList
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
          .filter(item => {
            const { semester, courses } = item
            const header = `
            <h4 class="header smaller lighter grey">
              <i class="menu-icon fa fa-calendar"></i> ${semester}
            </h4>
          `
            const labels = `
            <p>
              <span class="label label-success">
                必修平均分：${getCompulsoryCoursesScore(courses)}
              </span>
              <span class="label label-success">
                必修绩点：${getCompulsoryCoursesGPA(courses)}
              </span>
              <span class="label label-purple">
                全部平均分：${getAllCoursesScore(courses)}
              </span>
              <span class="label label-purple">
                全部绩点：${getAllCoursesGPA(courses)}
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
            $indexWidgetMainRow.append(`<div class="col-sm-6">${header + labels + content}</div>`)
            return true
          })
          .reduce((acc, cur) => acc.concat(cur.courses), [])
        const compulsoryCoursesGPA = getCompulsoryCoursesScore(allCourses)
        const compulsoryCoursesScore = getCompulsoryCoursesGPA(allCourses)
        const allCoursesGPA = getAllCoursesGPA(allCourses)
        const allCoursesScore = getAllCoursesScore(allCourses)
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
        $indexWidgetMain.prepend(labels)
      })
  }
}

module.exports = gpa
