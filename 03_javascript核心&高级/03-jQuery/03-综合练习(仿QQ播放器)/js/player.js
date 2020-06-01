function Player(audio) { // 播放器初始化构造函数
		return  new Player.prototype.init(audio)
	}
Player.prototype = {
	init: function (audio) {// 初始化构造
			this.audio = audio
		},
	songIndex: 7,// 定义歌词索引
	data: {},// 定义歌单数据
	volume: 0.5, // 定义音量储存
	initSongDate: function (url, callback) { // 获取歌单数据
			$this = this
			$.ajax({ // 获取数据
				url:'./source/songlist.json',
				dataType: 'json',
				success: function(data){
					$this.songDataPars(data)
					callback.call($this,$this.data)
				},error: function (error){}
			})
		},
	songDataPars: function (data) { // 歌单解析
			this.data = data.map((item, index)=>{
				// 路径数据处理
				item.audio = item.audio.replace(/ /g,"%20")
				item.albumImg = item.albumImg.replace(/ /g,"%20")
				return item;
			})
		},
	getTimePerc: function() { // 获取音频时间百分比
			return this.audio.currentTime / (this.audio.duration / 100)
		},
	getParsTime: function() { // 获取处理过的总时间和播放时间 
			var time = {};
			time.beingTime= this.converTimeFormat(this.audio.currentTime);	//开始播放到现在所用的时间
			time.totalTime = this.converTimeFormat(this.audio.duration);  	//媒体总时间
			return time;
		},
	converTimeFormat: function (second) {// 秒数转00:00
			second = isNaN(second) ? 0 : second
			var Minute = Math.floor(second / 60) // 分
			Minute = (Minute < 10) ? ("0"+Minute) : Minute; // 小于10自动补0
			var Second = Math.floor(second - (Minute * 60))	// 秒
			Second = (Second < 10) ? ("0"+Second) : Second; // 小于10自动补0
			return Minute+':'+Second
		},
}
Player.prototype.init.prototype = Player.prototype
var lyric, player
$(function(){
	player = Player($('audio')[0]) // 定义一个播放器
	player.lyricDragFool= true // 定义歌词是否自动滚动
	player.initSongDate('./source/songlist.json',function (data) { // 获取歌单, 并初始化元素
		// 定义重新加载时随机播放
		player.songIndex = 14 /* Math.floor(Math.random()*data.length) */
		var $playlist = $('.playlist')
		$.each(data,(index, item)=>{ // 歌单列表初始化
			// 时间格式初始化 00:00:00.00 -> 00:00
			var timeStr = item.time.substring(item.time.indexOf(":")+1,item.time.lastIndexOf('.'))
			var $dom = $(`
			<div class="paly_list_item clearfix">
				<a class="but false"></a>
				<div class="song">
					<span class='index'>${index}. </span>
					<div class="listsongName">${item.songname}</div>
					<div class="commt">
					<div class="listplay"><i>&#xe77e;</i></div>
					<div class="addTo"><i>&#xe61e;</i></div>
					<div class="down"><i>&#xe60f;</i></div>
					<div class="shareit"><i>&#xe62a;</i></div>
					</div>
				</div>
				<div class="singer">${item.singer}</div>
				<div class="time">${timeStr}</div>	
				<hr>
			</div>`);$playlist.append($dom)
			$dom[0].index = index // 为每首歌添加序号
		})
		// 列表添加滚动条
		$(".playlist").mCustomScrollbar();
		// 音频地址初始化
		$('audio').attr('src',data[this.songIndex].audio) 
		// 音量初始化
		$('audio')[0].volume = 0.1;
		// 时长显示 初始化音量条显示初始化
		$this = this
		$('audio')[0].addEventListener("loadedmetadata",function(){ // 媒体元数据加载完毕
			// 初始化时长显示
			var time = $this.getParsTime()
			$('time .being').text(time.beingTime)// 现在时间
			$('time .total').text(time.totalTime)// 总时间
			// 获取音量值对应的偏移量, 初始化音量条
			var $voldrag = $('.volume_bar .drag-box')
			var precVal = $voldrag[0].offsetWidth * this.volume
			$voldrag.children('.ball').css({
				left:precVal
			})
		})
		// 歌词初始化
		lyric = Lyric(data[this.songIndex].lyrics)
		lyric.loodLyric(function(){
			var $domUl = $('.scroll .lyrics')
			$domUl.html('')
			if(lyric.lyrics.length == 0){ // 判断是否是无歌词
				$domUl.append($('<li>暂无歌词</li>'))
			}else{
				$.each(lyric.lyrics,function(index, item){
					$domUl.append($('<li>'+item+'</li>'))
				})
			}
		})
		// 歌名初始化
		$('.songName').text(data[this.songIndex].songname) 
		// 专辑名初始化
		$('.albumName').text(data[this.songIndex].album) 
		// 歌手名初始化
		$('.singerName').text(data[this.songIndex].singer) 
		// 专辑图片初始化
		$('.albumArt a')[0].style.backgroundImage  = `url(${data[this.songIndex].albumImg})`
		// 背景图片初始化
		$('.background img').attr('src',data[this.songIndex].albumImg)
	})
	player.play = function(){ // 播放
		// 音频播放
		this.audio.play()
		// 开启同步
		player.synch()
		// 同步按钮
		var $but = $('.stop,.play')
		$but.attr('class','play')
		$but.children('i')[0].style.display = 'none'
		$but.children('i')[1].style.display = 'inline-block'
	}
	player.stop = function() { // 暂停
		// 音频暂停
		this.audio.pause();
		// 关闭同步
		clearInterval(player.timer)
		// 同步按钮
		var $but = $('.stop,.play')
		$but.attr('class','stop')
		$but.children('i')[0].style.display = 'inline-block'
		$but.children('i')[1].style.display = 'none'
	}
	player.synch = function(){ // 同步器
		var $this = this
		var ball = $('.progress_bar .drag-box').children('.ball')[0] // 小方块
		var audio = this.audio // 音频标签
		// 时间标签
		var $being = $('time .being')
		var $total = $('time .total')
		// 歌词滑动块
		var $lyrics = $('.scroll .lyrics')
		// 滑动块初始化
		$lyrics.css('top',0)
		// 所有歌词行
		var $lyricsLi = $('.scroll .lyrics li')
		// 关闭上一个定时器
		clearInterval(this.timer)
		this.timer = setInterval(function(){
			/*以下是小方块与进度条同步*/
			ball.style.left = $this.getTimePerc() + "%"; // (A / (X / 100)) = A是X的百分比几
			/*以下是时间的显示 */
			var time = $this.getParsTime()
			$being.text(time.beingTime)// 现在时间
			$total.text(time.totalTime)// 总时间
			// 获取当前事件与歌词时间匹配的索引
			var index = lyric.parseLyric(audio.currentTime) -1
			// 清除上一个高亮
			$($lyricsLi).removeClass('active')
			// 歌词高亮
			$($($lyricsLi)[index]).addClass('active')
			// 开启自动滑动
			player.lyricsBoxSynch(index, player.lyricDragFool)
			// 播放完毕时
			if(audio.currentTime==audio.duration){
				// 清除定时器
				clearInterval($this.timer) 
				// 播放下一首
				$this.playlistUpdate(++$this.songIndex) 
			}
		},50)
	}
	player.lyricsBoxSynch = function (index,fool) { // 滑动到指定索引歌词
		if(fool== false){return} // 同步开关
		if(index<=2){return}// 如果歌词时间没到第二条 那么则不执行歌词块滑动
		var $lyrics = $('.scroll .lyrics')
		var offSetTop = 0
		var $FrontBrother = $(`.scroll .lyrics li:nth-child(-n+${index-1})`)
		$FrontBrother.each((index,item)=>{
			offSetTop += $(item).height()
			return $(item).height()
		})
		$lyrics.css('top',-offSetTop)
	}
	player.playlistUpdate = function (index) { // 更新音频播放
		// 获取当前索引歌词
		lyric = Lyric(this.data[index].lyrics)
		// 更新元素歌词列表
		$this = this
		lyric.loodLyric(function(){
			var $domUl = $('.scroll .lyrics')
			$domUl.html('')
			if(lyric.lyrics.length == 0){ // 判断是否是无歌词
				$domUl.append($('<li>暂无歌词</li>'))
			}else{
				$.each(lyric.lyrics,function(index, item){
					$domUl.append($('<li>'+item+'</li>'))
				})
			}
			// 音频更新
			$this.audio.src = $this.data[index].audio
			// 播放音频
			$this.play()
			
		})
		//歌名更新
		$('.songName').text(this.data[index].songname)
		// 专辑名更新
		$('.albumName').text(this.data[index].album) 
		// 歌手名更新
		$('.singerName').text(this.data[index].singer) 
		// 专辑图片更新
		$('.albumArt a')[0].style.backgroundImage  = `url(${this.data[index].albumImg})`
		// 背景图片更新
		$('.background img').attr('src',this.data[index].albumImg)
	}
})


