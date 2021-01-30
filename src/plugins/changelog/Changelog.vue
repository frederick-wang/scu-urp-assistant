<template lang="pug">
.sua-container-changelog.typo
  h2 更新日志
  p.indent
    span 完整更新日志可以参考 Github 上此仓库的
    |
    |
    a(
      target='_blank',
      href='//github.com/frederick-wang/scu-urp-assistant/blob/master/CHANGELOG.md'
    ) CHANGELOG.md
    |
    |
    span 文件。
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Changelog extends Vue {}
</script>

<style lang="scss" scoped>
p.indent {
  text-indent: 2em;
}
</style>
