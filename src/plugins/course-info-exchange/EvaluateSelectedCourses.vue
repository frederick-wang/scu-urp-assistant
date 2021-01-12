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
  .wrapper(v-if='loadingIsDone && hasNoError')
    el-alert(type='warning' title='注意：本页面非教务系统的官方评教哦，您在本页面做出的评价，将作为公开信息供每一位 SCU URP 助手的用户自由查询。')
    .semester-list(v-if='records.length > 1')
      SemesterCard(v-for='(v, i) in records' :key='i' :semester='v.semester' :courses='v.courses')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { actions, Request } from '@/store'
import Loading from '@/plugins/common/components/Loading.vue'
import SemesterCard from './components/SemesterCard.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { convertCourseScoreInfoListToScoreRecords } from '@/helper/converter'
import * as ueip from '@/plugins/user-experience-improvement-program'
import { SemesterInfoExchange } from './types'
import { SemesterScoreRecord } from '../score/types'
import { lorem } from 'faker/locale/zh_CN'

@Component({
  components: { Loading, SemesterCard }
})
export default class EvaluateSelectedCourses extends Vue {
  records: SemesterInfoExchange[] = []
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
      const convertRecordsToRecordsWithInfoExchange = (
        records: SemesterScoreRecord[]
      ): SemesterInfoExchange[] =>
        records.map(({ semester, courses }) => ({
          semester,
          courses: courses.map(
            ({
              courseName,
              courseNumber,
              courseSequenceNumber,
              coursePropertyName
            }) => ({
              basic: {
                courseName,
                courseNumber,
                courseSequenceNumber,
                coursePropertyName
              },
              ...(Math.random() < 0.5
                ? {
                    hasEvaluated: false
                  }
                : {
                    hasEvaluated: true,
                    evaluation: {
                      tagList: [
                        { tag: '从不点名', number: 1 },
                        { tag: '没有作业', number: 1 },
                        { tag: '善解人意', number: 1 },
                        { tag: '开卷考试', number: 1 }
                      ],
                      courseValue: Math.floor(Math.random() * 5) + 1,
                      teachingAttitude: Math.floor(Math.random() * 5) + 1,
                      teachingOrganization: Math.floor(Math.random() * 5) + 1,
                      teacherStudentRelationship:
                        Math.floor(Math.random() * 5) + 1,
                      homeworkDifficulty: Math.floor(Math.random() * 5) + 1,
                      comment: lorem.text()
                    }
                  })
            })
          )
        }))
      this.records = convertRecordsToRecordsWithInfoExchange(records)
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
.semester-list {
  margin-top: 20px;
}
</style>
