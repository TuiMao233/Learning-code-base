<template>
  <li class="list-group-item">
    <div class="handle">
      <a href="javascript:;" @click="delItem">删除</a>
    </div>
    <p class="user"><span>{{comments.name}}</span><span>说:</span></p>
    <p class="centence">{{comments.cont}}</p>
  </li>
</template>

<script>
  export default {
    props: {
      comments: Object,
      delCom: Function,
      index: Number
    },
    methods: {
      delItem () {
        const {comments, index, delCom} = this
        if (window.confirm('确定删除' + comments.name + '的评论吗?')) {
          delCom(index)
        }
      }
    }
  }
</script>

<style>
  li {
    transition: .5s;
    overflow: hidden;
  }

  .handle {
    width: 40px;
    border: 1px solid #ccc;
    background: #fff;
    position: absolute;
    right: 10px;
    top: 1px;
    text-align: center;
  }

  .handle a {
    display: block;
    text-decoration: none;
  }

  .list-group-item .centence {
    padding: 0px 50px;
  }

  .user {
    font-size: 22px;
  }
</style>
