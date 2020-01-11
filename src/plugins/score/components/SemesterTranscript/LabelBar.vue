<template lang="pug">
div
  p
    div(style='display: inline-block;')
      span.gpa-st-tag.label.label-success(
        :title='`在${semester}，您一共修读了 ${compulsoryCourses.length} 门必修课程，必修加权平均分为 ${getCompulsoryCoursesScore(courses)}`'
        @click='$emit(`selectCompulsoryCourses`)'
      )
        | 必修平均分：{{ getCompulsoryCoursesScore(courses) }}
      |
      |
      span.gpa-st-tag.label.label-success(
        :title='`在${semester}，您一共修读了 ${compulsoryCourses.length} 门必修课程，必修加权平均绩点为 ${getCompulsoryCoursesGPA(courses)}`'
        @click='$emit(`selectCompulsoryCourses`)'
      )
        | 必修绩点：{{ getCompulsoryCoursesGPA(courses) }}
      |
      |
      span.gpa-st-tag.label.label-purple(
        :title='`在${semester}，您一共修读了 ${courses.length} 门课程，加权平均分为 ${getAllCoursesScore(courses)}`'
      )
        | 全部平均分：{{ getAllCoursesScore(courses) }}
      |
      |
      span.gpa-st-tag.label.label-purple(
        :title='`在${semester}，您一共修读了 ${courses.length} 门课程，加权平均绩点为 ${getAllCoursesGPA(courses)}`'
      )
        | 全部绩点：{{ getAllCoursesGPA(courses) }}
    |
    |
    span.gpa-st-tag.gpa-st-tag-selected-score.label.label-pink(
      v-if='type !== `compact` && selectedCourses.length'
      :title='`在${semester}，您当前选出了 ${selectedCourses.length} 门课程进行计算，选中课程的加权平均分为 ${getSelectedCoursesScore(courses)}`'
    )
      | 选中课程平均分：{{ getSelectedCoursesScore(courses) }}
    |
    |
    span.gpa-st-tag.gpa-st-tag-selected-gpa.label.label-pink(
      v-if='type !== `compact` && selectedCourses.length'
      :title='`在${semester}，您当前选出了 ${selectedCourses.length} 门课程进行计算，选中课程的加权平均绩点为 ${getSelectedCoursesGPA(courses)}`'
    )
      | 选中课程绩点：{{ getSelectedCoursesGPA(courses) }}
  p(v-if='type === `compact`')
    span.gpa-st-tag.gpa-st-tag-selected-score.label.label-pink(
      v-if='selectedCourses.length'
      :title='`在${semester}，您当前选出了 ${selectedCourses.length} 门课程进行计算，选中课程的加权平均分为 ${getSelectedCoursesScore(courses)}`'
    )
      | 选中课程平均分：{{ getSelectedCoursesScore(courses) }}
    |
    |
    span.gpa-st-tag.gpa-st-tag-selected-gpa.label.label-pink(
      v-if='selectedCourses.length'
      :title='`在${semester}，您当前选出了 ${selectedCourses.length} 门课程进行计算，选中课程的加权平均绩点为 ${getSelectedCoursesGPA(courses)}`'
    )
      | 选中课程绩点：{{ getSelectedCoursesGPA(courses) }}
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
  getSelectedCoursesGPA
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

  get compulsoryCourses(): CourseScoreRecord[] {
    return getCompulsoryCourses(this.courses)
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
