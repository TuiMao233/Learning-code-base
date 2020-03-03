<template>
  <div id='app'>
    <div id='searchWarp' class="container">
      <SearchHead />
      <SearchContent />
    </div>
  </div>
</template>

<script>
  import SearchHead from './components/SearchHead.vue'
  import SearchContent from './components/SearchContent.vue'
  export default {
    components: {
      SearchHead,
      SearchContent
    }
  }
</script>

<style>
</style>
