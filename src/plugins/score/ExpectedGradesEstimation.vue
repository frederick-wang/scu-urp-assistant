<template lang="pug">
.sua-container-expected-grades-estimation
  Loading(v-if='!loadingIsDone')
  .row(v-if='loadingIsDone')
    .col-sm-12
      h4.header.smaller.lighter.grey
        i.menu-icon.fa.fa-calendar
        |
        | 预期成绩估计
        |
      p
        | 截至目前，在
        |
        strong {{records.length}}
        |
        | 个学期中，您一共修读了
        |
        strong {{allCourses.length}}
        |
        | 门课程（共
        |
        strong {{allCoursesCredits}}
        |
        | 学分），其中必修课程有
        |
        strong {{compulsoryCourses.length}}
        |
        | 门（共
        |
        strong {{compulsoryCoursesCredits}}
        |
        | 学分）。
      p 您当前的成绩如下：
      FourTypeGradeLabels(
        :isTipsShown='true'
        :compulsoryCoursesScore='getCompulsoryCoursesScore(allCourses)'
        :compulsoryCoursesGPA='getCompulsoryCoursesGPA(allCourses)'
        :allCoursesScore='getAllCoursesScore(allCourses)'
        :allCoursesGPA='getAllCoursesGPA(allCourses)'
        :compulsoryCoursesQuantity='compulsoryCourses.length'
        :allCoursesQuantity='allCourses.length'
      )
      p(style="margin-top: 15px;")
        | 如果您再修读
        |
        input(type='number' v-model.number='newCompulsoryCourseCredit' min='0')
        |
        | 学分的
        strong(style='color: #82af6f;')
          | 【均分为
          |
          input(type='number' v-model.number='newCompulsoryCourseScore' min='0')
          |
          | 、平均绩点为
          |
          input(type='number' v-model.number='newCompulsoryCourseGPA' min='0')
          |
          | 的必修课】
        | ，
        |
        input(type='number' v-model.number='newOptionalCourseCredit' min='0')
        |
        | 学分的
        strong(style='color: #d6487e;')
          | 【均分为
          |
          input(type='number' v-model.number='newOptionalCourseScore' min='0')
          |
          | 、平均绩点为
          |
          input(type='number' v-model.number='newOptionalCourseGPA' min='0')
          |
          | 的选修课】
        | 。
      p
        | 您将一共修读共
        |
        strong(style='color: #f56c6c;') {{newAllCoursesCredits}}
        |
        | 学分的课程，其中必修课程共
        |
        strong(style='color: #f56c6c;') {{newCompulsoryCoursesCredits}}
        |
        | 学分。
      p 您的成绩将变为：
      FourTypeGradeLabels(
        :isTipsShown='false'
        :compulsoryCoursesScore='getCompulsoryCoursesScore(newAllCourses)'
        :compulsoryCoursesGPA='getCompulsoryCoursesGPA(newAllCourses)'
        :allCoursesScore='getAllCoursesScore(newAllCourses)'
        :allCoursesGPA='getAllCoursesGPA(newAllCourses)'
        :compulsoryCoursesQuantity='newCompulsoryCourses.length'
        :allCoursesQuantity='newAllCourses.length'
      )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { actions, Request } from '@/store'
import { SemesterScoreRecord, CourseScoreRecord } from '@/plugins/score/types'
import Loading from '@/plugins/common/components/Loading.vue'
import FourTypeGradeLabels from './components/ExpectedGradesEstimation/FourTypeGradeLabels.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { convertCourseScoreInfoListToScoreRecords } from '@/utils'
import {
  getCompulsoryCoursesGPA,
  getCompulsoryCoursesScore,
  getAllCoursesGPA,
  getAllCoursesScore,
  getCompulsoryCourses
} from '@/plugins/score/utils'

@Component({ components: { Loading, FourTypeGradeLabels } })
export default class ExpectedGradeEstimation extends Vue {
  loadingIsDone = false
  records: SemesterScoreRecord[] = []
  newCompulsoryCourseCredit: number = 0
  newCompulsoryCourseScore: number = 0
  newCompulsoryCourseGPA: number = 0
  newOptionalCourseCredit: number = 0
  newOptionalCourseScore: number = 0
  newOptionalCourseGPA: number = 0

  get allCourses() {
    return this.records.reduce(
      (acc, cur) => acc.concat(cur.courses),
      [] as CourseScoreRecord[]
    )
  }

  get compulsoryCourses() {
    return getCompulsoryCourses(this.allCourses)
  }

  get newCompulsoryCourses() {
    return getCompulsoryCourses(this.newAllCourses)
  }

  get newCompulsoryCourseRecord(): CourseScoreRecord {
    return {
      courseName: '',
      englishCourseName: '',
      courseNumber: '',
      executiveEducationPlanNumber: '',
      executiveEducationPlanName: '',
      credit: this.newCompulsoryCourseCredit,
      examTime: '',
      examTypeName: '',
      studyHour: 0,
      courseSequenceNumber: '',
      courseScore: this.newCompulsoryCourseScore,
      gradePoint: this.newCompulsoryCourseGPA,
      levelCode: '',
      levelName: '',
      inputStatusCode: '',
      inputMethodCode: '',
      coursePropertyCode: '001',
      coursePropertyName: '必修',
      unpassedReasonExplain: '',
      courseTeacherList: [],
      selected: false
    }
  }

  get newOptionalCourseRecord(): CourseScoreRecord {
    return {
      courseName: '',
      englishCourseName: '',
      courseNumber: '',
      executiveEducationPlanNumber: '',
      executiveEducationPlanName: '',
      credit: this.newOptionalCourseCredit,
      examTime: '',
      examTypeName: '',
      studyHour: 0,
      courseSequenceNumber: '',
      courseScore: this.newOptionalCourseScore,
      gradePoint: this.newOptionalCourseGPA,
      levelCode: '',
      levelName: '',
      inputStatusCode: '',
      inputMethodCode: '',
      coursePropertyCode: '002',
      coursePropertyName: '选修',
      unpassedReasonExplain: '',
      courseTeacherList: [],
      selected: false
    }
  }

  get newAllCourses() {
    return this.allCourses.concat(
      this.newCompulsoryCourseRecord,
      this.newOptionalCourseRecord
    )
  }

  get allCoursesCredits() {
    return this.allCourses.reduce((acc, cur) => acc + cur.credit, 0)
  }

  get newAllCoursesCredits() {
    return this.newAllCourses.reduce((acc, cur) => acc + cur.credit, 0)
  }

  get compulsoryCoursesCredits() {
    return this.compulsoryCourses.reduce((acc, cur) => acc + cur.credit, 0)
  }

  get newCompulsoryCoursesCredits() {
    return this.newCompulsoryCourses.reduce((acc, cur) => acc + cur.credit, 0)
  }

  getCompulsoryCoursesGPA(arr: CourseScoreRecord[]) {
    return getCompulsoryCoursesGPA(arr)
  }

  getCompulsoryCoursesScore(arr: CourseScoreRecord[]) {
    return getCompulsoryCoursesScore(arr)
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

  async created() {
    try {
      const records = await convertCourseScoreInfoListToScoreRecords(
        await actions[Request.ALL_TERMS_COURSE_SCORE_INFO_LIST]()
      )
      this.records = records
      this.loadingIsDone = true
      emitDataAnalysisEvent('预期成绩估计', '查询成功')
    } catch (error) {
      emitDataAnalysisEvent('预期成绩估计', '查询失败')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin-top: 0;
}

input {
  width: 4em;
  height: 2em;
  line-height: 2em;
}
</style>
