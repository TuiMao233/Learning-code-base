(function(w){
	w.$={};
	w.font = true;
	w.$.click=function(obj,fun){obj.onclick=fun;}
	w.$.drag=function(testNode,callBack){
		//抽象元素一开始的位置
		var startPoint={x:0,y:0};
		//抽象鼠标一开始的位置
		var elementPoint={x:0,y:0};
		testNode.parentNode.onmousedown=function(ev){
			ev = ev||event;
			if(testNode.setCapture){
				testNode.setCapture();
			}
			elementPoint.x = ev.clientX; //鼠标x
			elementPoint.y = ev.clientY; //鼠标y
			var D = testNode.offsetLeft + (elementPoint.x - getPointAb(testNode).x);
			testNode.style.left = D -(testNode.offsetWidth/2) +"px";
			startPoint.x = testNode.offsetLeft;
			startPoint.y = testNode.offsetTop;
			if(testNode.className == "test"){
				w.font = false;
			}
			document.onmousemove=function(ev){
				ev = ev||event;
				var nowPoint = {x:0,y:0};
				nowPoint.x = ev.clientX - elementPoint.x;
				nowPoint.y = ev.clientY - elementPoint.y;
				var L = startPoint.x + nowPoint.x;
				var T = startPoint.y + nowPoint.y;
				if(L < 0){
					L = 0;
				}
				if(L > testNode.parentNode.offsetWidth){
					L = testNode.parentNode.offsetWidth
				}
				testNode.style.left = (L / (testNode.parentNode.offsetWidth / 100)) +"%";
				if(callBack&&callBack["move"]&& typeof callBack["move"] === "function"){
					callBack["move"].call(testNode);
				}
			}
			
			document.onmouseup=function(ev){
				ev = ev||event;
				document.onmousemove = document.onmouseup =null;
				if(document.releaseCapture){
					document.releaseCapture();
				}
				var sum = testNode.parentNode.offsetWidth;
				var num = testNode.offsetLeft;
				var mveNmu = num / (sum / 100);   //拖动后是多少倍
				if(testNode.className == "test"){
					var mveTime = mveNmu * (video.duration / 100); //拖动的倍 * 视频的倍率 = 拖动后的时间
					video.currentTime = mveTime;
				}else{
					var mveTime = mveNmu * (1 / 100); //拖动的倍 * 倍率 = 拖动后的时间
					video.volume = mveTime;
				}
			}
			
			return false;
		}
	}
})(window)
function getPointAb(node){
			var x = 0;
			var y = 0;
			while(node){
				x += node.offsetLeft;
				y += node.offsetTop;
//				x += parseInt(getStyle(node,"borderWidth"));
//				y += parseInt(getStyle(node,"borderWidth"));
				node = node.offsetParent;
			}return {x:x,y:y};
	}