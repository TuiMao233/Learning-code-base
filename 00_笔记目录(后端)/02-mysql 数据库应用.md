---
title: mysql 数据库应用
date: 2020-11-01
categories:
  - 后端学习笔记
tags: 
  - mysql
---
## mysql 简介

MySQL是一个**[关系型数据库管理系统](https://baike.baidu.com/item/关系型数据库管理系统/696511)**，由瑞典MySQL AB 公司开发，属于 [Oracle](https://baike.baidu.com/item/Oracle) 旗下产品。MySQL 是最流行的[关系型数据库管理系统](https://baike.baidu.com/item/关系型数据库管理系统/696511)之一，在 WEB 应用方面，MySQL是最好的 [RDBMS](https://baike.baidu.com/item/RDBMS/1048260) (Relational Database Management System，关系数据库管理系统) 应用软件之一。

MySQL是一种关系型数据库管理系统，关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

MySQL所使用的 SQL 语言是用于访问[数据库](https://baike.baidu.com/item/数据库/103728)的最常用标准化语言。MySQL 软件采用了双授权政策，分为社区版和商业版，由于其体积小、速度快、总体拥有成本低，尤其是[开放源码](https://baike.baidu.com/item/开放源码/7176422)这一特点，一般中小型网站的开发都选择 MySQL 作为网站数据库。

例如 [Oracle](https://baike.baidu.com/item/Oracle)、[DB2](https://baike.baidu.com/item/DB2)、[SQL Server](https://baike.baidu.com/item/SQL Server)等相比，MySQL [1] 自有它的不足之处，但是这丝毫也没有减少它受欢迎的程度。对于一般的个人使用者和中小型企业来说，MySQL提供的功能已经绰绰有余，而且由于 MySQL是[开放源码](https://baike.baidu.com/item/开放源码)软件，因此可以大大降低总体拥有成本。

## mysql 环境配置

### 服务的启动与停止

~~~mysql
## 方式一: 通过命令行开启
NET START <服务名称>
NET STOP <服务名称>
## 方式二: 计算机--右键--管理--服务
~~~

### mysql登录与退出

~~~mysql
## 登录数据库
mysql [-h主机名称 -p端口号] -u用户名 -p密码
## 退出数据库
exit | ctrl+c
~~~

## mysql 基本使用

### mysql 数据类型

数据类型是指列、存储过程参数、表达式和局部变量的数据特征，它决定了数据的存储格式，代表了不同的信息类型。有一些数据是要存储为数字的，数字当中有些是要存储为整数、小数、日期型等...

~~~mysql
## 数值类型
tinyint[,(m)] ## 字节[1] 范围[-128, 128]
smallint[,(m)] ## 字节[2] 范围[-32768, 32768]
mediumint[,(m)] ## 字节[3] 范围[-8388608, 8388608]
int[,(m)] ## 字节[4] 范围[-2147483648 , 2147483648]
bigint[,(m)] ## 字节[8] 范围[-92233720........ ~ 92233720........]

## 浮点型
float[,(m,d)] ## 字节[4] 单精度浮点数值
double[,(m,d)] ## 字节[8] 双精度浮点数值

## 日期型(在生产里，日期时间型，往往用的比较少，而是用数字类型来取代日期类型)
date ## 字节[3] YYYY-MM-DD
time ## 字节[3] HH:MM:SS
year ## 字节[1] YYYY
datetime ## 字节[8] YYYY-MM-DD HH:MM:SS
timestamp ## 字节[8] YYYYMMDD HHMMSS

## 字符型
char[,(m)] ## 字节[0-255] 定长字符串
varchar[,(m)] ## 字节[0-65535] 变长字符串
tinytext[,(m)] ## 字节[0-255](2^5-1) 短文本字符串
text[,(m)] ## 字节[0-65535](2^16-1) 长文本数据
mediumtext[,(m)] ## 字节[0-16777215](2^24-1) 中等长度文本数据
longtext[,(m)] ## 字节[0-4294967295](2^22-1) 极大文本数据
enum[,(m)] ## 字节[1-2] 取决于枚举值的个数(最多65535个值)
set[,(m)] ## 字节[1-4/8] 取决于set成员的数目(最多64个成员)
~~~

### 基本命令

~~~mysql
## 查询所有数据库
SHOW DATABASES;
## 查询当前数据库
SHOW TABLES;
## 创建测试数据库
CREATE DATABASE <数据库名称>;
## 进入测试数据库
USE <数据库名称>;
~~~

### 建表命令

~~~mysql
## 创建表
CREATE TABLE <表名称> (
`<字段名称>` <类型> <, 其他关键字>,
 ....
)

## 建表关键字
unsigned ## 非负数
auto_increment ## 自增
not null ## 数据空时不为null

## 更改表名称
RENAME TABLE <表名称]> TO <新的表名称>;
## 更改表中字段名
ALTER TABLE <表名称> CHANGE <字段名称> <新字段名称> <数据类型] [, 其他关键字];
## 删除表
DROP TABLE <表名称>;
## 删除数据库
DROP DATABASE <库名称>;
~~~

### 查询/输出指令

~~~mysql
## 输出表中多个字段
SELECT <字段1>, <字段2>... FROM <表名称>;
## 输出表中的所有字段
SELECT * FROM <表名称>;
## 输出常量值
SELECT 100;
## 输出表达式
SELECT 100/50;
SELECT 10+10;
SELECT 10%9;
SELECT 10/5;
## 输出版本号
SELECT VERSION();

## 输出结果起别名
SELECT 100%98 AS <别名名称>
## 输出查询起别名
SELECT <字段1> AS <字段1别名>,
	   <字段2> AS <字段2别名>
FROM <表名称>
## 别名输出特殊字符
SELECT 100%98 AS '_out'
## 可忽略AS关键字
SELECT 100%98 '_out'

## 查询字段时去除重复字段
SELECT DISTINCT <字段1> FROM <表名称>
## IFNULL函数 -> 字段为null指定为某个值
SELECT IFNULL(<字段名称>, <值>) FROM <表名称>

## CONCAT函数 -> 多个字段或字符串拼接为一个字段
SELECT CONCAT(<字段|字符串>, .....) AS 结果 FROM <表名称>
~~~

## SELECT 查询

### 条件查询

~~~mysql
## 基本语法
SELECT <指定字段> FROM <表名称> WHERE <单/多个条件>

## 简单条件运算符: > < = != <> >= <=
SELECT * FROM <表名称> WHERE <字段名称> > 1200

## 模糊查询: % 任意多个字符, _ 任意单个字符, \用于转义特殊字符
SELECT * FROM WHERE <字段名称> LIKE "%a%"

## 逻辑运算符: and(&&), or(||), not(!)
## 空运算: is null, is not null
SELECT * FROM WHERE <字段名称> < 5000 AND <字段名称> IS NOT NULL

## 计算员工年薪(练习)
SELECT 
	name,
	salary*12*(1+IFNULL(bonus, 0)) AS 年薪
FROM tab
~~~

### 查询排序

~~~mysql
## 基本语法(单字段)
SELECT * FROM ORDER BY <字段名称> <排序方式>;
## 基本语法(多字段)
SELECT * FROM ORDER BY
<字段名称1> <排序方式>,
<字段名称2> <排序方式>;

## 查询员工信息, 工资由高到低
SELECT * FROM tab ORDER BY salary ASC;
## 查询员工信息, 工资由低到高
SELECT * FROM tab ORDER BY salary DESC;

## 条件与排序的结合查询
SELECT * FROM tab
WHERE salary >= 500
ORDER BY age ASC;
~~~

## mysql 常见函数

### 字符串函数

~~~mysql
## length() -> 字符串字节长度
SELECT length('嘻嘻嘻') -- 9

## concat() -> 拼接字符串
SELECT concat(<字段名称|字符串>, ...) FROM <表名称>

## upper() -> 转为大写
SELECT upper('dark doctor') -- DARK DOCTOR
## lower() -> 转为小写
SELECT lower('dark doctor') -- dark doctor

## substr()/substring() -> 截取字符串
SELECT substr('闪电侠爱上了一个魏大勋', 4); -- 爱上了一个魏大勋
SELECT substr('闪电侠爱上了一个魏大勋',1,3); -- 闪电侠

## instr() -> 查询字符串在目标字符串出现的所有, 找不到则返回 0
SELECT instr('内马尔爱上了魏霞则','魏霞则'); -- 7

## trim() -> 去除前后空格(默认)或指定字符
SELECT trim(' 张翠山 '); -- 张翠山

## lpad() -> 指定长度, 左填充字符串
SELECT lead('若相惜', 10, 'w'); -- wwwwwww若相惜
## rpad() -> 指定长度, 又填充字符串
SELECT rpad('若相惜', 10, 'w'); -- 若相惜wwwwwww

## replace() -> 替换指定字符串
SELECT replace('魏大勋魏大勋-得唔得闲', '得唔得闲', '唔得闲'); -- 魏大勋魏大勋-唔得闲
~~~

### 数值函数

~~~mysql
## round() -> 四舍五入(可指定小数点长度)
SELECT round(1.65); -- 2
SELECT round(-1.6545,2); -- 1.65

## ceil() -> 向上取整
SELECT ceil(1.001); -- 2
SELECT ceil(-1.001); -- -1

## floor() -> 向下取整
SELECT floor(-9.9); -- -9

## truncate() -> 指定小数点长度
SELECT truncate(1.65999, 1); -- 1.6

## mod(a, b) -> 取余(a-a/b*b)
SELECT mod(10, 3); -- 1
SELECT 10%3; -- 1
~~~

### 日期函数

~~~mysql
## now() -> 当前系统日期与时间
SELECT now();
## curdate() -> 返回当前系统日期
SELECT curdate();
## curtime() -> 返回当前系统时间
SELECT curtime();

## 获取年部分
SELECT year(now()); -- 2020
SELECT year('1998-1-1'); -- 1998
## 获取月部分
SELECT month(now()); -- 15

## 日期转换为字符串
SELECT DATE_FORMAT(NOW(),'%Y年%m月%d日');
~~~

### 其他函数

~~~mysql
## version() -> 版本号
SELECT version(); --  5.7.31-log
## database() -> 当前数据库
SELECT database(); -- performance_schema
## user() -> 数据库用户信息
SELECT user(); -- root@localhost
~~~

### 流程控制函数

~~~mysql
## if() -> if else 效果
SELECT if(10 > 5, '大', '小') -- 大

## 判断是否有奖金(练习)
SELECT
  name,
  bonus,
  IF(bonus IS NULL, '没奖金，呵呵', '有奖金，嘻嘻')
FROM tab;

## case 关键字 -> switch case 效果
case <字段名称|表达式>
  when <值1> then <字段|表达式>
  when <值2> then <字段|表达式>
  else <字段|表达式>
end

## 根据身高计算工资(练习)
SELECT
  salary 原始工资,
  case age
    when 1.64 then salary * 1.1
    when 1.77 then salary * 1.2
  	else salary
  end as 新工资
FROM tab;
~~~

### 分组函数

分组函数用作与一组字段的统计与计算使用，分组函数又称为聚合函数或统计函数或组函数

~~~mysql
## sum() -> 字段的总和
SELECT sum(<字段名称>) FROM <表名称>;
## avg() -> 平均值
SELECT avg(<字段名称>) FROM <表名称>;
## min() -> 最小值
SELECT min(<字段名称>) FROM <表名称>;
## max() -> 最大值
SELECT max(<字段名称>) FROM <表名称>;
## count() -> 字段个数
SELECT count(<字段名称>) FROM <表名称>;
~~~

## UPDATA 修改

~~~mysql
## 基本语法(单字段)
UPDATE <表名称> SET <字段名称> = <新值>;
## 基本语法(多字段)
UPDATE <表名称> SET
<字段名称1> <排序方式>,
<字段名称2> <排序方式>;
~~~

