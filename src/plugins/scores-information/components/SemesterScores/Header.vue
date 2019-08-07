<template lang="pug">
h4.header.smaller.lighter.grey
  i.menu-icon.fa.fa-calendar
  |
  | {{ getSemesterTitle(title) }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getCurrentSemesterNumber } from '@/plugins/shared-data'

@Component
export default class Header extends Vue {
  @Prop({
    type: String,
    required: true
  })
  title!: string

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
}
</script>
