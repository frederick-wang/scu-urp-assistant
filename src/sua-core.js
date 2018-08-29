const fastEvaluation = require('./plugins/fast-evaluation')

// 挂载到 window 上的全局对象
const $sua = {
  // 属性值的存放处
  data: {
    timeInterval: 100
  },
  // 初始化任务的队列
  initQueue: [],
  // 定时执行的任务的队列
  taskQueue: [],
  // 插件
  plugins: [fastEvaluation],
  init () {
    // 将data中的属性注入$sua对象中，使其内部可以用this直接访问
    window.$sua = Object.assign($sua, $sua.data)
    // 加载插件
    for (let plugin of this.plugins) {
      plugin.$sua = $sua
      // 将data中的属性注入plugin对象中，使其内部可以用this直接访问
      plugin = Object.assign(plugin, $sua.data)
      // 将初始化方法推入队列中
      if (plugin.init) {
        this.initQueue.push(plugin.init.bind(plugin))
      }
      // 将需要定时执行的任务推入队列中
      if (plugin.task) {
        this.taskQueue.push(plugin.task.bind(plugin))
      }
    }
    for (let i of this.initQueue) {
      i()
    }
    setInterval(() => {
      for (let t of this.taskQueue) {
        t()
      }
    }, this.timeInterval)
  }
}

module.exports = $sua
