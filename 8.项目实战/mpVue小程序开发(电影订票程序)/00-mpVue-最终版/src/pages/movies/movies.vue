<template>
    <view>
        <navigator
            class="movie"
            v-for="(item, index) in subjects"
            :key="index"
            :url="'/pages/movies_detail/main?index='+index"
        >
            <image :src="item.images.large" />
            <view class="movie_msg">
                <text class="name">{{item.title}}</text>
                <text class="time">年份：{{item.year}}</text>
                <text class="director">导演：{{item.casts[0].name}}</text>
            </view>
            <text class="rating">{{item.rating.average}}</text>
        </navigator>
    </view>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data: ()=> ({
    }),
    computed: {
        ...mapState(['subjects'])
    },
    methods: {
        ...mapActions(['getSubjects'])
    },
    beforeMount() {
        const {query} = this.$root.$mp
        this.getSubjects()
    },
}
</script>

<style>
.movie {
    display: flex;
    padding: 15px 0;
    border-bottom: 1rpx solid rgba(0,0,0,.3);
}

image {
    width: 50px;
    height: 50px;
    padding: 5px;
}
.movie_msg {
    width: 70%;
    display: flex;
    flex-direction: column;
}
.name {
    font-size: 15px;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.time {
    font-size: 13px;
    color: #666;
}
.director {
    font-size: 14px;
    color: #333;
}

.rating {
    color: red;
    font-size: 15px;
    font-weight: bold;
}
</style>