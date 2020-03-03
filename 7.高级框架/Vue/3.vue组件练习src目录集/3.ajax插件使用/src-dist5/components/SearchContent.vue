<template>
  <div class="row">
    <h2 v-if="searchHint">输入用户名进行搜索</h2>
    <h2 v-if="loading">LOADING.......</h2>
    <h2 v-if="errorMag">{{errorMag}}</h2> <!-- 如果错误信息有值 则显示 -->
    <div class="card" v-for='(user,index) in user' :key='index'>
      <a :href="user.url" target="_blank">
        <img :src="user.portUrl" style='width: 100px' />
      </a>
      <p class="card-text">{{user.name}}</p>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import axios from 'axios'
  export default {
    data () {
      return {
        searchHint: true, // 状态一：初始化显示
        loading: false, // 状态二：加载中
        user: null, // 状态三：显示信息 [{url:'',portUrl:'',name:''}]
        errorMag: '' // 状态四：错误信息
      }
    },
    mounted () {
      PubSub.subscribe('search', (msg, searchName) => {
        const url = 'https://api.github.com/search/users?q=' + searchName
        // 加载时状态
        this.user = null
        this.searchHint = false
        this.loading = true

        // 加载完成状态
        axios.get(url).then(response => {
          this.user = response.data.items.map((items) => ({
            url: items.html_url,
            name: items.login,
            portUrl: items.avatar_url
          }))
          this.searchHint = false
          this.loading = false
          // 加载失败状态
        }).catch(error => {
          this.searchHint = false
          this.loading = false
          this.errorMag = '请求失败'
        })
      })
    }
  }
</script>

<style>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card>img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>
