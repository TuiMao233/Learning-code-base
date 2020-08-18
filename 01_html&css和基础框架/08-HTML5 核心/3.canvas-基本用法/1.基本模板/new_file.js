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
	injeProce: function(InjeConts, InjeCont) {
		InjeConts.push(InjeCont)
	},
	// 变化器处理函数
	changerProce: function(InjeConts, changer) {
		for (var i = 0; i < InjeConts.length; i++) {
			// 判断个体状态
			var InjeContStatus = changer(InjeConts[i])
			// 如果为true，代表需要清除该个体
			if (InjeContStatus) {
				InjeConts.splice(i, 1)
			}
		}
	},
	// 绘制器处理函数
	plotterProce: function(ctx, InjeConts, plotter) {
		ctx.clearRect(0, 0, oc.width, oc.height);
		for (var i = 0; i < InjeConts.length; i++) {
			plotter(ctx, InjeConts)
		}
	}
}
canvaAnim.prototype.init.prototype = canvaAnim.prototype
new canvaAnim({
	el: oc,		// 传入canvsHTML元素
	injeSpeed: 340, // 注入速度  1 -> 400	0或者空串是默认值340
	animSpeed: 60, // 动画速度  1 - 1000	0或者空串是默认值60
	injection() { // 注入器
		// 将注入个体信息返回
		return {
			width: 0,
			height: 0
		}
	},
	changer(InjeConts) { // 变化器
		/* InjeConts.width++
		InjeConts.height++
		// 达成条件删除个体信息
		if(InjeConts.width> 100){return true} 
		*/
	},
	plotter(ctx, InjeConts) { // 绘制器
		ctx.save();
		// 这里添加样式
		ctx.beginPath();
		// 这里进行绘制规则
		ctx.fillRect(0, 0, InjeConts.width, InjeConts.height)
		ctx.fill()
		ctx.restore();
	}
})
