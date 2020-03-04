# 操作元素属性

## 操作非布尔值属性

~~~js
dom.setAttribute('name','xxx')
~~~

## 操作布尔值属性

~~~js
dom.setProperty('name','xxx')
~~~

# 操作类方法

## 新增类

~~~js
dom.classList.add('dl') // --> <dom class="dl">
~~~

## 删除类

~~~js
dom.classList.remove('dl') // --> <dom class="">
~~~

## 切换类

~~~js
dom.classList.toggle('dl') // --> <dom class="dl">
dom.classList.toggle('dl') // --> <dom class="">
~~~
## 阻止默认行为	
~~~js
el.preventDefault()
~~~
## 自定义元素属性

### 创建

~~~html
<div data-sdl="sdl"></div> <!-- data-[sdl] >
~~~

### 获取&设置

~~~js
console.log(div.dataset.sdl)
div.dataset.sdl = "wc"
~~~

# 动画函数封装

~~~js
function canvaAnim(obj) {
	return canvaAnim.prototype.init(obj)
}
canvaAnim.prototype = {
	init: function(obj) {
		this.processor(obj)
	},
	InjeConts: [], // 创建注入容器	
	processor: function(obj) { // 处理器
		var info = obj; // 获取初始化信息
		var $_this = this
		// 定制注入速度
		if (info.injeSpeed) {info.injeSpeed = 400 - info.injeSpeed} else {info.injeSpeed = 60}
		// 定制动画速度
		if (info.animSpeed) {info.animSpeed = 1000 / info.animSpeed} else {info.animSpeed = 1000 / 60}
		// 判断有没有画笔
		if (info.el.getContext) {
			// 创建画笔
			var ctx = info.el.getContext("2d");
			// 注入器
			setInterval(function() {
				$_this.injeProce(this.InjeConts, info.injection())
			}, info.injeSpeed)
			setInterval(function() {
				// 变化器处理函数，传入变化器
				$_this.changerProce(this.InjeConts, info.changer)
				// 绘制器处理函数，传入绘制其
				plotterProce(ctx, this.InjeConts, info.plotter)
			}, info.injeSpeed)
		}
	},
	// 注入数组处理函数
	injeProce: function(InjeConts, InjeCont) {InjeConts.push(InjeCont)},
	// 变化器处理函数
	changerProce: function(InjeConts, changer) {
		for (var i = 0; i < InjeConts.length; i++) {
			// 判断个体状态
			var InjeContStatus = changer(InjeConts[i])
			// 如果为true，代表需要清除该个体
			if (InjeContStatus) {InjeConts.splice(i, 1)}
		}
	},
	// 绘制器处理函数
	plotterProce: function(ctx, InjeConts, plotter) {
		ctx.clearRect(0, 0, oc.width, oc.height);// 每次执行清除画板
		for (var i = 0; i < InjeConts.length; i++) {
			plotter(ctx, InjeConts) // 执行绘制，传入个体信息
		}
	}
}
canvaAnim.prototype.init.prototype = canvaAnim.prototype
~~~

## 动画构造函数使用

~~~js
/*el：canvs元素
	injeSpeed：注入速度  1 -> 400	0或者空串是默认值340
	animSpeed：动画速度  1 - 1000	0或者空串是默认值60
	injection：注入器，定时向数组注入随机圆的信息
	changer：循环变化器，每次执行个体的信息的改变，以及判断是否需要删除个体
 			删除个体：当个体的某个值满足条件时 清除容器的的第i位
	plotter：绘制器，绘制每个个体的工厂
	注入器 --> 循环变化器 --> 循环变化器 -->循环绘制器
	InjeConts：个体信息 */
var canvs = document.querySelector('canvas')
new canvaAnim({
	el: canvs,injeSpeed: 340,animSpeed: 60, 						
	injection() {return {width: 0,height: 0}},
	changer(InjeCont) {
		InjeCont.width++;InjeCont.height++
		// 达成条件返回true，代表删除个体信息
		if(InjeCont.width> 100){return true} 
	},
	plotter(ctx, InjeCont) { 
		ctx.save();
		// 这里添加样式
		ctx.beginPath();
    
		// 这里进行绘制规则
		ctx.fillRect(0, 0, InjeCont.width, InjeCont.height) // 创建一个矩形
		
    ctx.fill();ctx.restore();
	}
})
~~~

# HTML5音视频

## 音视频标签

~~~html
<video src="video/test.mp4"></video>
<audio src="audio/test.mp3"></audio>
~~~

### 标签属性详细参数

| 属性                                                         | 值         | 描述                                                         |
| :----------------------------------------------------------- | :--------- | :----------------------------------------------------------- |
| [autoplay](https://www.w3school.com.cn/tags/att_video_autoplay.asp) | `autoplay` | 如果出现该属性，则视频在就绪后马上播放。                     |
| [controls](https://www.w3school.com.cn/tags/att_video_controls.asp) | `controls` | 如果出现该属性，则向用户显示控件，比如播放按钮。             |
| [height](https://www.w3school.com.cn/tags/att_video_height.asp) | `pixels`   | 设置视频播放器的高度。                                       |
| [loop](https://www.w3school.com.cn/tags/att_video_loop.asp)  | `loop`     | 如果出现该属性，则当媒介文件完成播放后再次开始播放。         |
| [muted](https://www.w3school.com.cn/tags/att_video_muted.asp) | `muted`    | 规定视频的音频输出应该被静音。                               |
| [poster](https://www.w3school.com.cn/tags/att_video_poster.asp) | `URL`      | 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。 |
| [preload](https://www.w3school.com.cn/tags/att_video_preload.asp) | `preload`  | 如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。 |
| [src](https://www.w3school.com.cn/tags/att_video_src.asp)    | `url`      | 要播放的视频的 URL。                                         |
| [width](https://www.w3school.com.cn/tags/att_video_width.asp) | `pixels`   | 设置视频播放器的宽度。                                       |

### 音视频兼容写法

~~~html
<video controls="" width="800" height="600">
			<source src="video/test.mp4" type="video/mp4"></source>
			<source src="video/test.webm" type="video/webm"></source>
			<source src="video/test.ogv" type="video/ogg"></source>
			当前浏览器不支持video播放，点击这里下载视频：<a href="video/test.mp4">download</a>
</video>
~~~

## 音视频元素js属性

~~~js
var video = document.querySelector("video");
video.duration			// 媒体总时间
video.currentTime		// 媒体现播放时间(读/写)
video.volume				// 媒体音量(读/写)
video.muted					// 媒体是否静音(读/写)
video.paused				// 媒体是否暂停(读)
video.width		 // 媒体宽度
video.height	 // 媒体高度
video.videoWidth		// 视频分辨率
video.videoHeight		// 视频分辨率
// ----> 媒体函数
video.play()		// 媒体播放
video.pause()		// 媒体暂停
video.load()		// 媒体重载
~~~

## 组成播放器

### 基础要素

- 播放器容器
- 点击暂停 / 播放
- 空格切换暂停 / 播放
- 静音 / 不静音
- 全屏 / 网页全屏 / 宽屏 / 窗口
- 视频时间显示(现时间:总事件 --> 00:00 / 00:00)
- 视频进度条
- 视频音量条
- 视频黑边 (分辨率优化)

### 交互优化

- 画质选择(1080p --> 720p)
- 弹幕系统
- 循环 / 不循环
- 设置选项
  - 播放速度
  - 视频比例
  - 关灯模式
  - 镜像换

# 元素拖拽事件

## 普通拖拽

~~~js
var drag = InitDrag({
	mousedown: function(ev) { // 鼠标按下规则
		// 按下时元素内偏移量
		this.offsetX = this.offsetLeft - ev.x
		this.offsetY = this.offsetTop - ev.y
	},
	mousemove: function(ev) { // 鼠标移动规则
		this.style.left = ev.x + this.offsetX + "px"
		this.style.top = ev.y + this.offsetY + "px"
	},
	mouseup: function(ev) { // 鼠标松开规则
	}
})
var div = document.querySelector('div')
drag.ev(div)
~~~

## 限制范围

~~~js
var drag = InitDrag({
	mousedown: function(ev) { // 鼠标按下规则
		// 按下时元素内偏移量
		this.offsetX =  ev.x - this.offsetLeft
		this.offsetY =	ev.y - this.offsetTop  
	},
	mousemove: function(ev) { // 鼠标移动规则
		var x = ev.x - this.offsetX
		var y = ev.y - this.offsetY
		
		/*--- 让div永远困在body ---*/
		if(x<0) {x =0};if(y<0) {y =0}
		// 元素偏移量(反向)
		var anti_offsetX = ev.x + this.offsetWidth - this.offsetX
		var anti_offsetY = ev.y + this.offsetHeight - this.offsetY
		// 父元素宽高
		var bodyWidth = document.body.offsetWidth
		var bodyHeight = document.body.offsetHeight
		// 当超出右边和下边时，子元素保持在父元素内
		if(anti_offsetX >bodyWidth) {x = bodyWidth - this.offsetWidth}
		if(anti_offsetY >bodyHeight) {y = bodyHeight - this.offsetHeight}
		/*--- 让div永远困在body ---*/
		
		this.style.left = x + "px"
		this.style.top = y + "px"
	},
	mouseup: function(ev) { // 鼠标松开规则
	}
})
var div = document.querySelector('div')
drag.ev(div)
~~~

## 磁性吸附

~~~js
var drag = InitDrag({
	mousedown: function(ev) { // 鼠标按下规则
		// 按下时元素内偏移量
		this.offsetX =  ev.x - this.offsetLeft
		this.offsetY =	ev.y - this.offsetTop  
	},
	mousemove: function(ev) { // 鼠标移动规则
		var x = ev.x - this.offsetX
		var y = ev.y - this.offsetY
		
		// 定义吸附值
		var suckVal = 30
    
		/* 让div永远困在body */
		// 元素偏移量(反向)
		var anti_offsetX = ev.x + this.offsetWidth - this.offsetX
		var anti_offsetY = ev.y + this.offsetHeight - this.offsetY
		// 父元素宽高
		var bodyWidth = document.body.offsetWidth
		var bodyHeight = document.body.offsetHeight
		// 当超出右边和下边时，子元素保持在父元素内
		if(anti_offsetX+suckVal > bodyWidth) {x = bodyWidth - this.offsetWidth}
		if(anti_offsetY+suckVal > bodyHeight) {y = bodyHeight - this.offsetHeight}
		// 当超出左边和上边是，子元素保持在父元素内
		if(x-suckVal<0) {x =0};if(y-suckVal<0) {y =0}
		/* 让div永远困在body */
		this.style.left = x + "px"
		this.style.top = y + "px"
	},
	mouseup: function(ev) { // 鼠标松开规则
	}
})
var div = document.querySelector('div')
drag.ev(div)
~~~

# HTML5新增标签

## 状态标签

~~~html
<meter value="30" min="20" max="80">度量衡</meter><br />  
<progress value="50" max="100">任务的进度条</progress><br  />
<progress max="100">不设值会很有趣</progress><br  />
~~~

<meter value="60" min="20" max="80"></meter><br />
<progress value="50" max="100"></progress><br  />
<progress max="100"></progress><br  />

## 列表标签

~~~html
<input type="text" placeholder="你最喜欢的女明星是？" list="zby"/>
	<datalist id="zby">
			<option value="1">10岁的周冬雨</option>
			<option value="2">20岁的周冬雨</option>
			<option value="3">30岁的周冬雨</option>
			<option value="4">40岁的周冬雨</option>
</datalist>
~~~

![1583247935(1)](D:\web学习库\1.html&css和基础框架\07-HTML5 核心(未记录)\img\1583247935(1).jpg)

## 字体拼音

~~~html
<ruby>
蕊<rt>rui</rt>
</ruby>
~~~

<ruby>蕊<rt>rui</rt></ruby>

## 字体标记

~~~html
<mark>安安</mark>
~~~

<mark>安安</mark>

