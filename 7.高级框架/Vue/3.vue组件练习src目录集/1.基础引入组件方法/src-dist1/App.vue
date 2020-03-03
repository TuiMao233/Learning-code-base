<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对React的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="comments">
      <Subcont :addCont='addCont' />
      <Cont :comments='comments' :delCom='delCom' />
    </div>
  </div>
</template>

<script>
  import Subcont from './components/Subcont'
  import Cont from './components/Cont'
  export default {
    data () {
      return {
        comments: [
          {name: 'BOB', cont: 'Vue 还不错'},
          {name: 'Cat', cont: 'Vue So Easy'},
          {name: 'BZ', cont: 'Vue So So'}
        ]
      }
    },
    components: {
      Subcont,
      Cont
    },
    methods: {
      addCont (comt) {
        this.comments.unshift(comt)
      },
      delCom (index) {
        this.comments.splice(index, 1)
      }
    }
  }
</script>

<style>

</style>
