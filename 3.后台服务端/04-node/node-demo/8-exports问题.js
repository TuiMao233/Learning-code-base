// module.exports.name ="孙悟空";
// module.exports.age = 18;
// module.exports.sayName = function (){
// 	console.log("我是孙悟空~--");
// }

/* 
module.exports{ //报错
	name:"猪人戒",
	age:28,
	sayName: function () {
	console.log("我是猪八戒");
	}
} 
*/

var obj = {};
obj.a = {};
var a = obj.a;
a.name = '孙悟空'
// console.log(a == obj.a)
// console.log(obj.a.name)
a = new Object();
console.log(a == obj.a)