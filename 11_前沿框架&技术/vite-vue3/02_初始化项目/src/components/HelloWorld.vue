<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
    <p>
      Edit <code>components/HelloWorld.vue</code> to test hot module
      replacement.
    </p>
    {{ computedMsg }}
  </div>
</template>

<script setup="props" lang="ts">
import { ref } from "vue";
declare const props: {
  msg: string
}
export const count = ref(0)
export const inc = () => count.value++

if (count.value === 0) {
  count.value++
}

</script>