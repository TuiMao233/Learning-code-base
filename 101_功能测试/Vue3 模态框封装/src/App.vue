<!--
 * @Author: Mr.Mao
 * @Date: 2021-06-16 18:35:22
 * @LastEditTime: 2021-06-17 16:42:01
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <img alt="Vue logo" src="./assets/logo.png" @click="show = true" />
  <modal @clone="onClone" @confirm="onConfirm" v-model="show" >
    啦啦啦我是自定义内容
  </modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Modal from './components/Modal/index.vue';

export default defineComponent({
  components: { Modal },
  setup: () => {
    const show = ref(false)
    const onClone = () => {
      console.log('模态框点击关闭')
    }
    const onConfirm = () => {
      console.log('模态框点击确认')
    }
    return { onClone, onConfirm, show }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
