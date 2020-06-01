###角度与弧度的js表达式:radians=(Math.PI/180)*degrees。
###canvas绘制圆形
	arc(x, y, radius, startAngle, endAngle, anticlockwise)
			画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，
			按照anticlockwise给定的方向（默认为顺时针）来生成。
			ture：逆时针
			false:顺时针
		
		x,y为绘制圆弧所在圆上的圆心坐标
		radius为半径
		startAngle以及endAngle参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准
		参数anticlockwise 为一个布尔值。为true时，是逆时针方向，否则顺时针方向。

###arcTo
	arcTo(x1, y1, x2, y2, radius)
	根据给定的控制点和半径画一段圆弧
	肯定会从(x1 y1)  但不一定经过(x2 y2);(x2 y2)只是控制一个方向
		
