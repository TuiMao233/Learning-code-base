<template>
  <section class="jumbotron" >
    <h3 class="jumbotron-heading">搜索 Github 用户</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model='searchName'/>
      <button @click="search">进行搜索</button>
    </div>
  </section>
</template>

<script>
  import PubSub from 'pubsub-js'
  export default {
    data () {
      return {
        searchName: ''
      }
    },
    methods: {
      search () {
        const searchName = this.searchName.trim()
        if (searchName) {
          PubSub.publish('search', searchName)
        }
      }
    }
  }
</script>

<style>
</style>
