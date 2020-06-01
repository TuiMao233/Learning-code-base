SELECT * FROM tab;
#进阶4：常见函数

/*
概念：类似于java的方法，讲一组逻辑语句封装在方法体最后，对外暴露方法名
好处：1、隐藏了实现细节，2提高代码的重用性
调用：select 函数名(实参列表) 【from 表】;
特点：
	1.叫什么(函数名)
	2.干什么(函数功能)
分类： 
	1.单行函数
	如 concat、length、ifnull等
	2.分组函数
	
	功能：做统计使用、又成统计函数、聚合函数、组函数
*/

#一、字符函数

#1.length
SELECT LENGTH('嘻嘻嘻');

SHOW VARIABLES LIKE '%char%';

#2.concat 拼接字符串
SELECT CONCAT(`name`,'_',age) 姓名 FROM tab;

#3.upper/lower
SELECT UPPER('john');
SELECT LOWER('JOHN');
#实例：将姓变大写，名变小写，然后拼接
SELECT CONCAT(UPPER('www'),LOWER('nmd'));

#4.substr/substring
# 索引从1开始
# 截取从指定索引处后面所有字符
SELECT SUBSTR('闪电侠爱上了一个魏大勋',6);
# 截取从指定索引处指定字符长度的字符
SELECT SUBSTR('闪电侠爱上了一个魏大勋',1,3);

#案例：姓名中首字符大写，其他字符小写然后用_拼接，显示出来
SELECT CONCAT(
		UPPER(SUBSTR(last_name,1,1)),
		'_',
		SUBSTR(last_name,2)
	) out_put
FROM tab;

#5.instr 返回子串第一次出现的索引，如果找不到返回0
SELECT INSTR('内马尔爱上了魏霞则','魏霞则') AS out_put;

#6.trim
# 去除前后空格
SELECT TRIM('	张翠山	') AS out_put;
# 去除前后指定字符
SELECT TRIM('a' FROM 'aaaaa张aaaa翠山aaaaaaaaaaaaaaa') AS out_put;

#7.lpad 用指定字符实现左填充指定长度
SELECT LPAD('若相惜',10,'d') AS out_put;

#8.rpad 用指定的字符实现右填充指定长度
SELECT RPAD('若相惜',12,'a') AS out_put;

#9.replace 替换
SELECT REPLACE('魏大勋魏大勋魏大勋魏大勋得唔得闲','得唔得闲','唔得闲') AS out_put;




#二、数字函数

#round 四舍五入
SELECT ROUND(1.65);
SELECT ROUND(-1.6545,2);

#ceil 向上取整
SELECT CEIL(1.001);
SELECT CEIL(-1.001);

#floor 向下取整，返回<=该参数的最大整数
SELECT FLOOR(-9.9);

#truncate 截断
SELECT TRUNCATE(1.659999,1);

#mod取余 MOD(a,b) :  a-a/b*b
SELECT MOD(10,3);
SELECT 10%3;




#三、日期函数

#now 返回当前系统日期+时间
SELECT NOW();

#curdate 返回当前系统日期，不包含时间
SELECT CURDATE();

#curtime 返回当前时间，不包含日期
SELECT CURTIME();

#可以获取指定的部分，年、月、日、小时、分组、秒
SELECT YEAR(NOW()) 年;
SELECT YEAR('1998-1-1') 年;

SELECT MONTH(NOW()) 月;
SELECT MONTHNAME(NOW()) 月;

#str_to_date 讲字符通过指定的格式转换成日期
SELECT STR_TO_DATE('1998-3-2','%Y-%c-%d') AS out_put;

#date_format 将日期转换成字符
SELECT DATE_FORMAT(NOW(),'%Y年%m月%d日') AS out_put;




#四、其他函数
SELECT VERSION();
SELECT DATABASE();
SELECT USER();




#伍、流程控制函数
#1.if函数：if else 的效果
SELECT IF(10<5,'大','小');

SELECT `name`,bonus,IF(bonus IS NULL,'没奖金，呵呵','有奖金，嘻嘻')
FROM tab; 

#2.case函数的使用一：switch case 的效果
/*
case  要判断的字段或表达式
when 常量1 then 要显示的值1或语句1;
when 常量2 then 要显示的值2或语句2;
...
else 要显示的值n或语句n;
end
*/
SELECT salary 原始工资, `name`,
CASE age
WHEN 1.64 THEN salary *1.1
WHEN 1.77 THEN salary *1.2
ELSE salary
END AS 新工资
FROM tab;