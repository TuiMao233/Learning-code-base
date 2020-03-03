import InitDrag from '../commons/drag'
import $ from 'jquery'
/* progress_bar歌曲进度条 */
var prog_drag = InitDrag({//定义进度条拖拽规则 
    mousedown: function(ev){ 
        var client_x = ev.x;										// 鼠标距离视口
        var changeEl = this.changeEl							// 获取需要变化的元素
        var domClient_x = changeEl.getBoundingClientRect().x 	// 小方块距离视口
        var domOffset_x = changeEl.offsetLeft 					// 离父元素的距离
        var domOffset_w = changeEl.offsetWidth 					// 小方块宽度
        changeEl.style.left = domOffset_x + client_x - domClient_x - domOffset_w/2 +'px'
    },
    mousemove: function (ev) { 
        var client_x = ev.x;										// 鼠标距离视口
        var changeEl = this.changeEl							// 获取需要变化的元素
        var domClient_x = changeEl.getBoundingClientRect().x 	// 小方块距离视口
        var domOffset_x = changeEl.offsetLeft 					// 离父元素的距离
        var domOffset_w = changeEl.offsetWidth 					// 小方块宽度
        // 鼠标距离 - 小方块到视口距离 - 小方块宽度/2 + 小方块离父元素距离 
        var move_x = client_x - domClient_x - domOffset_w/2 + domOffset_x
        // 让目标元素永远保持在父元素内
        if(move_x < 0) {move_x = 0}
        move_x = move_x > this.offsetWidth ? this.offsetWidth : move_x,
        // 执行变化
        changeEl.style.left = (move_x) + "px";
    }
})
var pro_drag = $('.progress_bar .drag-box')[0]
pro_drag.changeEl = $('.progress_bar .drag-box .ball')[0]
prog_drag.ev(pro_drag, // 开启拖拽
/* function(dragRect){ // 按下事件回调 接收拖动块信息
    clearInterval(player.timer)
},
function(dragRect){ // 移动事件回调 接收拖动块信息
    // 移动百分比
    var perc = dragRect.x / (dragRect.width/100) 
    // 音频总时间
    var duration = player.audio.duration 
    // 移动百分比 * 总时间百分比 在调用播放器的秒数转00:00函数
    $('time .being').text(player.converTimeFormat(perc * (duration / 100)))
},
function(dragRect){ // 松开事件回调 接收拖动块信息
    // 移动百分比
    var perc = dragRect.x / (dragRect.width/100)
    // 音频总时间
    var duration = player.audio.duration 
    // 更改时间
    player.audio.currentTime = perc * duration/100 
    // 储存以前歌词索引,以便于调整歌词索引
    lyric.negIndex =  lyric.index
    // 开启同步
    player.synch()
    if(player.audio.paused == true){ // 如果播放器是没有播放的状态, 那么过2秒停止同步器
        clearInterval(player.timer)
    }
} */
)

/* volume_bar音量进度条 */
var vol_ball = $('.volume_bar .drag-box')[0]
vol_ball.changeEl = $('.volume_bar .drag-box .ball')[0]
prog_drag.ev(vol_ball,false,function(dragRect){ // 移动事件回调 接收拖动块信息
    // 移动百分比[0,1]
    /* var perc = dragRect.x / (dragRect.width/100) / 100 
    if(perc<0){perc=0}; if(perc>1){perc=1};
    player.audio.volume = perc */
})