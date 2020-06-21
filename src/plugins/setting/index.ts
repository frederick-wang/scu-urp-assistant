import Vue, { VNode } from 'vue'
import PluginManager from './PluginManager.vue'
import CacheManager from './CacheManager.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'

function renderPluginManager(root: HTMLElement): void {
  $(root).append(`<div class="sua-container-setting-plugin-manager"></div>`)
  new Vue({
    render: (h): VNode => h(PluginManager)
  }).$mount('.sua-container-setting-plugin-manager')
  emitDataAnalysisEvent('插件管理器', '显示成功')
}

function renderCacheManager(root: HTMLElement): void {
  $(root).append(`<div class="sua-container-setting-cache-manager"></div>`)
  new Vue({
    render: (h): VNode => h(CacheManager)
  }).$mount('.sua-container-setting-cache-manager')
  emitDataAnalysisEvent('缓存管理器', '显示成功')
}

export default {
  name: 'setting',
  displayName: '设置',
  icon: getPluginIcon('setting'),
  isNecessary: true,
  brief: '设置中心，是助手界面的一部分，不可关闭。',
  route: ['setting/plugin_manager', 'setting/cache_manager'],
  menu: [
    {
      rootMenuId: 'sua-menu-list',
      rootMenuName: 'SCU URP 助手',
      id: 'menu-setting',
      name: '设置',
      item: {
        name: '插件管理',
        route: 'setting/plugin_manager',
        breadcrumbs: ['SCU URP 助手', '设置', '插件管理'],
        render: renderPluginManager
      }
    },
    {
      rootMenuId: 'sua-menu-list',
      rootMenuName: 'SCU URP 助手',
      id: 'menu-setting',
      name: '设置',
      item: {
        name: '缓存管理',
        route: 'setting/cache_manager',
        breadcrumbs: ['SCU URP 助手', '设置', '缓存管理'],
        render: renderCacheManager
      }
    }
  ]
} as SUAPlugin
