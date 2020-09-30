"use strict";
// JS中数组可以放任意值, ts数组需指定元素类型
// 原js写法
var arrJS = [1, 'a', true, [], {}];
// ts方式一：let 数组名:类型[] = [值1, 值2]
var arrHeros = ['安其拉', '亚索', '大乔'];
// ts方式二: let 数组名:Array<类型> = [值1, 值2] 该数组为泛型数组
var arrHeroAge = [17, 231, 23];
