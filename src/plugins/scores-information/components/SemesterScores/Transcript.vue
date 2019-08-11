<template lang="pug">
table.gpa-st-table.table.table-striped.table-bordered.table-hover
  thead
    tr
      th 课程名
      th 课程号
      th.center 课序号
      th.center 学分
      th.center 属性
      th.center 最高分
      th.center 平均分
      th.center 最低分
      th.center 分数
      th.center 等级
      th.center 绩点
      th.center 名次
      th.center 考试时间
      th.center 任课教师
      th.center 未通过原因
  tbody#scoretbody
    tr.gpa-st-item(
      v-for='(courseItem, courseIndex) in courses' :key='`${courseItem.courseNumber}-${courseItem.courseSequenceNumber}`'
      :class='{ selected: courseItem.selected }'
      @click='$emit(`toggleCourseStatus`, courseItem)'
    )
      td {{ courseItem.courseName }}
      td {{ courseItem.courseNumber }}
      td.center {{ courseItem.courseSequenceNumber }}
      td.center {{ courseItem.credit }}
      td.center {{ courseItem.coursePropertyName }}
      td.center {{ courseItem.maxScore }}
      td.center {{ courseItem.avgScore }}
      td.center {{ courseItem.minScore }}
      td.center(:class='[courseItem.courseScore > courseItem.avgScore ? `greater-than-avg` : `less-than-avg`]') {{ courseItem.courseScore }}
      td.center {{ courseItem.levelName }}
      td.center {{ courseItem.gradePoint }}
      td.center {{ courseItem.rank}}
      td.center {{ courseItem.examTime }}
      td.center {{ courseItem.courseTeacherList[0].teacherName}}{{ courseItem.courseTeacherList.filter(({ teacherNumber }) => Number(teacherNumber).toString() === teacherNumber).length > 1 ? ' 等' : ''}}
      td.center {{ courseItem.unpassedReasonExplain }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CourseScoreRecord } from '@/plugins/scores-information/types'

@Component
export default class Transcript extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  courses!: CourseScoreRecord[]
}
</script>

<style lang="scss" scoped>
table.gpa-st-table {
  tr.gpa-st-item {
    &,
    &.selected {
      > td {
        &:first-child {
          font-weight: bold;
        }
        &.greater-than-avg {
          color: #67c23a !important;
        }

        &.less-than-avg {
          color: #f56c6c !important;
        }
        &.greater-than-avg {
          background-color: #e1f3d8 !important;
        }
        &.less-than-avg {
          background-color: #fde2e2 !important;
        }
      }
    }
  }
}
</style>
