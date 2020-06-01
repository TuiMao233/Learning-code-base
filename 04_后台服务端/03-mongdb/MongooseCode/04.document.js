var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/mongoose_test",{useMongoClient:true});
mongoose.connection.once("open",function () {
	console.log("数据库连接成功~~~");
});
var Schema = mongoose.Schema;
var stuSchema = new Schema({
	name:String,
	age:Number,
	gender:{
		type:String,
		default:"female"
	},
	address:String

});
var StuModel = mongoose.model("student" , stuSchema);
/*
	Document 和 集合中的文档一一对应 ， Document是Model的实例
	通过Model查询到结果都是Document
 */

//创建一个Document
var stu = new StuModel({
	name:"奔波霸",
	age:48,
	gender:"male",
	address:"碧波潭"
});

/*
	document的方法
 		Model#save([options], [fn])
 */

stu.save(function (err) {
	if(!err){
		console.log("保存成功~~~");
	}
});

StuModel.findOne({},function (err , doc) {
	if(!err){
		/*
		 	update(update,[options],[callback])
		 		- 修改对象
		 	remove([callback])
		 		- 删除对象

		 */
		//console.log(doc);
		/*doc.update({$set:{age:28}},function (err) {
			if(!err){
				console.log("修改成功~~~");
			}
		});*/

		/*doc.age = 18;
		doc.save();*/

		/*doc.remove(function (err) {
			if(!err){
				console.log("大师兄再见~~~");
			}
		});*/


		/*
			get(name)
				- 获取文档中的指定属性值
			set(name , value)
				- 设置文档的指定的属性值
			id
				- 获取文档的_id属性值
			 toJSON() ******
			 	- 转换为一个JSON对象

			 toObject()
			 	- 将Document对象转换为一个普通的JS对象
			 		转换为普通的js对象以后，注意所有的Document对象的方法或属性都不能使用了

		 */
		//console.log(doc.get("age"));
		//console.log(doc.age);

		//doc.set("name","猪小小");
		//doc.name = "hahaha";

		//console.log(doc._id);
		//var j = doc.toJSON();
		//console.log(j);

		//var o = doc.toObject();

		//console.log(o);

		doc = doc.toObject();

		delete doc.address;

		console.log(doc._id);

	}
});
