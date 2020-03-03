#二、模糊查询
/*
like
特点：
一般和通配符搭配使用
	通配符
	% 任意多个字符
	_ 任意单个字符
is null|is not null
*/
SELECT * FROM tab;

#1.like
#案例1：查询员工名中包含字符a的员工信息
SELECT
	*
FROM 	
	tab
WHERE
	`name` LIKE '%a%';

#案例2：查询员工名中第一个字符为邢,第三个字符为华的员工信息
SELECT
	*
FROM 	
	tab
WHERE
	`name` LIKE '邢_华';

#案例2：查询员工名中第二个字符为_的员工名
SELECT
	*
FROM 	
	tab
WHERE
	`name` LIKE '_\_%';








#2.between and
	#1.between and可以提高语句的简洁值
	#2.包含临界值
	#3.值可以颠倒顺序,但尽量不要调整
#案例1：查询员工编号在100到120之间的员工信息
SELECT
	*
FROM
	descomp
WHERE
	employees_id >= 100 AND employees_id <= 120;
#---------------------------------------------------
SELECT
	*
FROM
	descomp
WHERE
	employees_id BETWEEN 100 AND 120;








#3.in
/*
含义：判断字段的值是否属于in列表中的某一项
特点：
	1.使用in提高语句简洁度
	2.
*/
#案例：查询员工的工/种编号是 IT_PROG、AD_VP 中的员工员工们和工种编号
SELECT
	`name`,
	job_id
FROM
	descomp
WHERE
	job_id = 'AD_VP' OR job_id = 'IT_PROG';
#-----------------------------------------------------
SELECT
	`name`,
	job_id
FROM
	descomp
WHERE
	job_id IN('AD_VP','IT_PROG');








#4、in null
/*
=或<>并不能用于判断null值
is null或is not null 可以判断null值

*/
#案例1：查询没有奖金的员工和奖金率
SELECT
	`name`,
	commission_pct
FROM
	工资表
WHERE
	commission_pct IS NULL;
#案例2：查询有奖金的员工和奖金率
SELECT
	`name`,
	commission_pct
FROM
	工资表
WHERE
	commission_pct IS NOT NULL;	








#安全等于    <=>
#案例1：查询没有奖金的员工和奖金率
SELECT
	`name`,
	commission_pct
FROM
	工资表
WHERE
	commission_pct <=> NULL;
#案例2：查询工资为50的员工
SELECT
	`name`,
	salary
FROM
	工资表
WHERE
	salary <=> 50;

#is null pk <=>
/*
is null:仅仅可以判断null值，可读性较高
<=>    :可以判断为null的值,不可以判断不为null的值
*/