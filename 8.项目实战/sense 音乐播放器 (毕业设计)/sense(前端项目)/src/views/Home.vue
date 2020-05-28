/* 主界面 */
<template>
  <div>
    <el-carousel :interval="4000" type="card" height="350px">
      <el-carousel-item v-for="(item, index) in 6" :key="item">
        <el-image class="carousel_img" :src="`/carousel/${index+1}.jpg`" alt fit="scale-down"/>
      </el-carousel-item>
    </el-carousel>
    <el-card class="box-card-home">
      <div slot="header" class="clearfix">
        <span>最新歌曲</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        <img :src="'/timg.jpg'" alt />
        <span>1/6 -genesis mix-</span>
        <span>EXIT TUNES PRESENTS Vocalogenesis</span>
        <span>初音ミク / ぼーかりおどP</span>
        <div class="controls">
          <i class="el-icon-video-play" v-if="!isPlay" />
          <i class="el-icon-video-pause" v-else />
          <i class="el-icon-chat-dot-square" />
          <i class="el-icon-crop" />
        </div>
        <el-divider />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    isPlay: false
  })
};
</script>

<style lang="less">
.carousel_img{
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  opacity: 0.9 !important;
}
.el-carousel-item {
  h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
}
.box-card-home {
  margin-top: 50px;
  text-align: left;
  .text {
    font-size: 14px;
  }
  .item {
    span {
      display: inline-block;
      margin-right: 50px;
    }
    img {
      margin-right: 25px;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      vertical-align: middle; // 文字对齐方向上下居中
    }
    .controls {
      float: right;
      font-size: 25px;
      i {
        margin-right: 25px;
      }
    }
  }
}
.el-carousel {
  z-index: 0;
  margin: 0 auto;
  max-width: 800px;
}
</style>