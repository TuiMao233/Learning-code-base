<template>
  <div>
    <div id="test">
      <span>clicked:{{cliNum}} times, count is {{type}}</span>
      <br />
      <button @click="plus">+</button>
      <button @click="reduce">&nbsp;-</button>
      <button @click="plusOdd">如果是奇数才增加</button>
      <button @click="oneSecPlus">一秒后增加</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapState(['cliNum']),
      ...mapGetters(['type'])
    },
    methods: {
      ...mapActions(['plus', 'reduce', 'plusOdd', 'oneSecPlus'])
    }
  }
</script>

<style>
  #test {
    text-align: center;
    margin-top: 10rem;
  }

  #test>span {
    font-size: 60px;
  }

  #test>button {
    font-size: 50px;
  }
</style>
