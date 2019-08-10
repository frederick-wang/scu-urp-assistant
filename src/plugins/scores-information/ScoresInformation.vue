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
import { action, Request } from '@/utils/api'
import { convertSemesterNameToNumber } from '@/utils'

@Component({
  components: { Loading, SemesterScores }
})
export default class ScoresInformation extends Vue {
  loadingIsDone = false
  records: SemesterScoreRecord[] = []

  async created() {
    const res = await getScoreRecords()
    for (const s of res) {
      for (const c of s.courses) {
        c.courseTeacherList = await action[Request.COURSE_TEACHER_LIST](
          convertSemesterNameToNumber(s.semester),
          c.courseNumber,
          c.courseSequenceNumber
        )
      }
    }
    this.records = res
    this.loadingIsDone = true
  }
}
</script>

<style lang="scss" scoped>
</style>
