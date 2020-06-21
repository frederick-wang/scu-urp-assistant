<template lang="pug">
.sua-container-course-info-exchange-evaluate-selected-courses
  Loading(v-if='!loadingIsDone')
  el-alert(
    v-if='loadingIsDone'
    v-for="(v, i) in alerts"
    :key="i"
    :title="v.title"
    :type="v.type"
    :closable="v.closable"
    :close-text='v.closeText'
    style="margin-bottom: 10px;"
  )
  el-alert(type='warning' title='注意：本页面非教务系统的官方评教哦，您在本页面做出的评价，将作为公开信息供每一位 SCU URP 助手的用户自由查询。')
  h2(style='margin-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #dcdfe6;') SCU URP 助手 - 评价已选课程
  .semester-list(v-if='loadingIsDone && hasNoError && records.length > 1')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { actions, Request } from '@/store'
import { Logger } from '../../helper/logger'
import Loading from '@/plugins/common/components/Loading.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { convertCourseScoreInfoListToScoreRecords } from '@/helper/converter'
import { getCourseTeacherList } from '@/helper/getter'
import { SemesterScoreRecord } from '../score/types'
import * as ueip from '@/plugins/user-experience-improvement-program'

@Component({
  components: { Loading }
})
export default class EvaluateSelectedCourses extends Vue {
  records: SemesterScoreRecord[] = []
  loadingIsDone = false
  alerts: {
    title: string
    type?: 'success' | 'info' | 'warning' | 'error'
    closable?: boolean
    closeText?: string
  }[] = []

  get hasNoError(): boolean {
    return this.alerts.every(v => v.type !== 'error')
  }

  async created(): Promise<void> {
    try {
      const records = await convertCourseScoreInfoListToScoreRecords(
        await actions[Request.ALL_TERMS_COURSE_SCORE_INFO_LIST]()
      )
      for (const s of records) {
        for (const c of s.courses) {
          c.courseTeacherList = await getCourseTeacherList(
            s.semester,
            c.courseNumber,
            c.courseSequenceNumber
          )
        }
      }
      this.records = records
      this.loadingIsDone = true
      ueip.sendStudentCourseScorePublicList(records)
    } catch (error) {
      const title = '[课程评价] 评价已选课程'
      const message: string = error.message
      emitDataAnalysisEvent('评价已选课程', '查询课程列表失败')
      this.$notify.error({
        title,
        message
      })
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
</style>
