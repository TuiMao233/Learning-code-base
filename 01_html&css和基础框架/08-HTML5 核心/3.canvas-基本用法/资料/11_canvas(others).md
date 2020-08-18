###将画布导出为图像
	toDataURL(注意是canvas元素接口上的方法)
	
###事件操作
	ctx.isPointInPath(x, y)
		判断在当前路径中是否包含检测点
			x:检测点的X坐标
			y:检测点的Y坐标
	
	注意，此方法只作用于最新画出的canvas图像