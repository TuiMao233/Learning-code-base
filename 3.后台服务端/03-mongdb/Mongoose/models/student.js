var mongoose = require("mongoose")
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
var StuModel = mongoose.model("student", stuSchema)
module.exports = StuModel