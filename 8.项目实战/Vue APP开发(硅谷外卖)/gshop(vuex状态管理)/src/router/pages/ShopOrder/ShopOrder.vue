<template>
  <div v-if="shopGoods[0]" class="shop-order-box">
    <div class="shop-order">
        <div class="left-navi">
          <div class="content">
            <div
              class="item"
              v-for="(item, index) in shopGoods"
              :key="index"
              :class="{action:naviIndex === index}"
              @click="goCdy(index)"
            >{{item.type}}</div>
          </div>
        </div>
        <div class="right-navi">
          <div class="content">
            <div class="cdy" v-for="(item, index) in shopGoods" :key="index">
              <div class="title">{{item.type}}</div>
              <div class="cdy_list">
                <div class="item" v-for="(good, index) in item.goods" :key="index" @click="shopGoodMsg(true, good)">
                  <!-- 商品图片 -->
                  <div class="cdy_img">
                    <img :src="good.head_img_src" />
                  </div>
                  <!-- 商品名称 -->
                  <section class="cdy_name">{{good.name}}</section>
                  <!-- 商品类型 -->
                  <section class="cdy_type">{{good.good_type}}</section>
                  <!-- 商品销售信息 -->
                  <section class="cdy_msg">
                    月销{{good.sales}}份
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    好评率{{good.praise_rate}}
                  </section>
                  <!-- 商品价格_添加购物车 -->
                  <section class="price_or_add" @click.stop>
                    <span class="price">￥{{good.price}}</span>
                    <ShopButton :good="good"/>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <transition name="goodMsgAnim">
      <GoodMsg :good="good" :shopGoodMsg="shopGoodMsg" v-if="isShowGoodMsg"/>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BScroll from "@better-scroll/core";
import ShopButton from '../../../components/ShopButton/ShopButton'
import GoodMsg from '../../../components/GoodMsg/GoodMsg'
export default {
  data: () => ({
    cdyTops: [],
    cdyPosY: 0,
    cart: {},
    isShowGoodMsg: false,
    good: {}
  }),
  methods: {
    ...mapActions(["getShopGoods", "inOrDeGood"]),
    _initCdyTops() { // 初始化所有商品类型的top值
      // 代表所有cdy商品类型元素的offsetY值
      const cdyDom = Array.from(
        document.querySelectorAll(".right-navi .content .cdy")
      );
      this.cdyTops = cdyDom.map((item, index) => item.offsetTop);
    },
    _initScroll() { // 滚动条初始化
      const leftScroll = new BScroll(".left-navi", { click: true });
      this.rightScroll = new BScroll(".right-navi", {
        probeType: 3,
        click: true
      });
      // 收集scrollY值
      this.rightScroll.on("scroll", pos => (this.cdyPosY = Math.abs(pos.y)));
      // 收集跳转页面函数
    },
    goCdy(index) { // 跳转对应的商品类型
      this.rightScroll.scrollTo(0, -this.cdyTops[index], 300);
    },
    shopGoodMsg(fool, good) { // 显示/隐藏商品详情
      if(fool){ // true代表显示
        this.good = good
        this.isShowGoodMsg = true
      }else { // false代表隐藏
        this.good = {}
        this.isShowGoodMsg = false
      }
    }
  },
  computed: {
    ...mapState(["shopGoods"]),
    naviIndex() {
      const { cdyTops, cdyPosY } = this;
      const index = cdyTops.findIndex((item, index) => cdyPosY < item) - 1;
      return index !== -2 ? index : cdyTops.length - 1;
    }
  },
  mounted() {
    // 获取商品列表,  界面更新完毕调用初始化滚动函数
    this.getShopGoods(() =>
      this.$nextTick(() => {
        this._initScroll();
        this._initCdyTops();
      })
    );
  },
  components: {ShopButton,GoodMsg}
};
</script>
<style lang="stylus">
@import '../../../assets/mixins.styl';
.goodMsgAnim-enter-active, .goodMsgAnim-leave-active{transition: all 0.5s}
.goodMsgAnim-enter, .goodMsgAnim-leave-to {opacity:0}
.shop-order {
  position: absolute;
  top: 207px;
  bottom: 0;
  right: 0;
  left: 0;
  background: #F4F5F7;
  .left-navi {
    width: 25%;
    height: 100%;
    float: left;
    overflow-y: hidden;

    .item {
      bottom-border-1px(rgba(0, 0, 0, 0.2));
      text-align: center;
      color: rgba(0, 0, 0, 0.7);
      font-size: 15px;
      height: 50px;
      line-height: 50px;

      &.action {
        background: #ffffff;
      }
    }
  }

  .right-navi {
    width: 75%;
    height: 100%;
    float: left;
    overflow-y: hidden;

    .cdy { // 商品块
      .title { // 商品标题
        border-left: solid 2px rgba(0, 0, 0, 0.5);
        padding-left: 5px;
        height: 25px;
        font-size: 13px;
        line-height: 25px;
        color: rgba(0, 0, 0, 0.5);
      }

      .cdy_list { // 商品列
        background: #ffffff;

        .item { // 一个商品
          padding: 15px;
          height: 87px;
          bottom-border-1px(rgba(0, 0, 0, 0.2));

          .cdy_img { // 商品图片
            float: left;
            height: 100%;
            margin-right: 10px;

            img {
              width: 60px;
              height: 60px;
            }
          }

          .cdy_name { // 商品名称
            margin-bottom: 10px;
          }

          .cdy_msg, .cdy_type { // 商品类型 商品信息
            margin-bottom: 8px;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.7);
          }

          .price_or_add {
            margin-bottom: 5px;
            clearfix();

            .price { // 商品价格
              color: #ef0000;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>