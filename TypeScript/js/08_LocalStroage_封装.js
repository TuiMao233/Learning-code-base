"use strict";
// 本地数据操作类
var DataHelper = /** @class */ (function () {
    //2.构造函数
    function DataHelper(dataKey, primaryKey) {
        this.dataKey = dataKey;
        this.primaryKey = primaryKey;
    }
    //3.读取数据方法
    DataHelper.prototype.readData = function () {
        //3.1 读取 本地 localStorage 中的 数据(JSON字符串)
        var str = localStorage.getItem(this.dataKey); // 相当于：getItem(‘plData’)
        //3.2 将 JSON字符串 转成 数组对象 -- as 就是 用来 将 数据 转成 指定类型的
        //                                 str as string -> 将 str变量的值 转成 字符串类型
        var arr = JSON.parse(str);
        //3.3 将 数组对象 返回
        return arr; // 如果 数组存在，则返回 数组；如果不存在，返回 null
    };
    //4.保存数据方法
    DataHelper.prototype.saveData = function (arrData) {
        //4.1 判断 参数数组 是否 为空
        if (arrData != null) {
            var jsonStr = '[]';
            //4.2 如果 不为空，则 将数组 转成 json字符串
            jsonStr = JSON.stringify(arrData); // '[{},{}]'
            //4.3 将 json字符串 保存回 本地 localStorage
            localStorage.setItem(this.dataKey, jsonStr); // setItem('plData','[{},{}]')
        }
    };
    //5.新增数据 方法
    DataHelper.prototype.addData = function (newData) {
        //5.1 先读取本地数据(数组 或者 null)
        var arrData = this.readData();
        //5.2 为传入的 对象 添加一个 主键属性，并自动生成 id(把数组中最后一个对象的id值+1)
        // newData.id = 1;
        // let proName:any = 'id';
        // newData[proName] = 1; // 相当于 newData.id = 1
        // newData.id =   通过 中括号 取值法，将 数组中 最后一个元素的 id值 取出 +1
        newData[this.primaryKey] = arrData[arrData.length - 1][this.primaryKey] + 1;
        //5.3 将 添加了主键属性的对象 push到数组中
        arrData.push(newData);
        //5.4 将数组 保存回 本地数据
        this.saveData(arrData);
        //5.5 将 自动生成 id 返回
        return newData[this.primaryKey];
    };
    return DataHelper;
}());
// 测试调用 -------------------------------------
var dh = new DataHelper('plData', 'id');
dh.addData({ content: '讨厌，马上就要到8:30了，大家还急着想学习 vue_ts呢~~~' });
// dh.saveData(arr);
console.log('新增完毕');
