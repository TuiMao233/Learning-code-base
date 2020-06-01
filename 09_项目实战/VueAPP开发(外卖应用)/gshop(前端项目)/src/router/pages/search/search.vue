<template>
   <div class="search">
    <HeaderTop>
      <div class="center" slot='center'>搜索</div>
    </HeaderTop>
    <div class='search_from' name="search">
      <input type="search" placeholder="请输入商家或美食名称" v-model="searchText">
      <input type="submit" value="提交" @click="search">
    </div>
    <NearbyShops :shops="searchShops"></NearbyShops>
  </div>
</template>

<script>
import HeaderTop from '../../../components/HeaderTop/HeaderTop'
import NearbyShops from '../../../components/NearbyShop/NearbyShops';
import { mapActions,mapState } from "vuex";
export default {
  data: () => ({
    searchText:''
  }),
  computed: {
    ...mapState(['searchShops'])
  },
  methods: {
    ...mapActions(['getSearchShops']),
    search () { // 进行搜索
      if(this.searchText.trim()){
        this.getSearchShops(this.searchText)
      }
    }
  },
  components: { HeaderTop,NearbyShops }
}
</script>

<style lang='stylus'>
  @import '../pages'
    .search_from {
      display block
      margin-top 45px
      background-color rgb(255,255,255)
      height 59px
      text-align center
      line-height 59px
      input[type='search'] {
        font-weight bold
        font-size 15px
        width 75%
        height 35px
        border-radius 5px
        background-color #f2f2f2
        margin-right 5px
      }
      input[type='submit'] {
        font-weight bold
        width 18%
        height 35px
        color #ffffff
        border-radius 5px
        background-color rgb(2,167,116)
      }
    }
</style>