<template>
    <ul>
      <li v-for="(Text, index) in newsAll" :key='index'>{{Text}}</li>
    </ul>
</template>

<script>
  export default {
    data () {
      return {
        newsAll: [ 'news001', 'news002', 'news003', 'news004' ]
      }
    }
  }
</script>

<style>
</style>
