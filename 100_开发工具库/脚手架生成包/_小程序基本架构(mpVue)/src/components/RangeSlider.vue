/* 区间选择器 */
<template>
  <div class="range-slider" @click="onClick">
    <div class="range-slider-wrap">
      <div class="range-slider-bar" :style="atTrackStyle"></div>
      <div
        class="range-slider-button"
        @touchmove="onTouchMove($event,'aX')"
        @touchend="onTouchEnd($event, 'aX')"
        @touchcancel="onTouchEnd"
        :style="{left: aX + '%'}"
      >
        <!-- <div class="range-slider-value">{{range[0]}}</div> -->
      </div>
      <div
        class="range-slider-button"
        @touchmove="onTouchMove($event,'bX')"
        @touchend="onTouchEnd($event, 'bX')"
        @touchcancel="onTouchEnd"
        :style="{left: bX + '%'}"
      >
        <!-- <div class="range-slider-value">{{range[1]}}</div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },
    max: { type: Number, default: 24 },
    min: { type: Number, default: 0 },
    step: { type: Number, default: 0.5 },
    value: { type: Array, default: () => [0, 0] },
    type: { type: String, default: "time" },
    sliderInitEnd: {type: Function, default: ()=>{}}
  },
  data() {
    return {
      aX: 0,
      bX: 0,
      width: 0, // range宽度
      left: 0, // range 到屏幕左边的距离
      deltaValue: this.max - this.min,
      currentSlider: "",
      currentValue: [0, 0]
    };
  },
  computed: {
    atTrackStyle() {
      const { aX, bX } = this;
      const smallerX = Math.min(aX, bX);
      const deltaX = Math.abs(aX - bX);
      return `left:${smallerX}%;width:${deltaX}%`;
    },
    range() {
      let range = this.currentValue;
      return this.type === "time"
        ? range.map(item => this.formatHoursToUT(item))
        : range;
    }
  },
  methods: {
    onTouchMove(event, sliderName) {
      event = event.mp;
      if (this.disabled) {
        return;
      }
      const clientX = event.touches[0].clientX;
      this.setSliderValue(sliderName, clientX - this.left, "onChange");
    },
    onTouchEnd(sliderName) {
      if (this.disabled) {
        return;
      }
      this.currentSlider = sliderName;
      this.triggerEvent("onAfterChange");
    },
    setSliderValue(sliderName, targetValue, funcName) {
      const distance = Math.min(Math.max(targetValue, 0), this.width);
      let sliderValue = Math.floor(distance / this.width * 100);
      if (funcName) {
        this.triggerEvent(funcName);
      }
      // sliderValue = Math.floor(sliderValue / 15.6) * 15.6;
      if (sliderName === "bX" && sliderValue <= this.aX) {
        this[sliderName] = this.aX;
        return;
      }
      if (sliderName === "aX" && sliderValue >= this.bX) {
        this[sliderName] = this.bX;
        return;
      }
      this[sliderName] = sliderValue;
    },
    triggerEvent(funcName) {
      const { aX, bX } = this;
      const steps = Math.round(this.deltaValue / this.step);
      const a = Math.round(aX / 100 * steps) * this.step + this.min;
      const b = Math.round(bX / 100 * steps) * this.step + this.min;
      const result = [a, b].sort((x, y) => x - y);
      // console.log(aX, bX, result, "位移");
      this.currentValue = result;
      this.$emit(funcName, result);
    },
    onClick(event) {
      if (this.currentSlider && !this.disabled) {
        let sliderValue = 0;
        const detail = event.touches[0].clientX;
        sliderValue = detail - this.left;
        this.setSliderValue(this.currentSlider, sliderValue, "onChange");
      }
    },
    setValue(value) {
      this.aX = Math.round((value[0] - this.min) / this.deltaValue * 100);
      this.bX = Math.round((value[1] - this.min) / this.deltaValue * 100);
    },
    formatHoursToUT(value) {
      value = value * 3600;
      let result = parseInt(value);
      let h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      let m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      result = `${h}:${m}`;
      return result;
    },
    getRect(selector, all) {
      return new Promise(resolve => {
        wx
          .createSelectorQuery()
          [all ? "selectAll" : "select"](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    }
  },
  mounted() {
    const { value } = this;
    this.getRect(".range-slider").then(rect => {
      this.width = Math.round(rect.width);
      this.left = Math.round(rect.left);
      this.sliderInitEnd()
      this.setValue(value);
    });
  }
};
</script>
<style lang="less">
.range-slider {
  width: 100%;
  .range-slider-wrap {
    position: relative;
    background-color: #efefef;
    width: 100%;
    height: 12rpx;
    border-radius: 8rpx;
    margin-top: 10rpx;
    margin-bottom: 35rpx;
    vertical-align: middle;
    cursor: pointer;
  }
  .range-slider-bar {
    position: absolute;
    background-color: #d34632;
    height: 12rpx;
  }
  .range-slider-button {
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 44rpx;
    height: 44rpx;
    background: rgba(255, 255, 255, 1);
    border: 6rpx solid rgba(211, 70, 50, 1);
    border-radius: 50%;
    box-sizing: border-box;
    box-shadow: 0 2rpx 8rpx 0 rgba(211, 211, 211, 0.68);
    & .range-slider-value {
      position: absolute;
      top: -70rpx;
      left: 50%;
      transform: translateX(-50%);
      font-size: 40rpx;
      color: #9ea4a1;
    }
  }
}
</style>