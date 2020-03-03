<template>
  <ul>
    <h4>ID:{{$route.params.id}}</h4>
    <li>id:{{messageDetall.id}}</li>
    <li>title:{{messageDetall.title}}</li>
    <li>content:{{messageDetall.content}}</li>
  </ul>
</template>
<script>
  export default {
    data () {
      return {
        messageDetall: {}
      }
    },
    props: {
      message: Array
    },
    mounted () {
      setTimeout(() => {
        const id = this.$route.params.id * 1
        this.messageDetall = this.message.find(mesage => id === mesage.id)
      }, 1000)
    },
    watch: {
      $route: function (value) {
        if (value.params.id) {
          const id = value.params.id * 1
          this.messageDetall = this.message.find(mesage => id === mesage.id)
        }
      }
    }
  }
</script>

<style>
</style>
