#进入哪个数据库，只有进入了库，才可以对库里面的表单进行查询
USE test;

#显示表结构
DESC tab;

#显示表所有字段信息
SELECT * FROM tab;

#显示表单个字段信息
SELECT `name` FROM tab;

#显示表单个字段信息,并且筛选清除重复项
SELECT DISTINCT `name` FROM tab;

#显示表字段信息,并且在字段头部取别名
SELECT `name` AS 名称,age AS 身高 FROM tab;

#select可以做运算
SELECT 10+10;
SELECT 10%9;
SELECT 10/5;


#1.判断是否为null,如果null则等于0
SELECT 
	IFNULL (bonus,0) AS 奖金,
	bonus
FROM
	tab;

	
#2.字符串函数，对字段的数值进行拼接
SELECT 
	CONCAT(
		`name`,
		",",
		IFNULL(bonus,0)
	) AS 结果 
FROM 
	tab;