<template lang="pug">
.sua-container-feedback.typo
  h2 打赏作者
  p.indent 自2018年5月20日以来，SCU URP 助手已经更新了 92 个版本，编写了近万行代码。在这两年的时间中，作者不断地跟进综合教务系统的升级与变化，保证旧的功能稳定可用；同时也不断地听取同学们的反馈，持续地为助手加入新的有用的功能，从未停止过前进的步伐。
  p.indent 如果您使用过 SCU URP 助手后觉得很好用，确实帮助到了您，可以考虑请作者喝一杯咖啡或者吃一碗泡面哦。
  p.indent 非常感谢您的打赏，SCU URP 助手会因您的帮助而越变越好！作者也会在每个吃泡面的凌晨想起您的！
  p.indent
    img(src='https://typora-images.cdn.zhaoji.wang/1590444582.jpg' height='360' style='margin-right: 50px;')
    img(src='https://typora-images.cdn.zhaoji.wang/mm_facetoface_collect_qrcode_1590444571616.png' height='360')
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Feedback extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/plugins/beautify/typo.scss';

p.indent {
  text-indent: 2em;
}
</style>
