<template lang="pug">
.gpa-tt.row
  .col-sm-12
    h4.header.smaller.lighter.grey
      i.menu-icon.fa.fa-calendar
      |
      | 全部成绩
      |
      span.gpa-info-badge.badge.badge-yellow(
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${majorCourses.length} 门属于主修培养方案的课程`'
      )
        | {{ majorCourses.length }} 门
      |
      |
      span.gpa-info-badge.badge.badge-yellow(
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${getTotalCourseCredits(majorCourses)} 属于主修培养方案的学分`'
      )
        | {{ getTotalCourseCredits(majorCourses) }} 学分
      |
      |
      span.gpa-info-badge.badge.badge-light(
        v-if='minorCourses.length',
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${minorCourses.length} 门属于辅修培养方案的课程`'
      )
        | {{ minorCourses.length }} 门
      |
      |
      span.gpa-info-badge.badge.badge-light(
        v-if='minorCourses.length',
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${getTotalCourseCredits(minorCourses)} 属于辅修培养方案的学分`'
      )
        | {{ getTotalCourseCredits(minorCourses) }} 学分
      |
      |
      span.gpa-info-badge.gpa-info-badge-tt-selected-course-quantity.badge.badge-pink(
        v-if='selectedCourses.length',
        :title='`在 ${semestersQuantity} 个学期中，您当前一共选中了 ${selectedCourses.length} 门课程`'
      )
        | {{ selectedCourses.length }} 门
      |
      |
      span.gpa-info-badge.gpa-info-badge-tt-selected-course-credits.badge.badge-pink(
        v-if='selectedCourses.length',
        :title='`在 ${semestersQuantity} 个学期中，您当前选中的全部课程总学分为 ${selectedCourseCredits}`'
      )
        | {{ selectedCourseCredits }} 学分
      button.btn.btn-white.btn-minier.gpa-tt-select-all-btn(
        v-if='!selectedCourses.length',
        @click='$emit(`selectAllCourses`)'
      )
        i.ace-icon.fa.fa-check.green
        | 全选
      button.btn.btn-white.btn-minier.gpa-tt-cancel-btn(
        v-else,
        @click='$emit(`unselectAllCourses`)'
      )
        i.ace-icon.fa.fa-times.red2
        | 全不选
    div(style='display: inline-block')
      span.gpa-tt-tag.label.label-success(
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${compulsoryCourses.length} 门必修课程，必修加权平均分为 ${getCompulsoryCoursesScore(majorCourses)}`',
        @click='$emit(`selectCompulsoryCourses`)'
      )
        | 必修平均分：{{ getCompulsoryCoursesScore(majorCourses) }}
      |
      |
      span.gpa-tt-tag.label.label-success(
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${compulsoryCourses.length} 门必修课程，必修加权平均绩点为 ${getCompulsoryCoursesGPA(majorCourses)}`',
        @click='$emit(`selectCompulsoryCourses`)'
      )
        | 必修绩点：{{ getCompulsoryCoursesGPA(majorCourses) }}
      |
      |
      span.gpa-tt-tag.label.label-purple(
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${majorCourses.length} 门属于主修培养方案的课程，全部加权平均分为 ${getAllCoursesScore(majorCourses)}`'
      )
        | 全部平均分：{{ getAllCoursesScore(majorCourses) }}
      |
      |
      span.gpa-st-tag.label.label-purple(
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${majorCourses.length} 门属于主修培养方案的课程，全部加权平均绩点为 ${getAllCoursesGPA(majorCourses)}`'
      )
        | 全部绩点：{{ getAllCoursesGPA(majorCourses) }}
    |
    |
    span.gpa-tt-tag.gpa-tt-tag-selected-score.label.label-pink(
      v-if='selectedCourses.length',
      :title='`在 ${semestersQuantity} 个学期中，您当前一共选出了 ${selectedCourses.length} 门课程进行计算，选中课程的加权平均分为 ${getSelectedCoursesScore(majorCourses)}`'
    )
      | 所有选中课程平均分：{{ getSelectedCoursesScore(majorCourses) }}
    |
    |
    span.gpa-tt-tag.gpa-tt-tag-selected-gpa.label.label-pink(
      v-if='selectedCourses.length',
      :title='`在 ${semestersQuantity} 个学期中，您当前一共选出了 ${selectedCourses.length} 门课程进行计算，选中课程的加权平均绩点为 ${getSelectedCoursesGPA(majorCourses)}`'
    )
      | 所有选中课程绩点：{{ getSelectedCoursesGPA(majorCourses) }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CourseScoreRecord } from '@/plugins/score/types'
import {
  getCompulsoryCoursesGPA,
  getCompulsoryCoursesScore,
  getAllCoursesGPA,
  getAllCoursesScore,
  getCompulsoryCourses,
  getSelectedCoursesScore,
  getSelectedCoursesGPA,
  reserveHigherCoursesForRetakenCourses,
  removeMinorCourses,
  reserveMinorCourses
} from '@/plugins/score/utils'

@Component
export default class TotalTranscript extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  semestersQuantity!: number
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
    return removeMinorCourses(this.courses)
  }

  get minorCourses(): CourseScoreRecord[] {
    return reserveMinorCourses(this.courses)
  }

  get selectedCourseCredits(): number {
    return reserveHigherCoursesForRetakenCourses(this.selectedCourses).reduce(
      (acc, cur) => acc + cur.credit,
      0
    )
  }

  get compulsoryCourses(): CourseScoreRecord[] {
    return getCompulsoryCourses(
      reserveHigherCoursesForRetakenCourses(this.majorCourses)
    )
  }

  getTotalCourseCredits(courses: CourseScoreRecord[]): number {
    return reserveHigherCoursesForRetakenCourses(courses).reduce(
      (acc, cur) => acc + cur.credit,
      0
    )
  }

  getCompulsoryCoursesGPA(arr: CourseScoreRecord[]): number {
    return getCompulsoryCoursesGPA(reserveHigherCoursesForRetakenCourses(arr))
  }

  getCompulsoryCoursesScore(arr: CourseScoreRecord[]): number {
    return getCompulsoryCoursesScore(reserveHigherCoursesForRetakenCourses(arr))
  }

  getSelectedCoursesGPA(arr: CourseScoreRecord[]): number {
    return getSelectedCoursesGPA(arr)
  }

  getSelectedCoursesScore(arr: CourseScoreRecord[]): number {
    return getSelectedCoursesScore(arr)
  }

  getAllCoursesGPA(arr: CourseScoreRecord[]): number {
    return getAllCoursesGPA(reserveHigherCoursesForRetakenCourses(arr))
  }

  getAllCoursesScore(arr: CourseScoreRecord[]): number {
    return getAllCoursesScore(reserveHigherCoursesForRetakenCourses(arr))
  }

  getCompulsoryCourses(arr: CourseScoreRecord[]): CourseScoreRecord[] {
    return getCompulsoryCourses(reserveHigherCoursesForRetakenCourses(arr))
  }
}
</script>

<style lang="scss" scoped>
.gpa-tt {
  margin-bottom: 20px;

  .header {
    margin-top: 0;
  }
}
</style>
