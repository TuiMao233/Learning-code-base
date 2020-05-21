<template>
  <div class="good_msg_background" @click="shopGoodMsg(false)">
    <div class="good_msg" @click.stop>
      <section class="top"  :style="{backgroundImage:`url(${good.head_img_src})`}">
        <!-- 商品图片, 商品配方详情 -->
          <div class="good_recipe">主、辅料:水、大米、南瓜、冰糖等</div>
      </section>
      <section class="middle">
        <section class="good_name">{{good.name}}</section>
        <section class="good_sales_grade">
          月售{{good.sales}}份 &nbsp;&nbsp;
          好评率{{good.praise_rate}}
        </section>
      </section>
      <section class="bottom">
        <span class="price">￥{{good.price}}</span>
        <ShopButton :good="good"/>
      </section>
    </div>
  </div>
</template>

<script>
import ShopButton from '../ShopButton/ShopButton';
export default {
    props:{
        good:Object,
        shopGoodMsg:Function
    },
    components: {ShopButton}
};
</script>
<style lang="stylus">
.good_msg_background {
    position absolute;top 0;bottom 0;right 0;left 0;
    background rgba(0,0,0,.5);z-index 100
    .good_msg{
        position absolute;top 50px;left 40px;right 40px
        background #ffffff;border-radius 12px
        .top {
            border-top-right-radius 12px
            border-top-left-radius 12px
            height 230px;position relative
            background-size cover
            .good_recipe {
                position absolute;bottom 10px;left 10px
                color #ffffff;font-size 12px
            }
        }
        .middle {
            margin 15px
            .good_name {
                font-size 17px;font-weight bold
                margin-bottom 8px
            }
            .good_sales_grade {
                color rgba(0,0,0,.7); font-size 12px
            }
        }
        .bottom {
            margin 15px
            margin-top 20px
            .price {
                color #FF2913
            }
        }
    }
}
</style>
