<template>
  <div class="shop-header">
    <div v-if="shopMsg.name">
      <section class="top">
        <div class="bgd" :style="{backgroundImage:`url(${shopMsg.bgd_url})`}">
          <!-- 背景 -->
        </div>
        <div class="head" @click="showShopMsg = true">
          <img :src="shopMsg.head_url" alt="">
          <!-- 头像 -->
        </div>
      </section>
      <section class="shop-msg_1" @click="showShopMsg = true">
        <!-- 徽章 -->
        <span class="badge">品牌</span>
        <!-- 商铺名称 -->
        <span class="shop-name">{{shopMsg.name}}</span>
        <!-- 箭头 -->
        <div class="arrow"></div>
      </section>
      <section class="shop-msg_2">
        5 月售{{shopMsg.total_order}}单
        <span class="space" />
        {{shopMsg.delivery_party}} 约{{shopMsg.delivery_time}}分钟
        <span class="space" />
        距离{{shopMsg.distance}}
      </section>
      <section class="shop-msg_3" @click="showShopFavorable = true" v-if="shopMsg.promotions">
        <!-- 徽章 -->
        <span 
          class="badge" 
          :style="{backgroundColor:shopMsg.promotions[0].color}"
        >{{shopMsg.promotions[0].name}}</span>
        <!-- 信息 -->
        <span class="msg">{{shopMsg.promotions[0].content}}</span>
        <!-- 优惠 -->
        <span class="favorable">
          {{shopMsg.promotions.length}}个优惠
          <div class="arrow">
            <div></div>
          </div>
        </span>
      </section>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
      <transition name="shopMsgAnim">
        <div class="shop_msg_background" v-show="showShopMsg">
          <div class="shop_msg">
            <section class="shop-msg_1">
              <!-- 徽章 -->
              <span class="badge">品牌</span>
              <!-- 商铺名称 -->
              <span class="shop-name">{{shopMsg.name}}</span>
            </section>
            <section class="shop-msg_2">
              <div>
                <h3>3.5</h3>
                <span>评分</span>
              </div>
              <div>
                <h3>{{shopMsg.total_order}}单</h3>
                <span>月售</span>
              </div>
              <div>
                <h3>{{shopMsg.delivery_party}}</h3>
                <span>约{{shopMsg.delivery_time}}分钟</span>
              </div>
              <div>
                <h3>{{shopMsg.delivery_fee}}元</h3>
                <span>配送费用</span>
              </div>
              <div>
                <h3>{{shopMsg.distance}}</h3>
                <span>距离</span>
              </div>
            </section>
            <section class="shop-msg_3">
              <span>公告</span>
            </section>
            <section class="shop-msg_4">
              <span>是以粥为特色的中式营养快餐................</span>
            </section>
            <div class="out" @click="showShopMsg=false">关闭</div>
          </div>
        </div>
      </transition>
      <transition name="shopMsgAnim">
        <div class="shop_favorable_background" v-show="showShopFavorable">
          <div class="shop_favorable">
            <h1>优惠活动</h1>
            <div class="favorable_list" >
              <section v-for="(item,index) in shopMsg.promotions" :key="index">
                <!-- 徽章 -->
                <span class="badge" :style="{backgroundColor:`${item.color}`}">{{item.name}}</span>
                <!-- 信息 -->
                <span class="msg">{{item.content}}</span>
              </section>
            </div>
            <div class="out" @click="showShopFavorable = false">关闭</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    showShopMsg: false, // 定义显示商铺信息详情
    showShopFavorable: false // 定义显示商铺优惠详情页
  }),
  computed: {
    ...mapState(["shopMsg"])
  }
};
</script>

<style lang="stylus">
@import '../../assets/mixins.styl';

.shop_msg_background {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;

  .shop_msg {
    background: #ffffff;
    position: absolute;
    margin: auto;
    top: 150px;
    right: 30px;
    left: 30px;
    padding-bottom: 25px;
    border-radius: 10px;
    padding-top: 20px;

    .out {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -50px;
      color: #ffffff;
      border: solid 1px #ffffff;
      border-radius: 5px;
      padding: 3px;
      font-size: 14px;
    }

    .shop-msg_4 {
      padding: 0 15px;
      font-size: 15px;
    }

    .shop-msg_3 {
      border: none;
      text-align: center;
      margin: 15px auto;

      span {
        color: rgba(0, 0, 0, 0.5);
        font-size: 15px;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: -30px;
          margin: auto;
          height: 1px;
          width: 20px;
          background: rgba(0, 0, 0, 0.3);
        }

        &::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: -30px;
          margin: auto;
          height: 1px;
          width: 20px;
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }

    .shop-msg_2 {
      display: flex;
      margin-top: 15px;

      div {
        flex: 1;

        h3 {
          color: rgba(0, 0, 0, 0.8);
          font-weight: bold;
          font-size: 15px;
          margin-bottom: 5px;
        }

        span {
        }
      }
    }

    .shop-msg_1 {
      margin: 8px 0;
      text-align: center;
      overflowTest();

      .badge {
        display: inline-block;
        background: #FDE334;
        font-size: 12px;
        font-weight: bold;
        padding: 3px;
      }

      .shop-name {
        font-weight: bold;
        font-size: 20px;
        vertical-align: middle; // 文字对齐方向上下居中
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
  .shopMsgAnim-enter-active, .shopMsgAnim-leave-active{
    transition all 0.5s
  }
  .shopMsgAnim-enter, .shopMsgAnim-leave-to {
    opacity 0
  }
.shop_favorable_background {
  @extend .shop_msg_background;

  .shop_favorable {
    position: absolute;
    margin: auto;
    background: #F5F4F6;
    top: 65%;
    bottom: 0px;
    left: 0;
    right: 0;
    padding-top: 15px;

    .out {
      position: absolute;
      right: 20px;
      top: 10px;
      color: rgba(0, 0, 0, 0.5);
      border: solid 1px rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      padding: 3px;
      font-size: 12px;
    }

    h1 {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }

    .favorable_list {
      position: absolute;
      top: 50px;
      bottom: 0;
      left: 20px;
      right: 20px;
      overflow-x: hidden;
      overflow-y: auto;

      section {
        font-size: 13px;
        line-height: 30px;

        .badge {
          color: #ffffff;
          padding: 3px;
          border-radius: 2px;
        }

        .msg {
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
}

span.space {
  margin: 0 2px;
}

.shop-header {
  height 161px
  .top {
    .bgd {
      width: 100%;
      height: 55px;
      margin-bottom: -55px;
    }

    .head {
      box-shadow: 0px 0px 8px #333333;
      background: #ffffff;
      width: 70px;
      height: 70px;
      margin: 15px auto;
      margin-bottom: 0;
      img {
        width 100%
        height 100%
        z-index 10
      }
    }
  }

  .shop-msg_1 {
    margin: 8px 0;
    text-align: center;
    overflowTest();

    .badge {
      display: inline-block;
      background: #FDE334;
      font-size: 12px;
      font-weight: bold;
      padding: 3px;
    }

    .shop-name {
      font-weight: bold;
      font-size: 20px;
      vertical-align: middle; // 文字对齐方向上下居中
      color: rgba(0, 0, 0, 0.8);
    }

    .arrow {
      display: inline-block;
      border-width: 6px;
      border-style: dashed dashed dashed solid;
      border-color: transparent transparent transparent rgba(0, 0, 0, 0.7);
      vertical-align: middle; // 文字对齐方向上下居中
    }
  }

  .shop-msg_2 {
    color: #6f6f6f;
    font-size: 13px;
    text-align: center;
  }

  .shop-msg_3 {
    width: 80%;
    margin: 5px auto;
    padding: 2px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    height: 16px;

    .badge {
      color: #ffffff;
      font-size: 10px !important;
      font-weight: bold;
      padding: 2px;
      float: left;
    }

    .msg {
      color: #6f6f6f;
      font-size: 10px;
      overflowTest();
      display: block;
      margin-left: 30px;
      margin-right: 60px;
    }

    .favorable {
      color: #6f6f6f;
      font-size: 10px;
      width: 80px;
      float: right;
      overflowTest();
      margin-top: -12px;

      .arrow {
        display: inline-block;
        width: 8px;
        height: 5px;

        div {
          display: inline-block;
          float: right;
          border-width: 4px;
          border-style: solid dashed dashed;
          border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
          vertical-align: middle; // 文字对齐方向上下居中
        }
      }
    }
  }

  .go_back {
    position: absolute;
    top: 14px;
    left: 5px;
    width: 30px;
    height: 30px;

    i {
      color: #ffffff;
      font-size: 25px;
    }
  }
}
</style>