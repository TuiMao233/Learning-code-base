<template>
<div id="app" class="container">
  <h1>Hello App!</h1>
   <router-link class="routLink" to="/about">Go to about</router-link>
   <router-link class="routLink" to="/home">Go to home</router-link>
   <a @click="$router.back()" class="routLink">回退</a>
  <keep-alive>
    <router-view class="w"></router-view>
  </keep-alive>
</div>
</template>
<script>
  export default {
  }
</script>

<style>
  #app {
    margin-top: 20px;
    border: solid black 1px;
    position: relative;
    width: 500px;
    height: 370px;
  }
  .routLink {
    display: block;
    text-align: center;
    line-height: 40px;
    margin: 5px;
    width: 100px;
    height: 40px;
    border: #000000 solid 1px;
    cursor: pointer;
  }
  .w {
    width: 300px;
    height: 142px;
    margin: 0 auto;
    margin-left: 180px;
    margin-top: -180px;
  }
  .active {
    color: red !important;
  }
</style>
