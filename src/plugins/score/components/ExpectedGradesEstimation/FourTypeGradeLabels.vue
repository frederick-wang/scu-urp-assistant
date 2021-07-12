<template lang="pug">
.four-type-grade-labels
  span.gpa-st-tag.label.label-success(
    :title='isTipsShown ? `您一共修读了 ${compulsoryCoursesQuantity} 门属于主修培养方案的必修课程，必修加权平均分为 ${compulsoryCoursesScore}` : null'
  )
    | 必修平均分：{{ compulsoryCoursesScore }}
  |
  |
  span.gpa-st-tag.label.label-success(
    :title='isTipsShown ? `您一共修读了 ${compulsoryCoursesQuantity} 门属于主修培养方案的必修课程，必修加权平均绩点为 ${compulsoryCoursesGPA}` : null'
  )
    | 必修绩点：{{ compulsoryCoursesGPA }}
  |
  |
  span.gpa-st-tag.label.label-purple(
    :title='isTipsShown ? `您一共修读了 ${allCoursesQuantity} 门属于主修培养方案的课程，加权平均分为 ${allCoursesScore}` : null'
  )
    | 全部平均分：{{ allCoursesScore }}
  |
  |
  span.gpa-st-tag.label.label-purple(
    :title='isTipsShown ? `您一共修读了 ${allCoursesQuantity} 门属于主修培养方案的课程，加权平均绩点为 ${allCoursesGPA}` : null'
  )
    | 全部绩点：{{ allCoursesGPA }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class FourTypeGradeLabels extends Vue {
  @Prop({
    type: Boolean,
    required: true
  })
  isTipsShown!: boolean
  @Prop({
    type: Number,
    required: true
  })
  compulsoryCoursesGPA!: number
  @Prop({
    type: Number,
    required: true
  })
  compulsoryCoursesScore!: number
  @Prop({
    type: Number,
    required: true
  })
  allCoursesGPA!: number
  @Prop({
    type: Number,
    required: true
  })
  allCoursesScore!: number
  @Prop({
    type: Number,
    required: true
  })
  compulsoryCoursesQuantity!: number
  @Prop({
    type: Number,
    required: true
  })
  allCoursesQuantity!: number
}
</script>

<style lang="scss" scoped>
.four-type-grade-labels {
  display: inline-block;
}
</style>
