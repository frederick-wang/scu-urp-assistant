<template lang="pug">
div
  p
    div(style='display: inline-block')
      span.gpa-st-tag.label.label-success(
        :title='`在${semester}，您一共修读了 ${compulsoryCourses.length} 门必修课程，必修加权平均分为 ${getCompulsoryCoursesScore(majorCourses)}`',
        @click='$emit(`selectCompulsoryCourses`)'
      )
        | 必修平均分：{{ getCompulsoryCoursesScore(majorCourses) }}
      |
      |
      span.gpa-st-tag.label.label-success(
        :title='`在${semester}，您一共修读了 ${compulsoryCourses.length} 门必修课程，必修加权平均绩点为 ${getCompulsoryCoursesGPA(majorCourses)}`',
        @click='$emit(`selectCompulsoryCourses`)'
      )
        | 必修绩点：{{ getCompulsoryCoursesGPA(majorCourses) }}
      |
      |
      span.gpa-st-tag.label.label-purple(
        :title='`在${semester}，您一共修读了 ${majorCourses.length} 门属于主修培养方案的课程，加权平均分为 ${getAllCoursesScore(majorCourses)}`'
      )
        | 全部平均分：{{ getAllCoursesScore(majorCourses) }}
      |
      |
      span.gpa-st-tag.label.label-purple(
        :title='`在${semester}，您一共修读了 ${majorCourses.length} 门属于主修培养方案的课程，加权平均绩点为 ${getAllCoursesGPA(majorCourses)}`'
      )
        | 全部绩点：{{ getAllCoursesGPA(majorCourses) }}
    |
    |
    span.gpa-st-tag.label.label-light(
      v-if='type !== `compact` && minorCourses.length',
      :title='`在${semester}，您一共修读了 ${minorCourses.length} 门属于辅修培养方案的课程，加权平均分为 ${getAllCoursesScore(minorCourses)}`',
      @click='$emit(`selectMinorCourses`)'
    )
      | 辅修平均分：{{ getAllCoursesScore(minorCourses) }}
    |
    |
    span.gpa-st-tag.label.label-light(
      v-if='type !== `compact` && minorCourses.length',
      :title='`在${semester}，您一共修读了 ${minorCourses.length} 门属于辅修培养方案的课程，加权平均绩点为 ${getAllCoursesGPA(minorCourses)}`',
      @click='$emit(`selectMinorCourses`)'
    )
      | 辅修绩点：{{ getAllCoursesGPA(minorCourses) }}
    |
    |
    span.gpa-st-tag.gpa-st-tag-selected-score.label.label-pink(
      v-if='type !== `compact` && selectedCoursesLength',
      :title='`在${semester}，您当前选出了 ${selectedCoursesLength} 门课程进行计算，选中课程的加权平均分为 ${getSelectedCoursesScore(allCourses)}`'
    )
      | 选中课程平均分：{{ getSelectedCoursesScore(allCourses) }}
    |
    |
    span.gpa-st-tag.gpa-st-tag-selected-gpa.label.label-pink(
      v-if='type !== `compact` && selectedCoursesLength',
      :title='`在${semester}，您当前选出了 ${selectedCoursesLength} 门课程进行计算，选中课程的加权平均绩点为 ${getSelectedCoursesGPA(allCourses)}`'
    )
      | 选中课程绩点：{{ getSelectedCoursesGPA(allCourses) }}
  p(v-if='type === `compact`')
    span.gpa-st-tag.label.label-light(
      v-if='minorCourses.length',
      :title='`在${semester}，您一共修读了 ${minorCourses.length} 门属于辅修培养方案的课程，加权平均分为 ${getAllCoursesScore(minorCourses)}`',
      @click='$emit(`selectMinorCourses`)'
    )
      | 辅修平均分：{{ getAllCoursesScore(minorCourses) }}
    |
    |
    span.gpa-st-tag.label.label-light(
      v-if='minorCourses.length',
      :title='`在${semester}，您一共修读了 ${minorCourses.length} 门属于辅修培养方案的课程，加权平均绩点为 ${getAllCoursesGPA(minorCourses)}`',
      @click='$emit(`selectMinorCourses`)'
    )
      | 辅修绩点：{{ getAllCoursesGPA(minorCourses) }}
    |
    |
    span.gpa-st-tag.gpa-st-tag-selected-score.label.label-pink(
      v-if='selectedCoursesLength',
      :title='`在${semester}，您当前选出了 ${selectedCoursesLength} 门课程进行计算，选中课程的加权平均分为 ${getSelectedCoursesScore(allCourses)}`'
    )
      | 选中课程平均分：{{ getSelectedCoursesScore(allCourses) }}
    |
    |
    span.gpa-st-tag.gpa-st-tag-selected-gpa.label.label-pink(
      v-if='selectedCoursesLength',
      :title='`在${semester}，您当前选出了 ${selectedCoursesLength} 门课程进行计算，选中课程的加权平均绩点为 ${getSelectedCoursesGPA(allCourses)}`'
    )
      | 选中课程绩点：{{ getSelectedCoursesGPA(allCourses) }}
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
  removeMinorCourses,
  reserveHigherCoursesForRetakenCourses,
  reserveMinorCourses
} from '@/plugins/score/utils'

@Component
export default class LabelBar extends Vue {
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

  get allCourses(): CourseScoreRecord[] {
    return reserveHigherCoursesForRetakenCourses(this.courses)
  }

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

  get compulsoryCourses(): CourseScoreRecord[] {
    return getCompulsoryCourses(this.majorCourses)
  }

  getCompulsoryCoursesGPA(arr: CourseScoreRecord[]): number {
    return getCompulsoryCoursesGPA(arr)
  }

  getCompulsoryCoursesScore(arr: CourseScoreRecord[]): number {
    return getCompulsoryCoursesScore(arr)
  }

  getSelectedCoursesGPA(arr: CourseScoreRecord[]): number {
    return getSelectedCoursesGPA(arr)
  }

  getSelectedCoursesScore(arr: CourseScoreRecord[]): number {
    return getSelectedCoursesScore(arr)
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
</style>
