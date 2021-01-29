<template lang="pug">
.sua-container-tip
  p {{ tip }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Tip extends Vue {
  @Prop({
    type: String,
    required: true
  })
  tip!: string
}
</script>

<style lang="scss" scoped>
</style>
