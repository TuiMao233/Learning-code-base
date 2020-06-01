###canvas绘制矩形
	HTML中的元素canvas只支持一种原生的图形绘制：矩形。所有其他的图形的绘制都至少需要生成一条路径

	1.绘制矩形
		canvas提供了三种方法绘制矩形：
			---->绘制一个填充的矩形（填充色默认为黑色）
				fillRect(x, y, width, height)
			---->绘制一个矩形的边框（默认边框为:一像素实心黑色）
				strokeRect(x, y, width, height)
			---->清除指定矩形区域，让清除部分完全透明。	
				clearRect(x, y, width, height)
				
		x与y指定了在canvas画布上所绘制的矩形的左上角（相对于原点）的坐标。
		width和height设置矩形的尺寸。（存在边框的话，边框会在width上占据一个边框的宽度，height同理）
	
	2.strokeRect时，边框像素渲染问题
		按理渲染出的边框应该是1px的，
		canvas在渲染矩形边框时，边框宽度是平均分在偏移位置的两侧。
			context.strokeRect(10,10,50,50)
				:边框会渲染在10.5 和 9.5之间,浏览器是不会让一个像素只用自己的一半的
				  相当于边框会渲染在9到11之间
			context.strokeRect(10.5,10.5,50,50)
				:边框会渲染在10到11之间
	
	3.添加样式和颜色
		fillStyle   :设置图形的填充颜色。
		strokeStyle :设置图形轮廓的颜色。
			默认情况下，线条和填充颜色都是黑色（CSS 颜色值 #000000）
		lineWidth : 这个属性设置当前绘线的粗细。属性值必须为正数。
			描述线段宽度的数字。 0、 负数、 Infinity 和 NaN 会被忽略。
			默认值是1.0。
			
	4.lineWidth & 覆盖渲染
	
	5.lineJoin
		设定线条与线条间接合处的样式（默认是 miter）
		round : 圆角
		bevel : 斜角
		miter : 直角
		
		
		