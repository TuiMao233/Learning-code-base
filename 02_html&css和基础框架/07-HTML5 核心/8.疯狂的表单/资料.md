###疯狂的表单
	Html5 Forms概述,在Html5中:
		1.表单仍然使用<form>元素作为容器,我们可以在其中设置基本的提交特性
			form的action指向一个服务器地址（接口）
		2.当用户或开发人员提交页面时,表单仍然用于向服务端发送表单中控件的值
			注意表单项的name属性必须有值，服务器才能获取表单
		3.所有之前的表单控件都保持不变
		4.仍然可以使用脚本操作表单控件
		5.Htnl5之前的表单
			标签为input
				type:text:文本框
				type:password:密码框
				type:radio:单选按钮
					注意以name分组，确保单选关系，也为了后台能成功获取
					必须有value属性，为了后台获取后的识别（不写统一为on）
					checked属性,选中控制
				type:checkbox:复选框
					注意以name分组，确保为一组，也为了后台能成功获取
					必须有value属性，为了后台获取后的识别（不写统一为on）
					checked属性,选中控制
				type:submit:提交按钮
				type:reset:重置按钮
				type:button:普通按钮
			
			标签为select:下拉框
				name属性在select标签上
				multiple:可选多项
				子项可以通过optgroup来进行分组
					label属性用来定义组名
					子项为option标签
						selected属性,选中控制
						必须有value属性,为了后台获取后的识别
			
			标签为textarea:文本域
			
			标签为button:按钮
				type:submit:提交按钮
				type:reset:重置按钮
				type:button:普通按钮
				
			标签为lable:控制文本与表单的关系
				for属性指向一个input的id
				
			标签fieldset 标签legend:来为表单分组	
					
		6.attr & prop
		7.Html5 新增
		
###新增表单控件
		1.type:email :email地址类型
			当格式不符合email格式时，提交是不会成功的，会出现提示；只有当格式相符时，提交才会通过
			在移动端获焦的时候会切换到英文键盘
			
		2.type:tel :电话类型
			在移动端获焦的时候会切换到数字键盘
		
		3.type:url :url类型
			当格式不符合url格式时，提交是不会成功的，会出现提示；只有当格式相符时，提交才会通过
			
		4.type:search :搜索类型
			有清空文本的按钮
			
		5.type:range  :  特定范围内的数值选择器
			属性:min、max、step
		
		6.
		  type:number          :  只能包含数字的输入框
		  type:color  	       		:  颜色选择器
		  type:datetime        	 :  显示完整日期(移动端浏览器支持)
		  type:datetime-local  :  显示完整日期，不含时区
		  type:time            :  显示时间，不含时区
		  type:date            :  显示日期
		  type:week            :  显示周
		  type:month           :  显示月

			
###新增表单属性
		placeholder  :  输入框提示信息
			适用于form,以及type为text,search,url,tel,email,password类型的input
			
		autofocus  :  指定表单获取输入焦点
		
		required  :  此项必填，不能为空
		
		pattern : 正则验证  pattern="\d{1,5}
		
		formaction 在submit里定义提交地址
		
		list和datalist  :  为输入框构造一个选择列表
							list值为datalist标签的id
		
		
		
###表单验证反馈
	validity对象，通过下面的valid可以查看验证是否通过，如果八种验证都通过返回true，一种验证失败返回false
	node.addEventListener("invalid",fn1,false);
	
	valueMissing  	 :  输入值为空时返回true
	typeMismatch 	 :  控件值与预期类型不匹配返回true
	patternMismatch  :  输入值不满足pattern正则返回true
	
	tooLong  		 :  超过maxLength最大限制返回true
	rangeUnderflow   :  验证的range最小值返回true
	rangeOverflow    :  验证的range最大值返回true
	stepMismatch     :  验证range 的当前值 是否符合min、max及step的规则返回true
	
	customError 不符合自定义验证返回true
		setCustomValidity
		
###关闭验证
	formnovalidate属性
		
		

		