// 共享数据插件
const sharedData = {
  name: 'shared-data',
  pathname: '/**',
  async init () {
    const $ = window.$
    // 保证处在登陆后界面
    if (window.location.pathname !== '/login') {
      const [{
        zxjxjhh: currentSemester,
        gpa,
        courseNum: courseNumber,
        courseNum_bxqyxd: currentSemesterCourseNumber,
        coursePas: failedCourseNumber
      }] = JSON.parse(await $.post('/main/academicInfo'))
      window.__$SUA_SHARED_DATA__ = {
        academicInfo: {
          courseNumber,
          currentSemester,
          gpa,
          currentSemesterCourseNumber,
          failedCourseNumber
        }
      }
    }
  }
}

module.exports = sharedData
