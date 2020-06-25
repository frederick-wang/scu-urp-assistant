<template lang="pug">
.stamp
  img.stamp-img(:src='url')
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

const getStampUrl = (name: string) =>
  `https://gitee.com/frederick-wang/scu-urp-assistant/raw/master/src/plugins/course-info-exchange/assets/${name}.png`

@Component
export default class Stamp extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  rating!: number

  get url(): string {
    if (this.rating >= 5) {
      return getStampUrl('best-stamp')
    } else if (this.rating >= 4) {
      return getStampUrl('good-stamp')
    } else if (this.rating >= 2.5) {
      return getStampUrl('general-stamp')
    } else {
      return getStampUrl('bad-stamp')
    }
  }
}
</script>

<style lang="scss" scoped>
.stamp {
  position: absolute;
  top: 30px;
  right: 30px;
  width: percentage(1/3);

  .stamp-img {
    width: 100%;
    transform: rotate(-20deg);
  }
}
</style>
