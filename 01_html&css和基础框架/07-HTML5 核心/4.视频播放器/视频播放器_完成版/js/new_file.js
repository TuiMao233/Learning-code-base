window.onload=function(){
			(function(w){  
				w.video = document.querySelector("#wrapVideo > video");
				var start = document.querySelector(".start");
				var stop = document.querySelector(".stop");
				var test = document.querySelector(".progress > .wrap > .test");
				var pink = document.querySelector(".progress > .pink");
				var test2 = document.querySelector(".control > .others > .sound > .progress > .wrap > .test");
				var pink2 = document.querySelector(".control > .others > .sound > .progress > .pink");
				var time = document.querySelector(".control > .others > .time");
				var swhVlme = document.querySelector(".control > .others > .sound > .switch >span");
				var oppFull = document.querySelector(".control > .others > .full-screen");
				var control = document.querySelector("#wrapVideo");
				var	warp  = document.querySelector("#wrapVideo > .control > .progress > .wrap")
				var progress = document.querySelector("#wrapVideo > .control > .progress")
				var showTime = document.querySelector("#wrapVideo > .control > .progress > .showTime");
				var showTime_st = document.querySelector("#wrapVideo > .control > .progress > .showTime > .show-time");
				var showTime_sign = document.querySelector("#wrapVideo > .control > .progress > .showTime > .show-sign");
				var callBack = {
					"move" : function(){
						pink.style.width = (this.offsetLeft / (this.parentNode.offsetWidth / 100))+"%";
					}
				}
				
				var callBack2 = {
					"move" : function(){
						pink2.style.width = this.offsetLeft + "px"; 
					}
				}
				$.drag(test,callBack);
				$.drag(test2,callBack2);
				console.log(showTime);
				warp.onmousemove = function(){
					progress.onmousemove = function(ev){
						ev = ev||event;
						var MoverX = ev.clientX - getPointAb(this).x;
						var Tim = MoverX * (video.duration / this.offsetWidth);
						var fen =twoNum(Math.floor(Tim / 60));
						var miao =twoNum(Math.floor(Tim - (fen * 60)));
						showTime_st.innerText = fen+":"+miao;
						showTime.style.left = MoverX - (showTime.offsetWidth / 2) +"px";
						showTime.style.opacity = 1;
					}
					return false;
				}
				var num = 0;
				$.click(start,function(){ //播放
					if(num == 0){
						video.play();
						num = 1;
						this.className = "start icon-uniE907";
					}else{
						video.pause();
						num = 0;
						this.className = "start icon-6";
					}
				})
				$.click(stop,function(){ //暂停
					video.currentTime = 0;
					h();
					font = false;
					start.className = "start icon-6";
					num = 0;
				})
				var swhbol = false;
				$.click(swhVlme,function(){
					video.muted = !video.muted;
					if(!video.muted){
						video.volume = vV;
						swhVlme.className = "icon-5";
					}else{
						vV = video.volume;
						video.volume = 0;
						swhVlme.className = "icon-4";
					}v();
				})
				video.addEventListener("playing",function(){ //播放时触发同步
					font = false;
					setTimeout(function(){font = true;synchro();},500)
				})
				video.addEventListener("pause",function(){ //暂停时停止同步
					font = false;
				})
				video.volume = 0.5;
				v();
				function v(){
					var volume = video.volume;
					var vlmePwr = volume * 100;
					if(video.volume == 0 ){
						swhVlme.className = "icon-4";
					}else{
						swhVlme.className = "icon-5";
					}
					test2.style.left = vlmePwr  + "%";
					pink2.style.width = vlmePwr + "%";
				}
				var twoNum = (x) =>{return (x < 10) ? ("0"+x) : x;}
				h();
				function h(){
					var videoDtn = video.duration;  //媒体总时间(只读)
					var videoCtime = video.currentTime;//开始播放到现在所用的时间(可读写)
					/*以下是小方块与进度条同步*/
					var bf =  videoCtime /(videoDtn / 100);
					test.style.left =  bf + "%"; //小方块百分比
					pink.style.width = bf + "%"; //进度条百分比
					/*以下是时间的运行*/
					var fen =twoNum(Math.floor(videoCtime / 60));
					var miao =twoNum(Math.floor(videoCtime - (fen * 60)));
					time.children[0].innerText = fen+":"+miao;
					var fen1 =twoNum(Math.floor(videoDtn / 60));
					var miao1 =twoNum(Math.floor(videoDtn - (fen1 * 60)));
					time.children[1].innerText = fen1+":"+miao1;
				}
				w.synchro = function(){
					console.log("同步");
					if(font != true){return;}
					h();
					clearTimeout(setout);
					var setout = setTimeout(function(){synchro()},100)
				}
				
				
				
				var Element = document.documentElement;
				var openINexit = true;
				var vidWith = "";
				$.click(oppFull,function(){
					if(openINexit){
						openINexit = false;
						openFullscreen(control); //调用上面全屏方法1
						Element.style.overflow = "hidden";
						vidWith = video.width;	//记录原本宽度
						video.width = Element.offsetWidth;
					}else{
						openINexit = true;
						exitFullScreen(control)
						Element.style.overflow = "auto";
						video.width = vidWith;	//恢复宽度
						
					}
				})
			    
					//打开全屏方法
				   function openFullscreen(element) {
				        if (element.requestFullscreen) {
				            element.requestFullscreen();
				        } else if (element.mozRequestFullScreen) {
				            element.mozRequestFullScreen();
				        } else if (element.msRequestFullscreen) {
				            element.msRequestFullscreen();
				        } else if (element.webkitRequestFullscreen) {
				            element.webkitRequestFullScreen();
				        }
				    }
				
				    //退出全屏方法
				    function exitFullScreen() {
				        if (document.exitFullscreen) {
				            document.exitFullscreen();
				        } else if (document.mozCancelFullScreen) {
				            document.mozCancelFullScreen();
				        } else if (document.msExitFullscreen) {
				            document.msExiFullscreen();
				        } else if (document.webkitCancelFullScreen) {
				            document.webkitCancelFullScreen();
				
				        } else if (document.webkitExitFullscreen) {
				            document.webkitExitFullscreen();
				        }
				    }
				
				
			})(window)
			
			
		}