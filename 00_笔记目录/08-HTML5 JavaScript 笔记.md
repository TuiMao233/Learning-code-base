# HTML5 JavaScript 元素操作方法

## 操作标签属性方法

~~~js
// 获取标签属性
dom.getAttribute('name')
dom.getProperty('name')
// 操作非布尔值属性
dom.setAttribute('name','xxx')
// 操作布尔值属性
dom.setProperty('name','xxx')
// 删除
dom.removeAttribute('name')
~~~

###### 

## 操作类方法

~~~js
// 新增类
dom.classList.add('dl') // --> <dom class="dl">
// 删除类
dom.classList.remove('dl') // --> <dom class="">
// 切换类
dom.classList.toggle('dl') // --> <dom class="dl">
dom.classList.toggle('dl') // --> <dom class="">
~~~

###### 

## 自定义元素属性

~~~html
<!--创建-->
<div data-sdl="sdl"></div> <!-- data-[sdl] -->

<!--获取&设置-->
<script>
console.log(div.dataset.sdl)
div.dataset.sdl = "wc"
</script>
~~~

###### 

# HTML5 ViAudio 音视频标签

~~~html
<video src="video/test.mp4"></video>
<audio src="audio/test.mp3"></audio>
~~~

## 标签属性详细参数

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

## 音视频兼容写法

~~~html
<video controls="" width="800" height="600">
	<source src="video/test.mp4" type="video/mp4"></source>
	<source src="video/test.webm" type="video/webm"></source>
	<source src="video/test.ogv" type="video/ogg"></source>
	当前浏览器不支持video播放，点击这里下载视频：<a href="video/test.mp4">download</a>
</video>
~~~

## 音视频元素属性

~~~js
var video = document.querySelector("video");
video.duration			// 媒体总时间
video.currentTime		// 媒体现播放时间(读/写)
video.volume				// 媒体音量(读/写)
video.muted					// 媒体是否静音(读/写)
video.paused				// 媒体是否暂停(读)
video.width		 // 媒体宽度
video.height	 // 媒体高度
video.videoWidth		// 视频宽分辨率
video.videoHeight		// 视频高分辨率
// ----> 媒体函数
video.play()		// 媒体播放
video.pause()		// 媒体暂停
video.load()		// 媒体重载
~~~

## 组成播放器要素

~~~cd
基础要素
    - 播放器容器
    - 点击		暂停 / 播放
    - 空格切换		暂停 / 播放
    - 点击视频图像	暂停 /播放
    - 静音 / 不静音
    - 全屏 / 网页全屏 / 宽屏 / 窗口
    - 视频时间显示(现时间:总事件 --> 00:00 / 00:00)
    - 视频进度条
    - 视频音量条
    - 视频黑边 (分辨率优化)
交互优化
    - 画质选择(1080p --> 720p)
    - 弹幕系统
    - 循环 / 不循环
    - 设置选项
      - 播放速度
      - 视频比例
      - 关灯模式
      - 镜像换
~~~

# HTML5 canvas 画布标签



## canvas 基本模板

~~~html
<!--在不支持canvas的浏览器,是会忽略掉canvas标签内的内容-->
<canvas class="test" width="200" height="300">
	<span>您的浏览器被支持画布元素,请您换成帅帅的谷歌浏览器</span>
</canvas>
<script>
	window.onload=function(){
		//拿到画布
		var testNode = document.querySelector(".test");
		if(testNode.getContext){ // 判断该元素有没有画笔
			var ctx = testNode.getContext("2d");
		}
	}
</script>
~~~



## canvas 完整绘制模板

`ctx.save()`：保存默认的状态
`ctx.restore()`：还原到上次保存的默认状态
`ctx.beginPath()`：重置路径

~~~html
<canvas class="test" width="400" height="300"></canvas>
<script>
var ctx = testNode.getContext("2d")
ctx.save()
//////////////////////////////
//////////样式绘制区///////////
///////ctx.lineWidth=4////////
//////////////////////////////
ctx.beginPath()
//////////////////////////////
//////////路径绘制区///////////
//ctx.stroke(50,50,100,100)///
//////////////////////////////
ctx.rect()
ctx.restore();
</script>				
~~~



## canvas 绘制矩形与样式

<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/1.png?raw=true" alt="1" style="zoom:67%;float:left" />

~~~html
<canvas class="test" width="400" height="300"></canvas>
<script>
    var ctx = testNode.getContext("2d");
    ctx.fillStyle = "deeppink"  // 填充颜色
    ctx.strokeStyle = "red"     // 轮廓颜色
    ctx.lineWidth = 3           // 轮廓宽度
    ctx.lineJoin = "bevel"      // 线与线连接方式 bevel 直角 round 圆角
    
    ctx.fillRect(0,0,100,100)   	// 填充并绘制一个矩形(X,Y,W,H)
	ctx.strokeRect(100,100,100,100) // 填充并绘制一个边框矩形(X,Y,W,H)
    // 又或者
/*  ctx.fill(0,0,100,100)	// 先填充
    ctx.rect()			   // 在绘制
    ctx.stroke()		   // 先填充
    ctx.rect()			   // 在绘制
</script>
~~~



## canvas 路径_绘制

<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/2.png?raw=true" alt="2" style="zoom:67%;float:left" />

~~~html
<canvas class="test" width="400" height="300"></canvas>
<script>
    var ctx = testNode.getContext("2d");
    // 线条样式更换
 /* ctx.strokeStyle = "red"		// 线条颜色
    ctx.lineWidth = 50		    // 线条宽度
    ctx.lineJoin = "bevel"; // 线与线连接的方式bevel(斜角), round(圆角)
 */
    // 绘制一个三角形
    ctx.moveTo(50,50)		// 初始起点 笔触点
    ctx.lineTo(100,50)		// 第二个点
    ctx.lineTo(100,100)		// 第三个点
    ctx.closePath()			// 自动寻回笔触点
    // 绘制路径
    ctx.stroke()			// 点与点之间绘制为轮廓
    ctx.fill()				// 点与点之内绘制为块
    // 路径绘制完毕, 闭合画笔, 避免下次使用笔触在50,50路径中
    ctx.beginPath()
</script>
~~~

​                      

## canvas 圆_绘制

<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/3.png?raw=true" alt="3" style="zoom: 67%; float: left;" />`arc(x, y, radius, startAngle, endAngle, anticlockwise)`
以`x，y`为圆心
以`radius`为半径的圆弧（圆）
从`startAngle`（起点）开始,到`endAngle`（终点）结束



~~~html
<canvas class="test" width="400" height="300"></canvas>
<script>
// 角度转弧度函数
function ang(d){return d*Math.PI/180}
var ctx = testNode.getContext("2d")
ctx.save()		//////////////////////////////
ctx.beginPath()	//////////////////////////////
ctx.arc(150, 150, 100, 0, ang(360))
    
ctx.stroke();ctx.restore() 	//////////////////////////////
</script>		
~~~



## canvas 弧线_绘制

`ctx.moveTo(x0,y0)`<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/4.png?raw=true" alt="4" style="zoom: 67%; float: left;" />
`ctx.arcTo(x1,y1,x2,y2,r)`
以`x0,y0`为起点
以`x1,y1`为中点
以`x2,y2`为终点
以`r`为弧的半径



~~~js
<canvas class="test" width="400" height="300"></canvas>
<script>
// 角度转弧度函数
function ang(d){return d*Math.PI/180}
var ctx = testNode.getContext("2d")
ctx.save()		//////////////////////////////
ctx.beginPath()	//////////////////////////////
ctx.moveTo(150,100) // 起点 
ctx.arcTo(200, 100, 200, 200, 50) // 中点 终点 半径

ctx.stroke();ctx.restore() 	//////////////////////////////
</script>
~~~

## canvas 二次贝塞尔曲线_绘制

`ctx.moveTo(x0,y0)`<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/5.png?raw=true" alt="5" style="zoom: 33%; float: left;" />
`ctx.quadraticCurveTo(x1,y1,x2,y2)`
以`x0,y0`为起点		

以`x1,y1`为中点		

以`x2,y2`为终点	

~~~html
<canvas class="test" width="400" height="300"></canvas>
<script>
// 角度转弧度函数
function ang(d){return d*Math.PI/180}
var ctx = testNode.getContext("2d")
ctx.save()		//////////////////////////////
ctx.beginPath()	//////////////////////////////
ctx.moveTo(150,100) // 起点 
ctx.quadraticCurveTo(200, 100, 200, 200) // 中点 终点

ctx.stroke();ctx.restore() 	//////////////////////////////
</script>
~~~



## canvas 三次贝塞尔曲线

<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/6.png?raw=true" alt="6" style="zoom: 50%;float: left;" />

`ctx.moveTo(x0,y0)`
`ctx.quadraticCurveTo(x1,y1,x2,y2,x3,y3)`
以`x0,y0`为起点		以`x1,y1`为中点1		以`x2,y2`为中点2		以`x3,y3`为终点

~~~html
<canvas class="test" width="400" height="300"></canvas>
<script>
// 角度转弧度函数
function ang(d){return d*Math.PI/180}
var ctx = testNode.getContext("2d")
ctx.save()		//////////////////////////////
ctx.beginPath()	//////////////////////////////
ctx.moveTo(0,50) // 起点 
ctx.bezierCurveTo(1000,50, 0,550, 1000,550) // 中点1 中点2 终点

ctx.stroke();ctx.restore() 	//////////////////////////////
</script>
~~~



## canvas 移动画布瞄点

canvas默认的瞄点为`0,0`但可以设置瞄点在某个地方<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/7.png?raw=true" alt="7" style="zoom: 25%; float: left;" />
`ctx.translate(x,y)`



~~~html
<canvas class="test" width="1000" height="600"></canvas>
<script>
// 角度转弧度函数
function ang(d){return d*Math.PI/180}
var ctx = testNode.getContext("2d")
ctx.save()		//////////////////////////////
ctx.translate(500,300)  //将画布瞄点移到中心店 x,y
ctx.beginPath()	//////////////////////////////
ctx.arc(150, 150, 100, 0, ang(360))	 // 绘制一个圆
ctx.stroke();ctx.restore() 	//////////////////////////////
</script>		
~~~



## canvas 旋转图形

`ctx.rotate(弧度)` <img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/8.png?raw=true" alt="8" style="zoom:33%;float:left" />





~~~html
<canvas class="test" width="1000" height="600"></canvas>
<script>
// 角度转弧度函数
function ang(d){return d*Math.PI/180}
var ctx = testNode.getContext("2d")
ctx.save()		//////////////////////////////
ctx.rotate(ang(40))	// 旋转矩形90度
ctx.beginPath()	//////////////////////////////
ctx.arc(150, 150, 100, 0, ang(360))	 // 绘制一个圆
ctx.stroke();ctx.restore() 	//////////////////////////////
</script>		
~~~



## canvas 放大缩小图形

`ctx.scale(x轴倍率, y轴倍率)`

~~~html
<canvas class="test" width="1000" height="600"></canvas>
<script>
// 角度转弧度函数
function ang(d){return d*Math.PI/180}
var ctx = testNode.getContext("2d")
ctx.save()		//////////////////////////////
ctx.scale(2, 2)	// 放大200%
ctx.beginPath()	//////////////////////////////
ctx.arc(150, 150, 100, 0, ang(360))	 // 绘制一个圆
ctx.stroke();ctx.restore() 	//////////////////////////////
</script>	
~~~



## canvas 引入图片

`ctx.drawImage(image,x,y,width,height)`<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/9.png?raw=true" alt="9" style="zoom: 33%; float: left;" />
`image` 可以是`image` 也可以是`canvas` 对象
以`x,y`点为起始坐标
以`width,height`为指定宽高

~~~html
<canvas class="test" width="1000" height="600"></canvas>
<script>
// canvas操作图片时,必须要等图片加载完才能操作
var img = new Image() // 创建一个img实例
img.src = "tg.png"	  // 该img实例链接对应tg.png
img.onload = function(){ // 该图片加载完成的回调
    // 画布上绘制图像
	ctx.drawImage(img,0,0,50,50);
}
</script>
~~~



## canvas 设置背景

<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/10.png?raw=true" alt="10" style="zoom:50%;float:left" /> `ctx.createPattern(image,repetition)`

`image` 图形源		

`repetition`重复铺垫规则`==>repeat,repeat-x,repeat-y,no-repeat`

~~~html
<canvas class="test" width="1000" height="600"></canvas>
<script>
var img = new Image()
img.src = "tg.png"	 
img.onload = function(){ 
    ctx.fillStyle = ctx.createPattern(img,"no-repeat");
	ctx.fillRect(0,0,600,600)
}
</script>
~~~



## canvas 线性渐变

`var gradient = ctx.createLinearGradient(x1,y1,x2,y2)`<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/11.png?raw=true" alt="11" style="zoom: 50%; float: left;" />
以`x1,y1`为渐变起点		以`x2,y2`为渐变终点

`gradient.addColorStop(position,color)`
`position`	0.0与1.0之间的数值,表示渐变中颜色所在的相对位置, 0.5代表中间
`color` 		有效的CSS颜色值



~~~js
var gradient = ctx.createLinearGradient(0, 150, 300, 150);
gradient.addColorStop(0, "red") 		//第一个
gradient.addColorStop(0.5, "yellow") 	//第二个
gradient.addColorStop(1, "green")		//第三个
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 300, 300)
~~~



## canvas 径向渐变

`createRadialGradient(x1,y1,r1,x2,y2,r2)`<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/12.png?raw=true" alt="12" style="zoom: 33%; float: left;" />

前三个值参数定义另一个以`x1,y1`为原点，半径为`r1`的圆

后三个参数则定义另一个以`x2,y2`为原点，半径为`r2`的园



~~~js
ctx.translate(500, 300);
var gradient = ctx.createRadialGradient(0, 0, 100, 0, 0, 300);
gradient.addColorStop(0, "red") 		//第一个
gradient.addColorStop(0.5, "yellow") //第二个
gradient.addColorStop(0.8, "pink") //第二个
gradient.addColorStop(1, "green")	//第三个
ctx.fillStyle = gradient;
ctx.fillRect(-500, -300, 1000, 600)
~~~



## canvas 嵌入文字

~~~js
var ctx = testNode.getContext("2d");
ctx.fillStyle = "darkgreen";  		// 字体的颜色
ctx.font = "bold 100px sans-serif" 	// 字体样式
ctx.textBaseline = "middle";		// 字体上下对其的方式
ctx.textAlign = "center";			// 字体左右对其的方式
ctx.fillText("李国超",500,300);	   // 绘制字体
console.log(ctx.measureText("李国超"));// 字体的信息
~~~



## canvas 像素操作

`ctx.getImageData(x,y,w,h)`	复制canvas一块区域为像素画布，可以进行自定义像素绘制
`ctx.getImageData`函数返回值
	`width`横向上像素点的个数
	`height`轴向上像素点的个数
	`data` 每个像素对应的颜色数组
			`[0,0,0,0   0,0,0,0   0,0,0,0.............]`
			`每4个元素对应着一个像素的rgba, 以此类推`

`ctx.putImageData(imageData,x,y)` 在指定位置绘制像素画布

~~~js
var imageData = ctx.getImageData(0, 0, 100, 100);
for (var i = 0; i < imageData.data.length / 4; i++) {
	imageData.data[4 * i + 3] = 100; // 透明度变为0.1
}
ctx.putImageData(imageData, 0, 0)
~~~



## canvas 单像素操作

~~~js
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
setPxInfo(imageData, 10, 10, [0,0,0,255]) // 设置x轴为10,y轴为10的颜色为黑色
colose.log(getPxInfo(imageData, 10, 10))  // [0,0,0,255]
//! 获取单个像素信息
function getPxInfo(imgdata, x, y) {
	var color = [];
	var data = imgdata.data;
	var w = imgdata.width;
    for(var i=0; i<4; i++){
        color[i] = data[(y * w + x) * 4 + i]
    }
	return color;	[r,g,b,a]
}
//! 设置单个像素
function setPxInfo(imgdata, x, y, color) {
	var data = imgdata.data;
	var w = imgdata.width;
    for(var i=0; i<4; i++){
        data[(y * w + x) * 4 + i] = color[i]
    }
}
~~~



## canvas 马赛克矩形

选取一个马赛克矩形<img src=" https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/13.png" alt="13" style="zoom: 80%;float:left" />

从马赛克矩形中随机抽出一个像素点的信息（rgba）

将整个马赛克矩形中的像素点信息统一调成随机抽出的那个



## canvas 图形合成

`ctx.globalCompositeOperation`

~~~js
/*
  source:新的图像（源）
  destination：已经绘制过的图像（目标）
  globalCompositeOperation
  	source-over(默认值)   :新图层在上面,新的图像层次比较高
  	source-in		   	:只留下新图层和旧图层重叠的新图层部分	
  	source-out			:只留下新图层 超出 旧图层的部分
	source-atop			:新图层超出的部位不显示
	  
  	destination-over	:旧图层在上面，旧的图像层级比较高
  	destination-in		:只留下 新图层和旧图层重叠的旧图层部分
  	destination-out		:只留下 旧图层超出新图层的部分
  	destination-atop	:旧图层超度的部位不显示
  
*/
//! 旧图层
ctx.fillStyle =  "red"
ctx.fillRect(0,0,100,100);

//! 图层合成
ctx.globalCompositeOperation = "destination-atop";

//! 新图层
ctx.fillStyle = "#008000";
ctx.fillRect(50,50,100,100);
~~~

## canvas 导出canvas为图片

~~~js
var img = new Image;
img.src = "ggk.png";
img.onload = function(){
    canvas.width = img.width;
    canvas.height = img.height;
    // canvas绘制图像
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    // 生成一个图像url信息
    var result = canvas.toDataURL();
    // 跳转为新链接
    but.onclick = () => window.open(result);
}
~~~

## canvas 事件

~~~js
ctx.arc(150,150,50,ang(0),ang(360));
ctx.fill();
canvas.onclick = function (ev){
    ev = ev||event
    var x = ev.clientX - canvas.offsetLeft;
	var y = ev.clientY - canvas.offsetTop;
    //! 判断在图像是否在canvas的x,y当中 
    if( ctx.isPointInPath(x, y) ) { alert('图像点击被触发') }
}
~~~

## canvas 绑定音视频

~~~js
var video = document.createElement("video");
video.src = "../4.视频播放器/7.视频播放器布局/video/test.mp4";
video.addEventListener("loadedmetadata",function(){
	//! 当视频加载完毕时 执行一个定时器, 该定时器将一直在画布上绘制视频当前时间的图像
	setInterval(function(){ctx.drawImage(video,0,0,oc.width,oc.height)})
})
but.onclick = function(){video.play();}
~~~



# HTML5 canvas 动画构造器

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

# HTML5 drag 高级事件

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

# HTML5 新增标签

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

![1583247935(1)](https://github.com/TuiMao233/Learning_code/blob/master/00_笔记目录/img/HTM5 JavaScript/1583247935(1).jpg?raw=true)

## 字体拼音

~~~html
<ruby>
蕊<rt>rui</rt>
</ruby>
~~~

蕊rui蕊rui<ruby>蕊<rt>rui</rt></ruby>

## 字体标记

~~~html
<mark>安安</mark>
~~~

<mark>安安</mark>