###day03
	a.过渡只关系元素的初始状态和结束状态，没有方法可以获取元素在过渡中每一帧的状态
	b.元素在初次渲染还没有结束的时候，是没有办法触发过渡的
	c.在绝大部分变换样式的切换时，变换组合的个数或位置不一样时，是没有办法触发过渡的


	1.过渡
		transition-property 
			指定过渡动画的属性（并不是所有的属性都可以动画）
		transition-duration
			指定过渡动画的时间（0也要带单位）
		transition-timing-function
			指定过渡动画的形式（贝塞尔）
		transition-delay
			指定过渡动画的延迟
		transition
			第一个可以被解析成时间的值会赋给transition-duration
		transtionend事件（DOM2）
			在每个属性完成过渡时都会触发这个事件
		当属性值的列表长度不一致时
			跟时间有关的重复列表
			transition-timing-function使用默认值
	
	2.2D变换（transform）
		rotate
			旋转
		translate
			平移
		skew
			斜切
		scale
			缩放
		变换组合!
			顺序是从右往左的，变换的底层其实就是矩阵的运算
		基点的变换
			transform-origin
		