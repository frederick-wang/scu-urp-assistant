<template lang="pug">
.loading
  .lds-dual-ring
  .lds-title ( º﹃º ) 兆基祈祷中……
</template>

<style lang="scss" scoped>
.loading {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .lds-dual-ring {
    display: inline-block;
    width: 200px;
    height: 200px;

    &:after {
      content: ' ';
      display: block;
      width: 100%;
      height: 100%;
      margin: 1px;
      border-radius: 50%;
      border: 5px solid #336199;
      border-color: #336199 transparent #336199 transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }
  }

  .lds-title {
    font-size: 30px;
    color: #336199;
    padding-top: 40px;
    font-weight: lighter;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class MyComponent extends Vue {}
</script>
