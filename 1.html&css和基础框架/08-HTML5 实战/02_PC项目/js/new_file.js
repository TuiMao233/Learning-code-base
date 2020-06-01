window.onload = function () {
	
	// 开机动画
	var mask = document.querySelector('#warp > #mask')
	var bodyRect = document.body.getBoundingClientRect()
	mask.children[1].style.width = '100%' // 进度条到100%
	setTimeout(()=>{// 一秒后展开
		mask.style.background = 'none'
		mask.children[0].style.height = 0
		mask.children[2].style.height = 0
		mask.children[1].style.display = 'none'
		setTimeout(()=>{
			mask.style.display = 'none'
			updater(page)
		},1000)
	},1000)
	
	
	
	/* 轮播图 */
	var carousel = document.querySelector('.container')						// 轮播图框架
	var slides = carousel.querySelector('.warpper').children				// 内容元素
	var next = carousel.querySelector('.button-next') 						// 右按钮
	var prev = carousel.querySelector('.button-prev')						// 左按钮
	var paginAtion = carousel.querySelector('.paginAtion').children			// 导航栏
	var trFrRect = new Array()
	var zIndRect = new Array()
	for(var i = 0; i < slides.length; i++) { //获取默认的3D值
		trFrRect[i] = slides[i].style.transform;
		zIndRect[i] = slides[i].style.zIndex;
	}
	function carouPageTur(ope) { // 翻页器
		if(ope == "-") { 				//当ope是-时 数组末的3D值和优先值排到第一位
			trFrRect.unshift(trFrRect.pop());		//将数组最后一位属性排到前面
			zIndRect.unshift(zIndRect.pop());	
		}
		if(ope == "+") {				//当ope是+时 数组末的3D值和优先值排到第一位
			trFrRect.push(trFrRect.shift());		//将数组前面一位属性排到后面
			zIndRect.push(zIndRect.shift());
		}carouUpdater()
	}
	
	function carouPageJumper(page) { // 页面跳转器
		var diff = page - trFrRect.indexOf("translate3d(0px, 0px, 0px)"); //图片A标签本身位置数字 - 图片位置的值
			if(diff > 0) { //按钮位置超出0则执行以下代码
				for(var i = 0; i < diff; i++){carouPageTur("-");}}
			if(diff < 0) { //按钮位置小于0则执行以下代码
				for(var i = 0; i > diff; i--){carouPageTur("+");}}
			time = 0;
	}
	function carouUpdater() { // 页面同步器
		for(var i=0; i<paginAtion.length; i++){paginAtion[i].className = ''}
		for(var i = 0; i < slides.length; i++) {
			var page = trFrRect.indexOf("translate3d(0px, 0px, 0px)") //显示图片的位置
			paginAtion[page].className = 'active'
			slides[i].style.transform = trFrRect[i]
			slides[i].style.zIndex = zIndRect[i]
		}
	}
	//以下是自动轮播///////////////////////////////////////////////////////////////////////////////////
	var time = 0;		//定义一个可控的数字变量 这样需要阻止发生自动轮播时则改变数字即可
	setInterval(function() {
		time++
		if(time == 3) { 
			carouUpdater("-")
			time = 0;
		}
	}, 2000)
	/////////////////////////////////////////////////////////////////////////////////////////////////
	if(next){//右点击 //左点击
		next.onclick = function() {
			carouPageTur("-");
			time=0;this.disabled = 'x'; // 防止多次点击
			setTimeout(function(){next.disabled ="";},250)
		} 
		prev.onclick = function() {
			carouPageTur("+");
			time=0;this.disabled = 'x';
			setTimeout(function(){prev.disabled =""},250)
		} 
	}
	if(slides){// 内容元素点击事件
		for(var i=0; i<slides.length; i++){  
			slides[i].i = i
			slides[i].onclick = function () {
				carouPageJumper(this.i);
				return false;
		}}
	}
	if(paginAtion){// 导航栏点击事件
		for(var i=0; i<paginAtion.length; i++){  
			paginAtion[i].i = i
			paginAtion[i].onclick = function () {
				carouPageJumper(this.i);
				return false;
		}}
	}
	
	
	
	// 初始化音频
	var player = document.querySelector('#warp > #header > .headerMain .logo .music')
	var audio = document.querySelector('#warp > #header > .headerMain .logo .music audio')
	audio.volume = 0.085 //设置音量
	// 初始窗口自适应
 	var cont = document.querySelector('#cont')
	var bodyHeight = document.body.getBoundingClientRect().height
	var LiHeight = bodyHeight - cont.getBoundingClientRect().y
		cont.style.height = LiHeight + 'px'
	
	// 窗口变化自适应
	window.onresize = function(){
		bodyHeight = document.body.getBoundingClientRect().height // body高度
		LiHeight = bodyHeight - cont.getBoundingClientRect().y // body高度 - 元素y偏移量 = 剩余空间的高度
		cont.style.height = LiHeight + 'px'// cont的高度是剩余空间的高度
		book.style.top = - page * LiHeight + 'px'// 页数 * 高度 = 翻多少页的偏移量
	}







	var book = cont.children[0] // book(书)元素 利用top值来实现翻页效果
	var page = 0 // 代表第几页
	// 翻页器:根据符号判断是往前翻还是往后翻
	function pageTur(str) {
		if(str == "+"){
			pege = (page >= 4) ? 4 : page++ ,// 超过页数时保持页数 没有超过则减一页数
			book.style.top = - page * LiHeight + 'px'  // 页数 * 高度 = 翻多少页的偏移量
		}else{
			pege = (page <= 0) ? 0 : page -- // 超过页数时保持页数 没有超过则减一页数
			book.style.top = - page * LiHeight + 'px'
		}updater(page)// 执行更新器
	}
	
	
	// 页面跳转器
	function pageJump(num) {
		// 判断输入的页数和现在的页是否相符 如果不相符循环n次翻页函数,直到相符页数为止
		var gap = num - page
		if(gap>0){for(var j=0; j<gap; j++){pageTur('+')}}
		if(gap<0){for(var j=0; j>gap; j--){pageTur('-')}}
	}






	
	// 要变化信息
	var headMain = document.querySelector('#warp > #header > .headerMain') // 头部内容区
	var topNavis = document.querySelectorAll('#warp > #header > .headerMain .right > li')// 头部导航栏标签
	var arrow = document.querySelector('#warp > #header > .headerMain > .arrow') // 小箭头
	var rightNavis = document.querySelectorAll('#warp > #navul > li') // 侧边导航栏
	var arrowRect = [] // 储存每个导航栏对应小箭头的值
	var topNavRect = {} // 头部导航栏标签
	var translate = '' // 动态元素动画的值
	for (var i=0; i<topNavis.length; i++) { // 小箭头值
		topNavRect = topNavis[i].getBoundingClientRect()
		arrowRect[i] = topNavRect.x + topNavRect.width / 2  - arrow.offsetWidth / 2 - headMain.offsetLeft
	}
	
	var dynamicObj = [ // 每页的每个元素
		document.querySelectorAll('.home > .main .anim'),
		document.querySelectorAll('.course > .main .anim'),
		document.querySelectorAll('.works > .main .anim'),
		document.querySelectorAll('.about > .main .anim'),
		document.querySelectorAll('.team > .main .anim')
	]
	for(var i=0; i<dynamicObj.length; i++){ // 给每页都标记为需要退出页面:重置化
		dynamicObj[i].acdrg = true
	}
	var restoreRect = [ // 动态元素初始化值
		['translate(0px, -400px)','translate(0px, 100px)'],
		['translate(-200px, -200px)','translate(-200px, 200px)','translate(200px, -200px)'],
		['translate(0px, -200px)','translate(0px, 200px)','translate(0px, 200px)'],
		['rotate(45deg)','rotate(-45deg)'],['translate(-200px, 0px)','translate(200px, 0px)']
	]
	
	// 更新器:根据页数而更新其他元素
	function updater(page) { // x表示入的页数
		for(var i=0; i<rightNavis.length; i++){rightNavis[i].className = ''}// 清除导航栏样式
		for(var i=0; i<topNavis.length; i++){topNavis[i].className = ''}// 清除导航栏样式
		arrow.style.left = arrowRect[page] + 'px' // 小箭头
		rightNavis[page].className = 'active' // 导航栏1
		topNavis[page].className = 'active' // 导航栏2
		/* 页面退出动画,页面进入动画 */
		pageOut();pageGoIn(page)
	}
	
	
	
	
	
	
	
	
	
	
	// 页面退出
	function pageOut() { 
		for(var i=0; i<dynamicObj.length; i++){ // 循环所有页
		if(dynamicObj[i].acdrg == true){ // 判断这页是否需要退出
			for(var q=0; q<dynamicObj[i].length; q++){ // 循环每页的动态元素
				dynamicObj[i][q].style.transform = restoreRect[i][q]
				if(i == 0) {dynamicObj[i][q].style.opacity = 0} // 如果是第一页
			}dynamicObj[i].acdrg = false // 执行退出完成后将这页标为不需要退出		
		}}
	}
	// 页面进入
	function pageGoIn() { 
		translate = page == 3 ? 'rotate(0deg)' : 'translate(0px,0px)'
		for (var i=0; i<dynamicObj[page].length; i++){ /* 还原动态元素动画开始 */
			dynamicObj[page][i].style.opacity = 1
			dynamicObj[page][i].style.transform = translate
		}dynamicObj[page].acdrg = true // 执行完毕后, 将这页标为需要退出
	}
	
	
	var musicFool = false // 开关属性 
	// 播放器点击事件
	player.onclick = function () {  
		if(musicFool) { // 关 
			audio.pause();musicFool=false;
			player.style.background = 'url(img/musicoff.gif)'
		}else{ // 开 
			audio.play();musicFool=true;
			player.style.background = 'url(img/musicon.gif)'
		}
	}
	// 移动导航改变小箭头位置事件
	for(var i=0; i<topNavis.length; i++){
		topNavis[i].onmouseenter = function () { 
			// 获取标签自身的位置
			topNavRect = this.getBoundingClientRect() 
			// 标签栏左边距离 + 标签栏一半宽度 - 小箭头一半宽度 - 内容区到body的距离 =  导航栏对应小箭头的值
			var thisAb = topNavRect.x + topNavRect.width / 2  - arrow.offsetWidth / 2 - headMain.offsetLeft
			arrow.style.left = thisAb + 'px'
		}
		// 鼠标移出恢复所对应的页数小箭头在的地方
		topNavis[i].onmouseleave = function () {updater(page)}
	}
	// 导航栏点击事件
	for (var i=0; i<topNavis.length; i++) {(function(i){
		topNavis[i].onclick = function () {
			pageJump(i)
		}
	})(i)}
	// 右侧导航栏点击事件
	for (var i=0; i<rightNavis.length; i++) {(function(i){
		rightNavis[i].onclick = function () {
			pageJump(i)
		}
	})(i)}
	// 滚轮事件
	var will = 1 // 定时器开关
	wheel(cont, function (dir) {
		if(will){ // 进入后不再触发判断 定时器结束时可以进入
			will-- // 定时器关
			setTimeout(()=>{
				if(dir == 'down'){pageTur('+')}
				if(dir == 'up'){pageTur('-')}
				will++ // 定时器开
			},150)
		}
	})
	



	
	// 人物动态显示
	var bottom = document.querySelector('.team > .main > .bottom')
	canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'	
	canvas.width = '118'
	canvas.height = '298'
	canvas.style.display = 'none'
	canvaAppend(canvas)
	bottom.appendChild(canvas)
	var items = document.querySelectorAll('.team > .main > .bottom .item')
	for(var i=0; i<items.length; i++){ // 每个人物的移入事件
		items[i].onmouseenter = function () { 
			for (var i=0; i<items.length; i++) {items[i].style.opacity = 0.5}
			this.style.opacity = 1
			canvas.style.left = this.offsetLeft + 'px'
			canvas.style.display = 'block'
		}
	}
	bottom.onmouseleave = function () { // 离开人物框事件
		for (var i=0; i<items.length; i++) {items[i].style.opacity = 1}
		canvas.style.display = 'none'
	}
	
}



function wheel(el, callback) { // 滚轮功能函数
	// 火狐没有onmousewheel 只有addEventListener的DOMMouseScroll
	if(el.addEventListener){el.addEventListener("DOMMouseScroll",fn)}
	el.onmousewheel = fn;
	var dir="";
	function fn (ev){
		ev = ev||event
		// 火狐detail 上:正 下:负         非火狐wheelDelta  上:负 下:正
		var wheel = ev.wheelDelta != undefined ? ev.wheelDelta : -ev.detail;
		if(wheel > 0){dir="up"}else{dir="down"}
		callback.call(el,dir)
	}
}

function getStyle (obj , name ){ // 获取元素值
	return window.getComputedStyle ?
			getComputedStyle(obj,null)[name] :  // 其他浏览器获取样式方法
				obj.currentStyle[name];			// IE8获取元素宽度样式方法
}

function canvaAppend(canvas) { // canvas创建动画属性设置
	new canvaAnim({// 动画创建模型
		el: canvas,
		quantity: 370, 		// 注入速度  1 -> 400	0或者空串是默认值340
		frameNum: 80, 		// 动画速度  1 - 1000	0或者空串是默认值60
		injection(arr) { // 注入器
			var r = Math.random()*6+2;
			var x = Math.random()*canvas.width;
			var y = canvas.height - r;
			var deg =0;
			arr.push({// 往arr中注入新的随机圆的信息
				alp: 1, // 初始透明度
				r,x,y, // 初始半径 x坐标轴随机 y坐标轴随机
				red: Math.round(Math.random() * 255), // 红
				green: Math.round(Math.random() * 255), // 黄
				blue: Math.round(Math.random() * 255), // 蓝
				deg: 0,startX: x, startY: y, step: Math.random()*20+10,
			})
		},
		changer(arr) {	// 变化器
			// console.log(arr[1].dd)
			for (var i = 0; i < arr.length; i++) { // 变化器:每次执行圆的信息都会发送改变
				arr[i].deg+=5
				arr[i].alp -= 0.002
				// 正弦曲线 = sin(角度 * Math.PI/180) * 放大度
				arr[i].x = arr[i].startX +  Math.sin( arr[i].deg*Math.PI/180 )*arr[i].step*2;
				arr[i].y = arr[i].startY - (arr[i].deg*Math.PI/180)*arr[i].step;
				// 清除器：当y圆为50以下的数时 清除数组的第i位
				if (arr[i].y <= 100) {arr.splice(i, 1)}
			}
		},
		plotter(ctx, arr) { // 绘制器
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (var i = 0; i < arr.length; i++) {
				ctx.save(); // 这里添加样式
				ctx.fillStyle = `rgba(${arr[i].red},${arr[i].green},${arr[i].blue},${arr[i].alp})`
				ctx.beginPath(); // 清空路径
				ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI); // 创建圆弧路径 
				ctx.fill() // 进行绘制
				ctx.restore();
			}
		}
	})
}
// 动画功能函数
function canvaAnim({el, quantity, frameNum, injection, changer, plotter}) {
	var ctx = el.getContext("2d");// 创建画笔
	var arr = [] // 创建数组 oc
	if(quantity){quantity  = 400 - quantity}else{quantity = 60} // 定制注入时间
	if(frameNum){frameNum = 1000 / frameNum}else{frameNum = 1000 / 60} // 定制速度
	if (el.getContext) { // 检测是否有canvas属性
		setInterval(() => {injection(arr)}, quantity) // 注入器
		setInterval(() => { // 变化器 与 绘制器
			changer(arr)
			plotter(ctx, arr)
		}, frameNum)
	}	
}					
