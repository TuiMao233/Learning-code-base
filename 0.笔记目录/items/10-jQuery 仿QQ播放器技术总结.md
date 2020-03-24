# 仿QQ音乐播放器(jQuery,Less)

## ajax（jQuery）获取json数据

~~~javascript
$.ajax({ // 获取数据
	url:'./source/songlist.json',
	dataType: 'json',
	success: function(data){ // 执行成功
	},
	error: function (error){ // 执行失败
	}
})
~~~

## 阿里巴巴字体图标需要初始化

~~~css
i {font-family:'iconfont';font-style:normal;}
~~~

## 文字溢出处理

~~~css
overflow: hidden; // 溢出不显示
text-overflow:ellipsis; // 字体溢出后..
white-space: nowrap; // 字体不换行
~~~

## 构造函数

~~~javascript
(function(window){
	function Lyric () {
		return new Lyric.prototype.init(path)
	}
	Lyric.prototype = {
		init: function () {
		}
	}
	Lyric.prototype.init.prototype = Lyric.prototype;
	window.Lyric = Lyric;
})(window)
~~~

## 拖拽构造函数封装

~~~javascript
(function(window){
	function InitDrag(dragRule) { // 拖拽函数
		return new InitDrag.prototype.init(dragRule)
}
InitDrag.prototype = {
		init: function(dragRule) { // 初始化数据
			this.dragRule = dragRule // 获取拖动dom
		},
		getDragRect: function (dragEl,bit){ // 获取拖动块信息
			var dragRect = {}
			dragRect.x = bit.x - dragEl.getBoundingClientRect().x // 获取拖动块内x轴
			dragRect.y = bit.y - dragEl.getBoundingClientRect().y // 获取拖动块内y轴
			dragRect.width = dragEl.getBoundingClientRect().width	// 获取拖动块宽
			dragRect.height = dragEl.getBoundingClientRect().height // 获取托都块高
			return dragRect
},
ev: function (dragEl,downCallBack,moveCallBack,upCallback) { // 拖拽事件代码
			var dragRule = this.dragRule
			var $this = this
			dragEl.onmousedown=function(ev){
				//当点击时所有事件都捕获为dragEl的事件
				document.setCapture && document.setCapture();	
				// 兼容浏览器
				ev = ev||window.event; 
				// 将按下位置保存为startBit(初始位)
				var startBit = {x:ev.clientX,y:ev.clientY} 
				
				// 执行拖拽元素规则 传入鼠标位置与拖动元素
				dragRule.mousedown && dragRule.mousedown.call(dragEl,startBit)
				// 执行按下回调,传入元素内移动值和宽高 如果没有值,则不执行
				downCallBack && downCallBack.call(dragEl,$this.getDragRect(dragEl,startBit))
				
        
				// ondragenter ondragover事件内容为event.preventDefault()
				document.onmousemove = function (ev){
					ev = ev||window.event;
					// 将按下位置保存为startBit(移动位)
					var moveBit = {x:ev.clientX,y:ev.clientY} 
					
					// 执行拖拽元素规则 传入鼠标位置与拖动元素
					dragRule.mousemove && dragRule.mousemove.call(dragEl,moveBit)
					// 执行移动回调,传入元素内移动值和宽高 如果没有值,则不执行
					moveCallBack && moveCallBack.call(dragEl,$this.getDragRect(dragEl,moveBit)) 
					
					
					document.onmouseup = function (ev){
						ev = ev||window.event;
						// 释放document的move事件
						document.onmousemove = null; 
						// 释放document的onmouseup事件
						document.onmouseup = null;
						//释放dragEl的点击事件
						document.releaseCapture && document.releaseCapture();	
						// 将按下位置保存为startBit(移动位)
						var endBit = {x:ev.clientX,y:ev.clientY} 
						
						// 执行拖拽元素规则 传入鼠标位置与拖动元素
						dragRule.mouseup && dragRule.mouseup.call(dragEl,startBit)
						// 执行松开回调
						upCallback && upCallback.call(dragEl,$this.getDragRect(dragEl,moveBit))
					};return;
					
					
					
				};return;
			}
		}
	}
	InitDrag.prototype.init.prototype = InitDrag.prototype
	window.InitDrag = InitDrag
})(window)
~~~

## InitDrag构造函数(定义规则)

~~~javascript
// 定义拖拽规则(down,move,up)
// 函数ev是包装好的对象, ev是鼠标的x与y轴距离视口位置
// 函数体this指向dragEl
// 函数体mousedown不可以为空,其余两个可以为空或则null,false 为空代表不执行
var drag = InitDrag({ 
    mousedown: function(ev){ 	 // 鼠标按下规则
    },
    mousemove: function(ev){	// 鼠标移动规则
    },
    mouseup: function(ev){		// 鼠标松开规则
    }
}) 	
~~~

## InitDrag构造函数(dom对象添加拖拽, 添加自定义事件)

~~~javascript
// 为dragEl添加拖拽
// dragRect是拖动块信息, 包含元素内鼠标的x与y轴和宽搞
// 函数体this指向dragEl
// 函数体可以为空或则null,false 为空代表不执行
drag.ev(dragEl, {
    downcallback:function(dragRect){ // 鼠标按下自定义事件 
    },
    movecallback:function(dragRect){ // 鼠标移动自定义事件  
    },
    upcallback:function(dragRect){ // 鼠标松开自定义事件 
    }
})
// 定义自定义事件是为了更好的区分拖拽规则和根据拖动改变的其他元素
// drag的ev方法可以定义多个元素拖拽
drag.ev(dragEl_1)
drag.ev(dragEl_2,false,function(dragRect){
    
})
~~~

