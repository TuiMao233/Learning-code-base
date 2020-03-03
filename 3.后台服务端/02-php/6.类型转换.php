<?php
 /* 在PHP中有两种类型转换方式 ：
  * 1、自动转换：系统根据需求自己判定，自己转换（用的比较多，效率偏低）
  * 2、强制（手动）转换：认为根据需要的目标类型转换
  * 
  * 在转换的过程中，用的比较多的就是转布尔类型（判断）和转数值类型（算数运算）
  * 
  * 其他类型转布尔类型：true或flase，在php中比较少类型转换为flase
  */
/* $x = '';  		 //string
 $x = null; 	 //null
 var $x; 		 //null
 $x is undefined // null
 $x = array() 	 //array
 $x = false;	 //boolean
 $x = true;		 //boolean
 $x = 1;		 //integer
 $x = 42;   	 //integer
 $x = 0;		 //integer
 $x = -1;        //integer
 $x = '1';		 //string
 $x = '-1';      //string
 $x = 'php';     //string
 $x = 'true';    //string
 $x = 'false';   //string*/
 echo 'php版本号：'.PHP_VERSION.'<br/>';
 $a = 'abc1.1.1';
 $b = '1.1.1abc';
//自动转换   php7会报错
// echo $a + $b;

//强制转换为数值类型 只要第一个字符串是字母 则为0 
echo (integer)$a.'<br/>';
echo (integer)$b.'<br/>';
echo '<hr/><br/>';
/*布尔类型不能用echo查看，可以使用var dump查看*/
var_dump(is_int($a)); //检测是否为数值类型
var_dump(is_string($a));//检测是否为串类型


//var_dump($a);
?>