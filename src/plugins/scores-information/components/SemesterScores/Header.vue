<template lang="pug">
h4.header.smaller.lighter.grey
  i.menu-icon.fa.fa-calendar
  |
  | {{ getSemesterTitle(semester) }}
  |
  span.gpa-info-badge.badge.badge-yellow(:title='`在${semester}，您一共修读了 ${courses.length} 门课程`')
    | {{courses.length}} 门
  |
  |
  span.gpa-info-badge.badge.badge-yellow(:title='`在${semester}，您一共修读了 ${totalCourseCredits} 学分`')
    | {{totalCourseCredits}} 学分
  |
  |
  span.gpa-info-badge.gpa-info-badge-st-selected-course-quantity.badge.badge-pink(
    v-if='selectedCourses.length'
    :title='`在${semester}，您当前选中了 ${selectedCourses.length} 门课程`'
    data-semester=semester
  )
    | {{selectedCourses.length}} 门
  |
  |
  span.gpa-info-badge.gpa-info-badge-st-selected-course-credits.badge.badge-pink(
    v-if='selectedCourses.length'
    :title='`在${semester}，您当前选中的课程总学分为 ${selectedCourseCredits}`'
    data-semester=semester
  )
    | {{selectedCourseCredits}} 学分
  button.btn.btn-white.btn-minier.gpa-st-select-all-btn(
    v-if='!selectedCourses.length'
    @click='$emit(`selectAllCourses`)'
  )
    i.ace-icon.fa.fa-check.green
    | 全选
  button.btn.btn-white.btn-minier.gpa-st-cancel-btn(
    v-else
    @click='$emit(`unselectAllCourses`)'
  )
    i.ace-icon.fa.fa-times.red2
    | 全不选
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { state } from '@/store'
import { CourseScoreRecord } from '@/plugins/scores-information/types'

@Component
export default class Header extends Vue {
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
  @Prop({
    type: Array,
    required: true
  })
  selectedCourses!: CourseScoreRecord[]

  get selectedCourseCredits() {
    return this.selectedCourses.reduce((acc, cur) => acc + cur.credit, 0)
  }

  get totalCourseCredits() {
    return this.courses.reduce((acc, cur) => acc + cur.credit, 0)
  }

  getSemesterTitle(semesterText: string) {
    const currentSemesterNumber = state.basic.currentSemesterNumber
    const rC = currentSemesterNumber.match(/(\d+)-(\d+)-(\d)/)
    const r = semesterText.match(/(\d+)-(\d+)学年\s(.)季学期/)
    if (!rC || !r) {
      return semesterText + '成绩'
    }
    const sumC = Number(rC[1]) + Number(rC[2]) + Number(rC[3])
    const sum = Number(r[1]) + Number(r[2]) + Number(r[3] === '秋' ? 1 : 2)
    let suffix = ''
    if (sum === sumC) {
      suffix = '（本学期）'
    } else if (sum === sumC - 1) {
      suffix = '（上学期）'
    }
    return semesterText + suffix + '成绩'
  }
}
</script>

<style lang="scss" scoped>
.gpa-st-cancel-btn,
.gpa-tt-cancel-btn {
  display: inline-block;
}

.gpa-info-badge-st-selected-course-quantity,
.gpa-info-badge-st-selected-course-credits {
  display: inline-block;
}
</style>
