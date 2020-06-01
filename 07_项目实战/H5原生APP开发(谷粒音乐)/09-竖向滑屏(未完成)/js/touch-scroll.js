// 移动端touch滚动封装
/* 
    方案一：利用touchmove修改元素transform实现元素位移, touchend利用duration和function实现手指离开时的一段惯性距离
        Tween算法可以获取每个元素阶段变化的值, 有线性, 贝塞尔.....
        根据touch事件实现业务逻辑
    方案二：使用默认滚动，监听滚动条scroll事件，当到顶部和底部时实现业务逻辑
*/
const touchScroll = new reusableDrag({
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
    },
    touch: {
        start: function (ev) {
        },
        move: function (ev) {
        },
        end: function (ev) {
        }
    },
    /* mouse: {down (ev) {},move (ev) {},up (ev) {}},*/
    delete() {
    }
})
