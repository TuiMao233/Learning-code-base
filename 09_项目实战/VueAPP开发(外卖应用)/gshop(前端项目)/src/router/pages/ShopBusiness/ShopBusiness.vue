<template>
  <BScroll class="shop-business" :click="true">
    <div class="content">
      <!-- 头部信息 -->
      <div class="header">
        <section class="title">配送信息</section>
        <section class="msg">
          <span class="badge">{{shopMsg.delivery_party}}</span>
          <span>由商家配送提供配送, 约{{shopMsg.delivery_time}}分钟送达, 距离{{shopMsg.distance}}</span>
        </section>
        <section class="cost">配送费￥{{shopMsg.delivery_fee}}</section>
      </div>
      <!-- 优惠活动 -->
      <div class="activity">
        <h1 class="title">活动与服务</h1>
        <div class="favorable_list">
          <section v-for="(item,index) in shopMsg.promotions" :key="index">
            <!-- 徽章 -->
            <span class="badge" :style="{backgroundColor:`${item.color}`}">{{item.name}}</span>
            <!-- 信息 -->
            <span class="msg">{{item.content}}</span>
          </section>
        </div>
      </div>
      <!-- 商家实景 -->
      <div class="shop_img">
        <div class="head">商家实景</div>
        <BScroll class="img_list" :scrollX="true">
          <div class="content">
            <div 
              class="item" 
              v-for="(url, index) in shopMsg.shop_img_url" 
              :key="index"
              :style="{backgroundImage:`url(${url})`}"
            />
          </div>
        </BScroll>
      </div>
      <!-- 商家信息 -->
      <div class="shop_msg">
        <div class="head">商家信息</div>
        <section>
          <h1>品类</h1>
          <span>{{shopMsg.type}}</span>
        </section>
        <section>
          <h1>商家电话</h1>
          <span>{{shopMsg.phone}}</span>
        </section>
        <section>
          <h1>地址</h1>
          <span>{{shopMsg.location}}</span>
        </section>
        <section>
          <h1>营业时间</h1>
          <span>{{shopMsg.business_time}}</span>
        </section>
      </div>
    </div>
  </BScroll>
</template>
<script>
import { mapState } from "vuex";
import BScroll from "../../../libs/@better-scroll-vue";
export default {
  components: {BScroll},
  data: () => ({ isInitScroll: false }),
  computed: { ...mapState(["shopMsg"]) },
  methods: {
  }
};
</script>

<style lang="stylus">
@import '../../../assets/mixins.styl';

.shop-business {
  background: #f4f5f7;
  position: absolute;
  top: 200px;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  .shop_msg {
    background #ffffff
    top-border-1px(rgba(0,0,0,.3))
    bottom-border-1px(rgba(0,0,0,.3))
    .head {
      font-size 18px
      font-weight bold
      padding 15px
      bottom-border-1px(rgba(0,0,0,.2))
    }
    section {
      padding 15px
      bottom-border-1px(rgba(0,0,0,.2))
      h1 {
        display inline
        font-size 15px
      }
      span {
        float right
        font-size 12px
        color rgba(0,0,0,.7)
      }
    }
  }
  .shop_img {
    margin 20px 0
    padding 15px
    background #ffffff
    top-border-1px(rgba(0,0,0,.3))
    bottom-border-1px(rgba(0,0,0,.3))
    .head {
      font-size 18px
      font-weight bold
      margin-bottom 10px
    }
    .img_list {
      height 100px
      width 100%
      overflow hidden
      .content {
        height:100%;
        display inline-flex
      }
      .item {
        height 100%
        width 150px
        margin-left 5px
        background-size cover
      }
      .item:last-child {
        margin-right 5px
      }
    }
  }
  .activity {
    margin-top: 20px;
    position: relative;
    background: #fff;
    top-border-1px(rgba(0, 0, 0, 0.2));
    padding: 10px;

    .title {
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .favorable_list {
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

  .header {
    padding: 10px;
    background: #ffffff;
    bottom-border-1px(rgba(0, 0, 0, 0.3));

    .title {
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .msg {
      font-size: 13px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 10px;

      .badge {
        background: #019AF9;
        padding: 1px 3px;
        color: #ffffff;
        font-weight: bold;
        border-radius: 5px;
        margin-right: 5px;
      }
    }

    .cost {
      font-size: 13px;
      color: rgba(0, 0, 0, 0.7);
    }
  }
}
</style>