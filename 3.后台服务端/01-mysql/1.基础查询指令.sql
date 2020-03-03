#进阶1：基础查询;
/*
语法：
select 查询列表 from 表明;

特点：
1、查询列表可以是：表中的字段、常量、常量值、表达式、函数
2、查询的结果是一个虚拟的表格、零时性的
*/

#进入哪个库
USE tast;

#1.查询表的单个字段
SELECT `name` FROM tab;

#2.查询表中的多个字段
SELECT `name`,`age` FROM tab;

#3.查询表中的所有字段
SELECT * FROM tab;

#4.查询常量值
SELECT 100;

#5.查询表达式
SELECT 100/50;

#6.查询函数
SELECT VERSION();

#7.起别名
#方式一：使用as关键字
SELECT 100%98 AS 结果;
SELECT `name` AS 名字,`age` AS 身高 FROM tab;
#方式二：使用空格
SELECT `name` 编号,`age` 姓名 FROM tab;
#如果别名有特殊字 则加上双引号
SELECT 100%98 AS "out";

#8.去重
SELECT DISTINCT `name` FROM tab;

#9.+号的作用

/*
mysql中的+号,仅仅只有一个功能：运算符
select 100+90; 两个都为数值型,则做加法运算
select '123'+90; 其中一方为字符型，试图将字符型转换成数值型
				如果转换成功，则继续做加法运算
				如果转换失败，则将字符型数值转换为0
select 'john'+90;
select null+10; 只要其中一方为null，则结果也是null
*/



