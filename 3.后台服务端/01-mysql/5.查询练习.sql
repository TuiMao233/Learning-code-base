SELECT * FROM tab;
#一、查询有奖金，且工资大于5000的salary，name
SELECT 
	`name`,
	salary,
	bonus
FROM
	tab
WHERE
	salary > 5000 AND bonus IS NOT NULL;

#不为null是is not null ，为null应该是is null。


#二、计算所有员工的年薪
SELECT	
	`name`,
	salary*12*(1+IFNULL(bonus,0)) AS 年薪
FROM
	tab;




#三、查询工资表结构
DESC tab;