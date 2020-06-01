
/**
 * Created by zhiyongYan on 2017/3/6.
 */
$(function () {
	// 初始化开始位置
	var newPage = {x:1,y:1}
	// 初始化上一个位置
	var listPage = {x:0,y:0}
	// 判断是否可以操作
	var status = true;
	$(document).swipeUp(function(){
		// 判断可不可以操作
		// 超出页面时终止进行动画操作
		if(!status || newPage.y == 5){return}
		// 记录上一页
		listPage.y = newPage.y
		listPage.x = newPage.x
		// 如果当前页面横向是第二页,那么变回第一页
		newPage.x = newPage.x > 1 ? 1 : newPage.x
		// 更新当前页
		newPage.y++
		pageAnim('up')
	})
	$(document).swipeDown(function(){
		if(!status || newPage.y == 1){return}
		// 记录上一页
		listPage.y = newPage.y
		listPage.x = newPage.x
		// 更新当前页
		newPage.y--
		// 如果当前页面横向是第二页,那么变回第一页
		newPage.x = newPage.x > 1 ? 1 : newPage.x
		pageAnim('down')
	})
	$(document).swipeLeft(function(){
		if(!status || newPage.x == 2 || newPage.y == 1 || newPage.y == 5){return}
		console.log(newPage.y)
		// 记录上一页
		listPage.y = newPage.y
		listPage.x = newPage.x
		// 更新当前页
		newPage.x++
		pageAnim('left')
	})
	$(document).swipeRight(function(){
		if(!status || newPage.x == 1 || newPage.y == 1 || newPage.y == 5){return}
		// 记录上一页
		listPage.y = newPage.y
		listPage.x = newPage.x
		// 更新当前页
		newPage.x--
		pageAnim('right')
	})
	
	/* 滑动动画函数 */
	function pageAnim(dir) {
		// 执行动画期间关闭事件开关
		status = false
		// 获取进场页数类名
		var newPageClass = '.page-'+newPage.y+'-'+newPage.x
		// 获取退场页面类名
		var outPageClass = '.page-'+listPage.y+'-'+listPage.x
		var newClass = ''
		var outClass = ''
		// 清除上一个动画类名
		switch(dir){
			case 'up':
				outClass = 'page-outTop'
				newClass = 'page-moveTop'
				break;
			case 'down':
				outClass = 'page-outBottom'
				newClass = 'page-moveBottom'
				break;
			case 'left':
				outClass = 'page-outLeft'
				newClass = 'page-moveLeft'
				break;
			case 'right':
				outClass = 'page-outRight'
				newClass = 'page-moveRight'
				break;
		}
		// 页面进行添加动画
		$(outPageClass).addClass(outClass)
		$(newPageClass).addClass(newClass)
		// 将元素显示
		$(newPageClass).show()
		$(newPageClass).children().show()
		setTimeout(function(){
			// 动画进行完毕后清除动画类名
			$(outPageClass).removeClass(outClass)
			$(newPageClass).removeClass(newClass)
			// 将上一页隐藏
			$(outPageClass).hide()
			$(outPageClass).children().hide()
			// 动画执行完毕,开启事件开关
			status = true
		},1000)
	}
});


