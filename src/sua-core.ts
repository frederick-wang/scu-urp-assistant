import 'core-js'
require('regenerator-runtime/runtime')
import Vue from 'vue'

import { pathnameTrigger } from '@/helper/util'
import { init as initStore } from '@/store'
import { init as initPlugin, enabledList as pluginList } from '@/plugins'
import { Logger } from '@/helper/logger'
import { SUAObject } from './core/types'
import { isLoginPage } from './helper/judger'
import { loadElementUI, loadGlobalStyle, loadMenu } from './core/loader'

/**
 * 定时任务的执行间隔
 */
const TASK_TIME_INTERVAL = 100

// 挂载到 window 上的全局对象
const suaObject: SUAObject = {
  /**
   * 插件
   */
  plugins: [],
  /**
   * 初始化任务的队列
   */
  initQueue: [],
  /**
   * 定时执行的任务的队列
   */
  taskQueue: [],
  /**
   * 加载样式的队列
   */
  styleQueue: [],
  /**
   * 加载菜单的队列
   */
  menuQueue: [],
  /**
   * 初始化 SCU URP 助手
   */
  async init() {
    Logger.info('程序初始化')
    window.$sua = this
    // 初始化 Element-UI
    loadElementUI()
    if (!isLoginPage()) {
      // 初始化全局样式
      loadGlobalStyle()
      // 初始化Store
      try {
        await initStore()
      } catch (error) {
        Logger.error(error)
        Vue.prototype.$notify.error({
          title: '[初始化错误] Store初始化失败',
          message:
            '抱歉，Store初始化失败，助手将无法正常使用。您可以尝试刷新页面，也许能解决问题。'
        })
      }
    }
    // 初始化插件列表
    try {
      await initPlugin()
    } catch (error) {
      Logger.error(error)
      Vue.prototype.$notify.error({
        title: '[初始化错误] 插件初始化失败',
        message:
          '抱歉，插件初始化失败，助手将无法正常使用。您可以尝试刷新页面，也许能解决问题。'
      })
    }
    this.plugins = pluginList
    // 加载插件
    for (const plugin of this.plugins) {
      if (pathnameTrigger(plugin.pathname)) {
        // 将样式推入队列中
        if (plugin.style) {
          this.styleQueue.push(plugin.style)
        }
        // 将初始化方法推入队列中
        if (plugin.init) {
          this.initQueue.push(plugin.init.bind(plugin))
        }
        // 将需要定时执行的任务推入队列中
        if (plugin.task) {
          this.taskQueue.push(plugin.task.bind(plugin))
        }
      }
      // 将菜单推入队列中
      if (plugin.menu) {
        this.menuQueue = this.menuQueue.concat(plugin.menu)
      }
    }
    // 初始化插件样式
    for (const s of this.styleQueue) {
      $('head').append(`
        <style type="text/css">
          ${s}
        </style>
      `)
    }
    // 初始化方法
    for (const i of this.initQueue) {
      i()
    }
    // 定时任务
    setInterval(() => {
      for (const t of this.taskQueue) {
        t()
      }
    }, TASK_TIME_INTERVAL)
    // 加载菜单
    for (const m of this.menuQueue) {
      loadMenu(m)
    }
  }
}
export default suaObject
