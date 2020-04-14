<template>
  <view class="movie_detail">
      <image :src="subject.images.large" />
      <text class="name">{{subject.title}}</text>
      <view class="movie_msg">
          <text>评分: {{subject.rating.average}}</text>
          <text>导演: {{subject.directors[0].name}}</text>
          <text>主演: {{castMsgStr}}</text>
      </view>
      <button>我要观影</button>
  </view>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: ()=> ({
    subject: {}
  }),
  computed: {
    ...mapState(['subjects']),
    castMsgStr () {
      const {casts} = this.subject
      return casts.map((cast)=>cast.name).join('、')
    }
  },
  beforeMount() {
    const {index} = this.$root.$mp.query
    this.subject = this.subjects[index]
  },
}
</script>

<style>
.name {
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
}
.movie_detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 15px;
}
image {
    margin-top: 15px;
    width: 70%;
    height: 700rpx;
}
.movie_msg {
    display: flex;
    flex-direction: column;
    margin-left: -40%;
    font-size: 32rpx;
    margin-top: 15px;
}
.movie_msg text {
    margin-bottom: 5px;
}
button {
    width: 70%;
    height: 80rpx;
    background: green;
    padding: 0 !important;
    color: #fff;
    line-height: 80rpx !important;
    font-weight: 500 !important;
    margin-top: 50rpx;
}
</style>