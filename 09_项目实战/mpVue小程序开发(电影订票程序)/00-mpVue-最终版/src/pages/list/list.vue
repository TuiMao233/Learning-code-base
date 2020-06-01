<template>
  <div>
      <swiper indicator-dots autoplay circular>
          <block v-for="(item, index) in swiperImages" :key="index">
              <swiper-item>
                  <image mode="aspectFill" class="swiper_image" :src="item"></image>
              </swiper-item>
          </block>
      </swiper>
      <navigator
        :url="'/pages/detail/main?index='+index"
        hover-class="none"
        v-for="(item, index) in listDatas"
        :key="index"
       >
        <ListTemp  :listData="item" :index="idnex"/>
      </navigator>
  </div>
</template>
<script>
import ListTemp from '../list_template/list_template'
import listDatas from '../../datas/list-data'
import { mapActions,mapState } from "vuex";
export default {
    data: () => ({
        swiperImages: [
            '/static/images/detail/carousel/01.jpg',
            '/static/images/detail/carousel/02.jpg',
            '/static/images/detail/carousel/03.jpg',
            '/static/images/detail/carousel/04.jpg'
        ],
    }),
    mounted() {
        this.receiveListDatas(listDatas)
    },
    computed: {
        ...mapState(['listDatas'])
    },
    methods: {
        ...mapActions(['receiveListDatas'])
    },
    components: {ListTemp},
}
</script>
<style>
swiper {
    
}
.swiper_image {
    width: 100%;
    height: 100%;
}
</style>