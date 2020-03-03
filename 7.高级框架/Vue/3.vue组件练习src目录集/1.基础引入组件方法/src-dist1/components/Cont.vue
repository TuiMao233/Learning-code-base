<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 v-show="!comments.length">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <Item v-for='(comments,index) in comments' :key='index' :comments='comments' :index='index' :delCom='delCom' />
    </ul>
  </div>
</template>

<script>
  import Item from './Item.vue'
  export default {
    components: {
      Item
    },
    props: ['comments', 'delCom']
  }
</script>

<style>
</style>
