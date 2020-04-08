<template>
  <div class="star" :class="size">
    <!-- 星星数量 -->
    <span class="star-item on" v-for="(item, index) in star_on"></span>
    <span class="star-item half" v-if="star_half"></span>
    <span class="star-item off"  v-for="item in star_off"></span>
    <!-- 评分 -->
    <span class="rating_section">{{number}}</span>
  </div>
</template>

<script>
export default {
  data: () => ({
    star_total: 5
  }),
  computed: {
    star_on() {
      return Math.floor(this.number);
    },
    star_off() {
      return this.star_total - Math.ceil(this.number);
    },
    star_half() {
      // 有没有半心
      let i = Math.floor(this.number);
      return (i-this.number) < 0 ? 1 : 0;
    }
  },
  props: { number: Number, size: String }
};
</script>

<style lang="stylus">
.star { // 星星
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;
  }
}

.star.size_24 {
  .star-item {
    @media only screen and (-webkit-device-pixel-ratio: 2) {
      &.on { // 满星
        background-image: url('./img/stars/star24_on@2x.png');
      }

      &.half { // 半星
        background-image: url('./img/stars/star24_half@2x.png');
      }

      &.off { // 空星
        background-image: url('./img/stars/star24_off@2x.png');
      }
    }

    @media only screen and (-webkit-device-pixel-ratio: 3) {
      &.on { // 满星
        background-image: url('./img/stars/star24_on@3x.png');
      }

      &.half { // 半星
        background-image: url('./img/stars/star24_half@3x.png');
      }

      &.off { // 空星
        background-image: url('./img/stars/star24_off@3x.png');
      }
    }
  }
}

.star.size_36 {
  .star-item {
    @media only screen and (-webkit-device-pixel-ratio: 2) {
      &.on { // 满星
        background-image: url('./img/stars/star36_on@2x.png');
      }

      &.half { // 半星
        background-image: url('./img/stars/star36_half@2x.png');
      }

      &.off { // 空星
        background-image: url('./img/stars/star36_off@2x.png');
      }
    }

    @media only screen and (-webkit-device-pixel-ratio: 3) {
      &.on { // 满星
        background-image: url('./img/stars/star36_on@3x.png');
      }

      &.half { // 半星
        background-image: url('./img/stars/star36_half@3x.png');
      }

      &.off { // 空星
        background-image: url('./img/stars/star36_off@3x.png');
      }
    }
  }
}

.star.size_48 {
  .star-item {
    @media only screen and (-webkit-device-pixel-ratio: 2) {
      &.on { // 满星
        background-image: url('./img/stars/star48_on@2x.png');
      }

      &.half { // 半星
        background-image: url('./img/stars/star48_half@2x.png');
      }

      &.off { // 空星
        background-image: url('./img/stars/star48_off@2x.png');
      }
    }

    @media only screen and (-webkit-device-pixel-ratio: 3) {
      &.on { // 满星
        background-image: url('./img/stars/star48_on@3x.png');
      }

      &.half { // 半星
        background-image: url('./img/stars/star48_half@3x.png');
      }

      &.off { // 空星
        background-image: url('./img/stars/star48_off@3x.png');
      }
    }
  }
}

.rating_section {
  float: right;
  font-size: 10px;
  color: #ff6000;
  margin-left: 4px;
}

.order_section {
  float: left;
  font-size: 10px;
  color: #666;
  transform: scale(0.8);
}
</style>