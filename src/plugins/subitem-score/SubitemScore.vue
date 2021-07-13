<template lang="pug">
.sua-container-subitem-score.row.self-margin
  Loading(v-if='!loadingIsDone')
  .col-sm-12(v-if='loadingIsDone')
    h4.header.smaller.lighter.grey
      i.fa.fa-list(aria-hidden='true')
      |
      | 分项成绩查询
      span.right_top_oper
        button.btn.btn-info.btn-xs.btn-round(title='返回', @click='back()')
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
      tbody#scoreintbody
        tr(v-for='(v, i) in records', :key='i')
          td {{ i + 1 }}
          td {{ getScoreSubItemNameByCode(v.id.scoreSubItemCode) }}
          td {{ v.subItemScore }}
</template>

<script lang="ts">
import { getCurrentRouteParams, router } from '@/core/router'
import { convertSemesterNumberToName } from '@/helper/converter'
import { requestSubitemScoreLook } from '@/store/actions/request'
import { ScoreDetail } from '@/store/actions/result.interface'
import { Vue, Component } from 'vue-property-decorator'
import Loading from '@/plugins/common/components/Loading.vue'
import { getPointByScore } from '../score/utils'
import { emitDataAnalysisEvent } from '../data-analysis'
import { notifyError } from '@/helper/util'
import { defaultTo, nth, pipe, split } from 'ramda'
import subitems from './subitems.json'

@Component({
  components: { Loading }
})
export default class SubitemScore extends Vue {
  records: ScoreDetail[] = []
  loadingIsDone = false

  get semester(): string {
    if (this.records.length) {
      return this.records[0].id.executiveEducationPlanNumber
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
    const params = getCurrentRouteParams() as Record<string, string> | undefined
    if (
      params?.courseName &&
      params?.courseNumber &&
      params?.courseSequenceNumber
    ) {
      const { courseName, courseNumber, courseSequenceNumber } = params
      return `${courseName}（${courseNumber}-${courseSequenceNumber}）`
    }
    return ''
  }

  get examTime(): string {
    const params = getCurrentRouteParams() as Record<string, string> | undefined
    if (params?.examTime) {
      const { examTime } = params
      return examTime
    }
    return ''
  }

  get score(): string {
    const params = getCurrentRouteParams() as Record<string, string> | undefined
    if (params?.courseScore) {
      const { courseScore } = params
      return courseScore
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
    return this.records.every(({ subItemScore }) => subItemScore)
  }

  /**
   * 计算「分数」和「分数比例」的正确乘积。
   * 解决浮点数计算精度误差，避免出现类似「13.799999999999999」这样的奇怪结果
   */
  calcRightProductOfGradeAndFactor(score: string, factor: string): number {
    const scoreNum = Number(score)
    const factorNum = Number(factor)
    /**
     * 获取数字的小数位数
     */
    const toDecimalPlaces = pipe(
      (x: number) => x.toString(),
      split('.'),
      nth(1),
      (x: string | undefined) => x?.length,
      defaultTo(0)
    )
    /**
     * 乘积最大的小数位数。
     * 如果 Number A 的小数位数是 a，Number B 的小数位数是 b，那么乘积的小数位数不会超过 a + b
     */
    const productDecimalPlaces =
      toDecimalPlaces(scoreNum) + toDecimalPlaces(factorNum)
    // 按照判断出的乘积小数位数，进行四舍五入
    const product = scoreNum * factorNum
    const scaleParam = 10 ** productDecimalPlaces
    const rightProduct = Math.round(product * scaleParam) / scaleParam

    return rightProduct
  }

  back(): void {
    router.back()
  }

  getScoreSubItemNameByCode(code: string): string {
    const list = subitems as Record<string, string>
    if (list[code]) {
      return list[code]
    }
    emitDataAnalysisEvent('分项成绩查询', '无法识别的分项成绩代码', {
      unidentifyedSubitem: `${code}-${this.semester}-${this.course}-${this.examTime}`
    })
    return ''
  }

  async mounted(): Promise<void> {
    const params = getCurrentRouteParams() as Record<string, string> | undefined
    if (!params) {
      notifyError('参数对象初始化失败，查询中止', '[分项成绩查询] 读取参数失败')
      emitDataAnalysisEvent('分项成绩查询', '读取参数失败')
      return
    }
    const {
      executiveEducationPlanNumber,
      courseNumber,
      courseSequenceNumber,
      examTime,
      coursePropertyCode
    } = params
    if (
      !executiveEducationPlanNumber ||
      !courseNumber ||
      !courseSequenceNumber ||
      !examTime ||
      !coursePropertyCode
    ) {
      notifyError(
        '参数对象初始化成功，但部分参数为空，查询中止',
        '[分项成绩查询] 参数存在空值'
      )
      emitDataAnalysisEvent('分项成绩查询', '参数存在空值')
      return
    }
    try {
      this.records = (
        await requestSubitemScoreLook(
          executiveEducationPlanNumber,
          courseNumber,
          courseSequenceNumber,
          examTime
        )
      ).scoreDetailList
      this.loadingIsDone = true
      emitDataAnalysisEvent('分项成绩查询', '查询成功')
    } catch (error) {
      notifyError(error, '[分项成绩查询] 获取数据失败')
      emitDataAnalysisEvent('分项成绩查询', '查询失败')
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

  .subitem-info {
    width: auto;

    th,
    td {
      text-align: center;
      padding-left: 40px;
      padding-right: 40px;
    }
  }
}
</style>
