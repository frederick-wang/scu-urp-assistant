<template lang="pug">
h4.header.smaller.lighter.grey
  i.menu-icon.fa.fa-calendar
  |
  | {{ getSemesterTitle(semester) }}
  |
  span.gpa-info-badge.badge.badge-yellow(
    :title='`在${semester}，您一共修读了 ${majorCourses.length} 门属于主修培养方案的课程`'
  )
    | {{ majorCourses.length }} 门
  |
  |
  span.gpa-info-badge.badge.badge-yellow(
    :title='`在${semester}，您一共修读了 ${getTotalCourseCredits(majorCourses)} 个属于主修培养方案的学分`'
  )
    | {{ getTotalCourseCredits(majorCourses) }} 学分
  |
  |
  span.gpa-info-badge.badge.badge-light(
    v-if='minorCourses.length',
    :title='`在${semester}，您一共修读了 ${minorCourses.length} 门属于辅修培养方案的课程`'
  )
    | {{ minorCourses.length }} 门
  |
  |
  span.gpa-info-badge.badge.badge-light(
    v-if='minorCourses.length',
    :title='`在${semester}，您一共修读了 ${getTotalCourseCredits(minorCourses)} 个属于辅修培养方案的学分`'
  )
    | {{ getTotalCourseCredits(minorCourses) }} 学分
  |
  |
  span.gpa-info-badge.gpa-info-badge-st-selected-course-quantity.badge.badge-pink(
    v-if='selectedCoursesLength',
    :title='`在${semester}，您当前一共选中了 ${selectedCoursesLength} 门课程`',
    data-semester=semester
  )
    | {{ selectedCoursesLength }} 门
  |
  |
  span.gpa-info-badge.gpa-info-badge-st-selected-course-credits.badge.badge-pink(
    v-if='selectedCoursesLength',
    :title='`在${semester}，您当前选中的课程总学分为 ${selectedCourseCredits}`',
    data-semester=semester
  )
    | {{ selectedCourseCredits }} 学分
  button.btn.btn-white.btn-minier.gpa-st-select-all-btn(
    v-if='!selectedCoursesLength',
    @click='$emit(`selectAllCourses`)'
  )
    i.ace-icon.fa.fa-check.green
    | 全选
  button.btn.btn-white.btn-minier.gpa-st-cancel-btn(
    v-else,
    @click='$emit(`unselectAllCourses`)'
  )
    i.ace-icon.fa.fa-times.red2
    | 全不选
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { state } from '@/store'
import { CourseScoreRecord } from '@/plugins/score/types'
import {
  getTotalCourseCredits,
  removeMinorCourses,
  reserveHigherCoursesForRetakenCourses,
  reserveMinorCourses
} from '../../utils'

@Component
export default class Header extends Vue {
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
  @Prop({
    type: Array,
    required: true
  })
  selectedCourses!: CourseScoreRecord[]

  get majorCourses(): CourseScoreRecord[] {
    return reserveHigherCoursesForRetakenCourses(
      removeMinorCourses(this.courses)
    )
  }

  get minorCourses(): CourseScoreRecord[] {
    return reserveHigherCoursesForRetakenCourses(
      reserveMinorCourses(this.courses)
    )
  }

  get selectedCoursesLength(): number {
    return reserveHigherCoursesForRetakenCourses(this.selectedCourses).length
  }

  get selectedCourseCredits(): number {
    return reserveHigherCoursesForRetakenCourses(this.selectedCourses).reduce(
      (acc, cur) => acc + cur.credit,
      0
    )
  }

  getTotalCourseCredits(arr: CourseScoreRecord[]): number {
    return getTotalCourseCredits(arr)
  }

  getSemesterTitle(semesterText: string): string {
    if (this.type === 'compact') {
      return semesterText
    }

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
</style>
