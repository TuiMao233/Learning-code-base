<template>
  <div class="center-controls" ref="wrapper">
    <div class="line"></div>
    <div class="circle" @mousedown="mouse" ref="circle"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    startClientX: 0, // 按下时, x轴距离浏览器的距离
    startMoveOffsetX: 0, // 按下时, x轴距离容器的距离
    wrapperOffsetLeft: 0, // 容器x轴距离浏览器的距离
    wrapperWidth: 0 // 容器宽度
  }),
  methods: {
    mouse(ev) {
      //当点击时所有事件都捕获为dragEl的事件
      document.setCapture && document.setCapture();
      // 获取目标元素
      const circleEl = ev.target;
      const wrapperEl = this.$refs.wrapper;
      // 按下时, 元素距离浏览器的距离
      this.startClientX = ev.clientX;
      // 按下时, 元素距离容器的偏移量
      const wrapperOffsetLeft = wrapperEl.getBoundingClientRect().x;
      this.startMoveOffsetX = ev.clientX - wrapperOffsetLeft;
      // 按下时, 保存容器宽度
      this.wrapperWidth = wrapperEl.clientWidth;

      // 订阅移动和松开事件
      document.onmousemove = this.move;
      document.onmouseup = this.up;
      // 清除默认行为
      ev.preventDefault();
      return false;
    },
    move(ev) {
      const circleEl = this.$refs.circle;
      // 点击位置 + 点击时轮播图容器距离浏览器的偏移量 = 圆的偏移量
      let slidingsetX = ev.clientX - this.startClientX + this.startMoveOffsetX;
      // 控制元素保持在父元素当中
      if (slidingsetX > this.wrapperWidth) slidingsetX = this.wrapperWidth;
      if (slidingsetX < 0) slidingsetX = 0;

      circleEl.style.transform = `translateX(${slidingsetX}px)`;

      ev.preventDefault();
      return false;
    },
    up(ev) {
      // 释放document的move事件
      document.onmousemove = null;
      // 释放document的onmouseup事件
      document.onmouseup = null;
      //释放dragEl的点击事件
      document.releaseCapture && document.releaseCapture();

      ev.preventDefault();
      return false;
    }
  }
};
</script>

<style lang="less">
@circleSize: 18px;
.center-controls {
  flex: 1;
  height: 100%;
  position: relative;
  margin-left: @circleSize / 2;
  time {
    display: block;
    margin-left: -@circleSize / 2;
    transform: translateY(13px);
    font-size: 13px;
  }
  .line {
    height: 1px;
    background: #dcdfe6;
    position: absolute;
    left: -@circleSize / 2;
    right: -@circleSize / 2;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .circle {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    margin-left: -@circleSize / 2;
    height: @circleSize;
    width: @circleSize;
    border-radius: 50%;
    box-sizing: border-box;
    border: 3px solid #409eff;
    &::after {
      content: "";
      border-radius: 50%;
      background: #dcdfe6;
      position: absolute;
      top: 3px;
      bottom: 3px;
      right: 3px;
      left: 3px;
      margin: auto;
    }
  }
}
</style>