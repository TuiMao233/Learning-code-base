<template>
  <div class="nearby-shop">
    <div class="shop_header">
      <i class="iconfont icon-xuanxiang"></i>
      <span class="shop_header_title">附近商家</span>
    </div>
    <div class="shop_container">
      <div class="shop_item">
        <!-- 商家图片 -->
        <img class="shop_img" />

        <!-- 右侧信息 -->
        <div class="shop_right">
          <!-- 店铺名称 -->
          <section class="shop_detail_header">
            <div class="shop_title">
              <span>品牌</span>锄禾日当午，汗滴禾下土
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
              <!-- 星星数量 -->
              <div class="star">
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item half"></span>
                <span class="star-item off"></span>
              </div>
              <!-- 评分 -->
              <div class="rating_section">3.6</div>
              <div class="order_section">月售106单</div>
            </div>

            <div class="shop_rating_order_right">
              <span class="delivery_style">硅谷专送</span>
            </div>
          </section>
          <!-- 配送信息 -->
          <section class="shop_distance">
            <p class="shop_delivery_msg">
              <span>¥20起送</span>
              <span class="segmentation">/</span>
              <span>配送费约¥5</span>
            </p>
          </section>
        </div>
      
      </div>
      <div class="shop_item">
        <!-- 商家图片 -->
        <img class="shop_img" />

        <!-- 右侧信息 -->
        <div class="shop_right">
          <!-- 店铺名称 -->
          <section class="shop_detail_header">
            <div class="shop_title">
              <span>品牌</span>锄禾日当午，汗滴禾下土
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
              <!-- 星星数量 -->
              <div class="star">
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item half"></span>
                <span class="star-item off"></span>
              </div>
              <!-- 评分 -->
              <div class="rating_section">3.6</div>
              <div class="order_section">月售106单</div>
            </div>

            <div class="shop_rating_order_right">
              <span class="delivery_style">硅谷专送</span>
            </div>
          </section>
          <!-- 配送信息 -->
          <section class="shop_distance">
            <p class="shop_delivery_msg">
              <span>¥20起送</span>
              <span class="segmentation">/</span>
              <span>配送费约¥5</span>
            </p>
          </section>
        </div>
      
      </div>
      <div class="shop_item">
        <!-- 商家图片 -->
        <img class="shop_img" />

        <!-- 右侧信息 -->
        <div class="shop_right">
          <!-- 店铺名称 -->
          <section class="shop_detail_header">
            <div class="shop_title">
              <span>品牌</span>锄禾日当午，汗滴禾下土
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
              <!-- 星星数量 -->
              <div class="star">
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item on"></span>
                <span class="star-item half"></span>
                <span class="star-item off"></span>
              </div>
              <!-- 评分 -->
              <div class="rating_section">3.6</div>
              <div class="order_section">月售106单</div>
            </div>

            <div class="shop_rating_order_right">
              <span class="delivery_style">硅谷专送</span>
            </div>
          </section>
          <!-- 配送信息 -->
          <section class="shop_distance">
            <p class="shop_delivery_msg">
              <span>¥20起送</span>
              <span class="segmentation">/</span>
              <span>配送费约¥5</span>
            </p>
          </section>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
@import '../../units/units.styl';

.nearby-shop {
  background: #ffffff;

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

  .shop_container {
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

          .shop_rating_order_left {
            .star { // 星星
              float: left;
              font-size: 0;

              .star-item {
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-right: 3px;
                background-size: 10px 10px;

                @media only screen and (-webkit-device-pixel-ratio: 2) {
                  &.on { // 满星
                    background-image: url('./img/stars/star24_on@2x.png');
                  }

                  &.half { // 半星
                    background-image: url('./img/stars/star24_half@2x.png');
                  }

                  &.off { // 空星
                    background-image: url('./img/stars/star24_off@2x.png');
                  }
                }

                @media only screen and (-webkit-device-pixel-ratio: 3) {
                  &.on { // 满星
                    background-image: url('./img/stars/star24_on@3x.png');
                  }

                  &.half { // 半星
                    background-image: url('./img/stars/star24_half@3x.png');
                  }

                  &.off { // 空星
                    background-image: url('./img/stars/star24_off@3x.png');
                  }
                }
              }
            }

            .rating_section {
              float: left;
              font-size: 10px;
              color: #ff6000;
              margin-left: 4px;
            }

            .order_section {
              float: left;
              font-size: 10px;
              color: #666;
              transform: scale(0.8);
            }
          }

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