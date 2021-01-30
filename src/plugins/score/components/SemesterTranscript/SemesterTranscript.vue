<template lang="pug">
.gpa-st.col-xs-12.self-margin(
  :style='{ width: type === `compact` ? `50%` : `100%` }'
)
  Header(
    :type='type',
    :semester='semester',
    :courses='courses',
    :selectedCourses='selectedCourses',
    @selectAllCourses='selectAllCourses()',
    @unselectAllCourses='unselectAllCourses()'
  )
  LabelBar(
    :type='type',
    :semester='semester',
    :courses='courses',
    :selectedCourses='selectedCourses',
    @selectCompulsoryCourses='selectCompulsoryCourses()'
  )
  Tips(v-if='type === `full`')
  el-alert(
    v-if='isAllCourseScoreNegative',
    title='此学期成绩无法显示',
    type='warning',
    :description='`您好，您在「${semester}」的课程成绩全部无法正常显示。如果您还没有评教，请及时评教哦~如果不完成评教，是无法查看对应课程的成绩的。`',
    :show-icon='true',
    :closable='false'
  )
  Transcript(
    v-else,
    :type='type',
    :courses='courses',
    @toggleCourseStatus='toggleCourseStatus($event)'
  )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CourseScoreRecord } from '@/plugins/score/types'
import Header from './Header.vue'
import LabelBar from './LabelBar.vue'
import Tips from './Tips.vue'
import Transcript from './Transcript.vue'
import { getSelectedCourses } from '@/plugins/score/utils'
import { isNil } from 'ramda'

@Component({
  components: { Header, LabelBar, Tips, Transcript }
})
export default class SemesterScores extends Vue {
  @Prop({
    type: String,
    required: true
  })
  type!: string
  @Prop({
    type: String,
    required: true
  })
  semester!: string
  @Prop({
    type: Array,
    required: true
  })
  courses!: CourseScoreRecord[]

  get selectedCourses(): CourseScoreRecord[] {
    return getSelectedCourses(this.courses)
  }

  get isAllCourseScoreNegative(): boolean {
    return this.courses.every(v => isNil(v.courseScore) || v.courseScore < 0)
  }

  /**
   * 当「课程块」被点击时，做出相应的反应
   */
  toggleCourseStatus(item: CourseScoreRecord): void {
    item.selected = !item.selected
  }

  selectAllCourses(): void {
    this.courses.forEach(v => (v.selected = true))
  }

  unselectAllCourses(): void {
    this.courses.forEach(v => (v.selected = false))
  }

  selectCompulsoryCourses(): void {
    this.courses.forEach(v => (v.selected = v.coursePropertyName === '必修'))
  }
}
</script>

<style lang="scss" scoped>
.gpa-st-container {
  .gpa-st {
    width: 100%;
  }
}
</style>
