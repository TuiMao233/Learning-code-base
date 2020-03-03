<?php
/* max(num,num)：数之间最大的值
 * min(num,num)：比较两个数中较小的值
 * rand()：得到一个随机数,指定区间的随机整数
 * mt_rand()：与rand一样,只是底层结构被一样,效率比rand高（建议使用）
 * round()：四舍五入
 * ceil()：向上取整
 * floor()：向下取整
 * pow()：求指定数字的指定数次结果：pow(2,8) == 2^8 == 256
 * abs()：绝对值
 * sqrt()：求平方根
 * */

//有关函数的函数
/* function_exists()：判断指定函数名字是否在内存中存在
 * func_get_arg()：在自定义函数中获取指定数值对应的参数
 * func_get_args()：在自定义函数中获取所以的参数（数组）
 * func_num_args()：获取当前自定义函数的参数数量
 * */

function test($a,$b){
    //获取指定参数
    var_dump(func_get_arg(0));
    echo '<br>';
    //获取所有参数
    var_dump(func_get_args());
    echo '<br>';
    //获取参数数量
    var_dump(func_num_args());
};
test(60,70);