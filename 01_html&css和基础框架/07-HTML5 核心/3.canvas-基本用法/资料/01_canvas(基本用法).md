###canvas基本用法
	1.什么是canvas(画布)
			<canvas> 是 HTML5 新增的元素，可用于通过使用JavaScript中的脚本来绘制图形
		例如，它可以用于绘制图形，创建动画。<canvas> 最早由Apple引入WebKit
		我们可以使用<canvas>标签来定义一个canvas元素
			----->使用<canvas>标签时，建议要成对出现，不要使用闭合的形式。
			----->canvas元素默认具有高宽
						width：  300px
						height：150px
		
	2.替换内容
			<canvas>很容易定义一些替代内容。由于某些较老的浏览器（尤其是IE9之前的IE浏览器）
		不支持HTML元素"canvas"，
		但在这些浏览器上你应该要给用户展示些替代内容。
		这非常简单：我们只需要在<canvas>标签中提供替换内容就可以。
			--->支持<canvas>的浏览器将会忽略在容器中包含的内容，并且只是正常渲染canvas。
			--->不支持<canvas>的浏览器会显示代替内容
			
	3.canvas标签的两个属性
			<canvas> 看起来和 <img> 元素很相像，唯一的不同就是它并没有 src 和 alt 属性。
		实际上，<canvas> 标签只有两个属性—— width和height。这些都是可选的。
		当没有设置宽度和高度的时候，canvas会初始化宽度为300像素和高度为150像素。
		
		画布的高宽
			html属性设置width height时只影响画布本身不影画布内容
			css属性设置width height时不但会影响画布本身的高宽，
						还会使画布中的内容等比例缩放（缩放参照于画布默认的尺寸）
		
	4.渲染上下文
			<canvas> 元素只是创造了一个固定大小的画布，要想在它上面去绘制内容，
		我们需要找到它的渲染上下文
			<canvas> 元素有一个叫做 getContext() 的方法，这个方法是用来获得渲染上下文和它的绘画功能。
		getContext()只有一个参数，上下文的格式
			----->获取方式
				  var canvas = document.getElementById('box');
				  var ctx = canvas.getContext('2d');
				  
			----->检查支持性
				  var canvas = document.getElementById('tutorial');
				  if (canvas.getContext){
						var ctx = canvas.getContext('2d');
					} 
					
	
		