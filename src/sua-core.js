const minimatch = require('minimatch')
const fastEvaluation = require('./plugins/fast-evaluation')
const tooltip = require('./plugins/tooltip')

// 挂载到 window 上的全局对象
const $sua = {
  // 属性值的存放处
  data: {
    /**
     * 定时任务的执行间隔
     */
    taskTimeInterval: 100
  },
  /**
   * 插件
   */
  plugins: [tooltip, fastEvaluation],
  /**
   * 初始化任务的队列
   */
  initQueue: [],
  /**
   * 定时执行的任务的队列
   */
  taskQueue: [],
  /**
   * 初始化 SCU URP 助手
   */
  init () {
    // 将data中的属性注入$sua对象中，使其内部可以用this直接访问
    window.$sua = Object.assign($sua, $sua.data)
    // 加载插件
    for (let plugin of this.plugins) {
      plugin.$sua = $sua
      // 将data中的属性注入plugin对象中，使其内部可以用this直接访问
      plugin = Object.assign(plugin, $sua.data)
      if (urlTrigger(plugin)) {
        // 将初始化方法推入队列中
        if (plugin.init) {
          this.initQueue.push(plugin.init.bind(plugin))
        }
        // 将需要定时执行的任务推入队列中
        if (plugin.task) {
          this.taskQueue.push(plugin.task.bind(plugin))
        }
      }
    }
    // 初始化方法
    for (let i of this.initQueue) {
      i()
    }
    // 定时任务
    setInterval(() => {
      for (let t of this.taskQueue) {
        t()
      }
    }, this.timeInterval)

    /**
     * 检测当前的location.pathname是否满足插件触发要求
     *
     * @param {*} plugin 插件对象，pathname 属性可以是 Boolean、String、Array、Object、Function等类型。
     * 如果 pathname 属性不存在，则默认对全体 url 均生效
     * @returns 检测的结果
     */
    function urlTrigger (plugin) {
      let { pathname } = plugin
      // 如果pathname不存在，默认对全部url生效
      if (!pathname) {
        return true
      } else if (typeof pathname === 'boolean') {
        return pathname
      } else if (typeof pathname === 'string') {
        return minimatch(window.location.pathname, pathname)
      } else if (Array.isArray(pathname)) {
        for (let item of pathname) {
          if (minimatch(window.location.pathname, item)) {
            return true
          }
        }
        return false
      } else if (typeof pathname === 'object') {
        for (let item of Object.values(pathname)) {
          if (minimatch(window.location.pathname, item)) {
            return true
          }
        }
        return false
      } else if (typeof pathname === 'function') {
        return pathname.bind(plugin)()
      }
      return false
    }
  }
}

module.exports = $sua
