###二次贝塞尔
	quadraticCurveTo(cp1x, cp1y, x, y)
		绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
		起始点为moveto时指定的点
		
###三次贝塞尔
	bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
		绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
		起始点为moveto时指定的点