<template lang="pug">
.sua-container-fast-evaluation
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
  .row(v-if='loadingIsDone && hasNoError')
    .col-sm-12
      h4.header.smaller.lighter.grey
        i.menu-icon.fa.fa-star
        |
        | 快捷评教：期末评教
        |
      .explanation
        p: strong 说明：
        p 点击「开始评教」按钮后，将自动对下面列表中「被选中」的老师进行评教，评教内容为：
        ul.explanation-list
          li 给「总体教学效果」打「100」分；
          li 选中所有单选题的 (A) 选项（一般为「完全符合」、「完全同意」、「必须是」之类的选项）；
          li 选中多选题除了「以上均无」之外的全部选项；
          li 从评价文本库中随机抽取一条评价作为「主观评价」。
        p: strong 请您在确认已阅读以上说明，并确定程序运行的效果为自己所需的效果之后，再点击「开始评教」！
      .checkboxs-wrapper(v-if='options.length && !isEvaluated && !isEvaluating')
        .check-all-box-wrapper
          el-checkbox(:indeterminate='isIndeterminate' @change='triggerCheckAll') 全选
        .checkboxs
          el-checkbox-group(v-model='checkedOptions')
            el-checkbox(v-for='option in options' :label='option' :key='option') {{ option }}
      .evaluations-wrapper(v-if='options.length && (isEvaluating || isEvaluated)')
        table.table.table-striped.table-bordered.evaluations-table
          thead
            tr
              th 状态
              th 被评人
              th 评估内容
              th 评估课程号
              th 评估课序号
          tbody
            tr(v-for="(v, i) in evaluationItems" :key='v.key' :class="{ 'status-pending': v.status === 'pending', 'status-evaluating': v.status === 'evaluating', 'status-evaluated': v.status === 'evaluated', 'status-error': v.status === 'error' }")
              td.evaluation-icon
                i.el-icon-remove-outline(v-if='v.status === `pending`')
                span(v-if='v.status === `pending`')
                  |
                  | 等待评教中
                i.el-icon-loading(v-if='v.status === `evaluating`')
                span(v-if='v.status === `evaluating`')
                  |
                  | 正在评教
                i.el-icon-circle-check(v-if='v.status === `evaluated`')
                span(v-if='v.status === `evaluated`')
                  |
                  | 评教成功
                i.el-icon-circle-close(v-if='v.status === `error`')
                span(v-if='v.status === `error`')
                  |
                  | 评教失败
              td {{ v.teacherName }}
              td {{ v.courseName }}
              td {{ v.courseNumber }}
              td {{ v.courseSequenceNumber }}
      .btn-wrapper(v-if='options.length')
        el-button.full-width-btn(type='primary' icon='el-icon-s-promotion' v-if='!isEvaluated && !isEvaluating' @click='start()') 开始评教
        el-button.full-width-btn(type='primary' :loading='true' v-if='!hasEvaluationError && !isEvaluated && isEvaluating') 正在评教
        el-button.full-width-btn(type='warning' icon='el-icon-close' v-if='hasEvaluationError' @click='back()') 评教发生错误，点此返回
        el-button.full-width-btn(type='success' icon='el-icon-check' v-if='isEvaluated' @click='jump()') 评教完成，点此跳转到「教师课堂评价 > 学生评教 > 教学评估」页面查看评教结果
      .btn-wrapper(v-if='!options.length')
        el-button.full-width-btn(type='success' icon='el-icon-check' @click='jump()') 您没有尚未评教的课程，点此跳转到「教师课堂评价 > 学生评教 > 教学评估」页面查看评教结果
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Loading from '@/plugins/common/components/Loading.vue'
import { emitDataAnalysisEvent } from '@/plugins/data-analysis'
import { messageWarning, notifyError } from '@/helper/util'
import {
  requestTeachingAssessmentEvaluationRecords,
  requestTeachingEvaluationPageHTML
} from '@/store/actions/request'
import { TeachingAssessmentEvaluationRecord } from '@/store/actions/result.interface'
import {
  EvaluationItem,
  getEvaluationItem,
  getRecordText,
  evaluate,
  sleep
} from './tools'

@Component({ components: { Loading } })
export default class FastEvaluation extends Vue {
  loadingIsDone = false
  alerts: {
    title: string
    type?: 'success' | 'info' | 'warning' | 'error'
    closable?: boolean
    closeText?: string
  }[] = []

  records: TeachingAssessmentEvaluationRecord[] = []
  options: string[] = []
  checkedOptions: string[] = []
  evaluationItems: EvaluationItem[] = []

  get isEvaluating(): boolean {
    return (
      !!this.evaluationItems.length &&
      this.evaluationItems.some(
        ({ status }) => status === 'pending' || status === 'evaluating'
      )
    )
  }

  get isEvaluated(): boolean {
    return (
      !!this.evaluationItems.length &&
      this.evaluationItems.every(({ status }) => status === 'evaluated')
    )
  }

  get hasEvaluationError(): boolean {
    return (
      !!this.evaluationItems.length &&
      this.evaluationItems.some(({ status }) => status === 'error')
    )
  }

  get isIndeterminate(): boolean {
    return (
      this.checkedOptions.length > 0 &&
      this.checkedOptions.length < this.options.length
    )
  }

  get checkAll(): boolean {
    return this.checkedOptions.length === this.options.length
  }

  get hasNoError(): boolean {
    return this.alerts.every(v => v.type !== 'error')
  }

  getRecordText(record: TeachingAssessmentEvaluationRecord): string {
    return getRecordText(record)
  }

  triggerCheckAll(val: boolean): void {
    this.checkedOptions = val ? [...this.options] : []
  }

  jump(): void {
    window.location.href = '/student/teachingEvaluation/newEvaluation/index'
  }

  back(): void {
    this.init()
  }

  start(): void {
    const items = this.records
      .filter(rec => this.checkedOptions.includes(getRecordText(rec)))
      .map(getEvaluationItem)
    if (!items.length) {
      messageWarning('您尚未选择老师，请至少选择一人！')
      return
    }
    this.evaluationItems = items
    this.startEvaluation()
  }

  async startEvaluation(): Promise<void> {
    for (const item of this.evaluationItems) {
      item.status = 'evaluating'
      const { courseId } = item
      item.html = await requestTeachingEvaluationPageHTML(courseId)
    }
    await sleep(105 * 1000);
    let token: string = $('#tokenValue', this.evaluationItems[0].html).val()
    for (const item of this.evaluationItems) {
      const { html, key } = item
      const result = await evaluate(html, key, token)
      if (result.error) {
        item.status = 'error'
        break
      }
      item.status = 'evaluated'
      token = result.token
    }
  }

  async created(): Promise<void> {
    await this.init()
  }

  async init(): Promise<void> {
    this.loadingIsDone = false
    this.alerts = []
    this.records = []
    this.options = []
    this.checkedOptions = []
    this.evaluationItems = []
    try {
      /**
       * 2021-12-13 01:06:23
       * TODO: 先只整一个「期末评教」，等有样本了再处理「课堂及时评教」
       */
      const records = await requestTeachingAssessmentEvaluationRecords(
        '期末评教'
      )
      console.log(records)
      this.records = records.filter(({ isEvaluated }) => !isEvaluated)
      this.options = this.records.map(getRecordText)
      this.loadingIsDone = true
      emitDataAnalysisEvent('期末评教', '查询成功')
    } catch (error) {
      const title = '[快捷评教] 期末评教'
      const message: string = (error as Error).message
      emitDataAnalysisEvent('期末评教', '查询失败')
      notifyError(message, title)
      this.alerts.push({
        title: message,
        type: 'error',
        closable: false
      })
      this.loadingIsDone = true
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-top: 0;
}
.explanation {
  .explanation-list {
    &.ul {
      list-style-type: disc;
    }

    li {
      list-style-type: disc;
    }
  }
}

.checkboxs-wrapper {
  border: 1px solid #409eff;
  border-radius: 5px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 10px;

  .check-all-box-wrapper {
    margin-bottom: 15px;
  }
}

.evaluations-wrapper {
  .evaluations-table {
    margin-bottom: 10px;

    th,
    tr {
      text-align: center;

      &.status-pending {
        color: #909399;
      }

      &.status-evaluating {
        color: #409eff;
      }

      &.status-evaluated {
        color: #67c23a;
      }

      &.status-error {
        color: #f56c6c;
      }
    }
  }
}

.btn-wrapper {
  .full-width-btn {
    width: 100%;
    margin: 5px 0;
  }
}
</style>
