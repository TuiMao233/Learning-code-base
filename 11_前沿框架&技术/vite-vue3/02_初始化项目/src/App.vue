<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld :msg="myName" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
export const myName = ref("Hello Vue 3.0 + Vite");
export { default as HelloWorld } from './components/HelloWorld.vue';
</script>
