<template lang="pug">
.sua-container-bachelor-degree
  Loading(v-if='!loadingIsDone')
  .row.query-wrapper(v-if='loadingIsDone')
    .col-sm-12
      h4.header.smaller.lighter.grey
        i.menu-icon.fa.fa-search
        |
        | 专业授位查询
      .profile-user-info.profile-user-info-striped.self
        .profile-info-row
          .profile-info-name
            | 专业名称
          .profile-info-value
            .profile-info-value
              input#major(type='text', name='major')
  .row.result-wrapper(v-if='loadingIsDone')
    .col-sm-12
      h4.header.smaller.lighter.grey
        i.menu-icon.fa.fa-table
        |
        | 查询结果
      table.table.table-hover.table-bordered.table-striped
        thead
          tr
            th 专业
            th 专业名称
            th 授位学科门类
            th 批准文号
            th 备注
        tbody
          tr
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { actions, Request } from '@/store'
import Loading from '@/plugins/common/components/Loading.vue'
import { emitDataAnalysisEvent } from '../data-analysis'

@Component({
  components: { Loading }
})
export default class BachelorDegree extends Vue {
  loadingIsDone = false
  // [专业, 专业名称, 授位学科门类, 批准文号, 备注][]
  bachelorDegreeList: string[][] = []

  async created() {
    try {
      this.bachelorDegreeList = await actions[Request.BACHELOR_DEGREE_LIST]()
      this.loadingIsDone = true
      emitDataAnalysisEvent('专业授位查询', '查询成功')
    } catch (error) {
      emitDataAnalysisEvent('专业授位查询', '查询失败')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-top: 0;
}

.result-wrapper {
  margin-top: 10px;
}
</style>
