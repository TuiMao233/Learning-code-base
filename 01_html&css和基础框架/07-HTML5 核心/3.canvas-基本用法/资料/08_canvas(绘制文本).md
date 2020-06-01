###在canvas中绘制文本
	canvas 提供了两种方法来渲染文本:
		fillText(text, x, y)
			在指定的(x,y)位置填充指定的文本
		strokeText(text, x, y)
			在指定的(x,y)位置绘制文本边框
			
###文本样式
	font = value
		当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法. 
		默认的字体是 10px sans-serif。
		font属性在指定时，必须要有大小和字体 缺一不可
		
	textAlign = value
		文本对齐选项. 可选的值包括： left, right  center. 
		left
			文本左对齐。
		right
			文本右对齐。
		center
			文本居中对齐。
			这里的textAlign="center"比较特殊。textAlign的值为center时候
			文本的居中是基于你在fillText的时候所给的x的值，
			也就是说文本一半在x的左边，一半在x的右边
		
	
	textBaseline = value
		描述绘制文本时，当前文本基线的属性。
		top
			文本基线在文本块的顶部。
		middle
			文本基线在文本块的中间。
		bottom
			文本基线在文本块的底部。

###measureText
	measureText() 方法返回一个 TextMetrics 对象，包含关于文本尺寸的信息（例如文本的宽度）
		
###canvas中文本水平垂直居中
	
	
###阴影(文本阴影&盒模型阴影)
	shadowOffsetX = float
		shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，
		它们默认都为 0。
	shadowOffsetY = float
		shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，
		它们默认都为 0。
	shadowBlur = float
		shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
	shadowColor = color(必需项)
		shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。
	
	
		