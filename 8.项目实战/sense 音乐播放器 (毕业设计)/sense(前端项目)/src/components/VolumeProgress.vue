<template>
  <div class="volume_box">
    <el-button type="text" v-if="!muted" @click="toggleVlume">
      <i class="icon-yinliangkai"></i>
    </el-button>
    <el-button type="text" v-else @click="toggleVlume">
      <i class="icon-yinliangguan"></i>
    </el-button>
    <div class="volume_progress" ref="wrapper">
      <div class="line"></div>
      <div class="interaction-line" @mousedown="mouse" ref="ittn"></div>
      <div class="circle" ref="circle" @mousedown.prevent></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    ittnOffsetLeft: 0, // 交互块X轴距离浏览器的距离
    ittnWidth: 0, // 容器宽度
    oldVolume: 0 // 之前的音量
  }),
  props: ["audio", "muted"],
  watch: {
    // 监视是否静音
    muted() {
      this.vlumeSynch();
    },
    audio() {
      this.audio.volume = 0.5;
      this.vlumeSynch();
    }
  },

  methods: {
    vlumeSynch() {
      // 音量同步改变元素偏移量
      const ittnEl = this.$refs.ittn;
      const circleEl = this.$refs.circle;
      const ittnWidth = ittnEl.clientWidth - circleEl.offsetWidth;
      const percent = this.audio.volume;
      circleEl.style.transform = `translateX(${ittnWidth * percent}px)`;
    },
    toggleVlume() {
      // 切换音量
      if (this.audio.volume == 0) {
        if (this.oldVolume == 0) return (this.audio.volume = 0.5);
        this.audio.volume = this.oldVolume;
      } else {
        this.oldVolume = this.audio.volume;
        this.audio.volume = 0;
      }
    },
    mouse(ev) {
      //当点击时所有事件都捕获为dragEl的事件
      document.setCapture && document.setCapture();

      // 获取目标元素
      const ittnEl = ev.target;
      const circleEl = this.$refs.circle;

      // 交互块X轴距离浏览器的距离
      this.ittnOffsetLeft = ittnEl.getBoundingClientRect().x;
      // 按下时, 保存交互块宽度
      this.ittnWidth = ittnEl.clientWidth - circleEl.offsetWidth;

      // 订阅移动和松开事件
      document.onmousemove = this.move;
      document.onmouseup = this.up;
      // 清除默认行为
      ev.preventDefault();
      return false;
    },
    move(ev) {
      if(!this.audio) return false;
      const circleEl = this.$refs.circle;
      let slidingsetX =
        ev.clientX - this.ittnOffsetLeft - circleEl.offsetWidth / 2;

      // 控制元素保持在交互块当中
      if (slidingsetX > this.ittnWidth) slidingsetX = this.ittnWidth;
      if (slidingsetX < 0) slidingsetX = 0;
      circleEl.style.transform = `translateX(${slidingsetX}px)`;

      // 改变音量
      const widthPercent_one = this.ittnWidth / 100;
      const slidingPercent = slidingsetX / widthPercent_one / 100;
      this.audio.volume = slidingPercent;

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
.volume_box {
  height: 100%;
  position: relative;
}
.volume_progress {
  flex: 1;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 40px;
  right: 0;
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
  .interaction-line {
    cursor: pointer;
    height: @circleSize;
    position: absolute;
    left: -@circleSize / 2;
    right: -@circleSize / 2;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 100;
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