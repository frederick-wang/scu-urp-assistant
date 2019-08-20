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
            | 请输入专业名称关键字或专业代码
          .profile-info-value
            .profile-info-value
              input#major(type='text', name='major' v-model.trim='inputMajor')
  .row.result-wrapper(v-if='loadingIsDone && similarList.length')
    .col-sm-12
      h4.header.smaller.lighter.grey
        i.menu-icon.fa.fa-table
        |
        | 查询结果
      p
        | 以下是根据您输入的关键字在《四川大学学士学位授位专业及授位学科门类表》中查询得到的结果，
        strong 可能没有一些新专业，欢迎向开发者反馈
        | 。
      table.table.table-hover.table-bordered.table-striped
        thead
          tr
            th.center 序号
            th.center 专业代码
            th.center 专业名称
            th.center 授位学科门类
            th.center 批准文号
            th.center 备注
        tbody
          tr(v-for='(v, i) in similarList' :key='v[0]+v[3]')
            td.center {{ i + 1 }}
            td.center {{ v[0] }}
            td.center {{ v[1] }}
            td.center {{ v[2] }}
            td.center {{ v[3] }}
            td.center {{ v[4] }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { actions, Request } from '@/store'
import Loading from '@/plugins/common/components/Loading.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { getTextSimilarity } from '@/utils'

@Component({
  components: { Loading }
})
export default class BachelorDegree extends Vue {
  loadingIsDone = false
  // [专业, 专业名称, 授位学科门类, 批准文号, 备注][]
  bachelorDegreeList: string[][] = []
  inputMajor: string = ''

  get similarList() {
    return !this.inputMajor
      ? []
      : this.bachelorDegreeList.filter(
          ([majorNumber, majorName]) =>
            this.inputMajor.split('').every(v => majorName.includes(v)) ||
            this.inputMajor.split('').every(v => majorNumber.includes(v)) ||
            getTextSimilarity(majorName, this.inputMajor) > 0.5 ||
            getTextSimilarity(majorNumber, this.inputMajor) > 0.5
        )
  }

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
.profile-info-row {
  display: flex;

  .profile-info-name {
    width: auto;
    display: flex;
    align-items: center;
    padding-right: 20px;
    padding-left: 20px;
  }
  .profile-info-value {
    flex: 1;
    display: flex;
    align-items: center;

    input#major {
      width: 40% !important;
      min-width: 200px;
    }
  }
}
</style>
