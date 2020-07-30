<?php
// 可变函数：当前有一个变量所保存到的值, 刚好是一个函数名称, 那么将可以使用变量+()来充当函数名使用
$fun_name = 'display';
function display () {
  echo 'xxx';
};
$fun_name();