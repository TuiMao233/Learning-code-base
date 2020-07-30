<?php
/** 数值相关函数
 * max(num,num)：数之间最大的值
 * min(num,num)：比较两个数中较小的值
 * rand([,$min], [,$max])：得到一个随机数,指定区间的随机整数
 * mt_rand([,$min], [,$max])：与rand一样,只是底层结构不一样,效率比rand高（建议使用）
 * round(num)：四舍五入
 * ceil(num)：向上取整
 * floor(num)：向下取整
 * pow(num, num)：求指定数字的指定数次结果：pow(2,8) == 2^8 == 256
 * abs(num/-num)：绝对值
 * sqrt(num)：求平方根
 * */
/** 函数相关的函数
 * function_exists($function_name)：判断指定函数(名称)是否在内存中存在
 * func_get_arg($index)：获取函数中指定索引的参数
 * func_get_args(void)：函数中获取所有的参数（数组）
 * func_num_args()：函数的参数数量
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