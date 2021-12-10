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
      //- th.center(v-if='type !== `compact`') 任课教师
      //- th.center(v-if='type !== `compact`') 未通过原因
      th.center(v-if='type !== `compact` && isSubitemScorePluginEnabled') 分项成绩
  tbody#scoretbody
    tr.gpa-st-item(
      v-for='(courseItem, courseIndex) in courses',
      :key='courseIndex',
      :class='{ selected: courseItem.selected, minor: courseItem.coursePropertyName === `辅修` }',
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
        :class='[type === `full` ? (courseItem.courseScore >= courseItem.avgScore ? `greater-than-avg` : `less-than-avg`) : ``]'
      ) {{ isNil(courseItem.courseScore) ? "/" : courseItem.courseScore }}
        |
        |
        el-tooltip(
          v-if='isNilOrNegative(courseItem.courseScore)',
          placement='top'
        )
          div(slot='content')
            p(style='line-height: 1.5'): strong
              i.fa.fa-info-circle(aria-hidden='true')
              |
              | &nbsp;课程「{{ courseItem.courseName }}」的成绩无法正常显示
            p 如果您还没有评教，请及时评教哦~如果不完成评教，是无法查看对应课程的成绩的。
          i.fa.fa-question-circle(aria-hidden='true')
      td.center {{ courseItem.levelName }}
      td.center {{ courseItem.gradePoint }}
      td.center(v-if='type === `full`') {{ courseItem.rank }}
      td.center(v-if='type !== `compact`') {{ courseItem.examTime }}
      //- td.center(v-if='type !== `compact`') {{ courseItem.courseTeacherList[0].teacherName}}{{ courseItem.courseTeacherList.filter(({ teacherNumber }) => Num(teacherNumber).toString() === teacherNumber).length > 1 ? ' 等' : ''}}
      //- td.center(v-if='type !== `compact`') {{ courseItem.unpassedReasonExplain }}
      td.center(v-if='type !== `compact` && isSubitemScorePluginEnabled')
        button.btn.btn-info.btn-xs.btn-round(
          @click.stop='querySubitemScore(courseItem)'
        )
          i.ace-con.fa.fa-search.white
          |
          | 尝试查询
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CourseScoreRecord } from '@/plugins/score/types'
import { router } from '@/core/router'
import { requestSubitemScoreLook } from '@/store/actions/request'
import { messageError } from '@/helper/util'
import { isPluginEnabled } from '@/plugins'
import { SubitemScore } from '@/plugins/subitem-score'
import { isNil } from 'ramda'

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

  isNil = isNil

  get isSubitemScorePluginEnabled(): boolean {
    return isPluginEnabled(SubitemScore.name)
  }

  isNilOrNegative(score: number | undefined): boolean {
    return isNil(score) || score < 0
  }

  /**
   * 当「尝试查询分项成绩」按钮被点击时，做出相应的反应
   */
  async querySubitemScore({
    executiveEducationPlanNumber,
    courseName,
    courseNumber,
    courseSequenceNumber,
    examTime,
    coursePropertyCode,
    courseScore
  }: CourseScoreRecord): Promise<void> {
    const { scoreDetailList } = await requestSubitemScoreLook(
      executiveEducationPlanNumber,
      courseNumber,
      courseSequenceNumber,
      examTime
    )

    if (scoreDetailList.length > 0) {
      router.push('advanced_query/subitem_score', {
        params: {
          executiveEducationPlanNumber,
          courseName,
          courseNumber,
          courseSequenceNumber,
          examTime,
          coursePropertyCode,
          courseScore
        }
      })
    } else {
      messageError(
        `抱歉，由于种种原因，没有查询到课程「${courseName}（${courseNumber}-${courseSequenceNumber}）」的分项成绩记录`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
table.gpa-st-table {
  tr.gpa-st-item {
    cursor: pointer;

    &.minor {
      opacity: 0.6;
    }

    > td {
      transition: 0.1s;
      vertical-align: middle;

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
