###全局透明度的设置
	globalAlpha = value
		这个属性影响到 canvas 里所有图形的透明度，
		有效的值范围是 0.0 （完全透明）到 1.0（完全不透明）
		默认是 1.0
		
###覆盖合成
	source:新的图像(源)
	destination:已经绘制过的图形(目标)

	globalCompositeOperation
		source-over(默认值):源在上面,新的图像层级比较高
		source-in  :只留下源与目标的重叠部分(源的那一部分)
		source-out :只留下源超过目标的部分
		source-atop:砍掉源溢出的部分
		
		destination-over:目标在上面,旧的图像层级比较高
		destination-in:只留下源与目标的重叠部分(目标的那一部分)
		destination-out:只留下目标超过源的部分
		destination-atop:砍掉目标溢出的部分
		
		
	
	
		
		

	
		
	
	
	