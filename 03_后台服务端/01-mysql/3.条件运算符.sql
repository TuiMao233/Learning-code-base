/*
一，简单条件运算符：> < = != <> >= <=
二，逻辑运算符：
	&& || ！
	and or not
三，模糊查询：
	like
	between and
	in
	is null
*/

#一、按条件表达式筛选

#案例1：查询工资>12000的员工信息

SELECT 
	*
FROM
	tab
WHERE 
	salary>12000;
	
