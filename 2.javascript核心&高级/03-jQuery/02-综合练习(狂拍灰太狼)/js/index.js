$(function () {
	$('.start').click(function(){ // 开始按钮
		gamePlay()
	})
	$('.reStart').click(function(){ // 重新开始按钮
		gamePlay()
	})
	$('.rules').click(function(){ // 游戏规则按钮
		$('.rule').fadeIn(400) 
	})
	$('.close').click(function(){ // 游戏规则关闭
		$('.rule').fadeOut(400) 
	})
	
	
	// 游戏开始函数
	function gamePlay() { 
		$('.start').fadeOut(200) // 游戏开始按钮淡出
		$('.mask').fadeOut(400) // 游戏结束淡出
		$('.progress').css('width', 180)
		var timer = setInterval(()=>{ 
			var score = $('.progress').width() - 1	// 每次进度条减一
			if(score < 0) { // 进度条结束后执行
				// 进度条为0时停止定时器
				clearInterval(timer)
				// 执行游戏结束函数
				gameOver()
			}$('.progress').css('width',score) // 将新的值给.progress元素
		},1000/10)
		wolfAnimation() // 执行狼动画函数
	}
	
	// 游戏结束函数
	function gameOver() {
		$('.mask').fadeIn(400) // 游戏结束淡入
		$('.container img').remove() // 清除狼元素
		clearInterval(wolftimer) // 关闭狼动画
	}
	// 1.定义两个数组保存所有灰太狼和小灰灰的图片
	var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
	var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
	// 2.定义一个数组保存所有可能出现的位置
	var arrPos = [
	    {left:"100px",top:"115px"},
	    {left:"20px",top:"160px"},
	    {left:"190px",top:"142px"},
	    {left:"105px",top:"193px"},
	    {left:"19px",top:"221px"},
	    {left:"202px",top:"212px"},
	    {left:"120px",top:"275px"},
	    {left:"30px",top:"295px"},
	    {left:"209px",top:"297px"}
	];
	
	
	// 狼动画处理函数
	function wolfAnimation() { 
		// 创建img
		var img = $(`<img src=''>`)
		// 取随机的位置
		var ranRect = arrPos[Math.floor(Math.random() * 9)]
		// 取随机的狼
		var wolf = Math.floor(Math.random() * 2) == 1 ? wolf_1 : wolf_2
		// 初始化元素位置
		img.attr('src', wolf[0])
		// 设置元素属性
		img.css({
			position: 'absolute',
			left: ranRect.left,
			top:ranRect.top,
			cursor: 'pointer'
		})
		// 将元素添加到内容框
		$('.container').prepend(img)
		
		
		window.index = 0 // 设置初始索引
		window.indexEnd = 5 // 设置最终索引
		// 狼动画
		wolftimer = setInterval(function(){
			img.attr('src', wolf[index])
			if(index == indexEnd) { // 当执行到第五张的时候
				// 删除所有图片
				$('.container img').remove()
				// 清除定时器
				clearInterval(wolftimer)
				// 重新调用狼动画函数
				wolfAnimation();
			}index++
		},200)
		
		// 狼的点击事件
		img.one('click',function(){
			// 将定时器的索引和最终索引调整为被点击的图片索引
			window.index = 5
			window.indexEnd = 9
			// 更新分数
			updater(img)
		})
		
	}
	function updater($img) { // 分数更新器
		var src = $img.attr('src')
		var flag = src.indexOf('h') >= 0 // 判断打的是不是灰太狼
		if(flag){ // 如果是 则+ 10分
			$('.score').text(parseInt($('.score').text()) + 10)
		}else{	// 如果不是 则- 10分
			$('.score').text(parseInt($('.score').text()) - 10)
		}
	}
});