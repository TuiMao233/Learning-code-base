<template>
  <div class="shop_cart">
    <div class="bottom">
      <div class="cart_bottom_left" @click="isCartDetail = !isCartDetail">
        <div class="cart_icon" :class="{active:cartTotal.commodCount !== 0}">
          icon
          <div class="badge" v-show="cartTotal.commodCount !== 0">{{cartTotal.commodCount}}</div>
        </div>
        <!-- 购物车总价格 -->
        <div class="cart_price">￥{{cartTotal.price}}</div>
        <!-- 购物车商品总配送费 -->
        <div class="delivery_price">配送费￥{{shopMsg.delivery_fee}}元</div>
      </div>
      
      <div class="cart_button" :class="{active:isClearing}" v-show="cartButtonMsg">
        {{cartButtonMsg}}
      </div>
    </div>
    <transition name="cartDetailBd">
      <div class="cart_detail_background" v-show="isCartDetail"  @click="isCartDetail = false">
        <transition name="cartDetailAnim">
          <div class="cart_detail" @click.stop  v-show="isCartDetail">
            <section class="header">
              <span>购物车</span>
              <!-- 点击清空时, 清空购物车信息 -->
              <div class="clear_button" @click="isDelCarts()">清空</div>
            </section>
            <div class="cart_list">
              <div class="content">
                <section class="no_cart" v-show="cartTotal.commodCount === 0">购物车暂无商品</section>
                <section class="item" v-for="(good, index) in shopCarts" :key="index">
                  <span class="good_name">{{good.name}}</span>
                  <!-- 按钮 -->
                  <ShopButton :good="good" class="shopButton"/>
                  <!-- n份单个商品的价格 -->
                  <div class="price">￥ {{good.count * good.price}}</div>
                </section>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { mapState,mapActions,mapGetters } from "vuex";
import ShopButton from '../../components/ShopButton/ShopButton'
export default {
  data: () => ({
    isCartDetail: false, // 是否显示详情页
    isClearing: false    // 是否可结算
  }),
  methods: {
    ...mapActions(['delCarts']),
    isDelCarts () {
      MessageBox.confirm('确定清空购物车吗?').then(()=>this.delCarts())
    }
  },
  computed: {
    ...mapState(['shopCarts','shopMsg']),
    ...mapGetters(['cartTotal']),
    cartButtonMsg () { // 购物车按钮信息计算
      const {price} = this.cartTotal
      const {min_delivery_price} = this.shopMsg
      let strMsg = ''
      if(price === 0){ 
        // 如果购物车金额为0, 显示起送金额
        strMsg = `￥${min_delivery_price}元起送`
        this.isClearing = false
      }else if(price > 0 && price < min_delivery_price) {
        // 如果购物车金额大于0, 并小于起送金额, 显示差多少钱
        strMsg = `还差￥${min_delivery_price - price} 元`
        this.isClearing = false
      }else {
        // 如果购物车超出了起送金额, 显示去结算
        strMsg = `去结算`
        this.isClearing = true
      }
      return strMsg
    }
  },
  components: {ShopButton}
};
</script>

<style lang="stylus">
@import '../../assets/mixins.styl'
.shopButton {
  margin-top: 12px;
  margin-left: 8px;
}
.shop_cart {
  .cartDetailBd-enter-active, .cartDetailBd-leave-active{
    transition all 0.5s
  }
  .cartDetailBd-enter, .cartDetailBd-leave-to {
    opacity 0
  }
  .cart_detail_background {
    position: absolute;width: 100%;
    top: 0;bottom:50px;margin auto
    background-color rgba(0,0,0,.5)
    .cartDetailAnim-enter-active, .cartDetailAnim-leave-active{
      transition all 0.5s
    }
    .cartDetailAnim-enter, .cartDetailAnim-leave-to {
      transform translateY(100%)
      opacity 0
    }
    .cart_detail{
      position: absolute;width: 100%;bottom 0;
      .cart_list {
        max-height: 200px;
        overflow-y auto;
        .no_cart {
          background #ffffff;height 45px;
          line-height 45px;padding 0 10px
          font-size:15px; text-align center
        }
        .item {
          background #ffffff;height 45px;
          line-height 45px;padding 0 10px
          .good_name {font-size:13px;}
          .price{float:right;color:red;font-size:13px;}
        }
      }
      .header{
        top-border-1px(rgba(0,0,0,.5))
        bottom-border-1px(rgba(0,0,0,.5))
        background #F4F4F8;height 40px;line-height 40px
        span {font-size:13px;margin-left:10px}
        .clear_button {
          float right;border-left solid 1px rgba(0,0,0,.3)
          color rgba(0,0,0,.8)
          padding 0 10px
        }
      }
    }
  }
  .bottom {
    position: absolute;bottom: 0;
    width 100%; height 50px;
    background #141D2A;z-index 5
    .cart_bottom_left{
      margin-right 95px
      height 100%
    }
    .cart_button {
      height 100%; width 95px;
      position absolute;right 0;top 0;
      background #2A333E;color #ffffff
      font-size 12px;font-weight bold
      text-align center; line-height 50px;
      &.active {background:#009C3B;}
    }
    .delivery_price {
      font-size 12px; color #5F656E;font-weight bold;
    }
    .cart_price{
      font-weight bold;font-size 18px;color #ffffff
      margin 5px 0px 5px 10px;display inline-block
    }
    .cart_icon{
      float left;height 50px;width 50px;
      background #2A333E;border-radius 50%;
      border solid 5px #141D2A;margin -10px 0px 0px 10px
      text-align center;line-height 50px; color rgba(255,255,255,.5)
      position relative
      &.active {background:#009375;color: #ffffff}
      .badge {
        background #FF2913; width 20px;height 15px;
        position absolute; top 0;right -5px; 
        line-height 15px; font-size 8px;color #Fff
        border-radius 5px
      }
    }
  }
}
</style>
