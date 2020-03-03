<template>
  <div>
  <ul>
    <li v-for="x in message" :key='x.id'>
      <router-link :to="`/home/message/MessageDetall/${x.id}`">{{x.title}}</router-link>
      <button @click="pushShow(x.id)">push查看</button>
      <button @click="replaceShow(x.id)">replace查看</button>
    </li>
  </ul><hr>
  <router-view :message='message'></router-view>
</div>
</template>

<script>
  export default {
    data () {
      return {
        message: []
      }
    },
    methods: {
      pushShow (id) {
        this.$router.push(`/home/message/MessageDetall/${id}`)
      },
      replaceShow (id) {
        this.$router.replace(`/home/message/MessageDetall/${id}`)
      }
    },
    mounted () {
      setTimeout(() => {
        this.message = [
          { id: 1, title: 'message001', content: 'message001 content......' },
          { id: 3, title: 'message003', content: 'message003 content......' },
          { id: 7, title: 'message007', content: 'message007 content......' }
        ]
      }, 1000)
    }
  }
</script>

<style>
</style>
