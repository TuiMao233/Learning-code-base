# mongdb运行流程

### 结构化查询语言

关系数据库全都同SQL来操作

### 安装MongoDB

	- 安装  
	配置环境变量
	
	计算机->属性->更改设置->高级->环境变量添加D:\software\mongodb\bin
	
	默认目录在c盘根目录，创建一个文件夹 data，在data中创建一个文件夹db

### 启动服务器

- **输入 mongod 启动mongodb服务  服务器可设置参数**
  `- mongod --dbpath 数据库路径 --port 端口号`
- **在打开一个窗口**  
  `输入 mongo 连接mongodb ，出现 > 客户端`
- **数据库（database）**
  `数据库的服务器(mongod):保存数据`
  `数据库的客户端(mongo):操作服务器，对数据进行增删改查的操作`
- **基本概念**
  `数据库（database）;集合（collection）;文档（document）;
  在MongoDB中，数据库和集合都不需要手动创建，当我们创建文档时，如果文档所在的集合或数据库不存在会自动创建数据库和集合`

### 基本指令

- **显示当前的所有数据库**
  `show dbs
  show databases`
- **进入指定数据库**
  `use 数据库名`
- **显示当前数据库**
  `db`
- **显示数据库中所有的集合**
  `show collections`

# mongdb设置启动服务

1. 在c盘根目录创建data，在data下创建db和log文件夹

2. 在软件bin的上级目录创建文件配置mongod.cfg

3. 以管理员的身份打开命令行窗口

4. 执行如下的命令

   ~~~javascript
   sc.exe create MongoDB binPath= "\"mongod的bin目录\mongod.exe\" --service --config=\"mongo的安装目录\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
   ~~~

5. 启动mongodb服务

6. 如果启动失败，证明上边的操作有误，在控制台输入 sc delete MongoDB 删除之前配置的服务然后从第一步再来一次

# mongdb增删改查(CRUD)

## 插入文档（insert）

例子：向test数据库中的，stus集合中插入一个新的学生对象

~~~javascript
// insert方法添加一个
db.stus.insert({name:"孙悟空",age:18,gender:"男"})  
// insert方法添加多个
db.stus.insert([
  {name:'猪八戒',age:60,gender:'男'},
  {name:'沙和尚',age:65,gender:'男'}，
  {name:'ba',age:60,gender:'男'}
])
// insertOne方法添加一个
db.stus.insertOne(doc) 
// insertMany方法添加多个
db.stus.insertMany([doc])
~~~

**注意：**`当我们向集合中插入文档时,如果没给文档指定\_id属性,则数据库会自动为文档添加\_id属性，该属性原来作为文档的唯一标识当设置了_id则不会主动生成`

`db.stus.insert({_id:"hello",name:"猪八戒",age:28});`

### 大数据插入优化

`mongo内置方法优化差，尽量包装好数据在添加进集合中`

~~~javascript
// 向numbers中插入20000条数据
for(var i=0; i<20000; i++){ 	// 15.2s
    db.numbers.insert({num:i})
 };
var arr = [];
for(var i=0; i<20000; i++){  	// 0.3s
    arr.push({num:i})
 };
~~~

## 查询文档（find）

~~~javascript
// 根据指定条件从集合中查询所有符合条件的文档，返回的是一个数组
db.<collection>.find() 												 // 查询所有文档
db.<collection>.find({name:'孙悟空'}) 						// 查询name为孙悟空的文档
db.<collection>.find({_id:'hello',name:'孙悟空'}) // 查询_id为hello,name为孙悟空的文档
// 查询第一个符合条件的文档，返回的是一个对象
db.collection.findOne()
// 查询符合条件的文档的数量
db.collection.find().count()
~~~

### 限制key属性查询

`在查询时,可以在第二个参数的位置来设置查询结果的 投影，1表示显示该属性，_id默认会显示，把_id设成0就不会显示了`

~~~javascript
db.emp.find({},{ename:1, _id:0, sal:1})
~~~

### 查询排序

`sort()可以原来指定文档的排序的规则 1表示为升序 -1表示降序`

~~~javascript
db.emp.find({}).sort(
    {sal:1}, // sal升序排序
    {empno:-1} // sal值一样时empno按照降序排序
)
~~~

### 数值查询

~~~javascript
// 查询工资小于2000的员工
db.emp.find({sal:{$lt:2000}})
// 查询工资在1000-2000之间的员工
db.emp.find({sal:{$gte:1000,$lte:2000}})
// 查询工资小于1000或大于2500的员工
db.emp.find({$or:[
        {sal:{$lt:1000}},
        {sal:{$gt:2000}}
]})
~~~

### 限制查询(翻页查询)

~~~javascript
//23.查看numbers集合中的前10条数据
db.numbers.find().limit(10);
//24.查看numbers集合中的第11条到20条数据
// skip() 跳过多少条数据
/*分页数据1-10,11-20,21-30*/
/*skip((页码-1) * 每页显示的条数).limit(每页的条数) */
db.numbers.find().skip(10).limit(10);
//25.查看numbers集合中的第21条到30条数据
db.numbers.find().skip(20).limit(10);
~~~

### 查询订单(一对多)

~~~javascript
var arr = []
for(var i=0; i<50; i++){arr.push({username:'swk'+i})}
// 查找swk6的订单
db.users.insert(arr)
db.order.insert({
    list:['苹果','香蕉','大鸭梨'],
    user_name:'swk6'
})
// 获取swk6的用户名
var user_name = db.users.findOne({username:'swk6'}).username
// 查找用户名对应的订单
db.order.find({user_name:user_name})
~~~

### 集合参数查询另一个集合

~~~javascript
// 查询财务部的所有员工
db.dept.find()
// 获取财务部编号
var deptno = db.dept.findOne({dname:'财务部'}).deptno
// 查询员工表编号为财务部的员工
db.emp.find({depno:deptno})
~~~

## 修改文档（update）

~~~javascript
// 修改、替换集合中的一个或多个文档:
// update默认情况会使用新对象替换旧的对象
db.collection.update(查询条件,新对象)
db.collection.update({name:'沙和尚'},{age:28}); 

// $set可以原来修改文档中的指定属性
// 替换name值为沙和尚的文档的age值为猪八戒
db.collection.update({ name:'沙和尚'},{$set:{age: 70,address: '流沙河' }}); 
// $unset操作符可以删除文档中的指定属性
db.collection.update({ name:'沙和尚'},{$unset:{address: ''}});
// update默认情况只会修改一个,但可以修改为修改多个
db.collection.update({ name:'猪八戒'},{$unset:{address: '哈哈哈'},{multi:true}});

// 修改集合中的一个文档
db.collection.updateOne();
// 修改集合中的多个文档
db.collection.updateMany();
// 替换集合中的一个文档
db.collection.replaceOne();
// 替换集合中的多个文档
db.collection.replaceOne();
~~~

### 自增操作

`为所有薪资低于1000的员工增加工资400元， $inc 自增`

~~~javascript
db.emp.updateMany(
    {sal:{$lte:1000}},
    {$inc:{sal:400}}
)
~~~

## 删除数据（delete）

~~~javascript
// 删除集合中的一个或多个文档（默认删除多个）
// 删除_id为hello的所有文档
db.collection.remove({_id:'hello'});
// 删除_id为hello的一个文档
db.collection.remove({_id:'hello'},true);

// 删除集合中的一个文档
db.collection.deleteOne();
// 删除集合中的多个文档
db.collection.deleteMany();

// 清空一个集合(性能略差)
db.collection.remove({});
// 删除一个集合
db.collection.drop();
// 删除一个数据库
db.dropDatabase();
~~~

**注意：**`一半数据库中的数据都不会删除，所以删除的方法很少调用，一半会在数据中添加有够字段，来标识数据是否被删除`

### 假删除

~~~javascript
db.stus.insert({[{name:'zbj',isDel:0},{name:'swk',isDel:0}]})
// 假删除
db.stus.updateOne({name:'zbj'},{$set:{isDel:1}})
// 搜索del值为0(没有删除的)
db。stus。find({isDel:0})
~~~

----

# mongoose运行流程

## mongoose安装与引入

1. **下载安装Mongoose**
   `cnpm i mongoose --save`

2. **在项目中引入mongoose**

   ~~~javascript
   var mongoose = require('mongoose');
   ~~~

3. **连接MongoDB数据库**

   ~~~javascript
   mongoose.connect('mongodb://数据库的ip地址:端口号/数据库名', { useMongoClient: true});
   ~~~

   [^注意]: 如果端口号是默认端口号（27017） 则可以省略不写

4. **监听MongoDB数据库的连接状态**

   ~~~javascript
   //在mongoose对象中，有一个属性叫做connection，该对象表示的就是数据库连接
   mongoose.connection.once("open",function(){}); 	// 成功
   mongoose.connection.once("close",function(){}); // 断开
   mongoose.disconnect()// 断开数据库
   ~~~

5. **连接具体流程**

   ~~~javascript
   // 1.在项目中引入mongoose
   var mongoose = require('mongoose');
   // 2.连接MongoDB数据库
   mongoose.connect('mongodb://localhost/test',{useMongoClient:true})
   mongoose.connection.once("open",function(){console.log('数据库连接成功~~')});
   mongoose.disconnect()// 断开数据库
   ~~~

## 创建Schema（模式）对象

~~~javascript
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
~~~

## 映射Model（集合）

`Model代表的是数据库中的集合，通过Model才能对数据库进行操作`

~~~javascript
//mongoose.model(modelName, schema):
//modelName 就是要映射的集合名 mongoose会自动将集合名变成复数
var StuModel = mongoose.model("student", stuSchema)
~~~

## 向数据库插入文档（doc）

~~~javascript
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
~~~

# mongoose增删改查（CRUD）

## 创建Model

~~~javascript
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
~~~

## 创建一个或多个文档并添加到集合中

`Model.create(doc(s), [callback])
doc(s) 可以是一个文档对象，也可以是一个文档对象的数组
callback 当操作完成以后调用的回调函数`

~~~javascript
StuModel.create([
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
],(err)=>{if(!err){console.log('插入成功~~~')}})
~~~

## Model查询

**conditions：** `查询的条件`
**projection：**  `投影 需要获取到的字段`
**callback：    ** `回调函数，查询结果会通过回调函数返回`
					   `回调函数必须传，如果不传回调函数，压根不会查询`

**查询符合条件的所有文档，返回一个数组**
`Model.find(conditions, [projection], [options], [callback])`

~~~javascript
StuModel.find({name:'孙悟空'},function(err,docs){if(!err){
		console.log(docs)
}})
~~~

**查询符合条件的第一个文档 返回一个具体的文档对象**
`Model.findOne([conditions], [projection], [options], [callback])`

**projection 投影 需要获取到的文档**
**两种方式：** `{name:1,_id:0}`    ` "name -_id"`

~~~javascript
StuModel.find({name:'孙悟空'},{name:1,_id:0},function(err,docs){if(!err){
		console.log(docs)
}})
StuModel.find({name:'孙悟空'},'name age -_id',function(err,docs){if(!err){
		console.log(docs)
	}})
~~~

**options  查询选项（skip limit）**
`{skip:3 , limit:1} 跳过查询, 查询数量`

~~~javascript
StuModel.find({name:'孙悟空'},'name age -_id',{skip:3,limit:3},function(err,docs){if(!err){
		console.log(docs)
}})
~~~

**根据文档的id属性查询文档**

~~~javascript
StuModel.findById('5e51488eee942f08a4072305', function(err, doc){if(!err){
		console.log(doc)
	}})
~~~

## Model查询修改

**conditions：** 		  查询条件
**doc：** 					修改后的对象
**options：** 			   配置参数
**callback：** 		     回调函数

**修改指定属性**
`Model.update(conditions, doc, [options], [callback])`

~~~javascript
StuModel.update({name:'孙悟空'}, {$set:{age:20}},function(err){
	if(!err){
		console.log('修改成功')
	}
})
~~~

## 统计文档的数量的

`Model.count(conditions, [callback])`

~~~javascript
StuModel.count({},function(err, count){if(!err){
		console.log(count)
}})
~~~

## 删除指定文档

`  Model.remove(conditions, [callback])
 Model.deleteOne(conditions, [callback])
 Model.deleteMany(conditions, [callback])`

~~~javascript
StuModel.remove({name:'白骨精'},function(err){if(!err){
		console.log('删除成功')
}})
~~~

# mongoose文档对象

`Document 和 集合中的文档一一对应 ， Document是Model的实例，通过Model查询到结果都是Document`

## 创建一个Document

~~~javascript
var stu = new StuModel({
	name:"奔波霸",
	age:48,
	gender:"male",
	address:"碧波潭"
});
~~~

## document的方法

**保存doc文档对象到数据库集合**
`Model#doc.save([options], [fn])`

~~~javascript
stu.save(function (err) {if(!err){
		console.log("保存成功~~~");
}});
~~~

**修改doc文档对象**
`Model#doc.update(update,[options],[callback])`

~~~javascript
doc.update({$set:{age:28}},function (err) {if(!err){
	console.log("修改成功~~~");
}});doc.save();
// 或者是
doc.age = 18;
doc.save();
~~~

**删除doc文档对象**
`remove([callback])`

~~~javascript
doc.remove(function (err) {if(!err){
				console.log("大师兄再见~~~");
}});
~~~

**获取doc文档对象指定属性值**
`dc.get(name)`
`dc.name`
**设置文档的指定的属性值**
`dc.set(name,value)`
`dc.name = value`
**获取文档的_id属性值**
`dc.id`
**转换为一个JSON对象\*** 
`dc.toJSON()`
**将Document对象转换为一个普通的JS对象**
`转换为普通的js对象以后，注意所有的Document对象的方法或属性都不能使用了`
`dc.toObject()`

# mongoose连接模型

1. **创建连接模块**
   `tools/conn_mongo.js`

   ~~~javascript
   // 引入mongoose
   var mongoose = require('mongoose');
   // 进行连接
   mongoose.connect('mongodb://localhost/mongoose_test',{useMongoClient:true})
   mongoose.connection.once("open",function(){console.log('数据库连接成功~~')});
   ~~~

2. **创建映射集合（models）模块**
   `映射students集合的model`
   `models/student.js`

   ~~~javascript
   var mongoose = require("mongoose")
   // 将Schema 赋值给一个变量
   var Schema = mongoose.Schema
   // 定义Schema(模式)对象
   var stuSchema = new Schema({
   	name: String,
   	age: Number,
   	gender: { // 设置多个参数
   		type: String,
   		default: "female" // 设置改属性默认值
   	},
   	address: String
   })
   // 定义module
   var StuModel = mongoose.model("student", stuSchema)
   // 将StuModel赋值给exports(模块公开接口)
   module.exports = StuModel
   ~~~

3. **引入连接模型（使用）**
   `index.js`

   ~~~javascript
   require('./tools/conn_mongo')
   var StuModel = require("./models/student");
   // 这样集合映射就可以使用了
   StuModel.find({},function(err, doc){
   	if(!err){
   		console.log(doc)
   	}
   })
   ~~~

   