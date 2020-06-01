#更改字符编码
SET character_set_client = gbk;
#查询所有数据库
SHOW DATABASES;
#查询当前数据库
SHOW TABLES;
#创建测试数据库
CREATE DATABASE testdb;
#进入测试数据库
USE testdb;
#创建测试表(tab) 并添加四个字段
CREATE TABLE tab
(
`name` VARCHAR(255) NOT NULL,
`age` VARCHAR(255),
`salary` VARCHAR(255),
`bonus` VARCHAR(255),
PRIMARY KEY (`name`)
);

#更改表名为testtab
RENAME TABLE tab TO testtab;
#更改表中字段名
ALTER TABLE testtab CHANGE `name` username VARCHAR(255);
#删除表
DROP TABLE `name`;
DROP DATABASE testdb;

#alter table <表名> alter column <字段名> 新类型名(长度)
#alter table 表名 modify 字段名 varchar(200)