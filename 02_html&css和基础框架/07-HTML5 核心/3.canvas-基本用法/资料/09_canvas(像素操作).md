###在canvas中的像素操作
		到目前为止，我们尚未深入了解Canvas画布真实像素的原理，事实上，
	你可以直接通过ImageData对象操纵像素数据，直接读取或将数据数组写入该对象中
	

###得到场景像素数据
	getImageData():获得一个包含画布场景像素数据的ImageData对像,它代表了画布区域的对象数据
	
	ctx.getImageData(sx, sy, sw, sh)
		sx:将要被提取的图像数据矩形区域的左上角 x 坐标。
		sy:将要被提取的图像数据矩形区域的左上角 y 坐标。
		sw:将要被提取的图像数据矩形区域的宽度。
		sh:将要被提取的图像数据矩形区域的高度。
	
###ImageData对象
	ImageData对象中存储着canvas对象真实的像素数据，它包含以下几个只读属性：
		width:图片宽度，单位是像素
		height:图片高度，单位是像素
		data:Uint8ClampedArray类型的一维数组，
			包含着RGBA格式的整型数据，范围在0至255之间（包括255）
			R:0 --> 255(黑色到白色)
			G:0 --> 255(黑色到白色)
			B:0 --> 255(黑色到白色)
			A:0 --> 255(透明到不透明)
			
###在场景中写入像素数据
	putImageData()方法去对场景进行像素数据的写入。
	putImageData(myImageData, dx, dy)
		dx和dy参数表示你希望在场景内左上角绘制的像素数据所得到的设备坐标
		
###创建一个ImageData对象
	ctx.createImageData(width, height);
		width : ImageData 新对象的宽度。
		height: ImageData 新对象的高度。
		
	默认创建出来的是透明的

###操作单个像素（行与列）

###马赛克
	
		
	
	
	