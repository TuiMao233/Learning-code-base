<template>
  <div class="audio_progress" ref="wrapper">
    <time>{{currentTime|date-format}} / {{duration|date-format}}</time>
    <div class="line"></div>
    <div class="loaded-line" ref="loaded"></div>
    <div class="interaction-line" @mousedown="mouse" ref="ittn"></div>
    <div class="circle" ref="circle" @mousedown.prevent></div>
  </div>
</template>

<script>
export default {
  props: ["audio", "paused", "change", "statusProcessor"],
  data: () => ({
    ittnOffsetLeft: 0, // 交互块X轴距离浏览器的距离
    ittnWidth: 0, // 容器宽度
    timer: 0, // 定时器
    duration: 0, // 总时长
    currentTime: 0, // 当前时长
    slidingsetX: 0, // 滑动时, 偏移的px值
    loadedCount: 0 // 加载的进度
  }),
  watch: {
    paused(val) {
      // 播放状态发生改变时, 判断是否开启同步器
      if (val) clearInterval(this.timer);
      else this.audioSynch();
    },
    change() {
      // 时间轴发生改变时, 同步当前组件时间轴
      this.duration = this.audio.duration;
      this.currentTime = this.audio.currentTime;
      this.audio.play();
    },
    loadedCount(loadedVal) {
      // 加载缓存进度条, 更新缓存条宽度
      const ittnEl = this.$refs.ittn;
      const circleEl = this.$refs.circle;
      const ittnWidth = ittnEl.clientWidth - circleEl.offsetWidth;
      const widthPercent_one = ittnWidth / 100;
      this.$refs.loaded.style.width = `${loadedVal * widthPercent_one}px`;
    }
  },
  methods: {
    audioSynch() {
      // 音频同步器, 音频播放时实时更新界面
      clearInterval(this.timer);
      // 获取目标元素
      const ittnEl = this.$refs.ittn;
      const circleEl = this.$refs.circle;
      // 交互块宽度
      const ittnWidth = ittnEl.clientWidth - circleEl.offsetWidth;
      this.timer = setInterval(() => {
        const { duration, currentTime, buffered } = this.audio;
        // 元数据未加载不执行同步器逻辑
        if (!this.audio || isNaN(duration)) return false;
        // 执行至结尾后自动清空定时器
        if (currentTime == duration) clearInterval(this.timer);
        // 保存当前播放时间
        this.currentTime = currentTime;
        // 计算交互块宽度, 音频进度的百分比, 根据百分比算出偏移量
        const percent_one = duration / 100;
        const currentPercent = currentTime / percent_one;
        const widthPercent_one = ittnWidth / 100;
        const slidingsetX = currentPercent * widthPercent_one;
        circleEl.style.transform = `translateX(${slidingsetX}px)`;
        // 计算缓存进度
        this.loadedCount = (100 * buffered.end(0)) / duration;
      }, 100);
    },
    setAudioCurrentTime(percent) {
      // 输入百分比改变歌曲时间
      const percent_one = this.audio.duration / 100;
      this.audio.currentTime = percent_one * percent;
    },
    mouse(ev) {
      //当点击时所有事件都捕获为dragEl的事件
      document.setCapture && document.setCapture();
      // 关闭音频同步器
      clearInterval(this.timer);
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

      if (!this.audio || isNaN(this.audio.duration)) {
        const message = "元数据加载过程比较缓慢, 请耐心等待.....";
        return this.$message({ type: "warning", message });
      }
      // 清除默认行为
      ev.preventDefault();
      return false;
    },
    move(ev) {
      if (!this.audio || isNaN(this.audio.duration)) return false;
      const circleEl = this.$refs.circle;
      this.slidingsetX =
        ev.clientX - this.ittnOffsetLeft - circleEl.offsetWidth / 2;

      // 控制元素保持在交互块当中
      if (this.slidingsetX > this.ittnWidth) this.slidingsetX = this.ittnWidth;
      if (this.slidingsetX < 0) this.slidingsetX = 0;
      circleEl.style.transform = `translateX(${this.slidingsetX}px)`;

      ev.preventDefault();
      return false;
    },
    up(ev) {
      if (!this.audio || isNaN(this.audio.duration)) return false;
      const widthPercent_one = this.ittnWidth / 100;
      const slidingPercent = this.slidingsetX / widthPercent_one;
      this.setAudioCurrentTime(slidingPercent);

      if (!this.paused) this.audioSynch();
      // 释放document的onmouseup/move事件, dragEl点击事件, 关闭默认行为
      document.onmousemove = null;
      document.onmouseup = null;
      document.releaseCapture && document.releaseCapture();

      ev.preventDefault();
      return false;
    }
  }
};
</script>

<style lang="less">
@circleSize: 18px;
.audio_progress {
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
    height: 2px;
    background: #dcdfe6;
    position: absolute;
    left: -@circleSize / 2;
    right: -@circleSize / 2;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .loaded-line {
    height: 2px;
    background: #b8d8f9;
    position: absolute;
    left: -@circleSize / 2;
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