<template lang="pug">
p
  span.gpa-st-tag.label.label-success(
    :title='`在${semester}，您一共修读了 ${compulsoryCourses.length} 门必修课程，必修加权平均分为 ${getCompulsoryCoursesScore(courses)}`'
  )
    | 必修平均分：{{ getCompulsoryCoursesScore(courses) }}
  |
  |
  span.gpa-st-tag.label.label-success(
    :title='`在${semester}，您一共修读了 ${compulsoryCourses.length} 门必修课程，必修加权平均绩点为 ${getCompulsoryCoursesGPA(courses)}`'
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
import { CourseScoreRecord } from '@/plugins/scores-information/types'
import {
  getCompulsoryCoursesGPA,
  getCompulsoryCoursesScore,
  getAllCoursesGPA,
  getAllCoursesScore,
  getCompulsoryCourses,
  getSelectedCoursesScore,
  getSelectedCoursesGPA
} from '@/plugins/scores-information/utils'

@Component
export default class LabelBar extends Vue {
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

  get compulsoryCourses() {
    return getCompulsoryCourses(this.courses)
  }

  getCompulsoryCoursesGPA(arr: CourseScoreRecord[]) {
    return getCompulsoryCoursesGPA(arr)
  }

  getCompulsoryCoursesScore(arr: CourseScoreRecord[]) {
    return getCompulsoryCoursesScore(arr)
  }

  getSelectedCoursesGPA(arr: CourseScoreRecord[]) {
    return getSelectedCoursesGPA(arr)
  }

  getSelectedCoursesScore(arr: CourseScoreRecord[]) {
    return getSelectedCoursesScore(arr)
  }

  getAllCoursesGPA(arr: CourseScoreRecord[]) {
    return getAllCoursesGPA(arr)
  }

  getAllCoursesScore(arr: CourseScoreRecord[]) {
    return getAllCoursesScore(arr)
  }

  getCompulsoryCourses(arr: CourseScoreRecord[]) {
    return getCompulsoryCourses(arr)
  }
}
</script>

<style lang="scss" scoped>
.gpa-st-tag-selected-score,
.gpa-st-tag-selected-gpa,
.gpa-tt-tag-selected-score,
.gpa-tt-tag-selected-gpa {
  display: inline;
}
</style>
