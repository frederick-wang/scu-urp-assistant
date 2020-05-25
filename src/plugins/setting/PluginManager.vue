<template lang="pug">
.sua-container-setting-plugin-manager
  el-alert(type='warning' title='注意：切换插件状态后，需要刷新页面才会生效。')
  h2(style='margin-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #dcdfe6;') SCU URP 助手 - 插件管理器
  .plugin-list
    .plugin(v-for='plugin in pluginList' :key='plugin.name')
      .plugin-icon
        img(:src='plugin.icon')
      .plugin-info
        .plugin-name {{plugin.displayName}}
        .plugin-addition-info
          el-tag.tag-is-necessary(v-if='plugin.isNecessary' type='info' size="mini") 核心插件，无法停用
          el-tag.tag-is-necessary(v-else size="mini") 普通插件，可以停用
          el-tag.tag-menu-text(type='success' size='mini') {{plugin.path}}
          el-tag.tag-menu-text(v-for='menuText in plugin.menu' :key='menuText' type='warning' size='mini') {{menuText}}
        .plugin-brief {{plugin.brief}}
      .plugin-action
        el-switch(
          v-model='plugin.enabled'
          :disabled='plugin.isNecessary'
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="激活"
          inactive-text="停用"
          @change='onSwitchChange'
        )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {
  allList as pluginList,
  canBeEnabledList as pluginEnabledList
} from '@/plugins'
import { SUAPluginMenu } from '@/types'
import { fromPairs, tryCatch } from 'ramda'
import { state } from '../../store'
import local from '@/store/local'

interface PluginInfo {
  name: string
  displayName: string
  icon: string
  isNecessary: boolean
  brief: string
  menu: string[]
  enabled: boolean
}

const convertPathnameToText = (
  pathname?:
    | string
    | string[]
    | boolean
    | (() => boolean)
    | { [key: string]: string }
): string => {
  if (pathname) {
    if (typeof pathname === 'boolean') {
      return pathname ? '挂载点：全部页面' : '无挂载点'
    } else if (typeof pathname === 'string') {
      return `挂载点：${pathname}`
    } else if (typeof pathname === 'function') {
      return `挂载点：动态`
    } else if (Array.isArray(pathname)) {
      return `挂载点：${pathname.join(', ')}`
    } else {
      return `挂载点：${Object.values(pathname).join(', ')}`
    }
  }
  return '无挂载点'
}

const convertMenuToTextList = (
  menu?: SUAPluginMenu | SUAPluginMenu[]
): string[] => {
  if (menu) {
    if (Array.isArray(menu)) {
      return menu.reduce((acc, { item }) => {
        if (Array.isArray(item)) {
          return [
            ...acc,
            ...item.map(({ breadcrumbs }) => breadcrumbs.join(' > '))
          ]
        } else {
          return [...acc, item.breadcrumbs.join(' > ')]
        }
      }, [] as string[])
    } else {
      if (Array.isArray(menu.item)) {
        return menu.item.map(({ breadcrumbs }) => breadcrumbs.join(' > '))
      } else {
        return [menu.item.breadcrumbs.join(' > ')]
      }
    }
  }
  return []
}

@Component
export default class PluginManager extends Vue {
  pluginList: PluginInfo[] = pluginList
    .map(({ name, displayName, icon, isNecessary, brief, menu, pathname }) => ({
      name,
      displayName,
      icon,
      isNecessary,
      brief,
      menu: convertMenuToTextList(menu),
      path: convertPathnameToText(pathname),
      enabled: pluginEnabledList.some(v => v.name === name)
    }))
    .sort((a, b) =>
      a.displayName.localeCompare(b.displayName, 'zh-Hans', {
        sensitivity: 'accent'
      })
    )
    .sort((a, b) => Number(b.isNecessary) - Number(a.isNecessary))

  async onSwitchChange(): Promise<void> {
    const newPluginEnabledStates = fromPairs(
      this.pluginList.map(({ name, enabled }) => [name, enabled])
    )
    const key = 'pluginEnabledStates'
    state.setData(key, newPluginEnabledStates)
    try {
      await local.saveData({
        key,
        payload: newPluginEnabledStates
      })
      this.$message({
        type: 'success',
        message: '插件状态切换成功，刷新页面后即可生效。'
      })
    } catch (error) {
      this.$message.error('插件状态切换失败，请刷新页面后再次尝试。')
    }
  }
}
</script>

<style lang="scss" scoped>
.plugin-list {
  .plugin {
    display: flex;

    .plugin-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 25px;
      img {
        width: 50px;
        height: 50px;
      }
    }

    .plugin-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 20px;

      .plugin-name {
        font-weight: bold;
        font-size: 1.5em;
        margin-bottom: 5px;
      }

      .plugin-addition-info {
        margin-bottom: 10px;

        .tag-menu-text {
          margin-left: 5px;
        }
      }

      .plugin-brief {
        flex: 1;
        font-size: 14px;
      }
    }

    .plugin-action {
      display: flex;
      align-items: center;
      padding: 20px;
    }
  }
}
</style>
