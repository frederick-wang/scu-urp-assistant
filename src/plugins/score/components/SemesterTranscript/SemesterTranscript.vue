<template lang="pug">
.gpa-st.col-xs-12.self-margin(:style='{ width: type === `compact` ? `50%` : `100%` }')
  Header(
    :type='type'
    :semester='semester'
    :courses='courses'
    :selectedCourses='selectedCourses'
    @selectAllCourses='selectAllCourses()'
    @unselectAllCourses='unselectAllCourses()'
  )
  LabelBar(
    :type='type'
    :semester='semester'
    :courses='courses'
    :selectedCourses='selectedCourses'
    @selectCompulsoryCourses='selectCompulsoryCourses()'
  )
  Tips(v-if='type === `full`')
  Transcript(
    :type='type'
    :courses='courses'
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
    this.courses.forEach(v => (
      v.selected = (v.coursePropertyName === '必修')
    ))
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
