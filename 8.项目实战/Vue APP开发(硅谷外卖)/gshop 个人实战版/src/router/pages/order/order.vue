<template>
  <div class="order">
    <HeaderTop>
      <div class="center" slot="center">订单</div>
    </HeaderTop>
    <div class="order_no_login" v-show="!user.name">
      <img src="./img/person.png" alt />
      <h3>登录后查看外卖订单</h3>
      <button @click="$router.push('/login')">立即登录</button>
    </div>
  </div>
</template>

<script>
import HeaderTop from '../../../components/HeaderTop/HeaderTop';
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"])
  },
  mounted() {
  },
  components: { HeaderTop }
};
</script>

<style lang='stylus'>
@import '../pages';

.order {
  .order_no_login {
    position: absolute; top: 20%; right: 0; bottom: 0; left: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding-bottom 15px
    img {
      display: block;
      margin: 0 auto;
      width: 255px;
      height: 255px;
    }

    h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }
    button {
      outline none
      border none
      margin 0 auto
      width 96px
      height 39px
      border-radius 5px
      background #02a774
      color #ffffff
    }
  }
}
</style>