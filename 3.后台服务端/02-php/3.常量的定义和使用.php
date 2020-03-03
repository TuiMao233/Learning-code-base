<?php
//使用函数定义常量: define
define('PI',3.14);
//使用const关键字定义
const PII=3;
echo PI;
define ('-_-','wwww');
echo '<br>'.constant('-_-');
//const -_- = 2;报错
/* 1、常量不需要'$'符号，一旦使用，系统就认为是变量
 * 2、常量的名字组成由字母、数字和下划线组合
 * 3、常量是不允许被修改的
 */
?>
