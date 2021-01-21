import 'core-js'
require('regenerator-runtime/runtime')
import Vue from 'vue'

import { pathnameTrigger } from '@/helper/util'
import { init as initStore, initState as initStoreState } from '@/store'
import { init as initUpdater } from '@/core/updater'
import { init as initPlugin, enabledList as pluginList } from '@/plugins'
import { Logger } from '@/helper/logger'
import { SUAObject } from './core/types'
import { isLoginPage } from './helper/judger'
import { loadElementUI, loadGlobalStyle, loadMenu } from './core/loader'
import {
  poststart as poststartHook,
  prestart as prestartHook
} from './core/hook'

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
   * 初始化插件的队列
   */
  pluginsInitQueue: [],
  /**
   * 定时执行插件任务的队列
   */
  pluginsTaskQueue: [],
  /**
   * 加载插件样式的队列
   */
  pluginsStyleQueue: [],
  /**
   * 加载插件菜单的队列
   */
  pluginsMenuQueue: [],
  /**
   * 启动 SCU URP 助手
   */
  async start() {
    Logger.evaMessage('正在准备启动……')
    await initStore()
    await initUpdater()
    Logger.evaMessage('神经同调装置在基准范围内')
    await prestartHook()
    Logger.evaMessage('第一次接触……')
    window.$sua = this
    Logger.evaMessage('插入栓注水……')
    // 初始化 Element-UI
    loadElementUI()
    Logger.evaMessage('主电源连接完毕……')
    if (!isLoginPage()) {
      // 初始化全局样式
      loadGlobalStyle()
      // 初始化Store
      try {
        await initStoreState()
      } catch (error) {
        Logger.error(error)
        Vue.prototype.$notify.error({
          title: '[初始化错误] Store初始化失败',
          message:
            '抱歉，Store初始化失败，助手将无法正常使用。您可以尝试刷新页面，也许能解决问题。'
        })
      }
    }
    Logger.evaMessage('开始进行第二次接触……')
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
    Logger.evaMessage('交互界面连接……')
    this.plugins = pluginList
    // 加载插件
    for (const plugin of this.plugins) {
      if (pathnameTrigger(plugin.pathname)) {
        // 将样式推入队列中
        if (plugin.style) {
          this.pluginsStyleQueue.push(plugin.style)
        }
        // 将初始化方法推入队列中
        if (plugin.init) {
          this.pluginsInitQueue.push(plugin.init.bind(plugin))
        }
        // 将需要定时执行的任务推入队列中
        if (plugin.task) {
          this.pluginsTaskQueue.push(plugin.task.bind(plugin))
        }
      }
      // 将菜单推入队列中
      if (plugin.menu) {
        this.pluginsMenuQueue = this.pluginsMenuQueue.concat(plugin.menu)
      }
    }
    // 初始化插件样式
    for (const s of this.pluginsStyleQueue) {
      $('head').append(`
        <style type="text/css">
          ${s}
        </style>
      `)
    }
    // 初始化方法
    for (const i of this.pluginsInitQueue) {
      i()
    }
    // 定时任务
    setInterval(() => {
      for (const t of this.pluginsTaskQueue) {
        t()
      }
    }, TASK_TIME_INTERVAL)
    // 加载菜单
    for (const m of this.pluginsMenuQueue) {
      loadMenu(m)
    }
    Logger.evaMessage('思考形态以中文作为基准，进行思维连接……连接没有异常')
    Logger.evaMessage('同步率为 100%')
    await poststartHook()
  }
}
export default suaObject
