<template lang="pug">
p
  span.greater-than-avg 绿色
  |
  | 代表您的成绩高于或等于课程平均分，
  span.less-than-avg 红色
  |
  | 代表您的成绩低于课程平均分
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Tips extends Vue {}
</script>

<style lang="scss" scoped>
span {
  &.greater-than-avg {
    color: #67c23a !important;
  }

  &.less-than-avg {
    color: #f56c6c !important;
  }
}
</style>
