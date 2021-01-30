<template lang="pug">
.sua-container-expected-grades-estimation
  Loading(v-if='!loadingIsDone')
  el-alert(
    v-if='loadingIsDone',
    v-for='(v, i) in alerts',
    :key='i',
    :title='v.title',
    :type='v.type',
    :closable='v.closable',
    :close-text='v.closeText'
  )
  .row(v-if='loadingIsDone && hasNoError')
    .col-sm-12
      h4.header.smaller.lighter.grey
        i.menu-icon.fa.fa-calendar
        |
        | 预期成绩估计
        |
      p
        | 截至目前，在
        |
        strong {{ records.length }}
        |
        | 个学期中，您一共修读了
        |
        strong {{ allCourses.length }}
        |
        | 门课程（共
        |
        strong {{ allCoursesCredits }}
        |
        | 学分），其中必修课程有
        |
        strong {{ compulsoryCourses.length }}
        |
        | 门（共
        |
        strong {{ compulsoryCoursesCredits }}
        |
        | 学分）。
      p 您当前的成绩如下：
      FourTypeGradeLabels(
        :isTipsShown='true',
        :compulsoryCoursesScore='getCompulsoryCoursesScore(allCourses)',
        :compulsoryCoursesGPA='getCompulsoryCoursesGPA(allCourses)',
        :allCoursesScore='getAllCoursesScore(allCourses)',
        :allCoursesGPA='getAllCoursesGPA(allCourses)',
        :compulsoryCoursesQuantity='compulsoryCourses.length',
        :allCoursesQuantity='allCourses.length'
      )
      p(style='margin-top: 15px') 如果您再修读：
      .input-line-wrapper
        .input-line-tip(v-if='!newCourses.length')
          el-alert(
            title='提示',
            type='info',
            description='您现在还没有添加预期课程~点击下面按钮新增预期课程，就可以估计预期成绩了！',
            :show-icon='true'
            :closable='false'
          )
        .input-line-list(v-for='(v, i) in newCourses', :key='i')
          p(v-if='v.type === `compulsory`')
            input(type='number', v-model.number='v.compulsoryCredit', min='0')
            |
            | 学分的
            strong(style='color: #82af6f')
              | 【均分为
              |
              input(
                type='number',
                v-model.number='v.compulsoryScore',
                min='0',
                max='100',
                @input='onCompulsoryScoreChange(i)'
              )
              |
              | 、平均绩点为 {{ v.compulsoryGPA }} 的必修课】。
            el-button(
              size='mini',
              type='danger',
              @click='removeNewCourseItem(i)'
            ) 删除
          p(v-if='v.type === `optional`')
            input(type='number', v-model.number='v.optionalCredit', min='0')
            |
            | 学分的
            strong(style='color: #d6487e')
              | 【均分为
              |
              input(
                type='number',
                v-model.number='v.optionalScore',
                min='0',
                max='100',
                @input='onOptionalScoreChange(i)'
              )
              |
              | 、平均绩点为 {{ v.optionalGPA }} 的选修课】。

            el-button(
              size='mini',
              type='danger',
              @click='removeNewCourseItem(i)'
            ) 删除
        .add-new-btn-wrapper
          el-button(
            size='mini',
            type='primary',
            @click='addNewCourseItem(`compulsory`)'
          )
            i.fa.fa-plus-square(aria-hidden='true')
            |
            | 点此新增一门预期必修课
          el-button(
            size='mini',
            type='primary',
            @click='addNewCourseItem(`optional`)'
          )
            i.fa.fa-plus-circle(aria-hidden='true')
            |
            | 点此新增一门预期选修课
      p
        | 您将一共修读共
        |
        strong(style='color: #f56c6c') {{ newAllCoursesCredits }}
        |
        | 学分的课程，其中必修课程共
        |
        strong(style='color: #f56c6c') {{ newCompulsoryCoursesCredits }}
        |
        | 学分。
      p 您的成绩将变为：
      FourTypeGradeLabels(
        :isTipsShown='false',
        :compulsoryCoursesScore='getCompulsoryCoursesScore(newAllCourses)',
        :compulsoryCoursesGPA='getCompulsoryCoursesGPA(newAllCourses)',
        :allCoursesScore='getAllCoursesScore(newAllCourses)',
        :allCoursesGPA='getAllCoursesGPA(newAllCourses)',
        :compulsoryCoursesQuantity='newCompulsoryCourses.length',
        :allCoursesQuantity='newAllCourses.length'
      )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { state } from '@/store'
import { SemesterScoreRecord, CourseScoreRecord } from '@/plugins/score/types'
import Loading from '@/plugins/common/components/Loading.vue'
import FourTypeGradeLabels from './components/ExpectedGradesEstimation/FourTypeGradeLabels.vue'
import { emitDataAnalysisEvent } from '../data-analysis'
import { convertCourseScoreInfoListToScoreRecords } from '@/helper/converter'
import {
  getCompulsoryCoursesGPA,
  getCompulsoryCoursesScore,
  getAllCoursesGPA,
  getAllCoursesScore,
  getCompulsoryCourses,
  getPointByScore
} from '@/plugins/score/utils'
import { pluck, sum } from 'ramda'
import { requestAllTermsCourseScoreInfoList } from '@/store/actions/request'

type NewCourseType = 'compulsory' | 'optional'

class NewCourse {
  public type: NewCourseType
  public compulsoryCredit = 0
  public compulsoryScore = 0
  public compulsoryGPA = 0
  public optionalCredit = 0
  public optionalScore = 0
  public optionalGPA = 0

  constructor(type: NewCourseType) {
    this.type = type
  }
}

@Component({ components: { Loading, FourTypeGradeLabels } })
export default class ExpectedGradeEstimation extends Vue {
  loadingIsDone = false
  records: SemesterScoreRecord[] = []
  alerts: {
    title: string
    type?: 'success' | 'info' | 'warning' | 'error'
    closable?: boolean
    closeText?: string
  }[] = []
  newCourses: NewCourse[] = []

  get newCompulsoryCourseCredit(): number {
    return sum(pluck('compulsoryCredit')(this.newCourses))
  }

  get newCompulsoryCourseScore(): number {
    return (
      this.newCourses.reduce(
        (acc, cur) => acc + cur.compulsoryScore * cur.compulsoryCredit,
        0
      ) / this.newCompulsoryCourseCredit
    )
  }

  get newCompulsoryCourseGPA(): number {
    return (
      this.newCourses.reduce(
        (acc, cur) => acc + cur.compulsoryGPA * cur.compulsoryCredit,
        0
      ) / this.newCompulsoryCourseCredit
    )
  }

  get newOptionalCourseCredit(): number {
    return sum(pluck('optionalCredit')(this.newCourses))
  }

  get newOptionalCourseScore(): number {
    return (
      this.newCourses.reduce(
        (acc, cur) => acc + cur.optionalScore * cur.optionalCredit,
        0
      ) / this.newOptionalCourseCredit
    )
  }

  get newOptionalCourseGPA(): number {
    return (
      this.newCourses.reduce(
        (acc, cur) => acc + cur.optionalGPA * cur.optionalCredit,
        0
      ) / this.newOptionalCourseCredit
    )
  }

  get hasNoError(): boolean {
    return this.alerts.every(v => v.type !== 'error')
  }

  get allCourses(): CourseScoreRecord[] {
    return this.records.reduce(
      (acc, cur) => acc.concat(cur.courses),
      [] as CourseScoreRecord[]
    )
  }

  get compulsoryCourses(): CourseScoreRecord[] {
    return getCompulsoryCourses(this.allCourses)
  }

  get newCompulsoryCourses(): CourseScoreRecord[] {
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
      levelCode: undefined,
      levelName: '',
      inputStatusCode: '',
      inputMethodCode: '',
      coursePropertyCode: '001',
      coursePropertyName: '必修',
      unpassedReasonExplain: '',
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
      levelCode: undefined,
      levelName: '',
      inputStatusCode: '',
      inputMethodCode: '',
      coursePropertyCode: '002',
      coursePropertyName: '选修',
      unpassedReasonExplain: '',
      selected: false
    }
  }

  get newAllCourses(): CourseScoreRecord[] {
    return this.allCourses.concat(
      this.newCompulsoryCourseRecord,
      this.newOptionalCourseRecord
    )
  }

  get allCoursesCredits(): number {
    return this.allCourses.reduce((acc, cur) => acc + cur.credit, 0)
  }

  get newAllCoursesCredits(): number {
    return this.newAllCourses.reduce((acc, cur) => acc + cur.credit, 0)
  }

  get compulsoryCoursesCredits(): number {
    return this.compulsoryCourses.reduce((acc, cur) => acc + cur.credit, 0)
  }

  get newCompulsoryCoursesCredits(): number {
    return this.newCompulsoryCourses.reduce((acc, cur) => acc + cur.credit, 0)
  }

  getCompulsoryCoursesGPA(arr: CourseScoreRecord[]): number {
    return getCompulsoryCoursesGPA(arr)
  }

  getCompulsoryCoursesScore(arr: CourseScoreRecord[]): number {
    return getCompulsoryCoursesScore(arr)
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

  async created(): Promise<void> {
    try {
      const records = await convertCourseScoreInfoListToScoreRecords(
        await requestAllTermsCourseScoreInfoList()
      )
      this.records = records
      this.loadingIsDone = true
      emitDataAnalysisEvent('预期成绩估计', '查询成功')
    } catch (error) {
      const title = '[成绩相关工具] 预期成绩估计'
      const message: string = error.message
      emitDataAnalysisEvent('预期成绩估计', '查询失败')
      this.$notify.error({
        title,
        message
      })
      this.alerts.push({
        title: message,
        type: 'error',
        closable: false
      })
      this.loadingIsDone = true
    }
  }

  addNewCourseItem(type: NewCourseType): void {
    this.newCourses.push(new NewCourse(type))
  }

  removeNewCourseItem(index: number): void {
    this.newCourses.splice(index, 1)
  }

  onCompulsoryScoreChange(index: number): void {
    this.newCourses[index].compulsoryGPA =
      getPointByScore(
        this.newCourses[index].compulsoryScore,
        state.user.semesterNumberList[0]
      ) || 0
  }

  onOptionalScoreChange(index: number): void {
    this.newCourses[index].optionalGPA =
      getPointByScore(
        this.newCourses[index].optionalScore,
        state.user.semesterNumberList[0]
      ) || 0
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

.input-line-wrapper {
  padding: 15px 20px;
  border: 1px dotted #409eff;
  margin-top: 15px;
  margin-bottom: 15px;

  .add-new-btn-wrapper {
    margin-top: 20px;
  }
}
</style>
