import $ from 'jquery'
function Lyric(path) { // 歌词解析函数
	return new Lyric.prototype.init(path)
}
Lyric.prototype = {
	init: function (path) { // 初始化数据
		this.path = path
	},
	index: 0, // 定义时间索引
	negIndex: 0, // 定义同步索引
	loodLyric: function (callback) { // 获取歌词
		this.time = []
		this.lyrics = []
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var $this = this
		$.ajax({ // 获取数据
			url: $this.path,
			dataType: 'text',
			success: function (data) {
				$this.parsingLyrc(data)
				callback()
			},
			error: function (error) {
				console.log('获取失败')
			}
		})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	},
	parsingLyrc: function (lyric) { // 解析歌词 [00:00.00]xxxxxxx
		if (!/^\[\d*:\d*\.\d*\]/.test(lyric)) { // 判断是不是歌词文件
			lyric = ''; return
		}
		lyric = lyric.split("\n")
		var regular = /\[(\d*:\d*\.\d*)\]/
		var $this = this
		$.each(lyric, function (index, item) {
			if (!item > 0) { return true }
			var timStr = regular.exec(item)[1]
			var res = timStr.split(":")
			var min = parseInt(res[0]) * 60
			var sec = parseFloat(res[1])
			var time = parseFloat(Number(min + sec).toFixed(2))
			$this.time.push(time)
			var lyric = item.split("]")[1]
			$this.lyrics.push(lyric)
		});
	},
	parseLyric: function (time) { // 返回播放时间的歌词索引
		// 当进度条拖动时,将negIndex的值等于当前索引
		// 当negIndex有值时,并且时间小于索引时间时,则代表进度往后拖了
		// 这个时候在把索引减少, 减到时间大于索引时间时
		// 在执行时间同步索引
		if (this.negIndex > 0 && time < this.time[this.index + 1]) {
			this.index--
			this.negIndex--
		} else if (time > this.time[this.index]) {
			// 执行时间同步索引时,把negIndex清空,如果不清空, 上面的函数就会执行到negIndex为0
			this.negIndex = 0
			this.index++
		}
		return this.index // 返回
	}
}
Lyric.prototype.init.prototype = Lyric.prototype;

export default Lyric