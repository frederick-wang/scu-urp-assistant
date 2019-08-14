<template lang="pug">
.sua-container-feedback.typo
  h2 咨询与反馈
  p.indent 您可以加入 SCU JavaScript 开发者协会的 QQ 群，咨询问题，反馈意见：
    a(target='_blank', href='//shang.qq.com/wpa/qunwpa?idkey=04a9cff391a71763d9e5eff3b99204f220b31655c33051eb2ad66b96cdae92a7')
      img(border='0', src='//pub.idqqimg.com/wpa/images/group.png', alt='SCU JavaScript开发者协会', title='SCU JavaScript开发者协会')
  p.indent: img(src='https://zhaoji.wang/wp-content/uploads/2019/08/temp_qrcode_share_703723241.png' height='300')
  p.indent 您也可以直接给我发送邮件：
    a(href="mailto:zhaoji.wang@scujs.net", title="王兆基的邮箱") zhaoji.wang@scujs.net
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Feedback extends Vue {}
</script>

<style lang="scss" scoped>
p.indent {
  text-indent: 2em;
}
</style>
