/* zButton */
<template xlang="wxml">
  <div class="z-button" :class="[plain?'plain':null, type]">{{content}}</div>
</template>

<script>
export default {
  props: {
    type: {
      // 按钮类型 default:默认, primary:主题, info:信息, warning:警告, info:信息, danger:危险
      type: String,
      default: "default"
    },
    plain: {
      // 是否为朴素按钮
      type: Boolean,
      default: false
    },
    content: {
      // 按钮内容
      type: String,
      default: "按钮"
    }
  },
};
</script>

<style lang="less">
@theme-color: #d34632; // 主题色号
@info-color: #2680eb; // 信息色号
@warning-color: #ff976a; // 警告色号
@danger-color: #ee0a24; // 危险字号
@font-size: 32rpx; // 字体尺寸

.z-button {
  padding: 23rpx;
  border-radius: 14rpx;
  font-size: @font-size;
  text-align: center;
  box-sizing: border-box;
}
.default {
  background: #ffffff;
  border: solid 1rpx #ebedf0;
}
.primary {
  background: @theme-color;
  color: #ffffff;
  &.plain {
    background: #ffffff;
    color: @theme-color;
    border: solid 1rpx @theme-color;
  }
}
.info {
  background: @info-color;
  color: #ffffff;
  &.plain {
    background: #ffffff;
    color: @info-color;
    border: solid 1rpx @info-color;
  }
}
.warning {
  background: @warning-color;
  color: #ffffff;
  &.plain {
    background: #ffffff;
    color: @warning-color;
    border: solid 1rpx @warning-color;
  }
}
.danger {
  background: @danger-color;
  color: #ffffff;
  &.plain {
    background: #ffffff;
    color: @danger-color;
    border: solid 1rpx @danger-color;
  }
}
</style>