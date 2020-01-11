<template lang="pug">
.sua-container-gpa-calculator
  Loading(v-if='!loadingIsDone')
  TotalTranscript(
    v-if='loadingIsDone && records.length > 1'
    :semestersQuantity='records.length'
    :courses='allCourses'
    :selectedCourses='allSelectedCourses'
    @selectAllCourses='selectAllCourses()'
    @unselectAllCourses='unselectAllCourses()'
    @selectCompulsoryCourses='selectCompulsoryCourses()'
  )
  .gpa-st-container.row(v-if='loadingIsDone')
    SemesterTranscript(
      v-for='(semesterItem, semesterIndex) in records'
      :key='semesterIndex'
      :type='type'
      :semester='semesterItem.semester'
      :courses='semesterItem.courses'
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { actions, Request } from '@/store'
import { SemesterScoreRecord, CourseScoreRecord } from '@/plugins/score/types'
import Loading from '@/plugins/common/components/Loading.vue'
import TotalTranscript from './components/TotalTranscript.vue'
import SemesterTranscript from './components/SemesterTranscript/SemesterTranscript.vue'
import { getCourseTeacherList } from '@/utils'
import { emitDataAnalysisEvent } from '../data-analysis'
import { getSelectedCourses } from '@/plugins/score/utils'
import { convertCourseScoreInfoListToScoreRecords } from '@/utils'
import * as ueip from '@/plugins/user-experience-improvement-program'

@Component({
  components: { Loading, SemesterTranscript, TotalTranscript }
})
export default class GPACalculator extends Vue {
  @Prop({
    type: String,
    required: true
  })
  type!: string

  loadingIsDone = false
  records: SemesterScoreRecord[] = []

  get allCourses(): CourseScoreRecord[] {
    return this.records.reduce(
      (acc, cur) => acc.concat(cur.courses),
      [] as CourseScoreRecord[]
    )
  }

  get allSelectedCourses(): CourseScoreRecord[] {
    return getSelectedCourses(this.allCourses)
  }

  selectAllCourses(): void {
    this.allCourses.forEach(v => (v.selected = true))
  }

  unselectAllCourses(): void {
    this.allCourses.forEach(v => (v.selected = false))
  }

  selectCompulsoryCourses(): void {
    this.allCourses.forEach(v => (
        v.selected = (v.coursePropertyName === '必修')
    ))
  }

  async created(): Promise<void> {
    try {
      const records =
        this.type === 'full'
          ? convertCourseScoreInfoListToScoreRecords(
              await actions[Request.THIS_TERM_COURSE_SCORE_INFO_LIST]()
            )
          : await convertCourseScoreInfoListToScoreRecords(
              await actions[Request.ALL_TERMS_COURSE_SCORE_INFO_LIST]()
            )
      if (this.type !== 'compact') {
        for (const s of records) {
          for (const c of s.courses) {
            c.courseTeacherList = await getCourseTeacherList(
              s.semester,
              c.courseNumber,
              c.courseSequenceNumber
            )
          }
        }
      }
      this.records = records
      this.loadingIsDone = true
      ueip.sendStudentCourseScorePublicList(records)
      switch (this.type) {
        case 'compact':
          emitDataAnalysisEvent('均分绩点计算器挂件', '查询成功')
          break
        case 'basic':
          emitDataAnalysisEvent('均分绩点计算器', '查询成功')
          break
        case 'full':
          emitDataAnalysisEvent('成绩信息查询', '查询成功')
          break
      }
    } catch (error) {
      switch (this.type) {
        case 'compact':
          emitDataAnalysisEvent('均分绩点计算器挂件', '查询失败')
          break
        case 'basic':
          emitDataAnalysisEvent('均分绩点计算器', '查询失败')
          break
        case 'full':
          emitDataAnalysisEvent('成绩信息查询', '查询失败')
          break
      }
    }
  }
}
</script>

<style lang="scss">
.gpa-st-container {
  display: flex;
  flex-wrap: wrap;
}

.gpa-st-select-all-btn,
.gpa-tt-select-all-btn {
  position: relative;
  top: 2.5px;
  float: right;
}

.gpa-st-cancel-btn,
.gpa-tt-cancel-btn {
  position: relative;
  top: 2.5px;
  float: right;
}

.gpa-st-tag,
.gpa-tt-tag {
  cursor: pointer;
}

.gpa-info-badge {
  cursor: pointer;
  position: relative;
  top: -7.5px;
}
</style>
