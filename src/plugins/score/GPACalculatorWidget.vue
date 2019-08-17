<template lang="pug">
.sua-widget-container-gpa-calculator.col-sm-12.widget-container-col.self-margin
  .widget-box
    .widget-header
      h5.widget-title.gpa-title
        | 我的成绩
        |
        span.badge.badge-primary(style='padding-top:3px;position:relative;top:-3px;') SCU URP 助手
      .widget-toolbar
        .widget-menu
          a#gpa-toolbar-detail(data-action='settings', data-toggle='dropdown')
            i.ace-icon.fa.fa-bars
    .widget-body
      .widget-main
        GPACalculator(type='compact')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import GPACalculator from './GPACalculator.vue'

@Component({
  components: { GPACalculator }
})
export default class GPACalculatorWidget extends Vue {}
</script>

<style lang="scss" scoped>
#gpa-toolbar-detail,
#gpa-toolbar-reset {
  cursor: pointer;
}
</style>
