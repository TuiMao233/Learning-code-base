import InitDrag from '../commons/drag'
import $ from 'jquery'
/* lyrics_scroll歌词滑动 */
var slide_drag = InitDrag({// 定义歌词块滑动规则
    mousedown: function (ev) {
        var changeEl = this.lyrics								// 获取需要变化的元素
        var client_y = ev.y;									// 鼠标距离视口
        var domClient_y = changeEl.getBoundingClientRect().y 	// 歌词距离视口
        // 鼠标距离视口 - 目标元素距离视口 = 目标元素内轴
        this.initTop = client_y - domClient_y
    },
    mousemove: function (ev) {
        var client_y = ev.y;									// 鼠标距离视口
        var changeEl = this.lyrics								// 获取需要变化的元素
        var dClient_y = this.getBoundingClientRect().y 			// 歌词距离视口
        var domOffset_y = changeEl.offsetTop					// 歌词离拖动块的距离
        var domOffset_h = changeEl.offsetHeight 				// 歌词宽度
        // 鼠标距离视口 - 拖动块距离视口 = 拖动块内轴
        // 拖动块内轴 - 按下时目标元素内轴 = 鼠标在拖动块内目标元素的位置
        var move_y = client_y - dClient_y - this.initTop
        changeEl.style.top = move_y +'px'
    }
})
var scroll = $('.scroll')[0]
scroll.lyrics = $('.lyrics')[0]
scroll.timer = 0 
slide_drag.ev(scroll, // 开启拖拽
function(){ // 按下回调
    // 清除定时器
    // clearTimeout(this.timer)
    // 关闭时间过度
    this.lyrics.style.transition = 'none'
    // 关闭自动歌词滑动
    // player.lyricDragFool = false
},false,
function(){ // 松开回调
    const $this = this
    console.log(this)
    this.timer = setTimeout(function(){
        // 开启时间过度
        $this.lyrics.style.transition = '0.35s linear'
        // 开启自动歌词滑动
        // player.lyricDragFool = true
    },3000)}
)