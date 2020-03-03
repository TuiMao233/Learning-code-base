#二、分组函数
/*
功能：用作统计使用，又称聚合函数或统计函数或组函数

分类：
	sum 求和
	avg 平均值
	max 最大值
	min 最小值
	count 计算个数
特点：
1、sum、avg一般用于处理数值型
   max、min、count可以处理任何类型
   
2、以上分组函数都忽略null值 

3、可以和distinct搭配实现去重
*/

SELECT SUM(salary) FROM tab;
SELECT AVG(salary) FROM tab;
SELECT MIN(salary) FROM tab;
SELECT MAX(salary) FROM tab;
SELECT COUNT(salary) FROM tab;

SELECT  SUM(salary) 和,
	AVG(salary) 平均,
	MAX(salary) 最高,
	MIN(salary) 最低,
	COUNT(salary) 个数
FROM tab;

SELECT SUM(`name`),AVG(`name`) FROM tab;
SELECT MAX(`name`),MIN(`name`) FROM tab;


SELECT SUM(DISTINCT salary),SUM(salary) FROM tab;
#select count

#5、count函数的详细介绍
SELECT COUNT(bonus) FROM tab;
SELECT COUNT(*) FROM tab;
SELECT COUNT(1) FROM tab;