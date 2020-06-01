###day01
	1.Cascading  style sheets
	2.样式表的组成
		规则
			选择器+声明块
					声明
						CSS合法的属性名+属性值
	3.浏览器渲染样式表的顺序
		从右往左
	4.选择器
		基本选择器及其扩展
			* . # 后代 组合（#test.pink）
			> + ~ 分组（，结合符）
		属性选择器
			存在与值 属性选择器
				[attr] [attr="val"] [attr~="val"](只认空格)
			子串值 属性选择器
				^ $ * |(val val-)
		伪类与伪元素选择器
			链接伪类
				:link :visited :target(css实现选项卡)
			动态伪类
				:hover :active(lvha)
			表单伪类
				:disabled :enabled	:checked(自定义单选按钮) :focus
			结构性伪类
				ele:nth-child(index)
				ele:nth-of-type(index) 以元素为中心
				
				区别：
					1.nth-child找到第index个子元素  这个子元素必须满足ele的规则
					  nth-of-type找到底index个ele子元素
					2.nth-of-type以元素为中心
				注意：
					index可以是变量n（只能是n  0到正无穷）
							odd：奇数
							even：偶数	
			伪元素
				::after
				::before
				
		CSS声明的优先级
			层叠
				先按来源进行刷选
				如果来源相同，按选择器的特殊性继续刷选
				选择器的特殊性如果相同，按顺序继续刷选
	5.自定义字体
		@font-face
		字体图标
			1.制作一套矢量图
			2.将矢量图与字符进行绑定
			3.使用工具或者站点生成一套字体
			4.最终使用
		 字体兼容处理网站
	       https://www.fontsquirrel.com/tools/webfont-generator
	    icomoon字体图标
	       https://icomoon.io/#home
	
	6.文本新增样式
		文本阴影
		怎么溢出显示省略号
			white-space=no-wrap
			overflow=hidden
			text-overflow=ellipsis
			包裹区域必须不能让子元素撑开