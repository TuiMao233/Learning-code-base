###day08
	1.width：auto   width：100%
	2.响应式页面
		定制化：修改bootstrap的源文件
				将bootstrap入口less文件作为混合使用
	3.attr&prop
		---什么是attribute？
			html的预定义和自定义属性
		---什么是property？
			js对象身上的直接属性
		---什么是布尔值属性，什么是非布尔值属性？
			property所对应的属性值是否布尔类型
		---attribute和property的同步关系
			非布尔值属性
				实时同步
			布尔值属性
				没有动过property
					attribute会同步property
					property不会同步attribute
				动过property
					attribute不会同步property
					property不会同步attribute
		---浏览器认谁，用户操作的是谁
			property
		---在jQuery中的体现
			attr()
			prop()
		---总结
			布尔值属性最好使用prop方法
			非布尔值属性attr方法
		---html5中有关的属性
			classlist：相对于class的property(className)
				add
				remove
				toggle
			dataset:自定义属性（限制 data-x-y）的property
				
	4.html5导学
		html5的意义，到底什么是html5，html5的优势
		h4与h5的对比
			编码
			渲染模式
			mine类型
		语义化标签
			header
			footer
			section
			nav
			
		










