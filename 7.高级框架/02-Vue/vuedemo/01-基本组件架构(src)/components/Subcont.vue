<template>
  <div class="col-md-4">
    <form class="form-horizontal">
      <div class="form-group">
        <label>用户名</label>
        <input v-model="userName" type="text" class="form-control" placeholder="用户名">
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <textarea v-model="userCont" class="form-control" rows="6" placeholder="评论内容"></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button @click="sumCont" type="button" class="btn btn-default pull-right">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userName: '',
        userCont: ''
      }
    },
    methods: {
      sumCont () {
        const name = this.userName.trim()
        const cont = this.userCont.trim()
        if (!name || !cont) {
          alert('姓名或内容不能为空')
          return false
        }
        const comment = {
          name,
          cont
        }
        this.addCont(comment)
        this.userName = ''
        this.userCont = ''
      }
    },
    props: {
      addCont: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style>
  .reply {
    margin-top: 0px;
  }
</style>
