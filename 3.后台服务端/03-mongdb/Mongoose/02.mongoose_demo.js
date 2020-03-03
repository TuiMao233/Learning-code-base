// 数据库->集合->文档
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/mongoose_test",{useMongoClient:true})
mongoose.connection.once("open",function (){console.log('数据库连接成功~~~')})
// 将Schema 赋值给一个变量
var Schema = mongoose.Schema
// 创建Schema(模式)对象
var stuSchema = new Schema({
	name: String,
	age: Number,
	gender: { // 设置多个参数
		type: String,
		default: "female" // 设置改属性默认值
	},
	address: String
})
//Model代表的是数据库中的集合，通过Model才能对数据库进行操作
//mongoose.model(modelName, schema):
//modelName 就是要映射的集合名 mongoose会自动将集合名变成复数
var StuModel = mongoose.model("student", stuSchema)
// 向数据库中插入一个文档
// StuModel.create(doc, function(err){});
StuModel.create({
	name: '孙悟空',
	age: 70,
	gender: "male",
	address: '花果山'
}, function(err){
	if(!err) {
		console.log("插入成功")
	}
})
