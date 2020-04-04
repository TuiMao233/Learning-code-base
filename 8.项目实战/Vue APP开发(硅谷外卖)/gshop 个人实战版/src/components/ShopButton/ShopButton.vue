<template>
  <div class="in_de_cdy">
    <span class="cdy_add" @click="inOrDeGood({fool:true, good})">+</span>
    <transition name="showAnim">
      <span class="number" v-if="good.count && good.count !== 0">{{good.count}}</span>
    </transition>
    <transition name="showAnim">
      <span
        class="cdy_de"
        v-if="good.count && good.count !== 0"
        @click="inOrDeGood({fool:false, good})"
      >-</span>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props:{good:Object},
    methods: {
        ...mapActions(['inOrDeGood'])
    },
};
</script>

<style lang="stylus">
@import '../../assets/mixins.styl';
.in_de_cdy {
  float: right;
  clearfix();

  .cdy_add { // 添加商品按钮
    display: block;
    border-radius: 50%;
    width: 21px;
    height: 21px;
    font-size: 18px;
    background: #00AE76;
    text-align: center;
    color: #ffffff;
    float: right;
    line-height 21px
  }

  .number {
    display: block;
    float: right;
    width: 21px;
    height: 21px;
    line-height: 21px;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
  }

  .cdy_de {
    display: block;
    border-radius: 50%;
    width: 21px;
    height: 21px;
    font-size: 18px;
    background: #47af8d;
    text-align: center;
    color: #ffffff;
    float: right;
    line-height 21px
  }

  // 消失动画
  .showAnim-enter-active, .showAnim-leave-active {
    transition: all 0.5s;
  }

  .showAnim-enter, .showAnim-leave-to {
    transform: translateX(21px) rotate(360deg);
    opacity: 0;
  }
}
</style>