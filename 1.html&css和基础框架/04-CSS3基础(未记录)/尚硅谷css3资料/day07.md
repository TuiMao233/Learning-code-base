###day07复习
	1.less的继承
		#test{
			&:extend(.father)
		}
		#test:extend(.father){
			
		}
		继承实质上将.father选择器和#test组合成一个选择器，
			声明块使用.father的
		
		all:继承所有和.father相关的声明块
		切记父类不能定义成混合（继承不灵活性能高 混合灵活性能低）
	2.less的避免编译
		~"不会被编译的内容"
		变量在less中属于块级作用域，延迟加载
	3.bootstrap栅格系统&源码分析
		流体容器
			width:auto
			两侧15px padding
		固定容器
			阈值
				xs（小于768px）		width：auto
				sm（大于等于768px）	width：720+槽宽
				md（大于等于992px）	width：940+槽宽
				lg（大于等于1200）		width：1140+槽宽
			两侧15px padding
		行
			两侧-15px margin
		列
			公共样式
				两侧有15px 的padding
				相对定位
			float
			width
				1~12
			left
			right
				0~12
				0：auto
			margin-left
				0~12
	4.列排序
		注意阈值上样式的设置不能跳跃
