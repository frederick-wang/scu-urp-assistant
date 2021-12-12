<template lang="pug">
.sua-container-setting-plugin-manager
  el-alert(type='warning', title='注意：切换插件状态后，需要刷新页面才会生效。')
  h2(
    style='margin-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #dcdfe6'
  ) SCU URP 助手 - 插件管理器
  .plugin-list
    .plugin(v-for='plugin in pluginList', :key='plugin.name')
      .plugin-icon
        img(:src='plugin.icon')
      .plugin-info
        .plugin-name {{ plugin.displayName }}
        .plugin-addition-info
          el-tag.tag-is-necessary(
            v-if='plugin.isNecessary',
            type='info',
            size='mini'
          ) 核心插件，无法停用
          el-tag.tag-is-necessary(v-else, size='mini') 普通插件，可以停用
          el-tag.tag-menu-text(type='success', size='mini') {{ plugin.path }}
          el-tag.tag-menu-text.tag-menu-page-link(
            v-for='v in plugin.menu',
            :key='v.title',
            :title='`关联菜单：${v.title}`',
            type='warning',
            size='mini',
            @click='jumpToPluginPage(v.name)'
          ) {{ v.title }}
        .plugin-brief {{ plugin.brief }}
      .plugin-action
        el-switch(
          v-model='plugin.enabled',
          :disabled='plugin.isNecessary',
          active-color='#13ce66',
          inactive-color='#ff4949',
          active-text='激活',
          inactive-text='停用',
          @change='onSwitchChange'
        )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import {
  allList as pluginList,
  canBeEnabledList as pluginEnabledList
} from '@/plugins'
import { SUAPluginMenu } from '@/core/types'
import { fromPairs } from 'ramda'
import { state } from '../../store'
import local from '@/store/local'
import { Num } from '@/helper/util'

interface PluginInfo {
  name: string
  displayName: string
  icon: string
  isNecessary: boolean
  brief: string
  menu: { title: string; name: string }[]
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
): { title: string; name: string }[] => {
  if (menu) {
    if (Array.isArray(menu)) {
      return menu.reduce((acc, { item, rootMenuName, name: menuName }) => {
        if (Array.isArray(item)) {
          return [
            ...acc,
            ...item.map(({ name }) => ({
              title: [rootMenuName, menuName, name].join(' > '),
              name
            }))
          ]
        } else {
          return [
            ...acc,
            {
              title: [rootMenuName, menuName, item.name].join(' > '),
              name: item.name
            }
          ]
        }
      }, [] as { title: string; name: string }[])
    } else {
      if (Array.isArray(menu.item)) {
        return menu.item.map(({ name }) => ({
          title: [menu.rootMenuName, menu.name, name].join(' > '),
          name
        }))
      } else {
        return [
          {
            title: [menu.rootMenuName, menu.name, menu.item.name].join(' > '),
            name: menu.item.name
          }
        ]
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
    .sort((a, b) => Num(b.isNecessary) - Num(a.isNecessary))

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

  jumpToPluginPage(name: string): void {
    const id = `menu-item-${name}`
    const $menuItem = $(`#menus #${id}`)
    $menuItem.click()
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
        margin-bottom: 5px;

        .el-tag {
          margin-right: 5px;
          margin-bottom: 5px;

          &:last-child {
            margin-right: 0;
          }
        }

        .tag-menu-text {
          &.tag-menu-page-link {
            cursor: pointer;
          }
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
