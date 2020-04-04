<template>
  <div class="msite">
    <HeaderTop>
      <div class="left" slot="left" @click="$router.push('/search')">
        <i class="iconfont icon-sousuo"></i>
      </div>
      <div class="center" slot="center">{{address.name}}</div>
      <div class="right" slot="right">
        <a
          @click="!user.name ? $router.push('/login') : $router.push('/profile')"
        >{{user.name ? user.name : "登录/注册"}}</a>
      </div>
    </HeaderTop>
    <!-- 首页导航 -->
    <div class="swiper-container-msite-navi">
      <div class="swiper-wrapper msite_nav" v-if="categorysSplit.length !== 0">
        <div v-for="(categorys,index) in categorysSplit" :key="index" class="swiper-slide">
          <div v-for="(item, index) in categorys" :key="index" @click="item">
            <img :src="item.image_url" />
            <span>{{item.title}}</span>
          </div>
        </div>
      </div>
      <!-- 如果数据是空, 显示默认图片 -->
      <div class="swiper-wrapper msite_nav" v-else>
        <div class="swiper-slide">
          <img src="./img/msite_back.svg" alt />
        </div>
      </div>
    </div>
    <!-- 首页附近商家 -->
    <div class="shop_header">
      <i class="iconfont icon-xuanxiang"></i>
      <span class="shop_header_title">附近商家</span>
    </div>
    <div v-if="shops.length !== 0">
      <NearbyShops :shops="shops"></NearbyShops>
    </div>
    <!-- 如果数据是空, 显示默认图片 -->
    <div v-else>
      <img src="./img/msite_back.svg" alt />
    </div>
  </div>
</template>

<script>
import createSwiper from "./swiper-options";
import HeaderTop from "../../../components/HeaderTop/HeaderTop";
import NearbyShops from "../../../components/NearbyShop/NearbyShops";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["shops", "address", "user"]),
    ...mapGetters(["categorysSplit"])
  },
  methods: {
    ...mapActions(["getCategorys", "getAddress", "getShops"])
  },
  mounted() {
    // 获取商品类型列表
    this.getCategorys();
    // 获取位置信息
    this.getAddress();
    // 获取商家列表
    this.getShops();
  },
  watch: {
    categorysSplit: function(value) {
      if (value.length !== 0) {
        createSwiper();
      }
    }
  },
  components: { HeaderTop, NearbyShops }
};
</script>

<style lang='stylus'>
@import '../pages.styl';
@import '../../../assets/mixins.styl';

.msite {
  overflow: auto;
}

.shop_header {
  margin-top: 10px;
  padding: 10px 10px 0;
  clearfix();

  span {
    color: #999;
    font-size: 14px;
    line-height: 20px;
  }
}

.swiper-container-msite-navi {
  width: 100%;
  overflow: hidden;
  margin-top: 45px;
  height: 200px;
  background: #ffffff;
}

.msite_nav {
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