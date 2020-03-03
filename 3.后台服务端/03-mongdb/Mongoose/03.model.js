var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/mongoose_test",{useMongoClient:true});
mongoose.connection.once("open",function () {console.log("数据库连接成功~~~");});
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
StuModel.find({},function(err, doc){
	if(!err){
		console.log(doc)
	}
})
/*
	- 有了Model，我们就可以来对数据库进行增删改查的操作了
 	Model.create(doc(s), [callback])
 	- 用来创建一个或多个文档并添加到数据库中
 	- 参数：
 		doc(s) 可以是一个文档对象，也可以是一个文档对象的数组
 		callback 当操作完成以后调用的回调函数
 	*/
/* StuModel.create([
	{
		name:"沙和尚",
		age:38,
		gender:"male",
		address:"流沙河"
	},
	{
		name:"通讯录",
		age:32,
		gender:"male",
		address:"流我沙河"
	},
],(err)=>{
	if(!err){console.log('插入成功~~~')}
})
 */


/*
		- 
	Model.findById(id, [projection], [options], [callback])
		- 根据文档的id属性查询文档
	Model.findOne([conditions], [projection], [options], [callback])
		- 查询符合条件的第一个文档 总和返回一个具体的文档对象
	conditions 查询的条件
	callback 回调函数，查询结果会通过回调函数返回
				回调函数必须传，如果不传回调函数，压根不会查询
 */

// 查询所有符合条件的文档 总会返回一个数组
// Model.find(conditions, [projection], [options], [callback])
/* StuModel.find({name:'孙悟空'},function(err,docs){
	if(!err){
		console.log(docs)
	}
}) */


// 限制key属性查询结果 投影
// projection 投影 需要获取到的字段
// 两种方式: {name:1,_id:0}
//		  "name -_id"
/* StuModel.find({name:'孙悟空'},{name:1,_id:0},function(err,docs){
	if(!err){
		console.log(docs)
	}
})
StuModel.find({name:'孙悟空'},'name age -_id',function(err,docs){
	if(!err){
		console.log(docs)
	}
})
 */

// options  查询选项（skip limit）
// {skip:3 , limit:1} 跳过查询, 查询数量
/* StuModel.find({name:'孙悟空'},'name age -_id',{skip:3,limit:3},function(err,docs){
	if(!err){
		console.log(docs)
	}
}) */


// 查询id
/* StuModel.findById('5e51488eee942f08a4072305', function(err, doc){
	if(!err){
		console.log(doc)
		// doc技术StuModel的实例
	}
})
 */

/*
Model.update(conditions, doc, [options], [callback])
修改方法:  conditions 查询条件
			doc 修改后的对象
			options 配置参数
			callback 回调函数 */
/* StuModel.update({name:'孙悟空'}, {$set:{age:20}},function(err){
	if(!err){
		console.log('修改成功')
	}
}) */


//Model.count(conditions, [callback])
// 	- 统计文档的数量的
/* StuModel.count({},function(err, count){
	if(!err){
		console.log(count)
	}
}) */

/*
	删除：
 Model.remove(conditions, [callback])
 Model.deleteOne(conditions, [callback])
 Model.deleteMany(conditions, [callback])
 */
/* StuModel.remove({name:'白骨精'},function(err){
	if(!err){
		console.log('删除成功')
	}
}) */

/*StuModel.remove({name:"白骨精"},function (err) {
	if(!err){
		console.log("删除成功~~");
	}
});*/

/*
 Model.replaceOne(conditions, doc, [options], [callback])
*/

