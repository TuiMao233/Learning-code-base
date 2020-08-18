(function(w){
	w.damu={};
	damu.drag= function (node,flag,value,node2){
		//node:拖拽元素
		//flag：是否限制范围
		//value：吸附程度
		//node2：碰撞元素
		var limit = true;
		var adsorption =0;
		var startPoint = {x:0,y:0};
		var mouseDownPoint ={x:0,y:0}
		node.onmousedown=function(ev){
			ev= ev||event;
			startPoint.x = this.offsetLeft;
			startPoint.y = this.offsetTop;
			mouseDownPoint.x=ev.clientX;
			mouseDownPoint.y=ev.clientY;
			if(this.setCapture){
				this.setCapture();
			}
			document.onmousemove=function(ev){
				ev= ev||event;
				var mouseMovePoint ={x:0,y:0}
				mouseMovePoint.x=ev.clientX;
				mouseMovePoint.y=ev.clientY;
				var dis={x:0,y:0};
				dis.x = mouseMovePoint.x - mouseDownPoint.x;
				dis.y = mouseMovePoint.y - mouseDownPoint.y;
				var L = startPoint.x + dis.x;
				var T = startPoint.y + dis.y;
				
				
				limit = flag===false?false:true;
				if(limit){
					if(value){
						adsorption = value;
					}
					
					if(L<adsorption){
						L=0;
					}else if(L>(document.documentElement.clientWidth- node.offsetWidth -adsorption)){
						L=(document.documentElement.clientWidth- node.offsetWidth)
					}
					if(T<adsorption){
						T=0;
					}else if(T>(document.documentElement.clientHeight - node.offsetHeight -adsorption)){
						T=(document.documentElement.clientHeight - node.offsetHeight)
					}
				}
				
				
				
				
				node.style.left = L +"px";
				node.style.top =  T+"px";
				
				if(node2){
					var T1 = node.offsetTop;
					var B1 = node.offsetTop + node.offsetHeight;
					var R1 = node.offsetLeft + node.offsetWidth
					var L1 = node.offsetLeft;
					
					var T2 = node2.offsetTop;
					var B2 = node2.offsetTop + node2.offsetHeight;
					var R2 = node2.offsetLeft + node2.offsetWidth
					var L2 = node2.offsetLeft;
					if(R1<L2||B1<T2||L1>R2||T1>B2){
						node2.src="img/tg.png";
					}else{
						node2.src="img/xfz.png";
					}
				}
			}
			
			document.onmouseup=function(){
				document.onmousemove = document.onmouseup = null;
				if(document.releaseCapture){
					document.releaseCapture();
				}
			}
			return false;
		}
	}
})(window)





