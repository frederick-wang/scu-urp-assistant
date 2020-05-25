<template lang="pug">
.sua-container-setting-cache-manager
  el-alert(type='warning' title='注意：清理缓存数据后，需要刷新页面才会生效。')
  h2(style='margin-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #dcdfe6;') SCU URP 助手 - 缓存管理器
  .wrapper
    el-button(type='danger' @click='onClearBtnClick') 点此清空缓存
    h3(style='margin-top: 15px;') 当前缓存状态
    json-viewer(:value='cacheData')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { logger } from '../../utils'
import local from '../../store/local'

@Component
export default class CacheManager extends Vue {
  get cacheData(): Record<string, unknown> {
    return local.getAll()
  }

  onClearBtnClick(): void {
    local.removeAll()
    this.$message({
      type: 'success',
      message: '清空缓存成功，刷新页面后即可生效。'
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 20px;
}
</style>
