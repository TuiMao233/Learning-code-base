/* 
多个对象接收并处理同一请求，他们将请求委托给另一个对象统一处理请求。
var test=document.getElementById('test');
test.onclick=function(){
	var e=e||window.event,
	tar=e.target||e.srcElement;
	if (tar.nodeName.toLowerCase()==='p') {
		tar.innerHTML='我能修改这段文字';
	}
}
var p=document.createElement('p');
p.innerHTML='我是js里后来添加的P标签';
test.appendChild(p);
*/

// 委托者模式优化多次请求
/* var Entrust = {
  Insert: function (res) {
    console.log(res);
    var json = JSON.parse(res);
    $("#test").html(json.Message);
  },
  Update: function (res) {
    console.log(res);
    var json = JSON.parse(res);
    $("#test2").html(json.Message);
  }
}

$.get("/Home/Entrust", function (res) {
  ;
  var json = JSON.parse(res);
  console.log(json);
  Entrust["Insert"] && Entrust["Insert"](json.Insert);
  Entrust["Update"] && Entrust["Update"](json.Update);
}); */