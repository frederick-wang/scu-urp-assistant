<template lang="pug">
.sua-container-scores-information
  Loading(v-if='!loadingIsDone')
  .gpa-st-container.row(v-if='loadingIsDone' v-for='(semesterItem, semesterIndex) in records' :key='semesterIndex')
    .gpa-st.col-xs-12.self-margin
      h4.header.smaller.lighter.grey
        i.menu-icon.fa.fa-calendar
        |
        | {{ getSemesterTitle(semesterItem.semester) }}
      p
        span.gpa-st-tag.label.label-success(
          :title='`在${semesterItem.semester}，您一共修读了 ${getCompulsoryCourse(semesterItem.courses).length} 门必修课程，必修加权平均分为 ${getCompulsoryCoursesScore(semesterItem.courses)}`'
        )
          | 必修平均分：{{ getCompulsoryCoursesScore(semesterItem.courses) }}
        |
        |
        span.gpa-st-tag.label.label-success(
          :title='`在${semesterItem.semester}，您一共修读了 ${getCompulsoryCourse(semesterItem.courses).length} 门必修课程，必修加权平均绩点为 ${getCompulsoryCoursesGPA(semesterItem.courses)}`'
        )
          | 必修绩点：{{ getCompulsoryCoursesGPA(semesterItem.courses) }}
        |
        |
        span.gpa-st-tag.label.label-purple(
          :title='`在${semesterItem.semester}，您一共修读了 ${semesterItem.courses.length} 门课程，加权平均分为 ${getAllCoursesScore(semesterItem.courses)}`'
        )
          | 全部平均分：{{ getAllCoursesScore(semesterItem.courses) }}
        |
        |
        span.gpa-st-tag.label.label-purple(
          :title='`在${semesterItem.semester}，您一共修读了 ${semesterItem.courses.length} 门课程，加权平均绩点为 ${getAllCoursesGPA(semesterItem.courses)}`'
        )
          | 全部绩点：{{ getAllCoursesGPA(semesterItem.courses) }}
        |
        |
        span.gpa-st-tag.gpa-st-tag-selected-score.label.label-pink(
          v-if='getSelectedCourse(semesterItem.courses).length'
          :title='`在${semesterItem.semester}，您当前选出了 ${getSelectedCourse(semesterItem.courses).length} 门课程进行计算，选中课程的加权平均分为 ${getSelectedCoursesScore(semesterItem.courses)}`'
        )
          | 选中课程平均分：{{ getSelectedCoursesScore(semesterItem.courses) }}
        |
        |
        span.gpa-st-tag.gpa-st-tag-selected-gpa.label.label-pink(
          v-if='getSelectedCourse(semesterItem.courses).length'
          :title='`在${semesterItem.semester}，您当前选出了 ${getSelectedCourse(semesterItem.courses).length} 门课程进行计算，选中课程的加权平均绩点为 ${getSelectedCoursesGPA(semesterItem.courses)}`'
        )
          | 选中课程绩点：{{ getSelectedCoursesGPA(semesterItem.courses) }}
        button.btn.btn-white.btn-minier.gpa-st-select-all-btn(
          v-if='!getSelectedCourse(semesterItem.courses).length'
          @click='selectAllCourses(semesterItem.courses)'
        )
          i.ace-icon.fa.fa-check.green
          | 全选
        button.btn.btn-white.btn-minier.gpa-st-cancel-btn(
          v-else
          @click='unselectAllCourses(semesterItem.courses)'
        )
          i.ace-icon.fa.fa-times.red2
          | 全不选
      p
        span.greater-than-avg 绿色
        |
        | 代表您的成绩高于或等于课程平均分，
        span.less-than-avg 红色
        |
        | 代表您的成绩低于课程平均分
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
            th.center 未通过原因
        tbody#scoretbody
          tr.gpa-st-item(
            v-for='(courseItem, courseIndex) in semesterItem.courses' :key='`${courseItem.courseNumber}-${courseItem.courseSequenceNumber}`'
            :class='{ selected: courseItem.selected }'
            @click='selectCourse(courseItem)'
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
            td.center {{ courseItem.examtime }}
            td.center {{ courseItem.unpassedReasonExplain }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { CourseScoreRecord, SemesterScoreRecord } from './types'
import {
  getScoreRecords,
  getCompulsoryCoursesGPA,
  getCompulsoryCoursesScore,
  getAllCoursesGPA,
  getAllCoursesScore,
  getCompulsoryCourse,
  getSelectedCourse,
  getSelectedCoursesScore,
  getSelectedCoursesGPA
} from './utils'
import { getCurrentSemesterNumber } from '@/plugins/shared-data'
import Loading from './Loading.vue'

@Component({
  components: { Loading }
})
export default class MyComponent extends Vue {
  loadingIsDone = false
  records: SemesterScoreRecord[] = []

  getSemesterTitle(semesterText: string) {
    const currentSemesterNumber = getCurrentSemesterNumber()
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

  /**
   * 当「课程块」被点击时，做出相应的反应
   */
  selectCourse(item: CourseScoreRecord) {
    if (!this.records) {
      return
    }
    item.selected = !item.selected
  }

  selectAllCourses(courses: CourseScoreRecord[]) {
    courses.forEach(v => (v.selected = true))
  }

  unselectAllCourses(courses: CourseScoreRecord[]) {
    courses.forEach(v => (v.selected = false))
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

  getCompulsoryCourse(arr: CourseScoreRecord[]) {
    return getCompulsoryCourse(arr)
  }

  getSelectedCourse(arr: CourseScoreRecord[]) {
    return getSelectedCourse(arr)
  }

  async created() {
    this.records = await getScoreRecords()
    this.loadingIsDone = true
  }
}
</script>

<style lang="scss" scoped>
.sua-container-scores-information {
  @import './../gpa/index.scss';

  .gpa-st-container {
    .gpa-st {
      width: 100%;
    }
  }

  .gpa-st-tag-selected-score,
  .gpa-st-tag-selected-gpa,
  .gpa-tt-tag-selected-score,
  .gpa-tt-tag-selected-gpa {
    display: inline;
  }

  .gpa-st-cancel-btn,
  .gpa-tt-cancel-btn {
    display: block;
    position: relative;
    top: 2.5px;
    float: right;
  }

  span,
  td {
    &.greater-than-avg {
      color: #67c23a !important;
    }

    &.less-than-avg {
      color: #f56c6c !important;
    }
  }

  .gpa-st-item {
    &,
    &.selected {
      > td {
        &.greater-than-avg {
          background-color: #e1f3d8 !important;
        }
        &.less-than-avg {
          background-color: #fde2e2 !important;
        }
      }
    }
  }

  table {
    td {
      &:first-child {
        font-weight: bold;
      }
    }
  }
}
</style>
