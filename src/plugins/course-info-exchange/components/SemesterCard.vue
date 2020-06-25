<template lang="pug">
.semester-courses-card
  .card-header
    h4(style='margin-top: 20px; padding-bottom: 15px; border-bottom: 1px solid #dcdfe6;')
      i.el-icon-date
      |
      |
      span {{ semester }}
  .card-body
    CourseCard(v-for='(v, i) in courses' :key='i' :course='v')
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { SemesterScoreRecord } from '@/plugins/score/types'
import CourseCard from './CourseCard.vue'

@Component({
  components: { CourseCard }
})
export default class SemesterCard extends Vue {
  @Prop({
    type: String,
    required: true
  })
  semester!: string

  @Prop({
    type: Array,
    required: true
  })
  courses!: SemesterScoreRecord[]
}
</script>

<style lang="scss" scoped>
.semester-courses-card {
  margin-bottom: 20px;

  .card-header {
  }

  .card-body {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
