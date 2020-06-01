var mongoose = require('mongoose');
// 3.连接MongoDB数据库
mongoose.connect('mongodb://localhost/mongoose_test',{useMongoClient:true})
/*  - 监听MongoDB数据库的连接状态
	- 在mongoose对象中，有一个属性叫做connection，该对象表示的就是数据库连接
	  通过监视该对象的状态，可以来监听数据库的连接与断开 */ 
mongoose.connection.once("open",function(){console.log('数据库连接成功~~')});
mongoose.connection.once("close",function(){console.log('数据库连接已断开~~~~~~')});
