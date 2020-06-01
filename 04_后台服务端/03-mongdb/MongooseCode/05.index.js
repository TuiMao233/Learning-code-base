require('./tools/conn_mongo')
var StuModel = require("./models/student");
StuModel.find({},function(err, doc){
	if(!err){
		console.log(doc)
	}
})
// console.log(StuModel)