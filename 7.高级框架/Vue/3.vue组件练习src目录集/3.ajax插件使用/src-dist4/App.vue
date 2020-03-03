<template>
  <div id="App">
    <div v-if="!repoUrl">获取中.......</div>
    <div v-else>获取成功,最受欢迎的是<a :href="repoUrl">{{repoName}}</a></div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        repoUrl: '',
        repoName: ''
      }
    },
    mounted () {
      const url = 'https://api.github.com/search/repositories?q=v&sort=stars'
      // 使用Resource发送ajax请求获取数据
     this.$http.get(url).then(
        // 获取成功则调用这个函数
        responseOk => {
          // 获取github中搜索完毕返回的数据
          const dataResult = responseOk.data
          // 获取第一个,及最受欢迎的
          const sortWen = dataResult.items[0]
          // 读取他的地址,以及名字
          this.repoUrl = sortWen.html_url
          this.repoName = sortWen.name
        },
        // 获取失败则调用这个函数
        responseKo => {
          alert('获取失败')
        }
      )
      // 使用axios发送ajax请求获取数据
      axios.get(url).then(responseOk => {
        const dataResult = responseOk.data
        const sortWen = dataResult.items[0]
        this.repoUrl = sortWen.html_url
        this.repoName = sortWen.name
      }).catch(error => {
        alert('失败了')
      })
      
      
    }
    
  }
</script>

<style>
</style>
