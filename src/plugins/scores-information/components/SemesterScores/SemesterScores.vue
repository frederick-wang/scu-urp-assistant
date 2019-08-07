<template lang="pug">
.gpa-st.col-xs-12.self-margin
  Header(:title='semester')
  LabelBar(:semester='semester' :courses='courses' @selectAllCourses='selectAllCourses()' @unselectAllCourses='unselectAllCourses()')
  Tips
  Transcript(:courses='courses' @toggleCourseStatus='toggleCourseStatus($event)')
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CourseScoreRecord } from '@/plugins/scores-information/types'
import Header from './Header.vue'
import LabelBar from './LabelBar.vue'
import Tips from './Tips.vue'
import Transcript from './Transcript.vue'

@Component({
  components: { Header, LabelBar, Tips, Transcript }
})
export default class SemesterScores extends Vue {
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

  /**
   * 当「课程块」被点击时，做出相应的反应
   */
  toggleCourseStatus(item: CourseScoreRecord) {
    item.selected = !item.selected
  }

  selectAllCourses() {
    this.courses.forEach(v => (v.selected = true))
  }

  unselectAllCourses() {
    this.courses.forEach(v => (v.selected = false))
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
