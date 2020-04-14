<template>
      <view class="list" >
        <text class="headText">{{listData.title}}</text>
        <view 
            class="image" 
            :style="{backgroundImage:'url(/static'+listData.detail_img+')'}"
        />
        <view class="content" >
            {{listData.detail_content}}
        </view>
        <view class="collect"><!-- 收藏 -->
            <image class="icon" src="/static/images/icon/star.png"/>
            <text class="number">{{listData.love_count}}</text>
        </view>
        <view class="watch">
            <!-- 观看量 -->
            <image class="icon" src="/static/images/icon/view.png"/>
            <text class="number">{{listData.attention_count}}</text>
        </view>
    </view>
</template>

<script>
export default {
    props:['listData','index']
}
</script>

<style>
.list {
    margin-top: 20rpx;
}
.headText {
    font-weight: bold;
}
.image {
    margin-top: 20rpx;
    width: 100%;
    height: 450rpx;
    background-size: cover;
    background-position: center;
}
.content {
    font-size: 13.5px;
    width: 100%;
    height: 90px;
    overflow: hidden; text-overflow:ellipsis;
}
.collect, .watch {
    display: inline-block;
    margin-right: 10px;
}
.icon {
    width: 15px;
    height: 15px;
    vertical-align: middle;
}
.number {
    font-size: 12px;
}
</style>