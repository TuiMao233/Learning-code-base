<script>
export default {
  created () {
  }
}
</script>

<style lang="less">
@import "./style/index.less";
/* 结构类类名 Start */

.main {
  padding: @page-padding;
}
.between-layer {
  .flex(C);
}
.fixed-footer {
  background: #fff;
  position: fixed;
  padding-bottom: 30rpx;
  bottom: 0;
  left: 30rpx;
  right: 30rpx;
  z-index: 10;
}

/* 结构类类名 End */




/* 复用样式 Start */

/* 卡片 */
.card {
  background-color: #ffffff;
  box-shadow: 0rpx 8rpx 12rpx 0rpx rgba(145, 145, 145, 0.12);
  border-radius: 20rpx;
}
/* 无数据提示 */
.no-data {
  .flex(C);
  .flex(L);
  margin-top: 165rpx;
  image {
    width: 400rpx;
    height: 250rpx;
    margin-bottom: 20rpx;
  }
  span {
    font-size: @font-size-small;
    color: @grey-v;
  }
}

/* 复用样式 End */




/* 重置样式 Start */

view,
scroll-view,
swiper,
swiper-item,
movable-area,
movable-view,
cover-view,
cover-image,
icon,
text,
progress,
button,
checkbox-group,
checkbox,
form,
input,
label,
picker,
picker-view,
radio-group,
radio,
slider,
switch,
textarea,
navigator,
functional-page-navigator,
image,
video,
camera,
live-player,
live-pusher,
map,
canvas,
open-data,
web-view,
ad {
  box-sizing: border-box;
  color: #333333;
}
text,
image {
  vertical-align: middle;
}
page button:not([size="mini"]) {
  padding: 0;
  margin: 0;
  min-height: auto;
  font-weight: initial;
}

::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
/* 重置样式 End */
</style>
