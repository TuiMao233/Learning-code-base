
/* 
	定义一个模块math
			- 在该模块中提供两个方法
			add(a,b) //求两个数的和
			mul(a,b) //求两个数的积
 */
var math = {
	add(a,b){
		console.log(a+b);
	},
	mul(a,b){
		console.log(a*b);
	}
}

exports.math = math