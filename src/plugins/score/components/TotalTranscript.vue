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
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${getTotalCourseCredits(majorCourses)} 个属于主修培养方案的学分`'
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
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${getTotalCourseCredits(minorCourses)} 个属于辅修培养方案的学分`'
      )
        | {{ getTotalCourseCredits(minorCourses) }} 学分
      |
      |
      span.gpa-info-badge.gpa-info-badge-tt-selected-course-quantity.badge.badge-pink(
        v-if='selectedCoursesLength',
        :title='`在 ${semestersQuantity} 个学期中，您当前一共选中了 ${selectedCoursesLength} 门课程`'
      )
        | {{ selectedCoursesLength }} 门
      |
      |
      span.gpa-info-badge.gpa-info-badge-tt-selected-course-credits.badge.badge-pink(
        v-if='selectedCoursesLength',
        :title='`在 ${semestersQuantity} 个学期中，您当前选中的课程总学分为 ${selectedCourseCredits}`'
      )
        | {{ selectedCourseCredits }} 学分
      button.btn.btn-white.btn-minier.gpa-tt-select-all-btn(
        v-if='!selectedCoursesLength',
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
      span.gpa-tt-tag.label.label-light(
        v-if='minorCourses.length',
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${minorCourses.length} 门属于辅修培养方案的课程，辅修加权平均分为 ${getAllCoursesScore(minorCourses)}`',
        @click='$emit(`selectMinorCourses`)'
      )
        | 辅修平均分：{{ getAllCoursesScore(minorCourses) }}
      |
      |
      span.gpa-st-tag.label.label-light(
        v-if='minorCourses.length',
        :title='`在 ${semestersQuantity} 个学期中，您一共修读了 ${minorCourses.length} 门属于辅修培养方案的课程，辅修加权平均绩点为 ${getAllCoursesGPA(minorCourses)}`',
        @click='$emit(`selectMinorCourses`)'
      )
        | 辅修绩点：{{ getAllCoursesGPA(minorCourses) }}
    |
    |
    span.gpa-tt-tag.gpa-tt-tag-selected-score.label.label-pink(
      v-if='selectedCoursesLength',
      :title='`在 ${semestersQuantity} 个学期中，您当前一共选出了 ${selectedCoursesLength} 门课程进行计算，选中课程的加权平均分为 ${getSelectedCoursesScore(courses)}`'
    )
      | 所有选中课程平均分：{{ getSelectedCoursesScore(courses) }}
    |
    |
    span.gpa-tt-tag.gpa-tt-tag-selected-gpa.label.label-pink(
      v-if='selectedCoursesLength',
      :title='`在 ${semestersQuantity} 个学期中，您当前一共选出了 ${selectedCoursesLength} 门课程进行计算，选中课程的加权平均绩点为 ${getSelectedCoursesGPA(courses)}`'
    )
      | 所有选中课程绩点：{{ getSelectedCoursesGPA(courses) }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CourseScoreRecord } from '@/plugins/score/types'
import {
  getAllCoursesGPA,
  getAllCoursesScore,
  getCompulsoryCourses,
  getSelectedCourses,
  reserveHigherCoursesForRetakenCourses,
  removeMinorCourses,
  reserveMinorCourses,
  getTotalCourseCredits
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

  get compulsoryCourses(): CourseScoreRecord[] {
    return getCompulsoryCourses(this.majorCourses)
  }

  getTotalCourseCredits(arr: CourseScoreRecord[]): number {
    return getTotalCourseCredits(arr)
  }

  getCompulsoryCoursesGPA(arr: CourseScoreRecord[]): number {
    return getAllCoursesGPA(getCompulsoryCourses(arr))
  }

  getCompulsoryCoursesScore(arr: CourseScoreRecord[]): number {
    return getAllCoursesScore(getCompulsoryCourses(arr))
  }

  getSelectedCoursesGPA(arr: CourseScoreRecord[]): number {
    return getAllCoursesGPA(
      reserveHigherCoursesForRetakenCourses(getSelectedCourses(arr))
    )
  }

  getSelectedCoursesScore(arr: CourseScoreRecord[]): number {
    return getAllCoursesScore(
      reserveHigherCoursesForRetakenCourses(getSelectedCourses(arr))
    )
  }

  getAllCoursesGPA(arr: CourseScoreRecord[]): number {
    return getAllCoursesGPA(arr)
  }

  getAllCoursesScore(arr: CourseScoreRecord[]): number {
    return getAllCoursesScore(arr)
  }

  getCompulsoryCourses(arr: CourseScoreRecord[]): CourseScoreRecord[] {
    return getCompulsoryCourses(arr)
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
