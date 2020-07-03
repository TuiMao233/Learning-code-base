$(function () {
	// 监听inpuit
	$('.comment').on('propertychange input',function(){
		if($(this).val() != '') {
			// 按钮可用
			$('.send').prop('disabled',false)
		}else{
			// 按钮不可用
			$('.send').prop('prop',false)
		}
		
	})
	
	// 发布按钮
	$('.send').click(function(){
		var $dom = getContDom($('.comment').val())
		$('.messageList').prepend($dom)
	})
	// 监听绑定所有类名infoTop的元素的点击事件
	$('body').delegate('.infoTop', 'click', function(){
		$(this).text(parseInt($(this).text())+ 1)
	})
	// 监听绑定所有类名infoDown的元素的点击事件
	$('body').delegate('.infoDown', 'click', function(){
		$(this).text(parseInt($(this).text())+ 1)
	})
	// 监听绑定所有类名infoDown的元素的点击事件
	$('body').delegate('.infoDel', 'click', function(){
		// 查找所有父元素 (接收选择器进行筛选)
		$(this).parents('.info').remove()
	})
	
	function getContDom (val) {
		var start = new Date();
		var year = start.getFullYear(); 	// 年
		var month = start.getMonth() + 1; 	// 月		//1~31 从0开始算 所以0=1	
		var data = start.getDate();			// 日
		var hour = start.getHours(); 		// 小时
		var minute = start.getMinutes();	// 分钟
		var second = start.getSeconds();	// 秒
		var time = `${year}-${month}-${data} ${hour}:${minute}:${second}`
		var ContDom = `<div class="info">
							<p class="infoText">${val}</p>
							<p class="infoOperation">
								<span class="infoTime">${time}</span>
								<span class="infoHandle">
									<a href="javascript:;" class="infoTop">0</a>
									<a href="javascript:;" class="infoDown">0</a>
									<a href="javascript:;" class="infoDel">删除</a>
								</span>
							</p>
						</div>`
		return $(ContDom)
	}
});