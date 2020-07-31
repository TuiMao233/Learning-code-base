# mysql 简介

MySQL是一个**[关系型数据库管理系统](https://baike.baidu.com/item/关系型数据库管理系统/696511)**，由瑞典MySQL AB 公司开发，属于 [Oracle](https://baike.baidu.com/item/Oracle) 旗下产品。MySQL 是最流行的[关系型数据库管理系统](https://baike.baidu.com/item/关系型数据库管理系统/696511)之一，在 WEB 应用方面，MySQL是最好的 [RDBMS](https://baike.baidu.com/item/RDBMS/1048260) (Relational Database Management System，关系数据库管理系统) 应用软件之一。

MySQL是一种关系型数据库管理系统，关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

MySQL所使用的 SQL 语言是用于访问[数据库](https://baike.baidu.com/item/数据库/103728)的最常用标准化语言。MySQL 软件采用了双授权政策，分为社区版和商业版，由于其体积小、速度快、总体拥有成本低，尤其是[开放源码](https://baike.baidu.com/item/开放源码/7176422)这一特点，一般中小型网站的开发都选择 MySQL 作为网站数据库。

例如 [Oracle](https://baike.baidu.com/item/Oracle)、[DB2](https://baike.baidu.com/item/DB2)、[SQL Server](https://baike.baidu.com/item/SQL Server)等相比，MySQL [1] 自有它的不足之处，但是这丝毫也没有减少它受欢迎的程度。对于一般的个人使用者和中小型企业来说，MySQL提供的功能已经绰绰有余，而且由于 MySQL是[开放源码](https://baike.baidu.com/item/开放源码)软件，因此可以大大降低总体拥有成本。

# mysql 环境配置

## 暂无....

# mysql 基本使用

## mysql 数据类型

数据类型是指列、存储过程参数、表达式和局部变量的数据特征，它决定了数据的存储格式，代表了不同的信息类型。有一些数据是要存储为数字的，数字当中有些是要存储为整数、小数、日期型等...

~~~mysql
# 数值类型
tinyint[,(m)] # 字节[1] 范围[-128, 128]
smallint[,(m)] # 字节[2] 范围[-32768, 32768]
mediumint[,(m)] # 字节[3] 范围[-8388608, 8388608]
int[,(m)] # 字节[4] 范围[-2147483648 , 2147483648]
bigint[,(m)] # 字节[8] 范围[-92233720........ ~ 92233720........]

# 浮点型
float[,(m,d)] # 字节[4] 单精度浮点数值
double[,(m,d)] # 字节[8] 双精度浮点数值

# 日期型(在生产里，日期时间型，往往用的比较少，而是用数字类型来取代日期类型)
date # 字节[3] YYYY-MM-DD
time # 字节[3] HH:MM:SS
year # 字节[1] YYYY
datetime # 字节[8] YYYY-MM-DD HH:MM:SS
timestamp # 字节[8] YYYYMMDD HHMMSS

# 字符型
char[,(m)] # 字节[0-255] 定长字符串
varchar[,(m)] # 字节[0-65535] 变长字符串
tinytext[,(m)] # 字节[0-255](2^5-1) 短文本字符串
text[,(m)] # 字节[0-65535](2^16-1) 长文本数据
mediumtext[,(m)] # 字节[0-16777215](2^24-1) 中等长度文本数据
longtext[,(m)] # 字节[0-4294967295](2^22-1) 极大文本数据
enum[,(m)] # 字节[1-2] 取决于枚举值的个数(最多65535个值)
set[,(m)] # 字节[1-4/8] 取决于set成员的数目(最多64个成员)
~~~

## 基本命令

~~~mysql
# 查询所有数据库
SHOW DATABASES;
# 查询当前数据库
SHOW TABLES;
# 创建测试数据库
CREATE DATABASE <数据库名称>;
# 进入测试数据库
USE <数据库名称>;
~~~

## 建表命令

~~~mysql
# 创建表
CREATE TABLE <表名称> (
`<字段名称>` <类型> <, 其他关键字>,
 ....
)

# 建表关键字
unsigned # 非负数
auto_increment # 自增
not null # 数据空时不为null

# 更改表名称
RENAME TABLE <表名称]> TO <新的表名称>;
# 更改表中字段名
ALTER TABLE <表名称> CHANGE <字段名称> <新字段名称> <数据类型] [, 其他关键字];
# 删除表
DROP TABLE <表名称>;
# 删除数据库
DROP DATABASE <库名称>;
~~~

## 查询/输出指令

~~~mysql
# 输出表中多个字段
SELECT <字段1>, <字段2>... FROM <表名称>;
# 输出表中的所有字段
SELECT * FROM <表名称>;
# 输出常量值
SELECT 100;
# 输出表达式
SELECT 100/50;
# 输出版本号
SELECT VERSION();
~~~

