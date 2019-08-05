// 共享数据插件
export default {
  name: 'shared-data',
  pathname: '/**',
  async init() {
    window.__$SUA_SHARED_DATA__ = {
      core: {
        suaPath: ''
      },
      academicInfo: {
        courseNumber: 0,
        currentSemester: '',
        gpa: 0,
        currentSemesterCourseNumber: 0,
        failedCourseNumber: 0
      }
    }
    // 保证处在登陆后界面
    if (window.location.pathname !== '/login') {
      // 加载suaPath
      const regexp = window.location.hash.match(/suapath=(.+)$/)
      let suaPath = ''
      if (regexp) {
        suaPath = regexp[1]
      }
      window.__$SUA_SHARED_DATA__.core = { suaPath }
      // 加载本学期基本信息
      const [
        {
          zxjxjhh: currentSemester,
          gpa,
          courseNum: courseNumber,
          courseNum_bxqyxd: currentSemesterCourseNumber,
          coursePas: failedCourseNumber
        }
      ] = JSON.parse(await $.post('/main/academicInfo'))
      // 设置值
      window.__$SUA_SHARED_DATA__.academicInfo = {
        courseNumber,
        currentSemester,
        gpa,
        currentSemesterCourseNumber,
        failedCourseNumber
      }
    }
  }
}
