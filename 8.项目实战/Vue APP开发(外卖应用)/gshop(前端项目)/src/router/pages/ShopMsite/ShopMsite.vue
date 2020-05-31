<template>
  <div class="shop-msite">
    <ShopHeader />

    <div class="shop-navi">
      <router-link to="shop_order" replace>
        <span>点餐</span>
      </router-link>
      <router-link to="shop_assess" replace>
        <span>评价</span>
      </router-link>
      <router-link to="shop_business" replace>
        <span>商家</span>
      </router-link>
    </div>

    <keep-alive>
      <router-view>
        <!-- 路由展示区 -->
      </router-view>
    </keep-alive>
    

    <ShopCart v-show="$route.path === '/shop_msite/shop_order'"/>
  </div>
</template>

<script>
import ShopHeader from "../../../components/ShopHeader/ShopHeader";
import ShopCart from "../../../components/ShopCart/ShopCart";
import { mapActions } from "vuex";
export default {
  components: { ShopHeader, ShopCart },
  methods: {
    ...mapActions(["getShopMsg"])
  },
  mounted() {
    this.getShopMsg()
    
  },
};
</script>

<style lang="stylus">
@import '../../../assets/mixins.styl';
.shop-msite {
  height 100%
  overflow-y auto
}
.shop-navi {
  display: flex;
  bottom-border-1px(rgba(0, 0, 0, 0.2));

  a {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;

    span {
      display: inline-block;
      height: 100%;
    }

    &.router-link-exact-active {
      color: #01A36A;

      span {
        box-sizing: border-box;
        border-bottom: solid 2px #01A36A;
      }
    }
  }
}
</style>