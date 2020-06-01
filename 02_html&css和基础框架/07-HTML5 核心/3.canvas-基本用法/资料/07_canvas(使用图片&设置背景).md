###在canvas中插入图片(需要image对象)
	1.canvas操作图片时，必须要等图片加载完才能操作
	2.drawImage(image, x, y, width, height)
		其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。
		这个方法多了2个参数：width 和 height，这两个参数用来控制 当像canvas画入时应该缩放的大小


###在canvas中设置背景(需要image对象)
	1.createPattern(image, repetition)
		image:图像源
		epetition:
			"repeat" 
			"repeat-x" 
			"repeat-y" 
			"no-repeat" 
			
	一般情况下，我们都会将createPattern返回的对象作为fillstyle的值
			
###渐变
	canvas渐变（线性渐变）
		createLinearGradient(x1, y1, x2, y2)
				表示渐变的起点 (x1,y1) 与终点 (x2,y2)
					
		gradient.addColorStop(position, color)
				gradient :createLinearGradient的返回值
				addColorStop 方法接受 2 个参数，
					position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。
									例如，0.5 表示颜色会出现在正中间。
					color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）
				
	
	canvas渐变（径向渐变）	
		createRadialGradient(x1, y1, r1, x2, y2, r2)
			前三个参数则定义另一个以(x1,y1) 为原点，半径为 r1 的圆，
			后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
			
		