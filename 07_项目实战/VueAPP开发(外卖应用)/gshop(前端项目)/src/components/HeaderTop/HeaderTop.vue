<template>
  <div class="header_top">
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script>
</script>

<style lang='stylus'>
@import '../../assets/mixins.styl';

.header_top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 45px;
  background-color: rgb(2, 167, 116);
  display: flex;
  color: rgb(255, 255, 255) !important;
  z-index 100
  div {
    overflowTest(); // 文字溢出处理
    line-height: 45px;
    flex: 1;
    &.left {
      text-align: left;
      box-sizing: border-box;
      border-left: solid 20px rgba(0, 0, 0, 0);
      i {
        font-size: 25px;
      }
    }
    &.center {
      flex: 2 !important;
      font-size: 20px;
      text-align: center;
    }
    &.right {
      flex: 1.3;
      text-align: right;
      box-sizing: border-box;
      border-right: solid 20px rgba(0, 0, 0, 0);
      a {
        color: rgb(255, 255, 255) !important;
      }
    }
  }
}
</style>
