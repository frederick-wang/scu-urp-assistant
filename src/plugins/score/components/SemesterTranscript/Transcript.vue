<template lang="pug">
table.gpa-st-table.table.table-striped.table-bordered.table-hover
  thead
    tr
      th 课程名
      th(v-if='type !== `compact`') 课程号
      th.center(v-if='type !== `compact`') 课序号
      th.center 学分
      th.center 属性
      th.center(v-if='type === `full`') 最高分
      th.center(v-if='type === `full`') 平均分
      th.center(v-if='type === `full`') 最低分
      th.center 分数
      th.center 等级
      th.center 绩点
      th.center(v-if='type === `full`') 名次
      th.center(v-if='type !== `compact`') 考试时间
      th.center(v-if='type !== `compact`') 任课教师
      th.center(v-if='type !== `compact`') 未通过原因
  tbody#scoretbody
    tr.gpa-st-item(
      v-for='(courseItem, courseIndex) in courses' :key='courseIndex'
      :class='{ selected: courseItem.selected }'
      @click='$emit(`toggleCourseStatus`, courseItem)'
    )
      td(:class='{ bold: type !== `compact` }') {{ courseItem.courseName }}
      td(v-if='type !== `compact`') {{ courseItem.courseNumber }}
      td.center(v-if='type !== `compact`') {{ courseItem.courseSequenceNumber }}
      td.center {{ courseItem.credit }}
      td.center {{ courseItem.coursePropertyName }}
      td.center(v-if='type === `full`') {{ courseItem.maxScore }}
      td.center(v-if='type === `full`') {{ courseItem.avgScore }}
      td.center(v-if='type === `full`') {{ courseItem.minScore }}
      td.center(
        :class='[type === `full` ? (courseItem.courseScore > courseItem.avgScore ? `greater-than-avg` : `less-than-avg`) : ``]'
      ) {{ courseItem.courseScore }}
      td.center {{ courseItem.levelName }}
      td.center {{ courseItem.gradePoint }}
      td.center(v-if='type === `full`') {{ courseItem.rank}}
      td.center(v-if='type !== `compact`') {{ courseItem.examTime }}
      td.center(v-if='type !== `compact`') {{ courseItem.courseTeacherList[0].teacherName}}{{ courseItem.courseTeacherList.filter(({ teacherNumber }) => Number(teacherNumber).toString() === teacherNumber).length > 1 ? ' 等' : ''}}
      td.center(v-if='type !== `compact`') {{ courseItem.unpassedReasonExplain }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CourseScoreRecord } from '@/plugins/score/types'

@Component
export default class Transcript extends Vue {
  @Prop({
    type: String,
    required: true
  })
  type!: string
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
    cursor: pointer;

    > td {
      transition: 0.1s;

      &.bold {
        font-weight: bold;
      }
    }

    > td,
    &.selected > td,
    &:active > td {
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

    &.selected {
      & > td {
        color: #409eff;
        background-color: #ecf5ff;
      }
      &:hover > td {
        background: #409eff;
        border-color: #409eff;
        color: #fff;
      }
    }
    &:active > td {
      background-color: #3a8ee6 !important;
      color: #fff;
      outline: none;
    }
  }
}
</style>
