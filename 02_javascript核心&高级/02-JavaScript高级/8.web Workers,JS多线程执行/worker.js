		//  1 1 2 3 5 8 13 21 34 55 89 144
		//  1 2 3 4 5 6 7  8  9  10 11 12
function fibonacci(n){//5
		return n<=2 ? 1 : fibonacci(n-1) + fibonacci(n-2);
}
var onmessage = function(event){
	var num = event.data //分线程接收主线程发送的数据
	postMessage(fibonacci(num))//分线程向主线程返回数据
	//alert(result) 不能再分线程调用,分线程没有window对象
}
