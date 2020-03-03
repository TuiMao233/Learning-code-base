###day04复习
	百分比都是参照于谁？
	元素垂直水平居中方案
		已知高宽
			1.position=absolute,lrtb=0,margin=auto,包含块一定的是容器。（绝对定位盒模型的特性）
					left+right+w+p+m = 包含块的宽度
					top+bottom+h+p+m = 包含块的高度
			2.position=absolute,lt=50%,包含块一定的是容器,marginT/L为负的自身的一半。
			3.position=absolute,lt=50%,包含块一定的是容器,transform:tranlate3d(-50%,-50%,0)
			4.flex
		未知高宽
			1.position=absolute,lt=50%,包含块一定的是容器,transform:tranlate3d(-50%,-50%,0)
			2.flex
		img元素如何元素垂直水平居中
			1.基线
	1.3D变换
		perspective，灭点
			景深的写法：
				2种写法。一种css属性，一种是transform属性的一个变换函数（必须在第一位）
			景深的作用：
				构建3D舞台，决定用户的肉眼距离屏幕的水平距离！使3D变换的元素具有近大远小的感觉
			景深和灭点的关系
				景深越大，灭点越远，元素变形越小
				景深越小，灭点越近，元素变形越大
			景深基点
			景深叠加
			
			景深是一个不可继承属性，但他可以作用于所有的后代元素
			
		transform-style
			transform-style的作用
				构建3D舞台，使3d舞台有层次感
			transform-style是一个不可继承属性，他只作用于子元素
			
		backface-visibility
			隐藏元素背面
				一个元素分两面，但并不意味元素有厚度。在一个状态下，元素只能展现自己的一面
				
	2.css3动画基础
		animation-name：代表关键帧的名字
			关键帧：
			   @keyframes animiationName{
	                 keyframes-selector{
	                      css-style;
	                 }
    			}
		
		animation-duration：一个动画周期的时长
		animation-timing-function：作用于一个关键帧周期而非整个动画周期
		animation-delay：代表动画的延迟（这是一个动画外的属性）
		animation-iteration-count：循环关键帧的次数！（只会管理动画内的属性，动画的延迟不会被循环）
		animation-direction：改变关键帧的执行方向，还会影响animation-timing-function的形式
		animation-fill-mode：管理所有动画外的状态！
			什么是动画外的状态
				from之前
					animation-delay
				to之后
			值
				none		: 动画外的状态保持在动画之前的位置
				backwards	：from之前的状态与from的状态保持一致
				forwards	：to之后的状态与to的状态保持一致
				both		：动画外的状态与from和to的状态保持一致
		animation-play-state：管理动画的运行和停止
		
		关键帧：
			   @keyframes animiationName{
	                 keyframes-selector{
	                      css-style;
	                 }
    			}
    			
			keyframes-selector可以是关键帧form（0%）和to（100%）
							    可以是百分比
							   代表的是时间的百分比（时间点） 	