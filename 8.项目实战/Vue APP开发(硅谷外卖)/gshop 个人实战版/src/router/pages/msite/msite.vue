<template>
  <div class="msite">
    <HeaderTop>
      <div class="left" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </div>
      <div class="center" slot="center">昌平区北七家宏福科技园(337省道北)</div>
      <div class="right" slot="right">
        <a>登录|注册</a>
      </div>
    </HeaderTop>
    <!-- 首页导航 -->
    <div class="msite_nav">
      <div class="swiper-slide">
        <div>
          <img src alt />
          <span>xxxxx</span>
        </div>
        <div>
          <img src alt />
          <span>xxxxx</span>
        </div>
        <div>
          <img src alt />
          <span>xxxxx</span>
        </div>
        <div>
          <img src alt />
          <span>xxxxx</span>
        </div>
        <div>
          <img src alt />
          <span>xxxxx</span>
        </div>
        <div>
          <img src alt />
          <span>xxxxx</span>
        </div>
        <div>
          <img src alt />
          <span>xxxxx</span>
        </div>
        <div>
          <img src alt />
          <span>xxxxx</span>
        </div>
      </div>
    </div>
    <!-- 首页附近商家 -->
    <ShopList></ShopList>
  </div>
</template>

<script>
import HeaderTop from "../../../components/HeaderTop/HeaderTop";
import ShopList from '../../../components/NearbyShop/NearbyShop'
export default {
  components: { HeaderTop, ShopList }
};
</script>

<style lang='stylus'>
@import '../pages.styl';
@import '../../../units/units.styl';
.msite {
  overflow: auto;
}
.msite_nav {
  margin-top: 45px;
  height: 200px;
  background: #ffffff;

  .swiper-slide {
    width: 100%;
    height: 100%;

    div {
      float: left;
      width: 25%;
      height: 50%;
      text-align: center;

      img {
        width: 50px;
        height: 50px;
        display: block;
        margin: 0 auto;
        margin-top: 10px;
      }

      span {
        width: 100%;
        text-align: center;
        font-size: 13px;
        color: #666;
      }
    }
  }
}


</style>