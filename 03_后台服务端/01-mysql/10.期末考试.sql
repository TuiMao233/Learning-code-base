#建立一个名为姓名和学号的数据库
SET character_set_client = gbk;
CREATE DATABASE 伍伟坚02;
USE 伍伟坚02;

#用MySQL语句创建学生表
CREATE TABLE stud_02
(
	`id` INT(4) PRIMARY KEY,
	`name` VARCHAR(20),
	`gender` CHAR(2),
	`barthday` DATE,
	`class` VARCHAR(30)
);

#用MySQL语句创建成绩表
CREATE TABLE grad_02
(
	`id` INT(4),
	`course` VARCHAR(40),
	`grade` FLOAT
);

#用MySQL语句添加学生表记录
INSERT INTO stud_02(id,`name`,gender,barthday,class)
VALUES
(1,'国正宏','男','1998-01-01','网络一班'),
(2,'李小文','女','1997-12-21','网络二班'),
(3,'刘雨虹','男','1998-03-15','软件一班'),
(4,'蔡东远','男','1998-05-25','软件一班'),
(5,'李晓','男','1997-10-28','软件二班'),
(6,'林红','女','3997-12-02','软件一班'),
(7,'张雪','女','1997-10-26','网络一班'),
(8,'曹旭东','男','1997-11-20','网络二班');

#用MySQL语句添加成绩表记录
INSERT INTO grad_02(id,`course`,grade)
VALUES
(1,'网络数据库',90),
(2,'网页制作',88.5),
(2,'网络数据库',0.91),
(3,'数学',80.5),
(4,'英语',75),
(5,'体育',95),
(5,'网络数据库',83.5),
(6,'网页制作',90.5),
(7,'数学',90.5),
(7,'网页制作',53.5),
(8,'网络数据库',80.3),
(6,'数学',50),
(4,'体育',NULL);

#用alter…modify…语句将成绩表中的course字段修改为varchar(30)可变数据长度。
ALTER TABLE grad_02 MODIFY course VARCHAR(30);

#用Update语句更新学生表中id字段值为7的记录，将记录中的name字段的值更改为’张雪花’。
UPDATE stud_02
SET `name` = '张雪花'
WHERE id = 7;

#用Delete语句删除成绩表中grader（成绩）字段为null的记录。
DELETE FROM grad_02
WHERE grade IS NULL;

#用select语句查询学生表中Gender字段值为’男’的数据。
SELECT * FROM stud_02 WHERE gender = '男';

#用select语句查询成绩表中grade字段值在80-100之间的成绩。
SELECT * FROM grad_02 WHERE grade BETWEEN 80 AND 100;

#用select语句查询学生表中Class字段以’网络’开始，并且Gender字段值为’女’的记录。
SELECT * FROM stud_02 WHERE class LIKE '网络%' AND gender LIKE '女';

#用聚合函数求出成绩表中grade字段的平均值，保留2位小数。
SELECT ROUND(AVG(grade)) 平均成绩 FROM grad_02;

#查出成绩表中的所有记录，使用参数DESC按照grade字段降序方式排序。
SELECT * FROM grad_02 ORDER BY grade DESC;

#查询学生表中的第5位到第8位的学生记录。
SELECT * FROM stud_02 LIMIT 4,4;

#在学生表Stud_00和成绩表Grd_00创建视图，查询出学号、姓名、班级、成绩。
CREATE VIEW stu_class(学号,姓名,班级,成绩)
AS
SELECT stud_02.id,stud_02.name,stud_02.class,grad_02.grade
FROM stud_02,grad_02
WHERE stud_02.id = grad_02.id;
SELECT * FROM stu_class;
