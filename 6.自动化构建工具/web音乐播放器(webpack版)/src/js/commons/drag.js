function InitDrag(dragRule) { // 拖拽函数
	return new InitDrag.prototype.init(dragRule)
}
InitDrag.prototype = {
	init: function (dragRule) { // 初始化数据
		this.dragRule = dragRule // 获取拖动dom
	},
	getDragRect: function (dragEl, bit) { // 获取拖动块信息
		var dragRect = {}
		dragRect.x = bit.x - dragEl.getBoundingClientRect().x // 获取拖动块内x轴
		dragRect.y = bit.y - dragEl.getBoundingClientRect().y // 获取拖动块内y轴
		dragRect.width = dragEl.getBoundingClientRect().width	// 获取拖动块宽
		dragRect.height = dragEl.getBoundingClientRect().height // 获取托都块高
		return dragRect
	},
	ev: function (dragEl, downCallBack, moveCallBack, upCallback) { // 拖拽事件封装
		var dragRule = this.dragRule
		var $this = this
		dragEl.onmousedown = function (ev) {
			//当点击时所有事件都捕获为dragEl的事件
			document.setCapture && document.setCapture();
			// 兼容浏览器
			ev = ev || window.event;
			// 将按下位置保存为startBit(初始位)
			var startBit = { x: ev.clientX, y: ev.clientY }

			// 执行拖拽元素规则 传入鼠标位置与拖动元素
			dragRule.mousedown && dragRule.mousedown.call(dragEl, startBit)
			// 执行按下回调,传入元素内移动值和宽高 如果没有值,则不执行
			downCallBack && downCallBack.call(dragEl, $this.getDragRect(dragEl, startBit))

			// ondragenter ondragover事件内容为event.preventDefault()
			document.onmousemove = function (ev) {
				ev = ev || window.event;
				// 将按下位置保存为startBit(移动位)
				var moveBit = { x: ev.clientX, y: ev.clientY }

				// 执行拖拽元素规则 传入鼠标位置与拖动元素
				dragRule.mousemove && dragRule.mousemove.call(dragEl, moveBit)
				// 执行移动回调,传入元素内移动值和宽高 如果没有值,则不执行
				moveCallBack && moveCallBack.call(dragEl, $this.getDragRect(dragEl, moveBit))



				document.onmouseup = function (ev) {
					ev = ev || window.event;
					// 释放document的move事件
					document.onmousemove = null;
					// 释放document的onmouseup事件
					document.onmouseup = null;
					//释放dragEl的点击事件
					document.releaseCapture && document.releaseCapture();
					// 将按下位置保存为startBit(移动位)
					var endBit = { x: ev.clientX, y: ev.clientY }

					// 执行拖拽元素规则 传入鼠标位置与拖动元素
					dragRule.mouseup && dragRule.mouseup.call(dragEl, startBit)
					// 执行松开回调
					upCallback && upCallback.call(dragEl, $this.getDragRect(dragEl, moveBit))
				}
				return;


			}; return;
		}
	}
}
InitDrag.prototype.init.prototype = InitDrag.prototype

export default InitDrag