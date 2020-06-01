var fs = require('fs');
var ffmpeg = 'd:/software/ffmpeg/bin'
var source = './source'
var sourceAbsPath = 'd:/play'
var path = []
var songList = []
fs.readdir(source,(err,files)=>{if(!err){
	// 获取source的所有文件的路径
	path = files.map((item, index)=>{return `${source}/${item}`})
	// 对每个文件进行遍历
	for(var i=0; i<path.length; i++){(function(i){
		// 遍历source的文件里的文件
		fs.readdir(path[i],(err,files)=>{if(!err){
			// 获取里面文件的路径
			path[i] = files.map((item, index)=>{return `${path[i]}/${item}`})
			// console.log(files)
			var songinfo = { // 歌曲信息封装
				songname: '', // 歌名
				singer: '', // 歌手
				album: '',  // 专辑名
				audio: './', // 音频
				time: 0,     // 时长
				lyrics: './', // 歌词
				albumImg: './' // 专辑封面
			}
			for(var x=0; x<path[i].length; x++){
				console.log(path[i][x]) 
				if(confirmEnding(files[x], '.txt')){ // 是否是歌词文件
					songinfo.lyrics = path[i][x]}
				if(confirmEnding(files[x], '.png')){ // 是否为图片
					songinfo.album = files[x].substr(0,files[x].indexOf('.png'))
					songinfo.albumImg = path[i][x]
				}
				if(confirmEnding(files[x], '.mp3')){ // 是否是mp3文件
					var strArr = files[x].substr(0,files[x].indexOf('.mp3')).split(" - ");
					songinfo.singer = strArr[0] // 歌手名
					songinfo.songname = strArr[1] // 歌曲名
					songinfo.audio = path[i][x] // mp3地址
					
					duration(path[i][x],function(timeStr){ // 获取时间
						songinfo.time = timeStr
						// 封装完毕 增加到数据上
						songList[i] = songinfo
						console.log(timeStr)
						if(i == path.length-2){ // 全部数据添加完毕 
							setTimeout(()=>{
								// console.log(songList)
								var JSONList = JSON.stringify(songList)
								console.log(JSONList)
								fs.writeFile('songlist.json',JSONList,{flag:'w'},(err)=>{// 导出数据
									if(!err){console.log('导出数据成功~~~')}else{console.log('失败')}
								})
							},1000)
						}
					})
				}
			}
		}})
	})(i)}
}})

function duration(path, callback) { // 获取音频时长
	var ipos = path.indexOf("/")
	path = path.substring(ipos,path.length)
	var url = sourceAbsPath+path;
	var exec = require('child_process').exec;
	var cp = exec(`${ffmpeg}/ffmpeg -i "${url}"`,function(err,stdout,stderr){
		var outStr = stderr.toString();
	    var regDuration =/Duration\: ([0-9\:\.]+),/;
	    var rs = regDuration.exec(outStr); 
	    var timeStr = rs[1] || './';
		callback(timeStr)
	});
}
function confirmEnding(str, target) {
 let strLen = str.length;
 let targetLen = target.length;
 // 原字符串减判断字符串长度 = 判断后面字符串的长度
 if(str.substring(strLen-targetLen) == target){
   return true;
 }
 return false;
}