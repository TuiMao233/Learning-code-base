<template>
  <div class="shop_assess">
    <div class="content">
      <!-- 商家综合评价 -->
      <div class="assess_msg">
        <div class="left">
          <div class="title">3.5</div>
          <div class="complex">
            综合评价
            <br />
            <div>高于周边商家69.2%</div>
          </div>
        </div>
        <div class="right">
          <section>
            <span>服务态度</span>
            <Star :number="4.1" size="size_36" class="star" />
          </section>
          <section>
            <span>商品态度</span>
            <Star :number="4.3" size="size_36" class="star" />
          </section>
          <section>
            <span>送达时间</span>
            <span class="time">28分钟</span>
          </section>
        </div>
      </div>
      <!-- 用户评价 -->
      <div class="user_assess">
        <section class="types">
          <div @click="showFilter(5,'all')" :class="{active:priceType==='all'}">全部 {{totalAll}}</div>
          <div @click="showFilter(3.5,'ok')" :class="{active:priceType==='ok'}">满意 {{totalOk}}</div>
          <div @click="showFilter(2.5,'no_ok')" :class="{active:priceType==='no_ok'}">不满意 {{totalOnOk}}</div>
        </section>
        <section class="isEmpty_button" :class="{on:isContent}" @click="isContent = !isContent">
          <i>√</i>
          <span>只看有内容的评价</span>
        </section>

        <!-- 评论列 -->
        <div class="assess_list">
          <!-- 一条评论 -->
          <section class="item" v-for="(item, assess_index) in assessFilter" :key="assess_index">
            <!-- 用户头像 -->
            <div class="left_head">
              <img :src="item.head_url" alt />
            </div>
            <div class="right_msg">
              <section class="name_or_time">
                <span class="name">
                  <!-- 名称 -->
                  {{item.username}}
                </span>
                <span class="time">
                  <!-- 时间 -->
                  {{item.time}}
                </span>
              </section>
              <!-- 星星 -->
              <Star class="strt" :number="item.price" size="size_24" />
              <section class="content">
                <!-- 内容 -->
                {{item.content}}
              </section>
              <section class="label">
                <button>
                  <i>
                    <!-- 点赞按钮 -->
                    赞
                  </i>
                </button>
                <!-- 标签 -->
                <span v-for="(item,labels_index) in item.labels" :key="labels_index">{{item}}</span>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BScroll from "@better-scroll/core";
import Star from "../../../components/Star/star";
export default {
  data: () => ({
    priceType: "all", // 筛选类型
    isContent: true, // 是否只看有内容的
    price: 5, // 筛选评分
    scroll:{} // 滑动实例对象
  }),
  mounted() {
    this.getShopAssess(() => this.$nextTick(() => {
      this.scroll = new BScroll(".shop_assess",{click:true})
    }));
  },
  methods: {
    ...mapActions(["getShopAssess"]),
    showFilter(price, priceType) {
      // 筛选评分操作
      this.priceType = priceType;
      this.price = price;
    }
  },
  computed: {
    ...mapState(["shopAssess", "shopMsg"]),
    assessFilter() { // 计算筛选后的内容
      const { price, shopAssess, isContent } = this;
      const assessFilter = shopAssess.filter((item,index)=> {
        if (isContent) { // 只看有内容的
          return item.price <= price && item.content !== ""
        }else {
          return item.price <= price
        }
      })
      // 操作后重新计算滚动值
      this.scroll.refresh && this.$nextTick(()=>this.scroll.refresh())
      return assessFilter
    },
    totalAll() {
      // 所有评论统计
      return this.shopAssess.length;
    },
    totalOk() {
      // 满意评论统计
      return this.shopAssess.filter((item, index) => item.price <= 3.5).length;
    },
    totalOnOk() {
      // 不满意统计
      return this.shopAssess.filter((item, index) => item.price <= 2.5).length;
    }
  },
  components: { Star }
};
</script>

<style lang="stylus">
@import '../../../assets/mixins.styl';

.shop_assess {
  background: #F4F5F7;
  position: absolute;
  top: 200px;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;

  .star {
    display: inline-block;
    float: none;

    .star-item {
      transform: scale(1.5);
      margin-left: 5px;
    }
  }

  .assess_msg { // 商家综合评价
    padding: 15px;
    background: #ffffff;
    display: grid;
    grid-template-columns: 35% 65%;
    bottom-border-1px(rgba(0, 0, 0, 0.3));

    .left {
      text-align: center;
      border-right: solid 1px rgba(0, 0, 0, 0.3);
      margin-top: 5px;

      .title {
        color: #FE9B00;
        font-size: 25px;
        margin-bottom: 5px;
        font-weight: bold;
      }

      .complex { // 综合评价
        font-size: 15px;
        color: rgba(0, 0, 0, 0.9);

        div {
          margin-top: 5px;
          font-size: 10px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }

    .right {
      margin: 0px 20px;
      margin-top: 5px;

      section {
        margin-bottom: 9px;
        color: rgba(0, 0, 0, 0.9);

        span {
          font-size: 14px;
        }

        .time {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }

  .user_assess {
    margin-top: 20px;
    top-border-1px(rgba(0, 0, 0, 0.2));
    background: #ffffff;
  }

  .types { // 评论类型
    padding: 15px;

    div {
      display: inline-block;
      background: #DEDFE1;
      margin-right: 8px;
      padding: 10px;
      font-size: 14px;

      &.active {
        background: #03A574;
        color: #ffffff;
      }
    }
  }

  .isEmpty_button { // 是否只看有内容的评价
    padding-left: 15px;
    padding-bottom: 15px;
    bottom-border-1px(rgba(0, 0, 0, 0.2));

    &.on {
      i {
        background: #08A370;
      }
    }

    i {
      display: inline-block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      text-align: center;
      line-height: 18px;
      box-sizing: border-box;
      color: #ffffff;
      background rgba(0,0,0,.5)
    }

    span {
      font-size: 15px;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  .assess_list {
    .item { // 一条评价
      position: relative;
      padding: 15px;
      bottom-border-1px(rgba(0, 0, 0, 0.2));

      .left_head { // 左侧头像
        position: absolute;

        img {
          display: block;
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
        }
      }

      .right_msg { // 右侧信息
        margin-left: 50px;

        .name_or_time {
          margin-bottom: 5px;

          .name { // 用户名称
            font-size: 15px;
            color: rgba(0, 0, 0, 0.9);
          }

          .time {
            float: right;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.5);
          }
        }

        .strt { // 星
          margin-left: -5px;
          margin-bottom: 8px;
        }

        .content { // 评论内容
          margin-bottom: 5px;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.8);
        }

        .label {
          button { // 按钮
            background: #FC9E09;
            color: #ffffff;
          }

          span { // 标签
            font-size: 13px;
            color: rgba(0, 0, 0, 0.8);
            padding: 0 5px;
            border: solid 1px rgba(0, 0, 0, 0.3);
            line-height: 20px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>