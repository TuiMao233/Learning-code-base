<?php
function display(){
    //定义变量
    $local = 1;

    //定义静态变量
    static $count = 1;
    echo $local++,$count++,'<br>';
}
//静态变量的使用
/* 1、为了统计：当前函数被调用的次数
 * 2、为了统筹函数多次调用得到的不同结果（递归
 * */
display();
display();
display();