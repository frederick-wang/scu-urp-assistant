<template lang="pug">
.sua-container-subitem-score.row.self-margin
  Loading(v-if='!loadingIsDone')
  .col-sm-12(v-if='loadingIsDone')
    h4.header.smaller.lighter.grey
      i.fa.fa-list(aria-hidden='true')
      |
      | 分项成绩查询
      span.right_top_oper
        button.btn.btn-info.btn-xs.btn-round(title='返回')
          i.ace-icon.fa.fa-reply
          |
          | 返回
  .col-sm-12(v-if='loadingIsDone')
    table.query-info
      tr
        td
          i.fa.fa-calendar(aria-hidden='true')
        td 查询学期：
        td {{ semesterName }}
      tr
        td
          i.fa.fa-graduation-cap(aria-hidden='true')
        td 查询课程：
        td {{ course }}
      tr
        td
          i.fa.fa-clock-o(aria-hidden='true')
        td 考试时间：
        td {{ examTime }}
      tr(v-if='isScoreShown')
        td
          i.fa.fa-star(aria-hidden='true')
        td 课程成绩：
        td {{ score }} 分
      tr(v-if='isScoreShown')
        td
          i.fa.fa-star-o(aria-hidden='true')
        td 课程绩点：
        td {{ gpa }}
    p 以下为 {{ course }} 的分项成绩查询结果：
  .col-sm-12(v-if='loadingIsDone')
    table.subitem-info.table.table-striped.table-bordered.table-hover
      thead
        tr
          th 序号
          th 分项名称
          th 分项成绩
          th 分项所占系数
      tbody#scoreintbody
        tr(v-for='(v, i) in records', :key='i')
          td {{ i + 1 }}
          td {{ v.CJFXMC }}
          td {{ v.FXCJ }}
          td {{ Number(v.CJFXZB) }}
</template>

<script lang="ts">
import { getCurrentRouteParams } from '@/core/router'
import { convertSemesterNumberToName } from '@/helper/converter'
import { requestSubitemScoreFxcj } from '@/store/actions/request'
import { SubitemScoreRecord } from '@/store/actions/result.interface'
import { Vue, Component } from 'vue-property-decorator'
import Loading from '@/plugins/common/components/Loading.vue'
import { getPointByScore } from '../score/utils'

@Component({
  components: { Loading }
})
export default class SubitemScore extends Vue {
  records: SubitemScoreRecord[] = []
  loadingIsDone = false

  get semester(): string {
    if (this.records.length) {
      return this.records[0].ZXJXJHH
    }
    return ''
  }

  get semesterName(): string {
    if (this.semester) {
      return convertSemesterNumberToName(this.semester)
    }
    return ''
  }

  get course(): string {
    if (this.records.length) {
      const { KCM, KCH, KXH } = this.records[0]
      return `${KCM}（${KCH}-${KXH}）`
    }
    return ''
  }

  get examTime(): string {
    if (this.records.length) {
      const { KSSJ } = this.records[0]
      return KSSJ
    }
    return ''
  }

  get score(): string {
    if (this.records.length) {
      return Math.round(
        this.records
          .map(({ CJFXMC, FXCJ, CJFXZB }) => ({
            CJFXMC,
            FXCJ: Number(FXCJ),
            CJFXZB: Number(CJFXZB)
          }))
          .reduce((acc, { FXCJ, CJFXZB }) => acc + FXCJ * CJFXZB, 0)
      ).toString()
    }
    return ''
  }

  get gpa(): string {
    if (this.score) {
      return (
        getPointByScore(Number(this.score), this.semester) ?? ''
      ).toString()
    }
    return ''
  }

  get isScoreShown(): boolean {
    return this.records.every(({ FXCJ }) => FXCJ)
  }

  async mounted(): Promise<void> {
    const params = getCurrentRouteParams()
    if (params) {
      const {
        executiveEducationPlanNumber,
        courseNumber,
        courseSequenceNumber,
        examTime,
        coursePropertyCode
      } = params
      const fxcjId = `${executiveEducationPlanNumber}_${courseNumber}_${courseSequenceNumber}_${examTime}_${coursePropertyCode}`
      this.records = await requestSubitemScoreFxcj(fxcjId)
      this.loadingIsDone = true
    }
  }
}
</script>

<style lang="scss" scoped>
.sua-container-subitem-score {
  .query-info {
    line-height: 2.5;
    margin-bottom: 1em;

    tr {
      td:nth-child(1) {
        width: 2em;
        text-align: center;
        font-weight: bold;
      }

      td:nth-child(2) {
        font-weight: bold;
      }
    }
  }
}
</style>
