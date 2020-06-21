# 书面管理概念

把页面当成一本书，页面的交互，就等同于翻页，跳转页数。

## 定义一个翻页器

这是最基本的功能

~~~js
// 翻页器:根据符号判断是往前翻还是往后翻
function pageTur(str) {
	if(str == "+"){
		pege = (page >= 4) ? 4 : page++ ,// 超过页数时保持页数 没有超过则减一页数
		book.style.top = - page * LiHeight + 'px'  // 页数 * 一页高度 = 翻多少页的偏移量
	}else{
		pege = (page <= 0) ? 0 : page -- // 超过页数时保持页数 没有超过则减一页数
		book.style.top = - page * LiHeight + 'px'
	}updater(page)// 执行更新器
}
~~~

## 定义一个页面跳转器

有时候我并不想一页一页的看

~~~js
// 页面跳转器
function pageJump(num) {
	// 判断输入的页数和现在的页是否相符 如果不相符循环n次翻页函数,直到相符页数为止
	var gap = num - page
	if(gap>0){for(var j=0; j<gap; j++){pageTur('+')}}
	if(gap<0){for(var j=0; j>gap; j--){pageTur('-')}}
}
~~~

## 定义一个同步器

当翻到某一页时，内容总是会改变

~~~js
// 更新器:根据页数而更新其他元素
function updater(page) { // x表示入的页数
	for(var i=0; i<rightNavis.length; i++){rightNavis[i].className = ''}// 清除导航栏样式
	for(var i=0; i<topNavis.length; i++){topNavis[i].className = ''}// 清除导航栏样式
	arrow.style.left = arrowRect[page] + 'px' // 小箭头
	rightNavis[page].className = 'active' // 导航栏1
	topNavis[page].className = 'active' // 导航栏2
	/* 页面退出元素动画,页面进入元素动画 */
	pageOut();pageGoIn(page)
}
~~~

# 滚轮功能函数

有时候我需要知道我什么时候改翻页了

~~~js
function wheel(el, callback) { // 滚轮功能函数
	// 火狐没有onmousewheel 只有addEventListener的DOMMouseScroll
	if(el.addEventListener){el.addEventListener("DOMMouseScroll",fn)}
	el.onmousewheel = fn;
	var dir="";
	function fn (ev){	ev = ev||event
		// 火狐detail 上:正 下:负         非火狐wheelDelta  上:负 下:正
		var wheel = ev.wheelDelta != undefined ? ev.wheelDelta : -ev.detail;
		if(wheel > 0){dir="up"}else{dir="down"}
		callback.call(el,dir)
	}
}
~~~

# 获取css属性值函数

让我侃侃！

~~~js
function getStyle (obj , name ){ // 获取元素值
	return window.getComputedStyle ?
				getComputedStyle(obj,null)[name] :  // 其他浏览器获取样式方法
				obj.currentStyle[name];						 // IE8获取元素样式方法
}
~~~

# 动画构造函数使用

这太疯狂了

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

