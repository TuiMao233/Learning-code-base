$(function(){
	function undone(str='功能未完成') {
		if($('.undone')[0]){return}
		var $div = $(`<div>${str}</div>`)
		$div.addClass('undone')
		$('body').append($div)
		var timer = setTimeout(()=>{
			$div.fadeOut(600, function () {
			    $div.remove()
			});
		},300)	
	}
	$('.player_logo').click(function(){ // 左logo
		undone()
	})
	$('.downloadBut').click(function(){ // 下载客户端
		undone()
	})
	$('.user').click(function(){ // // 用户信息
		undone()
	})
	$('.setUp').click(function(){ // 设置
		undone()
	})
	$('.dropOut').click(function(){ // 退出
		undone()
	})
	$('.favorite').click(function(){ // 收藏
		undone()
	})
	$('body').delegate('.addTo', 'click', function(){ // 添加到
		undone()
	})
	$('body').delegate('.down', 'click', function(){ // 下载
		undone()
	})
	$('.delete').click(function(){ // 删除
		delSong()
	})
	$('.paly_list_head .but').click(function(){ // 歌曲全选/全不选
		var $but = $(this)
		var status = $but.attr('class').replace('but ','')
		if(status == 'false') { // 全选
			this.className = 'but true'
			$('.paly_list_item .but').attr('class','but true')
		}else{	// 全不选
			this.className = 'but false'
			$('.paly_list_item .but').attr('class','but false')
		}
	})
	$('.playlist').delegate('.paly_list_item', 'dblclick', function(){ // 双击列表播放
		player.playlistUpdate($(this)[0].index)
	})
	$('body').delegate('.listplay', 'click', function(){ // 列表音乐播放按钮
		var index = $(this).parents('.paly_list_item')[0].index
		player.playlistUpdate(index)
	})
	$('body').delegate('.paly_list_item .but', 'click', function(){ // 歌曲单选
		var $but = $(this)
		var status = $but.attr('class').replace('but ','')
		if(status == 'false') { // 选
			$(this).attr('class','but true')
		}else{	// 不选
			$(this).attr('class','but false')
		}
	})
	$('body').delegate('.shareit', 'click', function(){ // 分享
		undone()
	})
	$('.albumArt a').click(function(){ // 头像
		undone()
	})
	$('.songName').click(function(){ // 歌曲名
		undone()
	})
	$('.singerName').click(function(){ // 歌手名
		undone()
	})
	$('.albumName').click(function(){ // 专辑名
		undone()
	})
	$('.delLists').click(function(){ // 清空列表
		delSong(true)
	})
	$('.prev').click(function(){ // 上一曲
		player.playlistUpdate(--player.songIndex)
	})
	$('.stop,.play').click(function(){ // 播放/暂停
		var $but = $(this)
		var status = $but.attr('class')
		if(status == 'stop'){ // 播放
			$but.attr('class','play')
			$but.children('i')[0].style.display = 'none'
			$but.children('i')[1].style.display = 'inline-block'
			console.log('play')
			player.play()
		}else{ // 暂停
			$but.attr('class','stop')
			$but.children('i')[0].style.display = 'inline-block'
			$but.children('i')[1].style.display = 'none'
			console.log('stop')
			player.stop()
		}
	})
	$('.next').click(function(){ // // 下一曲
		player.playlistUpdate(++player.songIndex)
	})
	$('.playOrder').click(function(){ // 歌曲播放顺序
		var $but = $(this)
		var status = $but.attr('class').replace('playOrder ','')
		if(status == 'oneCycle'){ // 单曲循环
			$(this).attr('class','playOrder cycle')
		}
		if(status == 'cycle'){ // 循环
			$(this).attr('class','playOrder order')
		}
		if(status == 'order'){ // 顺序
			$(this).attr('class','playOrder random')
		}
		if(status == 'random'){ // 随机
			$(this).attr('class','playOrder oneCycle')
		}
		undone()
	})
	$('.like').click(function(){ // 喜爱
		var $but = $(this)
		var status = $but.attr('class').replace('like ','')
		if(status == 'false') { // 喜欢
			$(this).attr('class','like true')
		}else{	// 取消喜欢
			$(this).attr('class','like false')
		}
		undone()
	})
	$('.download').click(function(){ // 下载音频
		undone()
	})
	$('.comment').click(function(){ // 评论
		undone()
	})
	$('.pure').click(function(){ // // 纯净模式
		var $but = $(this)
		var status = $but.attr('class').replace('pure ','')
		if(status == 'off'){ // 开
			$(this).attr('class','pure on')
		}else{ // 关
			$(this).attr('class','pure off')
		}
		undone()
	})
	$('.horn').click(function(){ // 开/关音量
		var $but = $(this)
		var status = $but.attr('class').replace('horn ','')
		var audio = player.audio
		var $voldrag = $('.volume_bar .drag-box')
		var $vol_ball = $('.volume_bar .drag-box .ball')
		var precVal
		if(status == 'false') { // 开
			$but.attr('class','horn true')
			audio.volume = player.volume ? player.volume : 0.3 ,// 判断上次的音量
			// 更新音量条偏移量
			precVal = $voldrag.width() * audio.volume
			$vol_ball.css('left',precVal+'px')
		}else{	// 关
			$but.attr('class','horn false')
			player.volume = audio.volume
			audio.volume = 0
			$vol_ball.css('left','0px')
		}
	})
	function selectIndex (){ // 返回选中的索引
		var arr = []
		$('.paly_list_item').map(function(index, item){
			var strfool = $(item).children('.but').attr('class').replace('but ','')
			if(strfool == 'true'){
				arr.push($(item).index)
			}
		})
		return arr
	}
	function delSong (fool=false){ // 删除选中的歌曲// fool为true时则全部删除
		$('.paly_list_item').map(function(index, item){
			var strfool = $(item).children('.but').attr('class').replace('but ','')
			if(fool){
				$(item).remove()
			}else if(strfool == 'true'){
				$(item).remove()
			}
			
		})
	}
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
		clearTimeout(this.timer)
		// 关闭时间过度
		this.lyrics.style.transition = 'none'
		// 关闭自动歌词滑动
		player.lyricDragFool = false
	},false,
	function(){ // 松开回调
		$this = this
		console.log(this)
		this.timer = setTimeout(function(){
			// 开启时间过度
			$this.lyrics.style.transition = '0.35s linear'
			// 开启自动歌词滑动
			player.lyricDragFool = true
		},3000)
	})
	
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
	function(dragRect){ // 按下事件回调 接收拖动块信息
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
	})
	
	/* volume_bar音量进度条 */
	var vol_ball = $('.volume_bar .drag-box')[0]
	vol_ball.changeEl = $('.volume_bar .drag-box .ball')[0]
	prog_drag.ev(vol_ball,false,function(dragRect){ // 移动事件回调 接收拖动块信息
		// 移动百分比[0,1]
		var perc = dragRect.x / (dragRect.width/100) / 100 
		if(perc<0){perc=0}; if(perc>1){perc=1};
		player.audio.volume = perc
	})
	
})
