<template lang="pug">
.sua-container-scores-information
  Loading(v-if='!loadingIsDone')
  .gpa-st-container.row(v-if='loadingIsDone' v-for='(semesterItem, semesterIndex) in records' :key='semesterIndex')
    SemesterScores(:semester='semesterItem.semester' :courses='semesterItem.courses')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { SemesterScoreRecord } from './types'
import { getScoreRecords } from './utils'
import Loading from './components/Loading.vue'
import SemesterScores from './components/SemesterScores/SemesterScores.vue'
import { state } from '@/store'
import { convertSemesterNameToNumber } from '@/utils'

@Component({
  components: { Loading, SemesterScores }
})
export default class ScoresInformation extends Vue {
  loadingIsDone = false
  records: SemesterScoreRecord[] = []

  async created() {
    try {
      const res = await getScoreRecords()
      for (const s of res) {
        for (const c of s.courses) {
          c.courseTeacherList = state.getData('teacherTable')[
            convertSemesterNameToNumber(s.semester)
          ][c.courseNumber][c.courseSequenceNumber]
        }
      }
      this.records = res
      this.loadingIsDone = true
      window.TDAPP.onEvent('成绩信息查询', '查询成功')
    } catch (error) {
      window.TDAPP.onEvent('成绩信息查询', '数据获取失败')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
