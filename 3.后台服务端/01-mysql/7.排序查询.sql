#一、排序查询
/*
	select * from employees;
*/

/*
语法：
SELECT 查询列表
FROM 表
【where 筛选条件】
ORDER BY 【asc|desc】
*/

#案例1：查询员工信息，要求工资从高到低排序
SELECT * FROM tab ORDER BY salary DESC;
SELECT * FROM tab ORDER BY salary ASC;
SELECT * FROM tab ORDER BY salary;

#案例2：查询工资 >=5000的信息，按升高进行降序排序
SELECT * FROM tab
WHERE salary >= 5000
ORDER BY age ASC;