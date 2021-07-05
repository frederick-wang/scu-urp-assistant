<template lang="pug">
.sua-container-bachelor-degree
  Loading(v-if='!loadingIsDone')
  el-alert(
    v-if='loadingIsDone',
    v-for='(v, i) in alerts',
    :key='i',
    :title='v.title',
    :type='v.type',
    :closable='v.closable',
    :close-text='v.closeText'
  )
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
              input#major(
                type='text',
                name='major',
                v-model.trim='inputMajor',
                @keyup.enter='query'
              )
              button#queryButton.btn.btn-info.btn-xs.btn-round(
                title='查询',
                @click='query'
              )
                i.ace-con.fa.fa-search.white.bigger-120 &nbsp;查询
  .row.result-wrapper(v-if='loadingIsDone && hasNoError && hasQueried')
    .col-sm-12
      h4.header.smaller.lighter.grey
        i.menu-icon.fa.fa-table
        |
        | 查询结果
      p(v-if='similarList.length')
        | 以下是根据您输入的关键字在《四川大学学士学位授位专业及授位学科门类表》中查询得到的结果，
        strong 可能没有一些新专业，欢迎向开发者反馈
        | 。
      p(v-else)
        | 抱歉，根据您输入的关键字在《四川大学学士学位授位专业及授位学科门类表》中查询，没有得到结果，
        strong 可能没有一些新专业，欢迎向开发者反馈
        | 。
      table.table.table-hover.table-bordered.table-striped(
        v-if='similarList.length'
      )
        thead
          tr
            th.center 序号
            th.center 专业代码
            th.center 专业名称
            th.center 授位学科门类
            th.center 批准文号
            th.center 备注
        tbody
          tr(v-for='(v, i) in similarList', :key='v.majorCode')
            td.center {{ i + 1 }}
            td.center {{ v.majorCode }}
            td.center {{ v.majorName }}
            td.center {{ v.category }}
            td.center {{ v.approvalNumber }}
            td.center {{ v.remark }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { actions, Request } from '@/store'
import Loading from '@/plugins/common/components/Loading.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { notifyError } from '@/helper/util'

interface BachelorDegreeInfo {
  majorCode: string
  majorName: string
  category: string
  approvalNumber: string
  remark: string
}

@Component({
  components: { Loading }
})
export default class BachelorDegree extends Vue {
  hasQueried = false
  loadingIsDone = true
  inputMajor = ''

  similarList: BachelorDegreeInfo[] = []
  alerts: {
    title: string
    type?: 'success' | 'info' | 'warning' | 'error'
    closable?: boolean
    closeText?: string
  }[] = []

  get hasNoError(): boolean {
    return this.alerts.every((v) => v.type !== 'error')
  }

  async query(): Promise<void> {
    const queryStr = this.inputMajor.trim()
    if (!queryStr) {
      return
    }
    this.loadingIsDone = false
    try {
      this.similarList = await actions[Request.BACHELOR_DEGREE](queryStr)
      if (!this.hasQueried) {
        this.hasQueried = true
      }
      this.loadingIsDone = true
      emitDataAnalysisEvent('专业授位查询', '查询成功', {
        查询内容: queryStr
      })
    } catch (error) {
      const title = '专业授位查询'
      const message: string = error.message
      emitDataAnalysisEvent('专业授位查询', '查询失败')
      notifyError(message, title)
      this.alerts = [
        {
          title: message,
          type: 'error',
          closable: false
        }
      ]
      this.loadingIsDone = true
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

    #queryButton {
      margin-left: 10px;
    }
  }
}
</style>
