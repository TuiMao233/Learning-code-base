<template>
  <div class="nearby-shop">
    <div class="shop_container" v-if="shops.length !== 0">
      <div 
        v-for="(shop, index) in shops" 
        :key="index" 
        class="shop_item"
        @click="$router.push('/shop_msite')"
      >
        <!-- 商家图片 -->
        <img class="shop_img" :src="shop.image_path" />

        <!-- 右侧信息 -->
        <div class="shop_right">
          <!-- 店铺名称 -->
          <section class="shop_detail_header">
            <div class="shop_title">
              <span>品牌</span>
              {{shop.name}}
            </div>
            <ul class="shop_detail_ul">
              <li class="supports">保</li>
              <li class="supports">准</li>
              <li class="supports">票</li>
            </ul>
          </section>
          <!-- 店铺评价 -->
          <section class="shop_rating_order">
            <div class="shop_rating_order_left">
              <Star :number="3.5" size="size_24" />
              <div class="order_section">月售{{shop.float_minimum_order_amount}}单</div>
            </div>

            <div class="shop_rating_order_right">
              <span class="delivery_style">{{shop.delivery_mode.text}}</span>
            </div>
          </section>
          <!-- 配送信息 -->
          <section class="shop_distance">
            <p class="shop_delivery_msg">
              <span>¥20起送</span>
              <span class="segmentation">/</span>
              <span>配送费约¥{{shop.float_delivery_fee}}</span>
            </p>
          </section>
        </div>
      </div>
    </div>
    <div class="shop_container_error" v-else>暂无搜索结果</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Star from "../../components/Star/star";
export default {
  props: { shops: Array },
  components: { Star }
};
</script>

<style lang="stylus">
@import '../../assets/mixins.styl';

.nearby-shop {
  .shop_container_error {
    text-align: center;
    margin-top: 20px;
    background: none;
  }

  .shop_container {
    background: #ffffff;

    .shop_item {
      clearfix();
      display: block;
      box-sizing: border-box;
      padding: 15px 8px;
      width: 100%;

      .shop_img {
        display: block;
        float: left;
        box-sizing: border-box;
        width: 23%;
        height: 75px;
        padding-right: 10px;
      }

      .shop_right {
        float: right;
        width: 77%;

        .shop_detail_header {
          clearfix();

          .shop_title {
            float: left;
            width: 140px;
            color: #333;
            font-size: 16px;
            line-height: 16px;
            font-weight: 700;
            overflowTest();

            span {
              display: inline-block;
              font-size: 11px;
              line-height: 11px;
              color: #333;
              background-color: #ffd930;
              padding: 2px 2px;
              border-radius: 2px;
              margin-right: 5px;
            }
          }

          .shop_detail_ul {
            float: right;
            margin-top: 3px;
            clearfix();

            .supports {
              float: left;
              font-size: 10px;
              color: #999;
              border: 1px solid #f1f1f1;
              padding: 0 2px;
              border-radius: 2px;
            }
          }
        }

        .shop_rating_order {
          clearfix();
          width: 100%;
          margin-top: 18px;
          margin-bottom: 8px;

          .shop_rating_order_right {
            float: right;
            font-size: 0;

            .delivery_style {
              color: #02a774;
              border: 1px solid #02a774;
              transform-origin: 35px 0;
              transform: scale(0.7);
              display: inline-block;
              font-size: 12px;
              padding: 1px;
              border-radius: 2px;
            }
          }
        }

        .shop_distance {
          clearfix();

          .shop_delivery_msg {
            display: block;
            float: left;
            transform-origin: 0;
            transform: scale(0.7);
            color: #666;

            span {
              color: #666;

              &.segmentation {
                color: #ccc;
              }
            }
          }
        }
      }
    }
  }
}
</style>