# 查询操作符

## 比较查询操作符

~~~js
// $eq__匹配等于指定的值, 相当于 ==30
db.t_01.find( { "name": { $eq:"david" } } )
// $gt__匹配大于指定的值, 相当于 >30
db.t_01.find( { "age": { $gt:30 } } )
// $gte__匹配大于或等于指定的值, 相当于 >=30
db.t_01.find( { "age": { $gte:30 } } )
// $in__匹配数组中的任意一个值, 相当于 40<= >=30
db.t_01.find( { "age": { $in:[30, 40] } } )
// $lt__匹配小于指定的值, 相当于 <30
db.t_01.find( { "age": { $lt:30 } } )
// $lte__匹配小于等于指定的值, 相当于 <=30
db.t_01.find( { "age": { $lte:30 } } )
// $ne__匹配不等于指定值的所有值, 相当于 !==30
db.t_01.find( { "age": { $ne:30 } } )
// $nin__匹配不在数组中出现的值, 相当于 >30 <40
db.t_01.find( { "age": { $nin:[30, 40] } } )
~~~

## 逻辑查询操作符

~~~js
// $and__逻辑和, 操作需要同时满足具有两个或多个表达式的数组中的条件, 相当于 age >= 28 && deparment == sale_01
db.t_01.find({  
    $and : [
        {"age":{ $gte : 28 } },
        { "deparment" : { $eq : "sale_01"} }
    ]  
})
// $not__逻辑否, 操作返回与查询表达式不匹配的文档, 相当于 !(age > 30)
db.t_01.find({ 
    "age": {$not : { $gt : 30 }}
})
// $nor__逻辑非或操作，返回同时不能匹配数组中表达式的文档, 相当于 !(age==30) && !(name="devid")
db.t_01.find({ 
    $nor:  [ {"age":30 }, { "name":"david"} ]
})
// $or__逻辑或操作，返回符合任一条件的所有文档, 相当于 age==30 || name="devid"
db.t_01.find({
    $or:  [ {"age":30 }, { "name":"david"} ]
})
~~~

| 操作符   | 描述                                                       | 举例                                                         |
| -------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| **$and** | 逻辑和操作需要同时满足具有两个或多个表达式的数组中的条件。 | db.t_01.find( {  $and : [ {“age”:{ $gte : 28 } }, { “deparment” : { $eq : “sale_01”} } ]  } ) |
| **$not** | 逻辑否操作返回与查询表达式不匹配的文档                     | db.t_01.find( { “age”  : { $not : { $gt : 30 } } } )         |
| **$nor** | 逻辑非或操作，返回同时不能匹配数组中表达式的文档           | db.t_01.find( { $nor:  [ {“age”:30 } , { “name”:”david”} ] } ) |
| **$or**  | 逻辑或操作，返回符合任一条件的所有文档                     | db.t_01.find( {  $or : [ { “deparm                           |

~~~js
db.t_01.find( {  
    $and : [
        {“age”:{ $gte : 28 } },
        { “deparment” : { $eq : “sale_01”} }
    ]
})
~~~



## 元素查询操作符

| 操作符      | 描述                           | 举例                                                         |
| ----------- | ------------------------------ | ------------------------------------------------------------ |
| **$exists** | 匹配具有指定字段的文档         | db.t_01.find( { “name”:{  $exists:true,$in: [“david”,”grut”] } } ) |
| **$type**   | 如果字段为指定类型，则返回文档 | db.t_01.find( {“name”  : {$type : “string” } } )             |

## 数组查询操作符

| 操作符         | 描述                                                   | 举例                                                         |
| -------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| **$all**       | 匹配包含查询中指定的所有元素的数组                     | --查询t_01集合的name字段同时包含”deng”,”groot”,”lily”的文档db.t_01.find( {“name”:{$all: [“deng”,”groot”,”lily”]} } ) |
| **$elemMatch** | 返回数组字段中至少有一个元素与所有指定的元素匹配的文档 | --查询students集合中的scores数组字段中，至少有一个大于或等于80且小于90的元素的文档db.students.find({  scores: {$elemMatch:  {$gte:80, $lt: 90}} } ) |
| **$size**      | 返回具有与指定大小一样的数组字段的文档                 | --查询students集合中scores数组字段中具有2个元素的文档。db.students.find({scores : { $size  : 2} } ) |

## 诊断操作符

| 操作符          | 描述                                                         | 举例                                                         |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **$expr**       | 允许在查询语句中使用聚合表达式，$expr可以构建查询表达式，在匹配时，比较同一文档中的字段。 | --两个字段比较，返回”sal”比”age”大的文档：db.t_01.find(  {$expr: { $gt: [“age”,”sal”] } } ) |
| **$jsonSchema** | $jsonSchema可以被用于文档验证器，用于集合模式验证。          | --定义一个users集合模式验证：db.createCollection(“users”,  {validator: { $jsonSchema: {bsonType: “object”,required: [“name”,”sex”],properties: { name: {  bsonType: “string”,  description: “must be a  string and is required”},age: {bsonType: “int”,description: “must be a integer and is not  required”},sex: {enum: [“male” , “female”],description: “can only be one of the enum  values and is required”}}} } )--往集合users插入数据db.users.insert({“name”:”gg”,”sex”:”male”}) |
| **$mod**        | 对字段的值执行除以指定值取余数运算。                         | --返回”age”字段值被3整除的文档db.t_01.find( {“age”  : {$mod : [3,0] } } ) |
| **$regex**      | 选择与指定正则表达式匹配的文档                               | 查询”name”结尾是tor三个字符的文档db.t_01.find( {“name”:  {$regex : /tor$/ } } ) |
| **$text**       | $text是对具有文本索引的字段执行文本搜索。                    | --在t_01集合的”name”上创建text索引db.t_01.createIndex(  { “name” : “text”})--使用全本搜索db.t_01.find(  {$text: {$search: “david” } } ) |
| **$where**      | 匹配满足JavaScript表达式的文档，使用$where操作符将包含JavaScript表达式的字符串或完整的JavaScript函数传递给查询系统。 | --查询”name”字段为david的文档db.t_01.find( {  $where : function() {return  (this.name == “david”)} } ) |

## 按位查询操作符

| 操作符            | 描述                                                         | 举例                                                         |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **$bitsAllClear** | 匹配数字或二进制值，其中查询给出的所有位位置在字段中是明确的（即0）。 | --查询字段age是否在位置1和位置5有位清除。db.t_01.find({“age”: {  $bitsAllClear:[1,5]} } ) |
| **$bitsAllSet**   | 匹配数字或二进制值，其中查询给出的所有位位置在字段中是明确的（即1）。 | --查询字段age是否具有在位置1和位置5设置的位1。db.t_01.find({“age”: {  $bitsAllSet:[1,5]} } ) |
| **$bitsAnyClear** | 匹配数字或二进制值，返回其中一组位位置中的任何位具有0的文档  | --查询字段age在位置1或位置5具有位清除的文档。db.t_01.find({“age”: { $bitsAnyClear:[1,5]} } ) |
| **$bitsAnySet**   | 匹配数字或二进制值，返回其中一组位位置中的任何位具有1的文档  | --查询字段age在位置1或位置5为1的文档。db.t_01.find({“age”: {  $bitsAnySet:[1,5]} } ) |



# 更新操作符

## multi	修改为修改多个

update默认情况只会修改一个,但可以修改为修改多个
db.collection.update({ name:'猪八戒'},{$unset:{address: '哈哈哈'},{multi:true}});

## $currentDate	将属性的值设置为当前日期

可以是`Date`或`timestamp`，默认类型是`Date`。如果设置的字段不存在，`$currentDate`会在文档中添加该字段。格式如：`{$currentDate:{字段名:时间类型,...}}`。

- 布尔值`true`表示将字段值设置为当前日期作为`Date`；
- `{$type:"timestamp"}`或`{$type:"date"}`，它明确指定了类型。操作符区分大小写，仅接受小写的`"timestamp"`或者小写的`"date"`。

例如，将下面`products`表中`_id`字段为`1`的文档中的`lastModified`字段更新成当前的日期。

~~~javascript
db.products.update(
    {_id:1}, { $currentDate:{lastModified:true}}
)
~~~

## $inc	将指定属性的值加上指定的值

格式如下：`{$inc:{字段1:数量1,...}}`。数量既可以是正数，也可以是负数。如果要增加的字段不存在，那么`$inc`会生成一个字段，并且将该值设置为特定的值。但是如果你上传了一个空值，那么就会出现错误。对于单个文档，`$inc`是原子操作。
例如，将`products`表中`_id`字段为`1`的文档中的`num`字段值增加`10`，脚本如下：

~~~javascript
db.products.update(
    {_id:1}, {$inc:{num:10}}
)
~~~

## $min	更新文档中某个字段值小于特点值的字段

格式如下：`{$min:{字段1:值1,...}}`。如果字段不存在，`$min`操作符会设置字段为特定的值。
例如，判断`products`表中`_id`字段为`1`的文档中的`num`字段值，如果大于`10`，那么值会变为`10`，如果小于`10`，则不会有变化。

~~~javascript
db.products.update(
    {_id:1}, {$min:{num:10}}
)
~~~

## $max	更新文档中某个字段值大于特点值的字段

`$max`操作符和`$min`正好相反，它会更新文档中某个字段值大于特定值的字段。用法和`$min`相同。

## $set	将字段的值替换为指定的值

它具有以下形式：`{$set:{字段1:值1,...}}`。如果字段不存在，`$set`将会创建新字段(前提是该字段不能和类型限制相冲突)，将指定的值赋上。如果指定多个字段-值对，`$set`将更新或创建每个字段。
例如，将`products`表中`_id`字段为`1`的文档中的`quantity`字段值变为`500`，将字段`details`字段中的`model`字段值变为`14Q3`，`tag`字段的值也同时更新。

~~~javascript
db.products.update(
   { _id: 1 },
   { $set:{
              quantity: 500,
              details: { model: "14Q3", make: "xyz" },
              tags: [ "coats", "outerwear", "clothing" ]
           }
   }
)
~~~

## $unset	删除表中特定的字段

语法如下:`{$unset:{字段1:"",...}}`。如果要删除的字段不存在，那么`$unset`不会做任何操作。
例如：使用`$unset`操作符来移除`products`表中，`_id`字段值为`1`的文档中的`quantity`字段。

~~~javascript
db.products.update(
    { _id: 1 },
    { $unset:{"quantity":""}}
)
~~~

## $rename	更新某一字段的名字

语法如下：`{$rename:{字段名1:新的字段名1,...}}`。新的字段名必须和现有的字段名不相同，如果文档中不存在要重命名的字段，那么`$rename`将不会做任何操作。其逻辑是在就的字段名上执行`$unset`操作，然后使用新的名称执行`$set`操作。
例如：使用`$rename`重命名`products`表中`_id`字段值为`1`的文档中的`username`字段名为`userName`。

~~~javascript
db.products.update(
    { _id: 1 },
    { $rename:{"username":"userName"}}
)
~~~



# 聚合函数使用

语法：`db.products.aggregate([$group:{_id:null, $聚合函数: "$字段名"}])`

~~~js
db.products.aggregate([{
    $group:{_id:null, alias:{$max: "$index"}}
}]);
~~~

​    1、$sum分组求和

​    2、$avg分组平均值

​    3、$min分组最小值

​    4、$max分组最大值

​    5、$first分组第一条记录

​    6、$last分组最后一条记录